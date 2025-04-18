import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link2, Upload, BarChart2, Clock, Users, CheckCircle2 } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

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

const featureItems = [
  {
    icon: <BarChart2 className="h-5 w-5 text-primary" />,
    title: "Visual analytics",
    description: "Powerful insights into audience engagement"
  },
  {
    icon: <Clock className="h-5 w-5 text-primary" />,
    title: "Time tracking",
    description: "See how long viewers spend on your content"
  },
  {
    icon: <Users className="h-5 w-5 text-primary" />,
    title: "Audience insights",
    description: "Understand who's viewing your content"
  },
  {
    icon: <CheckCircle2 className="h-5 w-5 text-primary" />,
    title: "Link security",
    description: "Control access with expiration and password protection"
  }
];

const UploadForm = () => {
  const { ref: formRef, inView: formInView } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white" ref={formRef}>
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={formInView ? "visible" : "hidden"}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div variants={itemVariants}>
            <motion.div 
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2 bg-gray-50 p-4 border-b border-gray-100">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <div className="h-5 w-48 bg-gray-200 rounded-full ml-2"></div>
              </div>
              <div className="p-6">
                <div className="flex mb-6">
                  <Input 
                    type="text" 
                    placeholder="Paste your link here" 
                    className="rounded-r-none border-r-0 focus:ring-primary/30 py-6"
                  />
                  <Button 
                    className="bg-primary text-white rounded-l-none hover:bg-primary/90 px-6"
                    type="submit"
                  >
                    <Link2 className="h-5 w-5 mr-2" />
                    Create link
                  </Button>
                </div>
                <p className="text-sm text-slate-500 mb-4">
                  Your newly created link will appear here. Share it to track views and engagement.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-center">
                  <div className="bg-primary text-white p-2 rounded-lg mr-4">
                    <Link2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-900">Your custom link will appear here</p>
                    <p className="text-xs text-blue-700">Customize your link name and options in your dashboard</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="space-y-8"
            variants={itemVariants}
          >
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                Your content deserves a beautiful digital home.
              </h2>
              <p className="text-slate-600 mb-8">
                Ditch the guessing game. SendNow turns your file shares into intel missions, with 
                heatmaps, session stats, and location insights—all in one simple dashboard.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {featureItems.map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start"
                  variants={itemVariants}
                  custom={index}
                >
                  <div className="bg-blue-50 p-2 rounded-lg mr-3">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800">{item.title}</h3>
                    <p className="text-sm text-slate-500">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="pt-6">
              <Button 
                className="bg-primary/10 hover:bg-primary/20 text-primary rounded-full px-6 py-2"
                variant="ghost"
              >
                Learn more about our features
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default UploadForm;
