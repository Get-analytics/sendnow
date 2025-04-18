import React from "react";
import { motion } from "framer-motion";
import { Link2, Upload } from "lucide-react";
import { useInView } from "react-intersection-observer";

const UploadSection: React.FC = () => {
  const [sectionRef, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section id="get-started" className="py-16 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <motion.div 
          className="max-w-4xl mx-auto bg-[#F8F6F3] rounded-2xl shadow-md p-8 md:p-12"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-3xl font-bold text-[#7C5832] text-center mb-8"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Stop Sending Blind—Get Data That Matters
          </motion.h2>
          
          <motion.p 
            className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Ditch the guessing game. Sendnow turns your file shares into intel missions, packing heatmaps, session stats, bounce rates, location insights, and video‑play patterns—all in one dashboard.
          </motion.p>
          
          <motion.div 
            className="border-2 border-dashed border-[#B79F85] rounded-xl p-6 md:p-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* URL Input */}
              <motion.div 
                className="flex flex-col space-y-4"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <h3 className="font-medium text-lg">Enter your URL</h3>
                <div className="flex">
                  <input 
                    type="text" 
                    placeholder="Paste the URL" 
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-[#7C5832]"
                  />
                  <button className="px-4 py-3 bg-[#7C5832] text-white rounded-r-full hover:bg-[#7C5832]/90 transition-colors duration-300">
                    <Link2 className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm text-gray-500">
                  Note: Paste any publicly accessible link to generate a shareable short URL and gather engagement analytics.
                </p>
              </motion.div>
              
              {/* File Upload */}
              <motion.div 
                className="flex flex-col space-y-4"
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <h3 className="font-medium text-lg">Drop Your Content</h3>
                <div className="flex">
                  <span className="flex-1 px-4 py-3 border border-gray-300 rounded-l-full bg-white text-gray-400">Upload Your Files</span>
                  <button className="px-4 py-3 bg-[#7C5832] text-white rounded-r-full hover:bg-[#7C5832]/90 transition-colors duration-300">
                    <Upload className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm text-gray-500">
                  Note: Upload PDFs, Docs, PPTs, images, or videos. Maximum file size varies by plan—upgrade anytime for higher limits and advanced analytics.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default UploadSection;
