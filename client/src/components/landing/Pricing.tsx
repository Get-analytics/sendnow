import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
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
    boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3 }
  }
};

const plans = [
  {
    name: "Free Plan",
    price: "$0",
    period: "/month",
    borderColor: "border-gray-200",
    buttonColor: "bg-gray-100 text-[#333333] hover:bg-gray-200",
    features: [
      { name: "Up to 3 links", included: true },
      { name: "50MB file limit", included: true },
      { name: "Links active for 7 days", included: true },
      { name: "No Analytics Export", included: false },
      { name: "Includes Watermark", included: false }
    ],
    popular: false,
    cta: "Get Started"
  },
  {
    name: "Basic Plan",
    price: "$10",
    period: "/month",
    borderColor: "border-[#B79F85]",
    buttonColor: "bg-[#B79F85] text-white hover:bg-[#B79F85]/90",
    features: [
      { name: "Up to 15 links", included: true },
      { name: "500MB file limit", included: true },
      { name: "Links active for 2 months", included: true },
      { name: "Analytics Export", included: true },
      { name: "No Watermark", included: true }
    ],
    popular: false,
    cta: "Upgrade Now"
  },
  {
    name: "Pro Plan",
    price: "$99",
    period: "/month",
    borderColor: "border-primary",
    buttonColor: "bg-primary text-white hover:bg-primary/90",
    features: [
      { name: "Up to 100 links", included: true },
      { name: "10GB file limit", included: true },
      { name: "Links active for 3 months", included: true },
      { name: "Heatmap Analytics", included: true },
      { name: "Custom Domain", included: true }
    ],
    popular: true,
    cta: "Upgrade Now"
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    borderColor: "border-gray-700",
    buttonColor: "bg-gray-700 text-white hover:bg-gray-800",
    features: [
      { name: "Unlimited links", included: true },
      { name: "Negotiable file limits", included: true },
      { name: "Custom link duration", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Priority support", included: true }
    ],
    popular: false,
    cta: "Contact Us"
  }
];

const Pricing = () => {
  const { ref: pricingRef, inView: pricingInView } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F8F6F3]" ref={pricingRef}>
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={pricingInView ? "visible" : "hidden"}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-primary mb-4">Plans That Scale With You</h2>
          <p className="text-lg text-[#333333]/80 max-w-2xl mx-auto">
            Choose the plan that fits your needs. Start free and upgrade as you grow.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              variants={planVariants}
              initial="hidden"
              animate={pricingInView ? "visible" : "hidden"}
              whileHover="hover"
              custom={i}
            >
              <Card className={`bg-white shadow-md border-t-4 ${plan.borderColor} h-full ${plan.popular ? 'relative' : ''}`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                    POPULAR
                  </div>
                )}
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-[#333333]/60">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature.name} className="flex items-center">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-green-500 mr-2" />
                        ) : (
                          <X className="h-5 w-5 text-[#333333]/40 mr-2" />
                        )}
                        <span className={feature.included ? "" : "text-[#333333]/40"}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.buttonColor}`}
                    variant="default"
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Pricing;
