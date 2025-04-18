import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";

const CTASection: React.FC = () => {
  const [sectionRef, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <section className="py-16 bg-[#7C5832]" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-3xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Go Ahead, Make My Link (Smarter).
          </motion.h2>
          
          <motion.p 
            className="text-white text-opacity-90 mb-8 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Stop flying blind. Start gaining the insights you need to make your content work harder.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.6,
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              size="lg"
              className="bg-white text-[#7C5832] hover:bg-white/90 rounded-full px-8 py-6 h-auto text-lg font-bold"
            >
              Start Your Free Trial Today!
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
