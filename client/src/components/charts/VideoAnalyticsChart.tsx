import React, { useState } from "react";
import { motion } from "framer-motion";

interface VideoSegment {
  startTime: string;
  endTime: string;
  views: number;
  engagement: number; // 0-100
  dropOff?: boolean;
}

interface VideoAnalyticsChartProps {
  videoTitle?: string;
  duration?: string;
  totalViews?: number;
  avgWatchTime?: string;
  segments: VideoSegment[];
  inView: boolean;
}

const VideoAnalyticsChart: React.FC<VideoAnalyticsChartProps> = ({
  videoTitle = "Product Demo",
  duration = "01:32",
  totalViews = 247,
  avgWatchTime = "01:03",
  segments,
  inView
}) => {
  const [currentTime, setCurrentTime] = useState("00:08");
  const [currentViews, setCurrentViews] = useState(2);
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);
  
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
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };
  
  // Calculate the position of the playhead based on current time
  const getPlayheadPosition = () => {
    const totalSeconds = convertTimeToSeconds(duration);
    const currentSeconds = convertTimeToSeconds(currentTime);
    return (currentSeconds / totalSeconds) * 100;
  };
  
  // Convert time string (MM:SS) to seconds
  const convertTimeToSeconds = (timeString: string) => {
    const [minutes, seconds] = timeString.split(":").map(Number);
    return minutes * 60 + seconds;
  };
  
  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="bg-white rounded-lg">
      <motion.div
        className="relative"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Video Preview */}
        <div className="relative bg-gray-900 w-full aspect-video rounded-t-lg overflow-hidden">
          {/* Mock video thumbnail */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-r from-[#332116] to-[#291a11] opacity-60"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-[#7C5832]/20 backdrop-blur-sm p-4 rounded-lg text-white">
                <h3 className="font-bold mb-2">{videoTitle}</h3>
                <div className="flex items-center space-x-4 text-sm">
                  <div>Duration: {duration}</div>
                  <div>Views: {totalViews}</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Playhead */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white z-10"
            style={{ left: `${getPlayheadPosition()}%` }}
          ></div>
          
          {/* Current time indicator */}
          <motion.div
            className="absolute bg-black/80 text-white px-3 py-2 rounded-md z-20"
            style={{ 
              left: `${getPlayheadPosition()}%`, 
              top: "30%",
              transform: "translateX(-50%)"
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="font-medium">Time: {currentTime}</div>
            <div>Views: {currentViews}</div>
          </motion.div>
        </div>
        
        {/* Video Timeline */}
        <div className="relative h-24 bg-gray-100 p-4 rounded-b-lg">
          {/* Engagement graph */}
          <div className="relative h-12">
            <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
              {/* Draw the engagement path */}
              <motion.path
                d="M0,40 C10,30 20,15 30,25 C40,35 50,15 60,20 C70,25 80,10 90,30 C95,35 100,30 100,30"
                fill="none"
                stroke="#7C5832"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
              <motion.path
                d="M0,40 C10,30 20,15 30,25 C40,35 50,15 60,20 C70,25 80,10 90,30 C95,35 100,30 100,30 L100,40 L0,40 Z"
                fill="url(#engagementGradient)"
                opacity="0.3"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 0.3 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
              <defs>
                <linearGradient id="engagementGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#7C5832" stopOpacity="1" />
                  <stop offset="100%" stopColor="#7C5832" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              
              {/* Current playhead position */}
              <motion.circle
                cx={getPlayheadPosition()}
                cy="20"
                r="4"
                fill="#7C5832"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: 0.8 }}
              />
              
              {/* Highlight key moments (hover points) */}
              <motion.circle cx="30" cy="25" r="3" fill="#D4C5B4" strokeWidth="2" stroke="#fff" />
              <motion.circle cx="50" cy="15" r="3" fill="#D4C5B4" strokeWidth="2" stroke="#fff" />
              <motion.circle cx="80" cy="10" r="3" fill="#D4C5B4" strokeWidth="2" stroke="#fff" />
            </svg>
            
            {/* Drop-off markers */}
            <div className="absolute left-[80%] top-0 bottom-0 border-l-2 border-dashed border-red-400 z-10">
              <div className="absolute top-0 -left-[30px] bg-red-100 text-red-600 text-xs px-1 rounded">
                80% drop-off
              </div>
            </div>
          </div>
          
          {/* Timeline labels */}
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <div>00:00</div>
            <div>00:05</div>
            <div>00:10</div>
            <div>{duration}</div>
          </div>
          
          {/* Playback thumbnails */}
          <div className="absolute bottom-0 left-0 right-0 h-8 flex justify-between">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="h-full w-16 bg-gray-200 rounded opacity-50"
              ></div>
            ))}
          </div>
        </div>
        
        {/* Analytics metrics */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div 
            className="bg-[#F8F6F3] p-4 rounded-lg"
            variants={itemVariants}
          >
            <h4 className="text-sm text-gray-600">Total Views</h4>
            <p className="text-xl font-bold text-gray-800">{totalViews}</p>
            <p className="text-xs text-green-500 font-medium mt-1">↑ 18% from last week</p>
          </motion.div>
          
          <motion.div 
            className="bg-[#F8F6F3] p-4 rounded-lg"
            variants={itemVariants}
          >
            <h4 className="text-sm text-gray-600">Avg. Watch Time</h4>
            <p className="text-xl font-bold text-gray-800">{avgWatchTime}</p>
            <p className="text-xs text-gray-500 mt-1">69% of video length</p>
          </motion.div>
          
          <motion.div 
            className="bg-[#F8F6F3] p-4 rounded-lg"
            variants={itemVariants}
          >
            <h4 className="text-sm text-gray-600">Engagement Rate</h4>
            <p className="text-xl font-bold text-gray-800">87%</p>
            <p className="text-xs text-green-500 font-medium mt-1">↑ 5% from average</p>
          </motion.div>
          
          <motion.div 
            className="bg-[#F8F6F3] p-4 rounded-lg"
            variants={itemVariants}
          >
            <h4 className="text-sm text-gray-600">Completion Rate</h4>
            <p className="text-xl font-bold text-gray-800">64%</p>
            <p className="text-xs text-gray-500 mt-1">164 complete views</p>
          </motion.div>
        </div>
        
        {/* Key insights */}
        <motion.div 
          className="mt-6 bg-white border border-gray-100 rounded-lg p-4"
          variants={itemVariants}
        >
          <h3 className="font-medium text-gray-800 mb-3">Video Performance Insights</h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="bg-[#7C5832] bg-opacity-10 p-1 rounded mr-3 mt-0.5">
                <svg className="w-4 h-4 text-[#7C5832]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 3v18l14-9L5 3z" fill="currentColor" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 text-sm">Strong start, engagement drops at 00:53</h4>
                <p className="text-sm text-gray-500">Consider shortening the product features section to maintain viewer interest</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#7C5832] bg-opacity-10 p-1 rounded mr-3 mt-0.5">
                <svg className="w-4 h-4 text-[#7C5832]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z" fill="currentColor" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 text-sm">Viewers replaying 00:20-00:35 segment</h4>
                <p className="text-sm text-gray-500">Pricing section receives the most replays - consider highlighting this information</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#7C5832] bg-opacity-10 p-1 rounded mr-3 mt-0.5">
                <svg className="w-4 h-4 text-[#7C5832]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="currentColor" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 text-sm">80% drop-off at technical details (00:53)</h4>
                <p className="text-sm text-gray-500">Consider moving technical specifications to a separate video or simplify terminology</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Device breakdown */}
        <motion.div 
          className="mt-6 bg-white border border-gray-100 rounded-lg p-4" 
          variants={itemVariants}
        >
          <h3 className="font-medium text-gray-800 mb-3">Viewing Device Breakdown</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-[#7C5832]">68%</div>
              <div className="text-sm text-gray-600">Mobile</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#B79F85]">24%</div>
              <div className="text-sm text-gray-600">Desktop</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#D4C5B4]">8%</div>
              <div className="text-sm text-gray-600">Tablet</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default VideoAnalyticsChart;