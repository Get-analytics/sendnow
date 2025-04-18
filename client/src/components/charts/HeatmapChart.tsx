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

  // Define gradient colors for heatmap
  const getGradientColor = (intensity: number) => {
    // Colors for low to high intensity (blue -> green -> yellow -> red)
    if (intensity <= 3) return "rgba(0, 0, 255, 0.3)";
    if (intensity <= 5) return "rgba(0, 255, 0, 0.3)";
    if (intensity <= 8) return "rgba(255, 255, 0, 0.3)";
    return "rgba(255, 0, 0, 0.3)";
  };

  // Calculate hotspot radius based on intensity
  const getHotspotRadius = (intensity: number) => {
    return 20 + (intensity * 5); // Base radius 20px + intensity factor
  };

  return (
    <div className="relative">
      <motion.div
        className="relative bg-white rounded-lg overflow-hidden"
        style={{ width: width, height: height, margin: "0 auto" }}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Background image or mockup */}
        <div className="absolute inset-0 bg-gray-50 flex items-center justify-center">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt="Website mockup" 
              className="w-full h-full object-contain"
            />
          ) : (
            // Mock website layout if no image provided
            <div className="w-full h-full p-4 relative">
              {/* Header */}
              <div className="h-16 bg-white border border-gray-200 rounded-lg mb-4 flex items-center px-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-[#D4C5B4] flex items-center justify-center">
                    <span className="text-[#7C5832] text-xs font-medium">SN</span>
                  </div>
                  <div className="font-bold">sendnow</div>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="space-x-4 text-sm">
                    <span>Features</span>
                    <span>Pricing</span>
                    <span>About</span>
                    <span>Contact</span>
                  </div>
                </div>
                <div className="bg-[#7C5832] px-3 py-1 rounded-md text-white text-sm">
                  Get started
                </div>
              </div>
              
              {/* Hero */}
              <div className="h-64 bg-white border border-gray-200 rounded-lg mb-4 p-6 flex">
                <div className="flex-1">
                  <div className="w-3/4 h-8 bg-gray-200 rounded mb-4"></div>
                  <div className="w-1/2 h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="w-2/3 h-4 bg-gray-200 rounded mb-6"></div>
                  <div className="w-32 h-10 bg-[#7C5832] rounded-md"></div>
                </div>
                <div className="flex-1 bg-gray-100 rounded-lg"></div>
              </div>
              
              {/* Features */}
              <div className="h-32 bg-white border border-gray-200 rounded-lg flex space-x-4 p-4">
                <div className="flex-1 bg-gray-50 rounded-lg p-3">
                  <div className="w-1/2 h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="w-full h-3 bg-gray-200 rounded mb-1"></div>
                  <div className="w-3/4 h-3 bg-gray-200 rounded"></div>
                </div>
                <div className="flex-1 bg-gray-50 rounded-lg p-3">
                  <div className="w-1/2 h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="w-full h-3 bg-gray-200 rounded mb-1"></div>
                  <div className="w-3/4 h-3 bg-gray-200 rounded"></div>
                </div>
                <div className="flex-1 bg-gray-50 rounded-lg p-3">
                  <div className="w-1/2 h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="w-full h-3 bg-gray-200 rounded mb-1"></div>
                  <div className="w-3/4 h-3 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Heatmap overlay */}
        <div className="absolute inset-0">
          <svg width="100%" height="100%" style={{ filter: "blur(10px)" }}>
            <defs>
              <radialGradient id="hotspot-gradient-1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="rgba(255,0,0,0.8)" />
                <stop offset="100%" stopColor="rgba(255,0,0,0)" />
              </radialGradient>
              <radialGradient id="hotspot-gradient-2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="rgba(255,165,0,0.8)" />
                <stop offset="100%" stopColor="rgba(255,165,0,0)" />
              </radialGradient>
              <radialGradient id="hotspot-gradient-3" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="rgba(0,0,255,0.8)" />
                <stop offset="100%" stopColor="rgba(0,0,255,0)" />
              </radialGradient>
            </defs>
            
            {data.map((hotspot, index) => (
              <motion.circle
                key={index}
                cx={`${hotspot.x}%`}
                cy={`${hotspot.y}%`}
                r={getHotspotRadius(hotspot.intensity)}
                fill={`url(#hotspot-gradient-${Math.ceil(hotspot.intensity / 3)})`}
                variants={hotspotVariants}
              />
            ))}
          </svg>
        </div>
        
        {/* Hotspot labels */}
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
            <div className="bg-gray-800 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold z-10">
              {hotspot.clicks || Math.round(hotspot.intensity * 10)}
            </div>
          </motion.div>
        ))}
        
        {/* Controls */}
        <motion.div 
          className="absolute top-4 right-4 flex bg-white rounded-md shadow overflow-hidden"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <button className="p-2 hover:bg-gray-100 border-r">
            <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          <button className="p-2 hover:bg-gray-100 border-r">
            <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="p-2 hover:bg-gray-100">
            <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </button>
        </motion.div>
      </motion.div>
      
      {/* Stats */}
      <div className="mt-6 flex flex-col md:flex-row justify-between">
        <motion.div 
          className="bg-white p-4 rounded-lg shadow-sm mb-4 md:mb-0 md:mr-4 flex-1"
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
          className="bg-white p-4 rounded-lg shadow-sm mb-4 md:mb-0 md:mr-4 flex-1"
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
            <h3 className="font-medium text-gray-800 text-sm">Click Distribution</h3>
          </div>
          <div className="text-2xl font-bold">CTR 4.7%</div>
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
            <h3 className="font-medium text-gray-800 text-sm">Most Active Time</h3>
          </div>
          <div className="text-2xl font-bold">Tue 2-4pm</div>
          <div className="text-sm text-gray-500 mt-1">54% of all interactions</div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeatmapChart;