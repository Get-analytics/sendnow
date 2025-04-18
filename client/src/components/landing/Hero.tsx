import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import uploadFormImg from "../../assets/upload_form.png";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
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

const Hero = () => {
  const { ref: heroRef, inView: heroInView } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-[#F8F6F3]" ref={heroRef}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
          >
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-primary mb-6"
            >
              Share Smarter, Track Better.
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl mb-8 text-dark/80 max-w-xl"
            >
              Shorten and share everything—in a single link, then dive into heat maps, bounce
              rates, and location insights to uncover the story behind every click.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Button 
                className="px-8 py-6 bg-primary hover:bg-primary/90 text-white font-medium shadow-md hover:shadow-lg"
                size="lg"
              >
                Upload. Share. Analyze. For Free
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="overflow-hidden rounded-xl shadow-lg"
          >
            <img 
              src={uploadFormImg}
              alt="Upload form interface" 
              className="w-full h-auto object-contain bg-white" 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
