import React from "react";
import { motion } from "framer-motion";

interface DataPoint {
  date: string;
  value: number;
  label?: string;
}

interface TimeSpentChartProps {
  data: DataPoint[];
  height?: number;
  inView: boolean;
  title?: string;
  subtitle?: string;
}

const TimeSpentChart: React.FC<TimeSpentChartProps> = ({
  data,
  height = 300,
  inView,
  title = "Session Duration",
  subtitle = "Jan 1 - Jan 31, 2023"
}) => {
  // Find the max value to scale the chart
  const maxValue = Math.max(...data.map(point => point.value));
  
  // Calculate the line path
  const getLinePath = () => {
    // Chart area dimensions
    const chartWidth = 100; // percentage width
    const chartHeight = height - 60; // pixels
    
    // Calculate segment width
    const segmentWidth = chartWidth / (data.length - 1);
    
    let path = "";
    
    data.forEach((point, index) => {
      // Calculate position as percentage
      const x = index * segmentWidth;
      const y = chartHeight - (point.value / maxValue) * chartHeight;
      
      if (index === 0) {
        path += `M${x},${y}`;
      } else {
        // Use a curve for smoother lines
        const prevX = (index - 1) * segmentWidth;
        const cpX1 = prevX + segmentWidth / 3;
        const cpX2 = x - segmentWidth / 3;
        path += ` C${cpX1},${data[index-1].value / maxValue * chartHeight} ${cpX2},${y} ${x},${y}`;
      }
    });
    
    return path;
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };
  
  const areaVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.2,
      transition: {
        duration: 0.8,
        delay: 0.8
      }
    }
  };
  
  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "backOut"
      }
    }
  };
  
  const tooltipVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="px-6 pt-6 pb-2 flex justify-between items-start">
        <div className="mb-4">
          <h3 className="text-xl font-medium text-gray-800">Overall</h3>
          <h2 className="text-2xl font-bold text-gray-900">Session</h2>
        </div>
        
        <div className="flex space-x-2 text-sm">
          <div className="px-4 py-2 bg-[#7C5832] bg-opacity-5 text-[#7C5832] rounded-full font-medium">Last month</div>
          <div className="px-4 py-2 bg-gray-100 text-gray-500 rounded-full">Compare</div>
        </div>
      </div>
      
      {/* Chart area */}
      <motion.div
        className="relative px-6 pb-6"
        style={{ height: `${height}px` }}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Time period selection */}
        <div className="absolute left-6 top-0 flex flex-col space-y-5 text-sm">
          <button className="text-gray-400 hover:text-[#7C5832] text-left transition-colors">Today</button>
          <button className="text-gray-400 hover:text-[#7C5832] text-left transition-colors">Yesterday</button>
          <button className="text-gray-400 hover:text-[#7C5832] text-left transition-colors">Last week</button>
          <button className="text-[#7C5832] font-medium text-left">Last month</button>
          <button className="text-gray-400 hover:text-[#7C5832] text-left transition-colors">Custom</button>
        </div>
        
        {/* Line chart */}
        <div className="absolute left-[100px] right-6 top-0 bottom-8" style={{ height: `${height - 30}px` }}>
          {/* Grid lines - horizontal dashed lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {[0, 1, 2, 3, 4].map((_, index) => (
              <div 
                key={index} 
                className="w-full border-t border-dashed border-gray-200 opacity-60"
              />
            ))}
          </div>
          
          {/* Chart SVG */}
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 100 ${height - 60}`}
            preserveAspectRatio="none"
            className="overflow-visible z-10"
          >
            {/* Area under the line */}
            <motion.path
              d={`${getLinePath()} L100,${height - 60} L0,${height - 60} Z`}
              fill="url(#gradient)"
              stroke="none"
              variants={areaVariants}
            />
            
            {/* Line */}
            <motion.path
              d={getLinePath()}
              fill="none"
              stroke="#7C5832"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={lineVariants}
            />
            
            {/* Create gradient for area under the line */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7C5832" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#F8F6F3" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            
            {/* Data points with markers */}
            {data.map((point, index) => {
              const x = index * (100 / (data.length - 1));
              const y = (height - 60) - (point.value / maxValue) * (height - 60);
              
              // Only show circles on specific data points to match reference design
              if ([0, 2, 4, 6].includes(index)) {
                return (
                  <motion.g key={index} variants={dotVariants}>
                    <circle
                      cx={x}
                      cy={y}
                      r="5"
                      fill="#FFF"
                      stroke="#7C5832"
                      strokeWidth="2"
                    />
                    
                    {/* Ring around circle */}
                    <circle
                      cx={x}
                      cy={y}
                      r="8"
                      fill="none"
                      stroke="#7C5832"
                      strokeWidth="1"
                      strokeOpacity="0.3"
                    />
                  </motion.g>
                );
              }
              
              // Highlight peak value
              if (index === 6) { // 7th data point (index 6) is the peak "59" value based on the image
                return (
                  <motion.g key={index} variants={dotVariants}>
                    <circle
                      cx={x}
                      cy={y}
                      r="5"
                      fill="#7C5832"
                      stroke="#FFF"
                      strokeWidth="2"
                    />
                    
                    {/* Ring around highlight circle */}
                    <circle
                      cx={x}
                      cy={y}
                      r="8"
                      fill="none"
                      stroke="#7C5832"
                      strokeWidth="1"
                      opacity="0.5"
                    />
                    
                    {/* Tooltip for peak */}
                    <motion.g
                      variants={tooltipVariants}
                      initial="hidden"
                      animate={inView ? "visible" : "hidden"}
                      transition={{ delay: 1.2 }}
                    >
                      <rect
                        x={x - 50}
                        y={y - 48}
                        width="100"
                        height="40"
                        rx="4"
                        fill="#7C5832"
                      />
                      <polygon 
                        points={`${x},${y-8} ${x-6},${y-14} ${x+6},${y-14}`} 
                        fill="#7C5832" 
                      />
                      <text
                        x={x}
                        y={y - 31}
                        textAnchor="middle"
                        fill="white"
                        fontSize="14"
                        fontWeight="bold"
                      >
                        59 Visitors
                      </text>
                      <text
                        x={x}
                        y={y - 18}
                        textAnchor="middle"
                        fill="white"
                        fontSize="11"
                      >
                        Jan 25, 2025
                      </text>
                    </motion.g>
                  </motion.g>
                );
              }
              
              return null;
            })}
          </svg>
          
          {/* Value labels */}
          <div className="absolute right-[-5px] inset-y-0 flex flex-col justify-between text-xs text-gray-400">
            <div>{maxValue}</div>
            <div>{Math.round(maxValue * 0.75)}</div>
            <div>{Math.round(maxValue * 0.5)}</div>
            <div>{Math.round(maxValue * 0.25)}</div>
            <div>0</div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="absolute left-[100px] bottom-0 flex items-center">
          <div className="text-green-500 font-medium flex items-center text-sm">
            +12%
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 ml-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
            </svg>
          </div>
          <span className="text-gray-600 ml-2 text-sm font-medium">yesterday</span>
        </div>
      </motion.div>
    </div>
  );
};

export default TimeSpentChart;