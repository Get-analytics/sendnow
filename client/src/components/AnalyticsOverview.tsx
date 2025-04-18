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
  SlidersHorizontal
} from "lucide-react";
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
            <TabsList className="border-b border-gray-200 w-full justify-start rounded-none bg-transparent h-auto pb-0 mb-8">
              <TabsTrigger 
                value="overview" 
                className={`mr-8 py-4 border-b-2 px-1 rounded-none data-[state=active]:shadow-none ${activeTab === 'overview' ? 'border-[#7C5832] text-[#7C5832]' : 'border-transparent text-gray-500'}`}
              >
                Overview
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
                        <div className="flex space-x-3 text-sm">
                          <button className="text-[#7C5832] font-medium">Map View</button>
                          <button className="text-gray-500 hover:text-[#7C5832] transition-colors">List View</button>
                          <button className="text-gray-500 hover:text-[#7C5832] transition-colors">Traffic Medium</button>
                        </div>
                      </div>
                      
                      {/* World Map */}
                      <div className="h-[200px] relative overflow-hidden rounded-lg">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-[#B79F85]/40 to-[#7C5832]/40"
                          initial={{ opacity: 0 }}
                          animate={inView ? { opacity: 1 } : { opacity: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          <svg width="100%" height="100%" viewBox="0 0 1000 600" fill="none">
                            <path d="M132.5,168.5 L131.3,163.2 L133.2,157.3 L128.8,153.7 L125,147.3 L118.8,146.2 L114.5,150.3 L108.8,148.8 L102.5,152.7 L97.5,151.5 L92.5,154.8 L87.5,160.3 L82.5,165.5 L77.5,173.3 L75,179.2 L76.3,185.5 L79.5,189.5 L84.5,192.5 L89.5,194.5 L95,194.3 L100,193.5 L105,192.5 L110,190.3 L115.5,185.5 L121.2,180.5 L126.3,175.3 L132.5,168.5" fill="#B79F85" stroke="#7C5832" strokeWidth="0.5" />
                            <path d="M243.8,148.5 L242.5,142.5 L239.3,137.5 L235,135 L230,134.3 L225,135.5 L220,138.5 L215.5,142.3 L212.5,146.8 L211.3,152.5 L213.5,157.7 L217.5,161 L222.5,162.5 L227.5,162.3 L232.5,160.5 L237.2,157.5 L241.3,153.5 L243.8,148.5" fill="#B79F85" stroke="#7C5832" strokeWidth="0.5" />
                            <path d="M383.8,122.5 L380,119.3 L375,118.8 L370,120.5 L366.3,124.5 L365,129.5 L366.3,134.5 L370,138.5 L375,140.3 L380,139.5 L383.8,136.3 L385.5,131.3 L383.8,126.5 L383.8,122.5" fill="#B79F85" stroke="#7C5832" strokeWidth="0.5" />
                            <path d="M500,100 L495,97.5 L490,97.5 L485,100 L482.5,105 L482.5,110 L485,115 L490,117.5 L495,117.5 L500,115 L502.5,110 L502.5,105 L500,100" fill="#B79F85" stroke="#7C5832" strokeWidth="0.5" />
                            <path d="M615,115 L610,112.5 L605,112.5 L600,115 L597.5,120 L597.5,125 L600,130 L605,132.5 L610,132.5 L615,130 L617.5,125 L617.5,120 L615,115" fill="#B79F85" stroke="#7C5832" strokeWidth="0.5" />
                            <path d="M730,130 L725,127.5 L720,127.5 L715,130 L712.5,135 L712.5,140 L715,145 L720,147.5 L725,147.5 L730,145 L732.5,140 L732.5,135 L730,130" fill="#B79F85" stroke="#7C5832" strokeWidth="0.5" />
                            <path d="M845,145 L840,142.5 L835,142.5 L830,145 L827.5,150 L827.5,155 L830,160 L835,162.5 L840,162.5 L845,160 L847.5,155 L847.5,150 L845,145" fill="#B79F85" stroke="#7C5832" strokeWidth="0.5" />
                            <path d="M960,160 L955,157.5 L950,157.5 L945,160 L942.5,165 L942.5,170 L945,175 L950,177.5 L955,177.5 L960,175 L962.5,170 L962.5,165 L960,160" fill="#B79F85" stroke="#7C5832" strokeWidth="0.5" />
                            
                            <path d="M173.3,270.5 L170,267.3 L165,266.8 L160,268.5 L156.3,272.5 L155,277.5 L156.3,282.5 L160,286.5 L165,288.3 L170,287.5 L173.8,284.3 L175.5,279.3 L173.8,274.5 L173.3,270.5" fill="#7C5832" stroke="#3f2b14" strokeWidth="0.5" />
                            <path d="M440,310 L435,307.5 L430,307.5 L425,310 L422.5,315 L422.5,320 L425,325 L430,327.5 L435,327.5 L440,325 L442.5,320 L442.5,315 L440,310" fill="#7C5832" stroke="#3f2b14" strokeWidth="0.5" />
                            <path d="M700,250 L695,247.5 L690,247.5 L685,250 L682.5,255 L682.5,260 L685,265 L690,267.5 L695,267.5 L700,265 L702.5,260 L702.5,255 L700,250" fill="#7C5832" stroke="#3f2b14" strokeWidth="0.5" />
                            <path d="M880,280 L875,277.5 L870,277.5 L865,280 L862.5,285 L862.5,290 L865,295 L870,297.5 L875,297.5 L880,295 L882.5,290 L882.5,285 L880,280" fill="#7C5832" stroke="#3f2b14" strokeWidth="0.5" />
                            
                            <circle cx="250" cy="175" r="3" fill="#7C5832" opacity="0.7" className="animate-pulse" />
                            <circle cx="450" cy="210" r="4" fill="#7C5832" opacity="0.7" className="animate-pulse" />
                            <circle cx="650" cy="190" r="3" fill="#7C5832" opacity="0.7" className="animate-pulse" />
                            <circle cx="850" cy="220" r="4" fill="#7C5832" opacity="0.7" className="animate-pulse" />
                          </svg>
                        </motion.div>
                        
                        {/* Tooltip */}
                        <motion.div 
                          className="absolute top-[30%] right-[25%] bg-white px-3 py-1 rounded shadow-md text-xs"
                          initial={{ opacity: 0, y: 10 }}
                          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                          transition={{ duration: 0.3, delay: 1 }}
                        >
                          <div className="font-medium">59 Visitors</div>
                          <div className="text-gray-500">Jan 24, 2023</div>
                        </motion.div>
                        
                        {/* Zoom Controls */}
                        <motion.div 
                          className="absolute bottom-4 right-4 flex flex-col bg-white rounded-md shadow overflow-hidden"
                          initial={{ opacity: 0 }}
                          animate={inView ? { opacity: 1 } : { opacity: 0 }}
                          transition={{ duration: 0.3, delay: 0.8 }}
                        >
                          <button className="p-1 hover:bg-gray-100 border-b">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                          </button>
                          <button className="p-1 hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                            </svg>
                          </button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="heatmap" className="mt-6">
                  <div className="rounded-lg bg-gray-50 h-[300px] flex items-center justify-center border border-gray-100">
                    <p className="text-gray-500">Heatmap visualization would display here showing where users click and spend time on your content.</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="timeSpent" className="mt-6">
                  <div className="rounded-lg bg-gray-50 h-[300px] flex items-center justify-center border border-gray-100">
                    <p className="text-gray-500">Time spent analytics would display here showing how long users engage with your content.</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="videoAnalytics" className="mt-6">
                  <div className="rounded-lg bg-gray-50 h-[300px] flex items-center justify-center border border-gray-100">
                    <p className="text-gray-500">Video analytics would display here showing engagement patterns, rewinds, and drop-off points.</p>
                  </div>
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
