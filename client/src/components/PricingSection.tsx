import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const PricingSection: React.FC = () => {
  const [sectionRef, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const pricingPlans = [
    {
      name: "Free Plan",
      price: "$0",
      period: "/month",
      features: [
        { text: "Up to 3 links", available: true },
        { text: "50MB file limit", available: true },
        { text: "Links active for 7 days", available: true },
        { text: "No heatmap", available: false },
        { text: "No analytics export", available: false },
        { text: "Includes watermark", available: false }
      ],
      cta: "Get Started",
      ctaVariant: "outline",
      highlight: false
    },
    {
      name: "Basic Plan",
      price: "$10",
      period: "/month",
      features: [
        { text: "Up to 15 links", available: true },
        { text: "500MB file limit", available: true },
        { text: "Links active for 2 months", available: true },
        { text: "No heatmap", available: false },
        { text: "Analytics export", available: true },
        { text: "No watermark", available: true }
      ],
      cta: "Upgrade Now",
      ctaVariant: "default",
      highlight: false
    },
    {
      name: "Pro Plan",
      price: "$99",
      period: "/month",
      features: [
        { text: "Up to 100 links", available: true },
        { text: "10GB file limit", available: true },
        { text: "Links active for 3 months", available: true },
        { text: "Heatmap analytics", available: true },
        { text: "Analytics export", available: true },
        { text: "No watermark", available: true },
        { text: "Custom domain", available: true }
      ],
      cta: "Upgrade Now",
      ctaVariant: "default",
      highlight: true
    },
    {
      name: "Enterprise",
      price: "Custom Pricing",
      period: "",
      features: [
        { text: "Unlimited links", available: true },
        { text: "Negotiable file limit", available: true },
        { text: "Custom link duration", available: true },
        { text: "Advanced heatmap analytics", available: true },
        { text: "Advanced analytics export", available: true },
        { text: "Priority support", available: true },
        { text: "API access", available: true }
      ],
      cta: "Contact Us",
      ctaVariant: "outline",
      highlight: false
    }
  ];

  return (
    <section id="pricing" className="py-16 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-[#7C5832] mb-4">Plans That Scale With You</h2>
          <p className="text-gray-600">Choose the plan that fits your needs. Upgrade or downgrade anytime.</p>
        </motion.div>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              className={`
                bg-[#F8F6F3] rounded-xl p-6 shadow-md h-full flex flex-col relative
                ${plan.highlight ? 'border-2 border-[#7C5832]' : ''}
              `}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5 }
                }
              }}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#7C5832] text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              <h3 className="font-bold text-xl mb-4 text-gray-800">{plan.name}</h3>
              <div className="mb-6">
                <span className={`${plan.period ? 'text-3xl' : 'text-xl'} font-bold`}>{plan.price}</span>
                <span className="text-gray-500">{plan.period}</span>
              </div>
              <ul className="mb-8 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start mb-4">
                    {feature.available ? (
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                    )}
                    <span className={feature.available ? '' : 'text-gray-500'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.ctaVariant as "default" | "outline"}
                className={`w-full rounded-full ${
                  plan.ctaVariant === "default" 
                    ? "bg-[#7C5832] hover:bg-[#7C5832]/90 text-white" 
                    : "border-[#7C5832] text-[#7C5832] hover:bg-[#7C5832] hover:text-white"
                }`}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
