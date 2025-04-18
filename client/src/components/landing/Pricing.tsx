import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useState } from "react";

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

const planVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.1 * i,
      duration: 0.5,
    },
  }),
  hover: {
    y: -5,
    boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3 }
  }
};

const plans = [
  {
    name: "Free",
    description: "Perfect for trying out SendNow",
    price: {
      monthly: "$0",
      annually: "$0"
    },
    highlighted: false,
    features: [
      "Up to 3 links",
      "50MB file limit",
      "Basic analytics",
      "Links active for 7 days",
      "Includes Watermark"
    ],
    cta: "Get started",
    ctaColor: "bg-slate-200 hover:bg-slate-300 text-slate-800"
  },
  {
    name: "Basic",
    description: "For professionals and small teams",
    price: {
      monthly: "$10",
      annually: "$8"
    },
    highlighted: true,
    features: [
      "Up to 30 links",
      "500MB file limit",
      "Advanced analytics",
      "Links active for 2 months",
      "No watermark",
      "Email support",
      "Analytics Export"
    ],
    cta: "Start with Basic",
    ctaColor: "bg-primary hover:bg-primary/90 text-white"
  },
  {
    name: "Pro",
    description: "For growing businesses",
    price: {
      monthly: "$99",
      annually: "$79"
    },
    highlighted: false,
    features: [
      "Up to 100 links",
      "10GB file limit",
      "Advanced analytics",
      "Links active for 3 months",
      "No watermark",
      "Priority support",
      "Heatmap Analytics",
      "Custom Domain"
    ],
    cta: "Start with Pro",
    ctaColor: "bg-slate-800 hover:bg-slate-700 text-white"
  }
];

const Pricing = () => {
  const { ref: pricingRef, inView: pricingInView } = useIntersectionObserver({ threshold: 0.1 });
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-blue-50" ref={pricingRef}>
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={pricingInView ? "visible" : "hidden"}
      >
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Simple, transparent pricing</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Choose a plan that works for you. All plans include core analytics features.
          </p>
        </motion.div>
        
        <motion.div 
          className="flex justify-center mb-12"
          variants={itemVariants}
        >
          <div className="inline-flex items-center bg-white rounded-full p-1 shadow-sm">
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium ${
                billingCycle === "monthly" 
                ? "bg-primary text-white" 
                : "text-slate-700 hover:text-primary"
              }`}
              onClick={() => setBillingCycle("monthly")}
            >
              Bill Monthly
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium ${
                billingCycle === "annually" 
                ? "bg-primary text-white" 
                : "text-slate-700 hover:text-primary"
              }`}
              onClick={() => setBillingCycle("annually")}
            >
              Bill Annually
              <span className="ml-1 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">Save 20%</span>
            </button>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              variants={planVariants}
              initial="hidden"
              animate={pricingInView ? "visible" : "hidden"}
              whileHover="hover"
              custom={i}
              className={`bg-white rounded-2xl overflow-hidden shadow-lg border ${
                plan.highlighted 
                ? 'border-primary ring-4 ring-primary/10 relative' 
                : 'border-slate-200'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  MOST POPULAR
                </div>
              )}
              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-800 mb-1">{plan.name}</h3>
                <p className="text-slate-500 text-sm mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-800">{plan.price[billingCycle]}</span>
                  <span className="text-slate-500 ml-1">per month</span>
                  {billingCycle === "annually" && (
                    <div className="text-green-600 text-sm mt-1">Billed annually</div>
                  )}
                </div>
                
                <Button 
                  className={`w-full py-6 font-medium rounded-lg ${plan.ctaColor}`}
                >
                  {plan.cta}
                </Button>
              </div>
              
              <div className="bg-slate-50 p-8 border-t border-slate-100">
                <p className="font-medium text-sm text-slate-700 mb-6">WHAT'S INCLUDED:</p>
                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 bg-white rounded-2xl p-8 shadow-lg border border-slate-200"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Enterprise Plan</h3>
              <p className="text-slate-600 md:max-w-md">
                Custom solution for organizations with advanced analytics needs and high volumes.
              </p>
            </div>
            <Button 
              className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-6 mt-6 md:mt-0"
            >
              Contact Sales
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Pricing;
