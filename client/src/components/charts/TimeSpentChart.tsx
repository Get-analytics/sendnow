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
    const chartHeight = height - 50; // pixels
    
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
      opacity: 0.3,
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
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        
        <div className="flex space-x-2 text-sm">
          <div className="px-3 py-1 bg-[#7C5832] bg-opacity-5 text-[#7C5832] rounded-md font-medium">Last month</div>
          <div className="px-3 py-1 bg-gray-100 text-gray-500 rounded-md">Compare</div>
        </div>
      </div>
      
      {/* Chart area */}
      <motion.div
        className="relative"
        style={{ height: `${height}px` }}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Time period selection */}
        <div className="absolute left-0 top-0 flex flex-col space-y-3 text-sm">
          <button className="text-gray-400 hover:text-[#7C5832] text-left transition-colors">Today</button>
          <button className="text-gray-400 hover:text-[#7C5832] text-left transition-colors">Yesterday</button>
          <button className="text-gray-400 hover:text-[#7C5832] text-left transition-colors">Last week</button>
          <button className="text-[#7C5832] font-medium text-left">Last month</button>
          <button className="text-gray-400 hover:text-[#7C5832] text-left transition-colors">Custom</button>
        </div>
        
        {/* Stats */}
        <div className="absolute left-[110px] top-0 flex items-center">
          <div className="text-green-500 font-medium flex items-center text-sm">
            +12%
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 ml-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
            </svg>
          </div>
          <span className="text-gray-500 ml-2 text-sm">vs previous period</span>
        </div>
        
        {/* Line chart */}
        <div className="absolute left-[110px] right-0 bottom-0" style={{ height: `${height - 50}px` }}>
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-0">
            {[0, 1, 2, 3, 4].map((_, index) => (
              <div 
                key={index} 
                className="w-full border-t border-dashed border-gray-200"
                style={{ height: index === 4 ? '1px' : 'auto' }}
              />
            ))}
          </div>
          
          {/* Value labels */}
          <div className="absolute right-0 inset-y-0 flex flex-col justify-between text-xs text-gray-400 pr-2">
            <div>{maxValue}</div>
            <div>{Math.round(maxValue * 0.75)}</div>
            <div>{Math.round(maxValue * 0.5)}</div>
            <div>{Math.round(maxValue * 0.25)}</div>
            <div>0</div>
          </div>
          
          {/* Chart SVG */}
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 100 ${height - 50}`}
            preserveAspectRatio="none"
            className="overflow-visible z-10"
          >
            {/* Area under the line */}
            <motion.path
              d={`${getLinePath()} L100,${height - 50} L0,${height - 50} Z`}
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
                <stop offset="0%" stopColor="#7C5832" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#7C5832" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            
            {/* Data points */}
            {data.map((point, index) => {
              const x = index * (100 / (data.length - 1));
              const y = (height - 50) - (point.value / maxValue) * (height - 50);
              
              return (
                <motion.g key={index} variants={index === 10 ? {} : dotVariants}>
                  <circle
                    cx={x}
                    cy={y}
                    r="3"
                    fill="#FFF"
                    stroke="#7C5832"
                    strokeWidth="2"
                  />
                  
                  {/* Highlight a specific point (e.g., highest value) */}
                  {index === 10 && (
                    <>
                      <motion.circle
                        cx={x}
                        cy={y}
                        r="6"
                        fill="#7C5832"
                        initial={{ scale: 0 }}
                        animate={inView ? { scale: 1 } : { scale: 0 }}
                        transition={{ delay: 1.5, duration: 0.4 }}
                      />
                      
                      <motion.g
                        variants={tooltipVariants}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        transition={{ delay: 1.8 }}
                      >
                        <rect
                          x={x - 45}
                          y={y - 45}
                          width="90"
                          height="35"
                          rx="4"
                          fill="#7C5832"
                        />
                        <text
                          x={x}
                          y={y - 30}
                          textAnchor="middle"
                          fill="white"
                          fontSize="12"
                          fontWeight="bold"
                        >
                          59 Visitors
                        </text>
                        <text
                          x={x}
                          y={y - 15}
                          textAnchor="middle"
                          fill="white"
                          fontSize="10"
                        >
                          Jan 25, 2023
                        </text>
                      </motion.g>
                    </>
                  )}
                </motion.g>
              );
            })}
          </svg>
        </div>
      </motion.div>
      
      {/* Key metrics at the bottom */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="bg-[#F8F6F3] p-4 rounded-lg">
          <h4 className="text-sm text-gray-600 mb-1">Avg. Session Time</h4>
          <p className="text-xl font-bold text-gray-800">04:27</p>
          <p className="text-xs text-green-500 font-medium mt-1">↑ 12% from last period</p>
        </div>
        
        <div className="bg-[#F8F6F3] p-4 rounded-lg">
          <h4 className="text-sm text-gray-600 mb-1">Longest Session</h4>
          <p className="text-xl font-bold text-gray-800">16:42</p>
          <p className="text-xs text-gray-500 mt-1">From United States</p>
        </div>
        
        <div className="bg-[#F8F6F3] p-4 rounded-lg">
          <h4 className="text-sm text-gray-600 mb-1">Scroll Depth</h4>
          <p className="text-xl font-bold text-gray-800">87%</p>
          <p className="text-xs text-green-500 font-medium mt-1">↑ 5% from last period</p>
        </div>
      </div>
    </div>
  );
};

export default TimeSpentChart;