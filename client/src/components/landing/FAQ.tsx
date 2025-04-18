import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

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

const faqItems = [
  {
    question: "Which file formats can I share with SendNow?",
    answer: "We support a wide range of formats including PDFs, Word/Excel docs, PPTs, images (JPG/PNG/GIF) and videos (MP4/AVI). You can also link-to-link files for additional flexibility. File size limits vary by plan."
  },
  {
    question: "How long do my links stay active?",
    answer: "Free: 7 days\nBasic: Up to 2 months even if you cancel\nPro: Up to 3 months post-cancellation\nEnterprise: Custom durations available"
  },
  {
    question: "Can I export my analytics data?",
    answer: "Yes! Analytics exports are available on Basic, Pro, and Enterprise plans. The free plan provides in-app statistics only without download options."
  },
  {
    question: "What video analytics are provided?",
    answer: "We track total watch time, play/pause events, seeking behavior, rewinds and drop-off points. Pro and Enterprise plans include heatmaps that visualize where viewers engage most with your video content."
  },
  {
    question: "Is my data secure and private?",
    answer: "Absolutely. We use industry-standard SSL/TLS encryption in transit and AES-256 encryption at rest. We're GDPR-compliant and maintain strict privacy protocols for all user content."
  },
  {
    question: "Can I customize my link branding?",
    answer: "Yes, custom domains are available on Pro and Enterprise plans. This allows you to maintain your brand identity while accessing all our analytics features."
  }
];

const FAQ = () => {
  const { ref: faqRef, inView: faqInView } = useIntersectionObserver({ threshold: 0.1 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-white" ref={faqRef}>
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={faqInView ? "visible" : "hidden"}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Frequently asked questions</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Everything you need to know about our service. Can't find the answer you're looking for?{" "}
            <a href="#" className="text-primary hover:underline">Contact our support team</a>.
          </p>
        </motion.div>
        
        <motion.div 
          variants={itemVariants} 
          className="divide-y divide-slate-200 border-t border-b border-slate-200"
        >
          {faqItems.map((item, index) => (
            <div key={index} className="py-6">
              <button
                className="flex justify-between items-center w-full text-left focus:outline-none"
                onClick={() => toggleAccordion(index)}
              >
                <h3 className="text-lg font-medium text-slate-800">{item.question}</h3>
                <div className={`ml-4 rounded-full p-1.5 ${openIndex === index ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-500'}`}>
                  {openIndex === index ? (
                    <Minus className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </div>
              </button>
              
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 text-slate-600 whitespace-pre-line"
                >
                  {item.answer}
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>
        
        <motion.div
          variants={itemVariants}
          className="mt-12 bg-blue-50 p-8 rounded-2xl text-center"
        >
          <h3 className="text-xl font-semibold text-slate-800 mb-2">Still have questions?</h3>
          <p className="text-slate-600 mb-6">
            Our support team is ready to help you with any specific questions about our platform.
          </p>
          <a
            href="#"
            className="inline-block bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-medium"
          >
            Contact Support
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FAQ;
