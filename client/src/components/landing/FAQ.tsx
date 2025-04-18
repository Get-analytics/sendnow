import { useState } from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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

const faqItems = [
  {
    question: "Which file formats can I share with SendNow?",
    answer: "We've got you covered—upload PDFs, Word/Excel docs, PPTs, images (JPG/PNG/GIF) and videos (MP4/AVI). Plus, you can link-to-link files for that extra flexibility. (Free plan caps each file smaller, Pro/Enterprise goes big.)"
  },
  {
    question: "How long do my links stay active?",
    answer: "Free: 7 days, then poof.\nBasic: Up to 2 months even if you cancel.\nPro: Up to 3 months post-cancellation.\nEnterprise: Custom durations—let's talk."
  },
  {
    question: "Can I export my analytics?",
    answer: "Yup! Hit \"Export\" on Basic, Pro, and Enterprise plans. Free plan gives in-app stats only—no downloads."
  },
  {
    question: "What video analytics do I get?",
    answer: "We track total watch time, play/pause events, seeks, rewinds and drop-off points. On Pro+ you also unlock heatmaps that show exactly where viewers binge or bail."
  },
  {
    question: "Is my data secure and private?",
    answer: "Locked down with industry-standard SSL/TLS in transit and AES-256 at rest. We're GDPR-friendly and never peek at your files—Scout's honor."
  }
];

const FAQ = () => {
  const { ref: faqRef, inView: faqInView } = useIntersectionObserver({ threshold: 0.1 });
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-white" ref={faqRef}>
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={faqInView ? "visible" : "hidden"}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-primary mb-4">Got Questions? We've Got Answers</h2>
          <p className="text-lg text-[#333333]/80 max-w-2xl mx-auto">
            Everything you need to know about our service.
          </p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="space-y-6">
          <Accordion 
            type="single" 
            collapsible 
            value={openItem || undefined} 
            onValueChange={(value) => setOpenItem(value)}
          >
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-[#F8F6F3] p-6 rounded-xl mb-6 border-none"
              >
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#333333]/80 mt-3 whitespace-pre-line">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FAQ;
