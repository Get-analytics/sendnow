import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
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

const CTA = () => {
  const { ref: ctaRef, inView: ctaInView } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/10" ref={ctaRef}>
      <motion.div
        className="max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate={ctaInView ? "visible" : "hidden"}
      >
        <motion.h2 
          className="text-3xl font-bold text-primary mb-4"
          variants={itemVariants}
        >
          "Go Ahead, Make My Link (Smarter)."
        </motion.h2>
        <motion.p 
          className="text-lg text-[#333333]/80 mb-8 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Stop flying blind. Start gaining the insights you need to make your content work harder.
        </motion.p>
        <motion.div variants={itemVariants}>
          <Button 
            className="px-8 py-6 bg-primary hover:bg-primary/90 text-white font-medium shadow-md hover:shadow-lg"
            size="lg"
          >
            Start Your Free Trial Today!
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTA;
