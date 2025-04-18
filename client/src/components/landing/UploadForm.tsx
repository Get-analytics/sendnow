import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link2, Upload } from "lucide-react";
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

const UploadForm = () => {
  const { ref: formRef, inView: formInView } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white" ref={formRef}>
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={formInView ? "visible" : "hidden"}
      >
        <motion.div 
          className="bg-[#F8F6F3] rounded-2xl shadow-md p-8 md:p-12"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-3xl font-bold text-primary text-center mb-4"
            variants={itemVariants}
          >
            Stop Sending Blind—Get Data That Matters
          </motion.h2>
          <motion.p 
            className="text-center text-[#333333]/80 mb-12 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Ditch the guessing game. SendNow turns your file shares into intel missions, packing heatmaps, 
            session stats, bounce rates, location insights, and video-play patterns—all in one dashboard. 
            Finally, you'll know if they skimmed, replayed, or bounced.
          </motion.p>
          
          <motion.div 
            className="border-2 border-dashed border-[#B79F85]/30 rounded-xl p-6 md:p-10"
            variants={itemVariants}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary mb-2">Enter your URL</h3>
                <div className="flex">
                  <Input 
                    type="text" 
                    placeholder="Paste the URL" 
                    className="rounded-r-none border-r-0 border-[#B79F85]/30 focus:ring-primary/30"
                  />
                  <Button 
                    className="bg-primary text-white rounded-l-none hover:bg-primary/90"
                    size="icon"
                    type="submit"
                  >
                    <Link2 className="h-5 w-5" />
                  </Button>
                </div>
                <p className="text-sm text-[#333333]/60">
                  Note: Paste any publicly accessible link to generate a shareable short URL and gather engagement analytics.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary mb-2">Drop Your Content</h3>
                <div className="flex">
                  <Input 
                    type="text" 
                    placeholder="Upload Your Files" 
                    className="rounded-r-none border-r-0 border-[#B79F85]/30 focus:ring-primary/30"
                    readOnly
                  />
                  <Button 
                    className="bg-primary text-white rounded-l-none hover:bg-primary/90"
                    size="icon"
                    type="button"
                  >
                    <Upload className="h-5 w-5" />
                  </Button>
                </div>
                <p className="text-sm text-[#333333]/60">
                  Note: Upload PDFs, Docs, PPTs, images, or videos. Maximum file size varies by plan—upgrade anytime for higher limits and advanced analytics.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default UploadForm;
