import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { RefreshCw, Users, Clock, TrendingDown, Filter, Layers, Map, BadgeHelp } from "lucide-react";
import timeSpendImg from "../../assets/time_spend.png";
import totalSessionImg from "../../assets/total_session_page.png";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const featureCardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.1 * i,
      duration: 0.5,
    },
  }),
  hover: {
    y: -5,
    boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3 }
  }
};

const DashboardPreview = () => {
  const { ref: previewRef, inView: previewInView } = useIntersectionObserver({ threshold: 0.1 });
  const [activeTab, setActiveTab] = useState("overview");

  const features = [
    {
      icon: <Layers className="h-6 w-6 text-primary" />,
      title: "Heatmap Analytics",
      description: "See exactly where your audience spends their time and what captures their attention on your documents and presentations."
    },
    {
      icon: <BadgeHelp className="h-6 w-6 text-primary" />,
      title: "Video Engagement",
      description: "Track video watch time, seek behavior, and rewind actions to understand how viewers interact with your video content."
    },
    {
      icon: <Map className="h-6 w-6 text-primary" />,
      title: "Location Insights",
      description: "Understand where and when your audience is engaging with your content with detailed geographical analytics."
    }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F8F6F3]" ref={previewRef}>
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={previewInView ? "visible" : "hidden"}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-primary mb-4">All Your Analytics, All in One Place</h2>
          <p className="text-lg text-[#333333]/80 max-w-2xl mx-auto">
            Powerful insights that help you understand how your audience interacts with your content.
          </p>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12"
          variants={itemVariants}
        >
          <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <div className="border-b border-gray-200 overflow-x-auto">
              <TabsList className="bg-transparent h-auto p-0">
                <TabsTrigger 
                  value="overview" 
                  className={`px-6 py-4 ${activeTab === 'overview' ? 'text-primary border-b-2 border-primary font-medium' : 'text-[#333333]/60 border-b-2 border-transparent hover:text-primary'} transition-colors duration-300 rounded-none`}
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="analytics" 
                  className={`px-6 py-4 ${activeTab === 'analytics' ? 'text-primary border-b-2 border-primary font-medium' : 'text-[#333333]/60 border-b-2 border-transparent hover:text-primary'} transition-colors duration-300 rounded-none`}
                >
                  Session Analytics
                </TabsTrigger>
                <TabsTrigger 
                  value="time" 
                  className={`px-6 py-4 ${activeTab === 'time' ? 'text-primary border-b-2 border-primary font-medium' : 'text-[#333333]/60 border-b-2 border-transparent hover:text-primary'} transition-colors duration-300 rounded-none`}
                >
                  Time Spent
                </TabsTrigger>
                <TabsTrigger 
                  value="insights" 
                  className={`px-6 py-4 ${activeTab === 'insights' ? 'text-primary border-b-2 border-primary font-medium' : 'text-[#333333]/60 border-b-2 border-transparent hover:text-primary'} transition-colors duration-300 rounded-none`}
                >
                  Content Insights
                </TabsTrigger>
                <TabsTrigger 
                  value="video" 
                  className={`px-6 py-4 ${activeTab === 'video' ? 'text-primary border-b-2 border-primary font-medium' : 'text-[#333333]/60 border-b-2 border-transparent hover:text-primary'} transition-colors duration-300 rounded-none`}
                >
                  Video Analytics
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="overview" className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="bg-white shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                            <Users className="h-4 w-4 text-primary" />
                          </div>
                          <p className="text-[#333333]/60 text-sm">Total Session</p>
                        </div>
                        <p className="text-2xl font-bold">38,774</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-white shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                            <Clock className="h-4 w-4 text-primary" />
                          </div>
                          <p className="text-[#333333]/60 text-sm">Time Spend</p>
                        </div>
                        <p className="text-2xl font-bold">1h 27m</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-white shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                            <Users className="h-4 w-4 text-primary" />
                          </div>
                          <p className="text-[#333333]/60 text-sm">Unique Visitors</p>
                        </div>
                        <p className="text-2xl font-bold">1,337</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-white shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                            <TrendingDown className="h-4 w-4 text-primary" />
                          </div>
                          <p className="text-[#333333]/60 text-sm">Bounce Rate</p>
                        </div>
                        <p className="text-2xl font-bold">12.76%</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <Card className="h-full shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                        <RefreshCw className="h-4 w-4 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold">Overall Session</h3>
                    </div>
                    
                    <div className="flex mb-4 ml-1 space-x-4 text-sm">
                      <button className="font-medium text-primary">Today</button>
                      <button className="text-[#333333]/60">Yesterday</button>
                      <button className="text-[#333333]/60">Last week</button>
                      <button className="text-[#333333]/60 border-b border-[#333333]">Last month</button>
                      <button className="text-[#333333]/60">Custom</button>
                    </div>
                    
                    <div className="relative h-auto mt-4">
                      <img 
                        src={timeSpendImg} 
                        alt="Time Spend Analytics" 
                        className="w-full h-auto object-contain rounded-lg" 
                      />
                      <div className="absolute bottom-4 right-4 bg-white/80 px-3 py-1 rounded-lg text-sm font-medium text-green-600">
                        +12% <span className="text-[#333333]/60">yesterday</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="h-full shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold">Traffic Source</h3>
                      <div className="flex space-x-2 text-sm">
                        <button className="px-3 py-1 bg-primary/10 rounded-md text-primary font-medium">Map View</button>
                        <button className="px-3 py-1 rounded-md text-[#333333]/60">List View</button>
                        <button className="px-3 py-1 rounded-md text-[#333333]/60">
                          <Filter className="h-4 w-4 inline mr-1" />
                          <span className="hidden lg:inline">Traffic Medium</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="h-auto relative">
                      <img 
                        src={totalSessionImg} 
                        alt="Total Session Page" 
                        className="w-full h-auto object-contain rounded-lg" 
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {['analytics', 'time', 'insights', 'video'].map(tab => (
              <TabsContent key={tab} value={tab} className="p-6">
                <div className="flex flex-col items-center justify-center">
                  <img 
                    src={tab === 'time' ? timeSpendImg : totalSessionImg} 
                    alt={`${tab.charAt(0).toUpperCase() + tab.slice(1)} Analytics`}
                    className="w-full max-w-4xl rounded-lg shadow"
                  />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
        
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300"
              variants={featureCardVariants}
              initial="hidden"
              animate={previewInView ? "visible" : "hidden"}
              whileHover="hover"
              custom={i}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-[#333333]/70">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default DashboardPreview;
