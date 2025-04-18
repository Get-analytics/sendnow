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
    <section 
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/5 to-blue-100" 
      ref={ctaRef}
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1539321911242-7e27f0afe211?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "soft-light"
      }}
    >
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={ctaInView ? "visible" : "hidden"}
      >
        <div className="bg-white rounded-2xl p-12 shadow-xl">
          <motion.div className="text-center" variants={itemVariants}>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Ready to understand your audience?
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already using SendNow to gain powerful insights 
              and make data-driven decisions about their content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="px-8 py-6 bg-primary hover:bg-primary/90 text-white font-medium rounded-full shadow-lg hover:shadow-xl"
                size="lg"
              >
                Start for free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                className="px-8 py-6 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-full shadow-sm hover:shadow-md"
                size="lg"
                variant="outline"
              >
                Talk to sales
              </Button>
            </div>
            <p className="text-sm text-slate-500 mt-6">
              No credit card required. Free plan includes up to 3 active links.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;
