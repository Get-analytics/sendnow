import React, { useState } from "react";
import { motion } from "framer-motion";
import { GlobeIcon, ListFilter, BarChart3, MapPin } from "lucide-react";

interface Location {
  name: string;
  country: string;
  lat: number;
  lng: number;
  visitors: number;
  percentage: number;
}

interface MapViewChartProps {
  data: Location[];
  inView: boolean;
  width?: number;
  height?: number;
}

const MapViewChart: React.FC<MapViewChartProps> = ({
  data,
  inView,
  width = 800,
  height = 400
}) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  
  // Find the location with the most visitors (for relative circle sizing)
  const maxVisitors = Math.max(...data.map(location => location.visitors));
  
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
  
  const mapVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    }
  };
  
  const pointVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        type: "spring",
        duration: 0.4
      }
    }
  };
  
  // Calculate marker size based on visitor count
  const getMarkerSize = (visitors: number) => {
    const minSize = 6;
    const maxSize = 24;
    return minSize + (visitors / maxVisitors) * (maxSize - minSize);
  };
  
  // Convert lat,lng to x,y coordinates on the map
  const getCoordinates = (lat: number, lng: number) => {
    // Simple mercator projection
    const x = ((lng + 180) / 360) * 100;
    const y = ((90 - lat) / 180) * 100;
    return { x, y };
  };

  return (
    <div className="bg-white rounded-lg">
      {/* Controls and tabs */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <button 
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${viewMode === 'map' 
              ? 'bg-[#7C5832] text-white' 
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            onClick={() => setViewMode("map")}
          >
            Map View
          </button>
          <button 
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${viewMode === 'list' 
              ? 'bg-[#7C5832] text-white' 
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            onClick={() => setViewMode("list")}
          >
            List View
          </button>
        </div>
        
        <div className="flex space-x-2">
          <button className="p-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors">
            <ListFilter className="w-4 h-4 text-gray-500" />
          </button>
          <button className="p-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors">
            <BarChart3 className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
      
      {/* Map View */}
      {viewMode === "map" && (
        <motion.div 
          className="relative bg-white rounded-lg overflow-hidden"
          style={{ height: `${height}px` }}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* World Map */}
          <motion.div 
            className="absolute inset-0"
            variants={mapVariants}
          >
            <svg width="100%" height="100%" viewBox="0 0 1000 500" style={{ background: "#f8f8f8" }}>
              {/* World map base */}
              <path
                d="M172,325c-4.6-4.3-12.2-5-17.5-0.7c-5.1,3.5-13.2,2.9-15-5.5c0.9-3.9-1.1-7.9-4.7-9.4c-4.6-1.6-7.4-5.9-6.9-10.6c0.8-4.8-2.8-9.3-7.6-9.6c-4.6-0.7-8.3-4.4-8.5-9.1c0.1-4.5-3.7-8.1-8.2-7.8c-5-0.1-9.1-4.1-9.3-9.1c-0.2-4.6-3.5-8.5-8-9.4c-3.5-0.9-6.1-3.8-6.5-7.4c-0.9-4.9-5.9-8-10.7-6.6c-4.5,1-9.1-1.9-10.1-6.3c-0.9-4.5-4.7-7.8-9.3-7.9c-4.9-0.1-8.5-3.5-9-8.3c-0.1-4.3-2.9-8.1-7-9.5c-4.6-1.4-7.4-6.1-6.3-10.7c1.4-4.1-0.8-8.6-4.8-10.2c-4.9-1.8-7.2-7.3-5.2-12.1c1.9-3.3,1.4-7.6-1.3-10.3c-3.9-3.9-3.9-10.2,0-14.2c2.8-2.7,3.3-7,1.3-10.3c-3-4.3-2.1-10.1,2-13.3c3.2-2.5,4.2-6.9,2.5-10.6c-2.5-4.5-0.6-10.1,4-12.3c2.4-1.2,4.2-3.4,4.7-6c-0.5-5.6,4.5-10.3,10.1-9.4c3.8,0.2,7.3-2.2,8.7-5.7c1.2-5.8,7-9.3,12.7-7.7c3.9,0.7,7.9-1,10-4.5c1.4-4.9,6.6-7.7,11.5-6c4.1,1.3,8.6-0.8,10.2-4.9c1.1-4.8,6-7.7,10.8-6.4c3.9,0.7,7.9-1,10-4.5c1.4-4.9,6.6-7.7,11.5-6c4,1.6,8.6-0.1,10.5-3.9c1.3-5.2,6.6-8.2,11.7-6.5c3.6,1.3,7.6-0.4,9.3-4c1.4-4.9,6.6-7.7,11.5-6c3.8,1.3,8-0.6,9.7-4.3c1.2-5.2,6-8.6,10.6-7.7c15.4,3.5,31.3,4.1,46.9,1.7c3.1-0.6,7.8-2.8,8.2-6.5c3.1-13.4,5.3-27,6.8-40.6"
                fill="#B79F85"
                stroke="#7C5832"
                strokeWidth="1"
                opacity="0.8"
              />
              <path 
                d="M768,144c-7.3,4.2-15.9,5.5-24.2,3.6c-16.1-2.8-32.5-2.1-48.3,2c-11.5,2.7-23.5,1.5-34.2-3.5c-7.5-3.5-15.7-4.9-23.9-4.1c-12.3,0.9-24.6-0.5-36.3-4.3c-17.9-5.8-37.6-0.8-49.9,12.6c-16.6,17.9-46.5,12.7-56.6-9.4c-7.7-16.9-27.1-24.8-44.6-18.1c-10.4,4-22.4,0.6-28.8-8.1c-8.7-11.9-24.7-15.5-37.8-8.6c-7.8,4.1-17.3,1.9-22.4-5.1c-7.1-9.7-21.1-10.8-29.2-2.4c-5,5.2-13.1,5.9-19,1.7c-8-5.8-19.2-5-26.2,1.9c-4.3,4.2-10.8,5.2-16.1,2.4c-7.3-3.8-16.4-1.4-20.9,5.5c-2.7,4.2-7.6,6.3-12.5,5.3c-6.7-1.4-13.3,2.9-14.7,9.6c-0.9,4-4.2,7.1-8.2,7.9c-5.5,1.1-9.6,5.9-9.6,11.6c0,3.8-2.5,7.2-6,8.5c-5.1,1.9-7.9,7.5-6.5,12.8c0.9,3.5-0.6,7.3-3.7,9.1c-4.4,2.5-5.9,8.2-3.4,12.6c1.6,2.8,1.3,6.3-0.9,8.8c-3.1,3.5-2.8,8.8,0.6,12c2.1,2,2.9,5.1,1.9,7.9c-1.4,4.3,0.9,9,5.2,10.4c2.6,0.9,4.5,3.3,4.8,6.1c0.4,4.5,4.5,7.8,9,7.4c2.9-0.3,5.7,1.2,7.1,3.8c2.1,3.9,7,5.4,10.9,3.3c2.5-1.4,5.6-0.9,7.6,1.1c3,3,7.8,3,10.8,0c1.9-1.9,4.8-2.4,7.2-1.2c3.6,1.8,8,0.3,9.8-3.3c1.2-2.3,3.5-3.7,6.1-3.5c3.9,0.3,7.3-2.7,7.5-6.6c0.2-2.5,1.7-4.7,4.1-5.7c3.5-1.5,5.2-5.5,3.7-9c-1-2.3-0.7-5,0.8-7c2.2-2.9,1.7-7-1.2-9.2c-1.8-1.4-2.8-3.6-2.6-5.9c0.3-3.4-2.2-6.4-5.6-6.7c-2.2-0.2-4.1-1.7-4.9-3.8c-1.2-3.2-4.7-4.8-7.9-3.6c-2.1,0.8-4.5,0.2-6-1.5c-2.2-2.6-6.1-2.9-8.7-0.7c-1.7,1.4-4.1,1.6-6,0.5c-2.8-1.6-6.5-0.7-8.1,2.1c-1.1,1.8-3.1,2.8-5.2,2.3c-3.1-0.6-6.1,1.4-6.7,4.5c-0.4,2-1.8,3.5-3.7,4c-2.8,0.7-4.4,3.5-3.7,6.3c0.5,1.9-0.1,3.9-1.6,5.1c-2.2,1.8-2.6,5-0.8,7.2c1.1,1.4,1.3,3.4,0.4,5c-1.3,2.5-0.4,5.5,2,6.8c1.5,0.9,2.5,2.5,2.5,4.3c0,2.7,2.2,4.9,5,4.9c1.7,0,3.3,0.9,4,2.4c1.1,2.3,3.8,3.3,6.1,2.2c1.5-0.7,3.2-0.5,4.5,0.5c1.9,1.5,4.6,1.2,6.1-0.7c1-1.2,2.5-1.7,4.1-1.3c2.2,0.6,4.5-0.7,5.1-2.9c0.4-1.4,1.5-2.5,2.9-2.9c2.1-0.5,3.3-2.6,2.8-4.7c-0.3-1.4,0.1-2.8,1.1-3.7c1.6-1.3,1.8-3.6,0.5-5.2c-0.8-1-1-2.3-0.5-3.5c0.8-1.9-0.1-4-2-4.8c-1.2-0.5-2-1.6-2.1-2.9c-0.1-1.9-1.8-3.4-3.8-3.2c-1.3,0.1-2.5-0.5-3.1-1.6c-1-1.7-3.1-2.3-4.8-1.4c-1.1,0.6-2.4,0.6-3.5,0c-1.6-1-3.8-0.4-4.7,1.3c-0.6,1.1-1.7,1.7-3,1.5c-1.9-0.2-3.5,1.1-3.7,3c-0.1,1.3-1,2.4-2.2,2.8c-1.8,0.6-2.7,2.5-2.1,4.3c0.4,1.1,0.2,2.3-0.6,3.2c-1.2,1.3-1.1,3.3,0.1,4.5c0.8,0.8,1.1,1.9,0.7,3c-0.5,1.7,0.4,3.4,2.1,3.9c1.1,0.3,2,1.2,2.3,2.3c0.4,1.7,2.1,2.8,3.8,2.3c1.2-0.3,2.4,0.1,3.2,1c1.2,1.3,3.2,1.4,4.5,0.2c0.9-0.9,2.1-1.1,3.3-0.6c1.6,0.7,3.5-0.1,4.2-1.7c0.5-1,1.4-1.7,2.5-1.8c1.7-0.1,3-1.6,2.9-3.3c-0.1-1.1,0.4-2.2,1.3-2.8c1.5-0.9,1.9-2.9,1-4.4c-0.6-1-0.6-2.2,0-3.1c0.9-1.5,0.4-3.4-1.1-4.3c-0.9-0.6-1.5-1.6-1.4-2.7c0.1-1.7-1.1-3.1-2.8-3.2c-1-0.1-2-0.7-2.4-1.6c-0.6-1.5-2.4-2.2-3.9-1.6c-1,0.4-2.1,0.3-3-0.3c-1.3-0.9-3.1-0.6-4,0.7c-0.6,0.9-1.6,1.3-2.6,1.1c-1.5-0.3-3,0.7-3.3,2.3c-0.2,1-0.9,1.8-1.8,2.1c-1.4,0.4-2.2,1.8-1.8,3.2c0.3,0.9,0.1,1.9-0.5,2.6c-0.9,1.1-0.8,2.7,0.3,3.6c0.7,0.6,0.9,1.5,0.6,2.4c-0.5,1.3,0.1,2.8,1.4,3.3c0.8,0.3,1.4,1,1.5,1.9c0.2,1.4,1.4,2.4,2.8,2.2c0.9-0.1,1.8,0.3,2.3,1c0.7,1.1,2.2,1.4,3.3,0.7c0.7-0.5,1.7-0.5,2.4,0c1.1,0.7,2.5,0.4,3.2-0.7c0.5-0.7,1.3-1.1,2.2-0.9c1.2,0.2,2.3-0.6,2.5-1.8c0.1-0.8,0.6-1.4,1.3-1.6c1.1-0.3,1.7-1.5,1.4-2.6c-0.2-0.7,0-1.5,0.6-2c0.8-0.7,0.9-1.9,0.3-2.8c-0.4-0.5-0.5-1.2-0.2-1.8c0.4-1-0.1-2.2-1.1-2.6c-0.6-0.3-1-0.8-1.1-1.5c-0.1-1-1-1.8-2-1.7c-0.7,0-1.3-0.3-1.7-0.8c-0.5-0.9-1.6-1.2-2.5-0.7c-0.6,0.3-1.3,0.3-1.8,0c-0.8-0.5-1.9-0.2-2.5,0.6c-0.4,0.5-0.9,0.8-1.5,0.8c-1,0-1.8,0.8-1.8,1.8c-0.1,0.6-0.4,1.1-0.9,1.4c-0.9,0.4-1.3,1.4-0.9,2.3c0.2,0.5,0.2,1.1-0.2,1.6c-0.6,0.7-0.6,1.8,0.1,2.4c0.4,0.3,0.6,0.9,0.5,1.4c-0.2,0.9,0.4,1.8,1.3,2c0.5,0.1,0.9,0.5,1.1,1c0.3,0.8,1.2,1.3,2,1c0.5-0.2,1.1,0,1.5,0.4c0.6,0.6,1.5,0.6,2.1,0c0.4-0.4,0.9-0.5,1.4-0.3c0.8,0.3,1.6-0.1,1.9-0.9c0.2-0.5,0.6-0.8,1.1-0.8c0.8-0.1,1.4-0.8,1.3-1.6c0-0.5,0.2-1,0.6-1.3c0.7-0.4,0.9-1.3,0.5-2.1c-0.2-0.4-0.2-0.9,0.1-1.3c0.4-0.6,0.3-1.5-0.4-1.9c-0.4-0.2-0.6-0.7-0.6-1.2c0.1-0.7-0.5-1.3-1.2-1.4c-0.4-0.1-0.8-0.3-1-0.7c-0.3-0.6-1.1-0.9-1.7-0.6c-0.4,0.2-0.9,0.1-1.2-0.2c-0.5-0.4-1.2-0.3-1.7,0.1c-0.3,0.3-0.7,0.4-1.1,0.3c-0.6-0.1-1.2,0.3-1.3,0.9c-0.1,0.4-0.3,0.7-0.7,0.8c-0.5,0.2-0.9,0.7-0.7,1.3c0.1,0.3,0,0.7-0.2,0.9c-0.3,0.4-0.3,1,0,1.4c0.2,0.2,0.2,0.6,0.1,0.8c-0.2,0.5,0.1,1.1,0.6,1.3c0.3,0.1,0.5,0.4,0.6,0.7c0.1,0.5,0.7,0.9,1.2,0.8c0.3-0.1,0.6,0.1,0.8,0.3c0.3,0.4,0.9,0.5,1.3,0.2c0.3-0.2,0.6-0.2,0.9,0c0.4,0.2,0.9,0.1,1.2-0.3c0.2-0.2,0.5-0.3,0.8-0.3c0.4,0.1,0.9-0.2,1-0.7c0.1-0.3,0.2-0.5,0.5-0.6c0.4-0.1,0.6-0.5,0.5-1c-0.1-0.3,0-0.5,0.2-0.7c0.3-0.3,0.3-0.7,0-1c-0.2-0.2-0.2-0.4-0.1-0.7c0.1-0.4-0.1-0.8-0.4-0.9c-0.2-0.1-0.4-0.3-0.4-0.5c0-0.4-0.3-0.7-0.7-0.6c-0.2,0-0.5-0.1-0.6-0.3c-0.2-0.3-0.6-0.4-0.9-0.2c-0.2,0.1-0.4,0.1-0.6,0c-0.3-0.2-0.7-0.1-0.9,0.2c-0.1,0.2-0.3,0.3-0.5,0.2c-0.3-0.1-0.6,0.1-0.7,0.4c-0.1,0.2-0.2,0.3-0.4,0.4c-0.3,0.1-0.4,0.4-0.3,0.7c0.1,0.2,0,0.3-0.1,0.5c-0.2,0.2-0.2,0.5,0,0.7c0.1,0.1,0.1,0.3,0,0.5c-0.1,0.3,0.1,0.5,0.3,0.6c0.2,0.1,0.3,0.2,0.3,0.3c0.1,0.3,0.4,0.4,0.6,0.3c0.2,0,0.3,0,0.5,0.1c0.2,0.2,0.5,0.2,0.7,0c0.1-0.1,0.3-0.1,0.4,0c0.2,0.1,0.5,0,0.6-0.2c0.1-0.1,0.2-0.2,0.3-0.2c0.2,0,0.4-0.2,0.4-0.4c0-0.1,0.1-0.2,0.2-0.3c0.1-0.1,0.1-0.3,0-0.5c-0.1-0.1,0-0.2,0.1-0.2c0.1-0.1,0.1-0.3,0-0.5c-0.1-0.1-0.1-0.2,0-0.3c0.1-0.1,0-0.3-0.1-0.3c-0.1-0.1-0.1-0.1-0.1-0.2c0-0.1-0.1-0.2-0.2-0.2c-0.1,0-0.1-0.1-0.2-0.1c-0.1-0.1-0.2-0.1-0.3,0c-0.1,0-0.1,0-0.2-0.1c-0.1-0.1-0.3,0-0.3,0.1c-0.1,0.1-0.1,0.1-0.2,0.1c-0.1,0-0.2-0.1-0.2-0.2c0,0-0.1-0.1-0.1-0.1c-0.1,0-0.1,0-0.2,0.1c0,0.1-0.1,0.1-0.1,0.1c-0.1,0-0.1-0.1-0.1-0.1"
                fill="#B79F85"
                stroke="#7C5832"
                strokeWidth="1"
                opacity="0.8"
              />
              
              {/* Location markers */}
              {data.map((location, index) => {
                const { x, y } = getCoordinates(location.lat, location.lng);
                const size = getMarkerSize(location.visitors);
                
                return (
                  <motion.g 
                    key={index}
                    variants={pointVariants}
                    onMouseEnter={() => setSelectedLocation(location)}
                    onMouseLeave={() => setSelectedLocation(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    <circle
                      cx={`${x}%`}
                      cy={`${y}%`}
                      r={size}
                      fill="#E74C3C"
                      opacity={0.7}
                    />
                    <circle
                      cx={`${x}%`}
                      cy={`${y}%`}
                      r={size * 0.5}
                      fill="#E74C3C"
                      opacity={0.9}
                    />
                    {location.name === "United States" && (
                      <text
                        x={`${x - 7}%`}
                        y={`${y + 7}%`}
                        fontSize="12"
                        fontWeight="bold"
                        fill="#333333"
                      >
                        {location.name}
                      </text>
                    )}
                  </motion.g>
                );
              })}
              
              {/* Selected location tooltip */}
              {selectedLocation && (() => {
                const { x, y } = getCoordinates(selectedLocation.lat, selectedLocation.lng);
                
                return (
                  <g>
                    <rect
                      x={`${x + 1}%`}
                      y={`${y - 10}%`}
                      width="120"
                      height="60"
                      rx="4"
                      fill="white"
                      stroke="#7C5832"
                      strokeWidth="1"
                    />
                    <text
                      x={`${x + 6}%`}
                      y={`${y - 2}%`}
                      fontSize="12"
                      fontWeight="bold"
                      fill="#333333"
                    >
                      {selectedLocation.name}
                    </text>
                    <text
                      x={`${x + 6}%`}
                      y={`${y + 5}%`}
                      fontSize="10"
                      fill="#666666"
                    >
                      Visitors: {selectedLocation.visitors}
                    </text>
                    <text
                      x={`${x + 6}%`}
                      y={`${y + 12}%`}
                      fontSize="10"
                      fill="#666666"
                    >
                      {selectedLocation.percentage}% of total
                    </text>
                  </g>
                );
              })()}
            </svg>
          </motion.div>
          
          {/* Map controls */}
          <div className="absolute top-4 right-4 flex flex-col bg-white rounded-md shadow overflow-hidden">
            <button className="p-2 hover:bg-gray-100 border-b">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
      
      {/* List View */}
      {viewMode === "list" && (
        <motion.div 
          className="bg-white rounded-lg"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="bg-[#F8F6F3] py-2 px-4 rounded-t-lg grid grid-cols-4 text-sm font-medium text-gray-700">
            <div>Country</div>
            <div>Visitors</div>
            <div>% Total</div>
            <div>Avg. Session</div>
          </div>
          
          <div className="max-h-[350px] overflow-y-auto">
            {data.sort((a, b) => b.visitors - a.visitors).map((location, index) => (
              <motion.div 
                key={index}
                className={`py-3 px-4 grid grid-cols-4 text-sm ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-[#F8F6F3]/50 transition-colors border-b border-gray-100`}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: index * 0.05, duration: 0.3 }
                  }
                }}
              >
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[#E74C3C] mr-2"></div>
                  <span>{location.name}</span>
                </div>
                <div>{location.visitors.toLocaleString()}</div>
                <div>{location.percentage}%</div>
                <div>3m 42s</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
      
      {/* Summary stats */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        <motion.div 
          className="bg-[#F8F6F3] p-3 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-sm text-gray-600 mb-1">Total Countries</div>
          <div className="text-xl font-bold text-gray-800">{data.length}</div>
        </motion.div>
        
        <motion.div 
          className="bg-[#F8F6F3] p-3 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-sm text-gray-600 mb-1">Top Location</div>
          <div className="text-xl font-bold text-gray-800">United States</div>
        </motion.div>
        
        <motion.div 
          className="bg-[#F8F6F3] p-3 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-sm text-gray-600 mb-1">New Regions</div>
          <div className="text-xl font-bold text-gray-800">+3 <span className="text-xs text-green-500">↑ 12%</span></div>
        </motion.div>
      </div>
    </div>
  );
};

export default MapViewChart;