import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Users, 
  Clock, 
  Target, 
  ArrowUpDown,
  UploadCloud,
  ClipboardCopy,
  Filter,
  SlidersHorizontal,
  Smartphone,
  Laptop,
  PieChart,
  BarChart,
  Film
} from "lucide-react";
import DevicesPieChart from "./charts/DevicesPieChart";
import WeeklyBarChart from "./charts/WeeklyBarChart";
import HeatmapChart from "./charts/HeatmapChart";
import TimeSpentChart from "./charts/TimeSpentChart";
import VideoAnalyticsChart from "./charts/VideoAnalyticsChart";
import MapViewChart from "./charts/MapViewChart";
import { Card, CardContent } from "@/components/ui/card";

const AnalyticsOverview: React.FC = () => {
  const [sectionRef, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [activeTab, setActiveTab] = useState("overview");

  const chartLineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { 
        pathLength: { type: "spring", duration: 1.5, bounce: 0 },
        opacity: { duration: 0.01 }
      }
    }
  };

  const statData = [
    { 
      icon: <Users className="w-5 h-5 text-[#7C5832]" />, 
      title: "Total Sessions", 
      value: "38,774" 
    },
    { 
      icon: <Clock className="w-5 h-5 text-[#7C5832]" />, 
      title: "Time Spent", 
      value: "1h 27m" 
    },
    { 
      icon: <Target className="w-5 h-5 text-[#7C5832]" />, 
      title: "Unique Visitors", 
      value: "1,337" 
    },
    { 
      icon: <ArrowUpDown className="w-5 h-5 text-[#7C5832]" />, 
      title: "Bounce Rate", 
      value: "12.76%" 
    }
  ];

  return (
    <section id="analytics" className="py-16 bg-[#F8F6F3]" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-[#7C5832] mb-4">All Your Analytics, All in One Place</h2>
          <p className="text-gray-600">Understand how your audience interacts with your content through comprehensive analytics dashboards.</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="overview" className="mb-8" onValueChange={setActiveTab}>
            <TabsList className="border-b border-gray-200 w-full justify-start rounded-none bg-transparent h-auto pb-0 mb-8 overflow-x-auto">
              <TabsTrigger 
                value="overview" 
                className={`mr-8 py-4 border-b-2 px-1 rounded-none data-[state=active]:shadow-none ${activeTab === 'overview' ? 'border-[#7C5832] text-[#7C5832]' : 'border-transparent text-gray-500'}`}
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="deviceAnalytics"
                className={`mr-8 py-4 border-b-2 px-1 rounded-none data-[state=active]:shadow-none ${activeTab === 'deviceAnalytics' ? 'border-[#7C5832] text-[#7C5832]' : 'border-transparent text-gray-500'}`}
              >
                Devices Analytics
              </TabsTrigger>
              <TabsTrigger 
                value="overallTimeSpend"
                className={`mr-8 py-4 border-b-2 px-1 rounded-none data-[state=active]:shadow-none ${activeTab === 'overallTimeSpend' ? 'border-[#7C5832] text-[#7C5832]' : 'border-transparent text-gray-500'}`}
              >
                Overall Time Spend
              </TabsTrigger>
              <TabsTrigger 
                value="mapAnalytics"
                className={`mr-8 py-4 border-b-2 px-1 rounded-none data-[state=active]:shadow-none ${activeTab === 'mapAnalytics' ? 'border-[#7C5832] text-[#7C5832]' : 'border-transparent text-gray-500'}`}
              >
                Map Analytics
              </TabsTrigger>
              <TabsTrigger 
                value="heatmap"
                className={`mr-8 py-4 border-b-2 px-1 rounded-none data-[state=active]:shadow-none ${activeTab === 'heatmap' ? 'border-[#7C5832] text-[#7C5832]' : 'border-transparent text-gray-500'}`}
              >
                Heatmap
              </TabsTrigger>
              <TabsTrigger 
                value="timeSpent"
                className={`mr-8 py-4 border-b-2 px-1 rounded-none data-[state=active]:shadow-none ${activeTab === 'timeSpent' ? 'border-[#7C5832] text-[#7C5832]' : 'border-transparent text-gray-500'}`}
              >
                Time Spent
              </TabsTrigger>
              <TabsTrigger 
                value="videoAnalytics"
                className={`py-4 border-b-2 px-1 rounded-none data-[state=active]:shadow-none ${activeTab === 'videoAnalytics' ? 'border-[#7C5832] text-[#7C5832]' : 'border-transparent text-gray-500'}`}
              >
                Video Analytics
              </TabsTrigger>
            </TabsList>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Dashboard Header */}
              <div className="p-4 md:p-6 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[#D4C5B4] flex items-center justify-center">
                    <span className="text-[#7C5832] font-medium">SN</span>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <UploadCloud className="w-5 h-5 text-gray-500" />
                    <ClipboardCopy className="w-5 h-5 text-gray-500" />
                    <Filter className="w-5 h-5 text-gray-500" />
                    <SlidersHorizontal className="w-5 h-5 text-gray-500" />
                  </div>
                </div>
              </div>
              
              {/* Stats Overview */}
              <div className="p-6">
                <motion.div 
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                >
                  {statData.map((stat, index) => (
                    <motion.div
                      key={index}
                      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { 
                          opacity: 1, 
                          y: 0,
                          transition: { duration: 0.4 }
                        }
                      }}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="bg-[#7C5832] bg-opacity-10 p-2 rounded-lg">
                          {stat.icon}
                        </div>
                        <div className="text-sm text-gray-500">{stat.title}</div>
                      </div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                    </motion.div>
                  ))}
                </motion.div>
                
                <TabsContent value="overview" className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Session Graph */}
                  <Card className="border border-gray-100 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="bg-[#7C5832] bg-opacity-10 p-2 rounded-lg">
                            <Users className="w-5 h-5 text-[#7C5832]" />
                          </div>
                          <h3 className="font-medium text-gray-800">Session Overview</h3>
                        </div>
                        <div>
                          <span className="px-3 py-1 bg-[#7C5832] bg-opacity-5 text-[#7C5832] text-sm rounded-md font-medium">Last month</span>
                        </div>
                      </div>
                      
                      {/* Timeline Filter */}
                      <div className="flex space-x-4 text-sm mb-4">
                        <button className="text-gray-500 hover:text-[#7C5832] transition-colors">Today</button>
                        <button className="text-gray-500 hover:text-[#7C5832] transition-colors">Yesterday</button>
                        <button className="text-gray-500 hover:text-[#7C5832] transition-colors">Last week</button>
                        <button className="text-[#7C5832] font-medium">Last month</button>
                        <button className="text-gray-500 hover:text-[#7C5832] transition-colors">Custom</button>
                      </div>
                      
                      {/* Growth Rate */}
                      <div className="flex items-center mb-4 text-sm">
                        <span className="text-green-500 font-medium flex items-center">
                          +12%
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 ml-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                          </svg>
                        </span>
                        <span className="text-gray-500 ml-2">vs yesterday</span>
                      </div>
                      
                      {/* Graph SVG */}
                      <div className="w-full h-40 relative">
                        <svg viewBox="0 0 300 100" className="w-full h-full">
                          <motion.path
                            d="M0,80 C20,70 40,60 60,80 C80,100 100,50 120,40 C140,30 160,70 180,40 C200,10 220,30 240,20 C260,10 280,5 300,0"
                            fill="none"
                            stroke="#7C5832"
                            strokeWidth="2"
                            variants={chartLineVariants}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                          />
                          <motion.g
                            initial={{ opacity: 0, scale: 0 }}
                            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                            transition={{ delay: 1.5, duration: 0.3 }}
                          >
                            <circle cx="240" cy="20" r="4" fill="#7C5832" />
                            <g transform="translate(240, 10)">
                              <rect x="-25" y="-15" width="70" height="25" rx="4" fill="#7C5832" />
                              <text x="10" y="0" fontSize="8" fill="white" textAnchor="middle" alignmentBaseline="middle">59 Visitors</text>
                              <text x="10" y="10" fontSize="6" fill="white" textAnchor="middle" alignmentBaseline="middle">Jan 24, 2023</text>
                            </g>
                          </motion.g>
                        </svg>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Traffic Source */}
                  <Card className="border border-gray-100 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="font-medium text-gray-800">Traffic Source</h3>
                      </div>
                      
                      {/* Map View Chart */}
                      <MapViewChart 
                        inView={inView}
                        data={[
                          { name: "United States", country: "US", lat: 37.0902, lng: -95.7129, visitors: 8354, percentage: 43 },
                          { name: "United Kingdom", country: "UK", lat: 55.3781, lng: -3.4360, visitors: 2106, percentage: 11 },
                          { name: "Germany", country: "DE", lat: 51.1657, lng: 10.4515, visitors: 1892, percentage: 10 },
                          { name: "France", country: "FR", lat: 46.2276, lng: 2.2137, visitors: 1546, percentage: 8 },
                          { name: "Canada", country: "CA", lat: 56.1304, lng: -106.3468, visitors: 1231, percentage: 6 },
                          { name: "Australia", country: "AU", lat: -25.2744, lng: 133.7751, visitors: 978, percentage: 5 },
                          { name: "Japan", country: "JP", lat: 36.2048, lng: 138.2529, visitors: 854, percentage: 4 },
                          { name: "India", country: "IN", lat: 20.5937, lng: 78.9629, visitors: 743, percentage: 4 },
                          { name: "Spain", country: "ES", lat: 40.4637, lng: -3.7492, visitors: 621, percentage: 3 },
                          { name: "Brazil", country: "BR", lat: -14.2350, lng: -51.9253, visitors: 578, percentage: 3 },
                          { name: "Italy", country: "IT", lat: 41.8719, lng: 12.5674, visitors: 521, percentage: 3 }
                        ]}
                        height={200}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="heatmap" className="mt-6">
                  <Card className="border border-gray-100 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="bg-[#7C5832] bg-opacity-10 p-2 rounded-lg">
                            <PieChart className="w-5 h-5 text-[#7C5832]" />
                          </div>
                          <h3 className="font-medium text-gray-800">Heatmap Analysis</h3>
                        </div>
                        <div>
                          <span className="px-3 py-1 bg-[#7C5832] bg-opacity-5 text-[#7C5832] text-sm rounded-md font-medium">Last week</span>
                        </div>
                      </div>
                      
                      <HeatmapChart 
                        inView={inView}
                        data={[
                          { x: 37, y: 25, intensity: 10, clicks: 38 },
                          { x: 15, y: 70, intensity: 10, clicks: 10 },
                          { x: 73, y: 87, intensity: 7, clicks: 7 },
                          { x: 88, y: 18, intensity: 7, clicks: 7 },
                          { x: 65, y: 60, intensity: 4, clicks: 4 },
                          { x: 45, y: 40, intensity: 3, clicks: 3 },
                          { x: 55, y: 30, intensity: 3, clicks: 3 },
                          { x: 25, y: 50, intensity: 2, clicks: 2 },
                          { x: 82, y: 65, intensity: 2, clicks: 2 },
                          { x: 92, y: 30, intensity: 1, clicks: 1 }
                        ]}
                      />
                      
                      <div className="mt-6 bg-[#F8F6F3]/60 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-2">Heatmap Insights</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start">
                            <div className="text-[#7C5832] mr-2">•</div>
                            <p>Users are focusing most on your logo and primary CTA button</p>
                          </li>
                          <li className="flex items-start">
                            <div className="text-[#7C5832] mr-2">•</div>
                            <p>38% of clicks occur in the header area, showing strong brand recognition</p>
                          </li>
                          <li className="flex items-start">
                            <div className="text-[#7C5832] mr-2">•</div>
                            <p>The "Get Started" button receives 7x more engagement than any other element</p>
                          </li>
                          <li className="flex items-start">
                            <div className="text-[#7C5832] mr-2">•</div>
                            <p>Consider optimizing lower-performing areas by adding more attention-grabbing elements</p>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="deviceAnalytics" className="mt-6">
                  <Card className="border border-gray-100 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="bg-[#7C5832] bg-opacity-10 p-2 rounded-lg">
                            <Smartphone className="w-5 h-5 text-[#7C5832]" />
                          </div>
                          <h3 className="font-medium text-gray-800">Device Analytics</h3>
                        </div>
                        <div>
                          <span className="px-3 py-1 bg-[#7C5832] bg-opacity-5 text-[#7C5832] text-sm rounded-md font-medium">Last month</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row">
                        <div className="flex-1">
                          {/* Custom Pie Chart */}
                          <DevicesPieChart 
                            inView={inView}
                            data={[
                              { name: "Apple", value: 45, color: "#7C5832" },
                              { name: "Mac", value: 25, color: "#8D6E48" },
                              { name: "Windows", value: 20, color: "#B79F85" },
                              { name: "Android", value: 15, color: "#D4C5B4" }
                            ]}
                          />
                        </div>
                        
                        <div className="flex-1 mt-8 md:mt-0">
                          <div className="p-4 rounded-lg bg-[#F8F6F3]">
                            <h4 className="text-lg font-medium text-gray-800 mb-4">Device Insights</h4>
                            <ul className="space-y-3">
                              <li className="flex items-start">
                                <div className="bg-[#7C5832] rounded-full w-2 h-2 mt-2 mr-2"></div>
                                <p className="text-sm text-gray-600">
                                  <span className="font-medium">Apple iOS</span> dominates user engagement with 45% of sessions
                                </p>
                              </li>
                              <li className="flex items-start">
                                <div className="bg-[#8D6E48] rounded-full w-2 h-2 mt-2 mr-2"></div>
                                <p className="text-sm text-gray-600">
                                  <span className="font-medium">Mac</span> users spend 30% more time per session 
                                </p>
                              </li>
                              <li className="flex items-start">
                                <div className="bg-[#B79F85] rounded-full w-2 h-2 mt-2 mr-2"></div>
                                <p className="text-sm text-gray-600">
                                  <span className="font-medium">Windows</span> users have the highest conversion rate at 4.2%
                                </p>
                              </li>
                              <li className="flex items-start">
                                <div className="bg-[#D4C5B4] rounded-full w-2 h-2 mt-2 mr-2"></div>
                                <p className="text-sm text-gray-600">
                                  <span className="font-medium">Android</span> users are growing fastest at +27% month-over-month
                                </p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      {/* Device Breakdown */}
                      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-4 rounded-lg bg-[#7C5832]/5 text-center">
                          <p className="text-sm text-gray-600 mb-1">Apple</p>
                          <p className="text-xl font-bold text-[#7C5832]">45%</p>
                        </div>
                        <div className="p-4 rounded-lg bg-[#8D6E48]/10 text-center">
                          <p className="text-sm text-gray-600 mb-1">Mac</p>
                          <p className="text-xl font-bold text-[#7C5832]">25%</p>
                        </div>
                        <div className="p-4 rounded-lg bg-[#B79F85]/20 text-center">
                          <p className="text-sm text-gray-600 mb-1">Windows</p>
                          <p className="text-xl font-bold text-[#7C5832]">20%</p>
                        </div>
                        <div className="p-4 rounded-lg bg-[#D4C5B4]/30 text-center">
                          <p className="text-sm text-gray-600 mb-1">Android</p>
                          <p className="text-xl font-bold text-[#7C5832]">15%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="overallTimeSpend" className="mt-6">
                  <Card className="border border-gray-100 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="bg-[#7C5832] bg-opacity-10 p-2 rounded-lg">
                            <BarChart className="w-5 h-5 text-[#7C5832]" />
                          </div>
                          <h3 className="font-medium text-gray-800">Overall Time Spend</h3>
                        </div>
                        <div>
                          <span className="px-3 py-1 bg-[#7C5832] bg-opacity-5 text-[#7C5832] text-sm rounded-md font-medium">Last week</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row">
                        <div className="flex-1">
                          {/* Custom Time Spend Bar Chart */}
                          <WeeklyBarChart 
                            inView={inView}
                            data={[
                              { day: "Sun", value: 25 },
                              { day: "Mon", value: 20 },
                              { day: "Tue", value: 32 },
                              { day: "Wed", value: 26 },
                              { day: "Thu", value: 40, isHighest: true },
                              { day: "Fri", value: 30 },
                              { day: "Sat", value: 15 }
                            ]}
                            mainColor="#7C5832"
                            secondaryColor="#D4C5B4"
                          />
                        </div>
                        
                        <div className="flex-1 mt-8 md:mt-0 md:ml-6">
                          <div className="p-4 rounded-lg bg-[#F8F6F3]">
                            <h4 className="text-lg font-medium text-gray-800 mb-4">Time Spend Insights</h4>
                            <ul className="space-y-3">
                              <li className="flex items-start">
                                <div className="bg-[#7C5832] rounded-full w-2 h-2 mt-2 mr-2"></div>
                                <p className="text-sm text-gray-600">
                                  <span className="font-medium">Thursday</span> shows 40 min average session time, your content performs best mid-week
                                </p>
                              </li>
                              <li className="flex items-start">
                                <div className="bg-[#7C5832]/70 rounded-full w-2 h-2 mt-2 mr-2"></div>
                                <p className="text-sm text-gray-600">
                                  <span className="font-medium">Weekend dip</span> indicates your content is primarily consumed during work hours
                                </p>
                              </li>
                              <li className="flex items-start">
                                <div className="bg-[#7C5832]/70 rounded-full w-2 h-2 mt-2 mr-2"></div>
                                <p className="text-sm text-gray-600">
                                  <span className="font-medium">Tuesday engagement</span> has increased 28% from last month, showing growing interest
                                </p>
                              </li>
                              <li className="flex items-start">
                                <div className="bg-[#7C5832]/70 rounded-full w-2 h-2 mt-2 mr-2"></div>
                                <p className="text-sm text-gray-600">
                                  <span className="font-medium">Average time</span> of 27 minutes is 3 minutes above industry standard
                                </p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex flex-col md:flex-row justify-between items-center bg-[#F8F6F3]/50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600 mb-2 md:mb-0">
                          <span className="font-medium">Average session time:</span> 27 minutes
                        </div>
                        <div className="text-sm text-gray-600 mb-2 md:mb-0">
                          <span className="font-medium">Peak day:</span> Thursday (40 min)
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Monthly growth:</span> +12% from last period
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="mapAnalytics" className="mt-6">
                  <Card className="border border-gray-100 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="bg-[#7C5832] bg-opacity-10 p-2 rounded-lg">
                            <svg className="w-5 h-5 text-[#7C5832]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="10" r="3" />
                              <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                            </svg>
                          </div>
                          <h3 className="font-medium text-gray-800">Geographic Analytics</h3>
                        </div>
                        <div>
                          <span className="px-3 py-1 bg-[#7C5832] bg-opacity-5 text-[#7C5832] text-sm rounded-md font-medium">Worldwide</span>
                        </div>
                      </div>
                      
                      {/* Interactive Map Chart */}
                      <MapViewChart 
                        inView={inView}
                        data={[
                          { name: "United States", country: "US", lat: 37.0902, lng: -95.7129, visitors: 8354, percentage: 43 },
                          { name: "United Kingdom", country: "UK", lat: 55.3781, lng: -3.4360, visitors: 2106, percentage: 11 },
                          { name: "Germany", country: "DE", lat: 51.1657, lng: 10.4515, visitors: 1892, percentage: 10 },
                          { name: "France", country: "FR", lat: 46.2276, lng: 2.2137, visitors: 1546, percentage: 8 },
                          { name: "Canada", country: "CA", lat: 56.1304, lng: -106.3468, visitors: 1231, percentage: 6 },
                          { name: "Australia", country: "AU", lat: -25.2744, lng: 133.7751, visitors: 978, percentage: 5 },
                          { name: "Japan", country: "JP", lat: 36.2048, lng: 138.2529, visitors: 854, percentage: 4 },
                          { name: "India", country: "IN", lat: 20.5937, lng: 78.9629, visitors: 743, percentage: 4 },
                          { name: "Spain", country: "ES", lat: 40.4637, lng: -3.7492, visitors: 621, percentage: 3 },
                          { name: "Brazil", country: "BR", lat: -14.2350, lng: -51.9253, visitors: 578, percentage: 3 },
                          { name: "Italy", country: "IT", lat: 41.8719, lng: 12.5674, visitors: 521, percentage: 3 },
                          { name: "South Korea", country: "KR", lat: 35.9078, lng: 127.7669, visitors: 489, percentage: 2.5 },
                          { name: "Netherlands", country: "NL", lat: 52.1326, lng: 5.2913, visitors: 456, percentage: 2.3 },
                          { name: "Sweden", country: "SE", lat: 60.1282, lng: 18.6435, visitors: 423, percentage: 2.2 },
                          { name: "Singapore", country: "SG", lat: 1.3521, lng: 103.8198, visitors: 398, percentage: 2 },
                          { name: "Russia", country: "RU", lat: 61.5240, lng: 105.3188, visitors: 367, percentage: 1.9 },
                          { name: "Switzerland", country: "CH", lat: 46.8182, lng: 8.2275, visitors: 342, percentage: 1.8 },
                          { name: "Belgium", country: "BE", lat: 50.5039, lng: 4.4699, visitors: 321, percentage: 1.7 }
                        ]}
                        height={400}
                      />
                      
                      <div className="mt-8 bg-[#F8F6F3]/60 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-3">Geographic Insights</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start">
                            <div className="text-[#7C5832] mr-2">•</div>
                            <p>43% of your audience comes from the United States, with particular concentration in tech hubs</p>
                          </li>
                          <li className="flex items-start">
                            <div className="text-[#7C5832] mr-2">•</div>
                            <p>European traffic (UK, Germany, France) accounts for 29% of visitors, ideal for potential expansion</p>
                          </li>
                          <li className="flex items-start">
                            <div className="text-[#7C5832] mr-2">•</div>
                            <p>Asian markets (Japan, India, South Korea) show strong growth potential with increasing engagement</p>
                          </li>
                          <li className="flex items-start">
                            <div className="text-[#7C5832] mr-2">•</div>
                            <p>Consider localizing content for top regions to improve engagement and conversion rates</p>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="timeSpent" className="mt-6">
                  <Card className="border border-gray-100 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="bg-[#7C5832] bg-opacity-10 p-2 rounded-lg">
                            <Clock className="w-5 h-5 text-[#7C5832]" />
                          </div>
                          <h3 className="font-medium text-gray-800">Time Spent Analysis</h3>
                        </div>
                        <div>
                          <span className="px-3 py-1 bg-[#7C5832] bg-opacity-5 text-[#7C5832] text-sm rounded-md font-medium">Last month</span>
                        </div>
                      </div>
                      
                      {/* Custom Time Spent Chart */}
                      <TimeSpentChart 
                        inView={inView}
                        data={[
                          { date: "Jan 1", value: 25 },
                          { date: "Jan 5", value: 32 },
                          { date: "Jan 9", value: 20 },
                          { date: "Jan 13", value: 40 },
                          { date: "Jan 17", value: 35 },
                          { date: "Jan 21", value: 48 },
                          { date: "Jan 25", value: 59, label: "Peak" },
                          { date: "Jan 29", value: 45 }
                        ]}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="videoAnalytics" className="mt-6">
                  <Card className="border border-gray-100 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="bg-[#7C5832] bg-opacity-10 p-2 rounded-lg">
                            <Film className="w-5 h-5 text-[#7C5832]" />
                          </div>
                          <h3 className="font-medium text-gray-800">Video Analytics</h3>
                        </div>
                        <div>
                          <span className="px-3 py-1 bg-[#7C5832] bg-opacity-5 text-[#7C5832] text-sm rounded-md font-medium">Last 30 days</span>
                        </div>
                      </div>
                      
                      <VideoAnalyticsChart 
                        inView={inView}
                        videoTitle="Product Demo"
                        duration="01:32"
                        totalViews={247}
                        avgWatchTime="01:03"
                        segments={[
                          { startTime: "00:00", endTime: "00:20", views: 247, engagement: 90 },
                          { startTime: "00:20", endTime: "00:40", views: 222, engagement: 85 },
                          { startTime: "00:40", endTime: "01:00", views: 195, engagement: 75 },
                          { startTime: "01:00", endTime: "01:20", views: 168, engagement: 65, dropOff: true },
                          { startTime: "01:20", endTime: "01:32", views: 147, engagement: 60 }
                        ]}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};

export default AnalyticsOverview;
