import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { TrendingUp, BarChart2, Users, Clock, ChevronRight, CheckCircle2 } from "lucide-react";

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

const features = [
  {
    icon: <TrendingUp className="h-5 w-5" />,
    color: "bg-blue-100 text-blue-600",
    title: "Analytics dashboard",
    description: "Simple metrics to understand who's viewing your content"
  },
  {
    icon: <BarChart2 className="h-5 w-5" />,
    color: "bg-green-100 text-green-600",
    title: "Custom reports",
    description: "Export and share performance data with your team"
  },
  {
    icon: <Users className="h-5 w-5" />,
    color: "bg-purple-100 text-purple-600",
    title: "Audience insights",
    description: "Track demographic data and viewer engagement"
  },
  {
    icon: <Clock className="h-5 w-5" />,
    color: "bg-amber-100 text-amber-600", 
    title: "View duration",
    description: "See how long people spend on your content"
  },
];

const DashboardPreview = () => {
  const { ref: previewRef, inView: previewInView } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50" ref={previewRef}>
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={previewInView ? "visible" : "hidden"}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={itemVariants}>
            <div className="bg-white p-6 rounded-2xl shadow-xl">
              <div className="flex flex-col space-y-8">
                <div className="flex space-x-4">
                  <div className="bg-blue-50 flex items-center justify-center p-3 rounded-xl">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Your metrics are boosting</div>
                    <div className="text-xl font-semibold text-slate-800">38,775 sessions</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center mb-2">
                      <Clock className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm font-medium text-slate-800">Average time</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">1:27</div>
                    <div className="text-xs text-green-600 mt-1">+12% from last month</div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center mb-2">
                      <Users className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm font-medium text-slate-800">Unique visitors</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">1,337</div>
                    <div className="text-xs text-green-600 mt-1">+18% from last week</div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center mb-2">
                      <BarChart2 className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm font-medium text-slate-800">Conversion</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">12.8%</div>
                    <div className="text-xs text-red-500 mt-1">-2% from last month</div>
                  </div>
                </div>
                
                <div className="h-48 bg-gray-100 rounded-lg overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                    alt="Analytics chart" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-primary">
                    Pro plan unlocks historical data
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                Your content deserves beautiful digital analytics
              </h2>
              <p className="text-slate-600 mb-8">
                Our simple dashboard gives you all the insights you need to understand 
                how your audience interacts with your content. Track engagement, analyze
                behavior, and make data-driven decisions.
              </p>
            </div>
            
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="flex p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
                  variants={itemVariants}
                  custom={index}
                >
                  <div className={`p-2 rounded-lg mr-4 ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800">{feature.title}</h3>
                    <p className="text-sm text-slate-500">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div variants={itemVariants}>
              <div className="flex items-center">
                <a href="#" className="text-primary font-medium flex items-center hover:underline">
                  See all analytics features
                  <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-24 bg-blue-50 p-8 rounded-2xl"
          variants={itemVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                A feature-rich platform for the most demanding analytics needs
              </h3>
              <p className="text-slate-600 mb-6">
                Track everything from basic views to advanced engagement metrics. Our platform 
                scales with your needs, from small projects to enterprise solutions.
              </p>
              
              <div className="space-y-3">
                {["Real-time analytics dashboard", "Custom event tracking", "Advanced viewer demographics", "Exportable reports"].map((item, i) => (
                  <div key={i} className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Advanced analytics dashboard" 
                className="rounded-lg w-full" 
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default DashboardPreview;
