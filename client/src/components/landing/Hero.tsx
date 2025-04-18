import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { ArrowRight } from "lucide-react";

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
    <section 
      className="pt-36 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-indigo-100" 
      ref={heroRef}
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        backgroundBlendMode: "soft-light"
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <motion.h1 
            variants={itemVariants}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 max-w-3xl"
          >
            Your beautiful business toolkit.
            <span className="block text-slate-800 mt-2">From saving projects to getting paid.</span>
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="text-lg md:text-xl mb-8 text-slate-600 max-w-2xl"
          >
            Shorten and share everything with beautiful analytics that help you understand 
            your audience and track every click, view, and interaction.
          </motion.p>
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
          >
            <Button 
              className="px-8 py-6 bg-primary hover:bg-primary/90 text-white font-medium rounded-full shadow-lg hover:shadow-xl flex items-center gap-2 text-lg"
              size="lg"
            >
              Get started for free
              <ArrowRight className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative mx-auto max-w-4xl"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-indigo-400/20 rounded-xl blur-3xl"></div>
          <div className="relative bg-white rounded-xl p-2 shadow-2xl">
            <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-inner">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <div className="h-6 w-full bg-slate-100 rounded-full ml-2"></div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Link analytics dashboard preview" 
                className="w-full h-auto object-cover rounded-lg" 
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
