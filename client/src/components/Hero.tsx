import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";

const Hero: React.FC = () => {
  const [containerRef, containerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="pt-32 pb-20 md:py-28 lg:py-32 bg-[#F8F6F3]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={containerRef}
            variants={containerVariants}
            initial="hidden"
            animate={containerInView ? "visible" : "hidden"}
            className="max-w-xl"
          >
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
              Share Smarter, <br /><span className="text-[#7C5832]">Track Better.</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg mb-8 text-gray-600">
              Shorten and share everything—in a single link, then dive into <span className="font-medium">heat maps, bounce rates, and location insights</span> to uncover the story behind every click.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-[#7C5832] hover:bg-[#7C5832]/90 text-white rounded-full px-6 py-6 h-auto"
                onClick={() => {
                  const element = document.querySelector("#get-started");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
              >
                Upload. Share. Analyze. For Free
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-[#7C5832] text-[#7C5832] hover:bg-[#7C5832] hover:text-white rounded-full px-6 py-6 h-auto"
                onClick={() => {
                  const element = document.querySelector("#analytics");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
              >
                See It in Action
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative shadow-xl rounded-2xl overflow-hidden bg-white p-1"
          >
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4C5B4]/20 to-[#7C5832]/20 z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=900&q=80" 
                alt="Analytics dashboard preview" 
                className="w-full h-full object-cover"
              />
              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.8,
                  ease: [0.19, 1.0, 0.22, 1.0]  
                }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
              >
                <div className="p-5 rounded-xl bg-white bg-opacity-95 shadow-lg backdrop-blur-sm">
                  <h3 className="text-[#7C5832] font-bold text-xl mb-2">See your content's impact</h3>
                  <p className="text-gray-800">Real-time insights for every share</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
