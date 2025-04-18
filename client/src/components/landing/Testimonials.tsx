import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Star } from "lucide-react";

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

const testimonialVariants = {
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
    boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3 }
  }
};

const testimonials = [
  {
    name: "Sarah M.",
    role: "Marketing Manager",
    company: "Acme Inc.",
    logo: "https://via.placeholder.com/50x20?text=ACME",
    rating: 5,
    quote: "SendNow has completely changed how I understand my audience. The heatmaps provide clear visual data that helps me refine content for better engagement."
  },
  {
    name: "Raj Patel",
    role: "Content Creator",
    company: "CreativeFlow",
    logo: "https://via.placeholder.com/50x20?text=CF",
    rating: 5,
    quote: "As a video creator, knowing if people are watching my entire video is crucial. SendNow's detailed analytics is a game-changer for tailoring content."
  },
  {
    name: "Lisa K.",
    role: "Small Business Owner",
    company: "Boutique Design",
    logo: "https://via.placeholder.com/50x20?text=BD",
    rating: 5,
    quote: "For my small business, SendNow is an absolute steal. The free plan let me share documents professionally with detailed insights."
  },
  {
    name: "Mark Johnson",
    role: "Digital Marketer",
    company: "WebPulse",
    logo: "https://via.placeholder.com/50x20?text=WP",
    rating: 4,
    quote: "The analytics are incredibly detailed. I can now understand exactly how users interact with my content and optimize accordingly."
  }
];

const companyLogos = [
  "https://via.placeholder.com/120x40?text=COMPANY1",
  "https://via.placeholder.com/120x40?text=COMPANY2",
  "https://via.placeholder.com/120x40?text=COMPANY3",
  "https://via.placeholder.com/120x40?text=COMPANY4",
  "https://via.placeholder.com/120x40?text=COMPANY5",
  "https://via.placeholder.com/120x40?text=COMPANY6",
];

const Testimonials = () => {
  const { ref: testimonialRef, inView: testimonialInView } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 bg-white" ref={testimonialRef}>
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={testimonialInView ? "visible" : "hidden"}
      >
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Loved by 10,000+ Teams</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            From freelancers to Fortune 500s, teams are using SendNow to boost engagement by up to 70%.
          </p>
        </motion.div>
        
        <motion.div 
          className="flex flex-wrap justify-center items-center gap-12 mb-16 opacity-70"
          variants={itemVariants}
        >
          {companyLogos.map((logo, i) => (
            <motion.img 
              key={i}
              src={logo}
              alt="Company logo"
              className="h-8 grayscale opacity-70 hover:opacity-100 transition-opacity"
              variants={itemVariants}
              custom={i}
            />
          ))}
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div 
              key={i}
              variants={testimonialVariants}
              initial="hidden"
              animate={testimonialInView ? "visible" : "hidden"}
              whileHover="hover"
              custom={i}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`} 
                  />
                ))}
              </div>
              
              <p className="text-slate-700 mb-6 text-sm">"{testimonial.quote}"</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center rounded-full text-primary font-medium mr-3">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{testimonial.name}</p>
                    <p className="text-xs text-slate-500">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
                <img src={testimonial.logo} alt={testimonial.company} className="h-6" />
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          variants={itemVariants}
        >
          <a 
            href="#" 
            className="text-primary hover:underline font-medium inline-flex items-center"
          >
            See more customer stories
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
