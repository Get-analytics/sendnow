import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection: React.FC = () => {
  const [sectionRef, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const faqs = [
    {
      question: "Which file formats can I share with Sendnow?",
      answer: "We've got you covered—upload PDFs, Word/Excel docs, PPTs, images (JPG/PNG/GIF) and videos (MP4/AVI). Plus, you can link-to-link files for that extra flexibility. (Free plan caps each file smaller, Pro/Enterprise goes big.)",
    },
    {
      question: "How long do my links stay active?",
      answer: "Free: 7 days, then poof.\nBasic: Up to 2 months even if you cancel.\nPro: Up to 3 months post-cancellation.\nEnterprise: Custom durations—let's talk.",
    },
    {
      question: "Can I export my analytics?",
      answer: "Yup! Hit 'Export' on Basic, Pro, and Enterprise plans. Free plan gives in‑app stats only—no downloads.",
    },
    {
      question: "What video analytics do I get?",
      answer: "We track total watch time, play/pause events, seeks, rewinds and drop‑off points. On Pro+ you also unlock heatmaps that show exactly where viewers binge or bail.",
    },
    {
      question: "Is my data secure and private?",
      answer: "Locked down with industry‑standard SSL/TLS in transit and AES‑256 at rest. We're GDPR‑friendly and never peek at your files—Scout's honor.",
    },
  ];

  return (
    <section id="faq" className="py-16 bg-[#F8F6F3]" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-[#7C5832] mb-4">Got Questions? We've Got Answers</h2>
          <p className="text-gray-600">Find answers to frequently asked questions about Sendnow.</p>
        </motion.div>
        
        <motion.div
          className="max-w-3xl mx-auto"
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
          <Accordion type="single" collapsible className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5 }
                  }
                }}
              >
                <AccordionItem 
                  value={`item-${index}`}
                  className="bg-white rounded-xl shadow-md overflow-hidden border-none"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50 text-left font-medium text-gray-800">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-600 whitespace-pre-line">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
