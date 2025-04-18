import React from "react";
import { motion } from "framer-motion";

interface HotspotData {
  x: number;
  y: number;
  intensity: number; // 1-10 scale where 10 is most intense
  clicks?: number;
}

interface HeatmapChartProps {
  data: HotspotData[];
  imageUrl?: string;
  width?: number;
  height?: number;
  inView: boolean;
}

const HeatmapChart: React.FC<HeatmapChartProps> = ({
  data,
  imageUrl,
  width = 800,
  height = 450,
  inView
}) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const hotspotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const tooltipVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: 0.2
      }
    }
  };

  // Calculate hotspot radius based on intensity
  const getHotspotRadius = (intensity: number) => {
    return 15 + (intensity * 4); // Base radius 15px + intensity factor
  };

  return (
    <div className="relative">
      <div className="bg-white rounded-lg overflow-hidden mb-4">
        <div className="px-6 pt-6 pb-2 flex justify-between items-start">
          <div className="mb-4">
            <h3 className="text-xl font-medium text-gray-500">Heat map</h3>
            <h2 className="text-2xl font-bold text-gray-900">3,834 clicks</h2>
          </div>
          
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 9L15 3M15 3H9M15 3V9M15 15L9 21M9 21H15M9 21L9 15" stroke="#7C5832" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        
        <motion.div
          className="relative"
          style={{ width: width, height: height, margin: "0 auto" }}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Background website mockup */}
          <div className="absolute inset-0 flex items-center justify-center border-t border-gray-100">
            <div className="w-full h-full p-4 relative bg-[#E5F0FF]/10 flex items-center justify-center">
              <div className="w-[90%] h-[90%] rounded-lg border border-gray-200 overflow-hidden bg-white">
                {/* Header */}
                <div className="h-14 bg-white border-b border-gray-100 flex items-center px-4">
                  <div className="flex items-center space-x-2">
                    <img 
                      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTIwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KICA8cGF0aCBkPSJNMjAgMjBDMjAgMTMuOTY0NiAyNC45NjQ2IDkgMzEgOUgzOVYyOUgzMUMyNC45NjQ2IDI5IDIwIDI0LjAzNTQgMjAgMThWMjBaIiBmaWxsPSIjN0M1ODMyIi8+DQogIDxwYXRoIGQ9Ik0zOSA5SDQ3QzUzLjAzNTQgOSA1OCAxMy45NjQ2IDU4IDIwVjE4QzU4IDI0LjAzNTQgNTMuMDM1NCAyOSA0NyAyOUgzOVY5WiIgZmlsbD0iI0Q0QzVCNCIvPg0KICA8cGF0aCBkPSJNNjUuMDI4IDIyLjY3MlY5SDYxLjA5MlYyM0M2MS4wOTIgMjYuMzE0IDYzLjc2OCAyOSA2Ny4wNTQgMjlINzhWMjUuMDY0SDY3LjM1NkM2Ni4wNDYgMjUuMDY0IDY1LjAyOCAyNC4wMTggNjUuMDI4IDIyLjY3MloiIGZpbGw9IiM3QzU4MzIiLz4NCiAgPHBhdGggZD0iTTg3LjQ4NiA5SDgwLjUxNEg3OFYyOUg4MS45MzZWMjIuMDU0SDg3LjQ4NkM5MS4xMiAyMi4wNTQgOTQgMTkuMTc0IDk0IDE1LjUyN0M5NCAxMS44OCA5MS4xMiA5IDg3LjQ4NiA5Wk04Ny4zIDEyLjgwNkM4OC45MTYgMTIuODA2IDkwLjEyMiAxMy45OSA5MC4xMjIgMTUuNTI3QzkwLjEyMiAxNy4wNjQgODguOTc0IDE4LjI0OCA4Ny4zIDE4LjI0OEg4MS45MzZWMTIuODA2SDg3LjNaIiBmaWxsPSIjN0M1ODMyIi8+DQo8L3N2Zz4NCg==" 
                      alt="Sendnow" 
                      className="h-8 w-auto"
                    />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="space-x-6 text-sm text-gray-400">
                      <span>Features</span>
                      <span>Pricing</span>
                      <span>About</span>
                      <span>Contact</span>
                    </div>
                  </div>
                  <div className="bg-[#7C5832] px-4 py-2 rounded-md text-white text-sm font-medium">
                    See live demo
                  </div>
                </div>
                
                {/* Hero */}
                <div className="px-10 py-8 flex">
                  <div className="flex-1 pr-8">
                    <div className="font-bold text-3xl text-gray-800 mb-4">Better your business.</div>
                    <div className="text-gray-600 mb-6">
                      Clarity is a free tool that captures how people use your site. Setup is easy and you'll start getting data in minutes.
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">100k+ sites globally</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">100% free</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">GDPR & CCPA ready</span>
                      </div>
                    </div>
                    <button className="mt-8 bg-[#7C5832] text-white px-8 py-3 rounded-md font-medium text-sm">
                      See live demo
                    </button>
                  </div>
                  <div className="flex-1">
                    <img 
                      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQogIDxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjBGNEY4Ii8+DQogIDxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIHJ4PSI4IiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSIjRTJFOEYwIi8+DQogIDxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNjAiIGZpbGw9IiNFMkU4RjAiLz4NCiAgPHJlY3QgeD0iMTMwIiB5PSIyMjAiIHdpZHRoPSIxNDAiIGhlaWdodD0iMTAiIHJ4PSI1IiBmaWxsPSIjRTJFOEYwIi8+DQogIDxyZWN0IHg9IjE2MCIgeT0iMjQwIiB3aWR0aD0iODAiIGhlaWdodD0iMTAiIHJ4PSI1IiBmaWxsPSIjRTJFOEYwIi8+DQo8L3N2Zz4NCg==" 
                      alt="Analytics" 
                      className="w-full rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Heatmap overlay */}
          <div className="absolute inset-0">
            <svg width="100%" height="100%" style={{ filter: "blur(10px)" }}>
              <defs>
                <radialGradient id="hotspot-red" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                  <stop offset="0%" stopColor="#FF4500" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#FF4500" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="hotspot-orange" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                  <stop offset="0%" stopColor="#FF8C00" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#FF8C00" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="hotspot-yellow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                  <stop offset="0%" stopColor="#FFD700" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
                </radialGradient>
              </defs>
              
              {data.map((hotspot, index) => {
                // Determine gradient based on intensity
                let gradientId = "hotspot-yellow";
                if (hotspot.intensity >= 8) gradientId = "hotspot-red";
                else if (hotspot.intensity >= 5) gradientId = "hotspot-orange";
                
                return (
                  <motion.circle
                    key={index}
                    cx={`${hotspot.x}%`}
                    cy={`${hotspot.y}%`}
                    r={getHotspotRadius(hotspot.intensity)}
                    fill={`url(#${gradientId})`}
                    variants={hotspotVariants}
                  />
                );
              })}
            </svg>
          </div>
          
          {/* Click indicators */}
          {data.map((hotspot, index) => (
            <motion.div
              key={`tooltip-${index}`}
              className="absolute flex items-center justify-center"
              style={{ 
                left: `${hotspot.x}%`, 
                top: `${hotspot.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              variants={tooltipVariants}
            >
              <div className={`${
                hotspot.intensity >= 8 
                  ? 'bg-[#7C5832]' 
                  : (hotspot.intensity >= 5 ? 'bg-blue-500' : 'bg-blue-400')
              } text-white rounded-full flex items-center justify-center z-10 
                ${hotspot.intensity >= 8 ? 'w-8 h-8 text-sm' : 'w-6 h-6 text-xs'}`}
              >
                {hotspot.clicks || Math.round(hotspot.intensity * 3)}
              </div>
            </motion.div>
          ))}
          
          {/* Tooltip */}
          <motion.div
            className="absolute top-[30%] left-[15%] bg-white px-3 py-2 rounded shadow-md text-xs z-20"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.3, delay: 1 }}
          >
            <div className="font-medium">Clicks</div>
            <div className="text-gray-500">10 (0.06%)</div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Stats row */}
      <div className="flex space-x-4">
        <motion.div 
          className="bg-white p-4 rounded-lg shadow-sm flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-[#7C5832]/10 flex items-center justify-center">
              <svg className="w-3 h-3 text-[#7C5832]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-800 text-sm">Total Clicks</h3>
          </div>
          <div className="text-2xl font-bold text-[#7C5832]">3,834</div>
          <div className="text-sm text-gray-500 mt-1">+7.2% from last month</div>
        </motion.div>
        
        <motion.div 
          className="bg-white p-4 rounded-lg shadow-sm flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-[#7C5832]/10 flex items-center justify-center">
              <svg className="w-3 h-3 text-[#7C5832]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-800 text-sm">CTR</h3>
          </div>
          <div className="text-2xl font-bold">4.7%</div>
          <div className="text-sm text-gray-500 mt-1">82% focused on CTA buttons</div>
        </motion.div>
        
        <motion.div 
          className="bg-white p-4 rounded-lg shadow-sm flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-[#7C5832]/10 flex items-center justify-center">
              <svg className="w-3 h-3 text-[#7C5832]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-800 text-sm">Active Time</h3>
          </div>
          <div className="text-2xl font-bold">Tue 2-4pm</div>
          <div className="text-sm text-gray-500 mt-1">54% of all interactions</div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeatmapChart;