import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
    transition: { duration: 0.3 }
  }
};

const testimonials = [
  {
    name: "Sarah M.",
    role: "Marketing Manager",
    quote: "SendNow has completely changed how I understand my audience. As a marketer, I used to guess which parts of my presentations were resonating. Now, with SendNow's heatmaps, I have clear visual data that's helping me refine my content for better engagement."
  },
  {
    name: "Raj Patel",
    role: "Content Creator",
    quote: "As a video creator, knowing if people are actually watching my entire video or dropping off is crucial. SendNow's detailed video analytics, showing watch time and even when viewers rewind, is a game-changer. I can now tailor my content to keep my audience hooked."
  },
  {
    name: "Lisa K.",
    role: "Small Business Owner",
    quote: "For my small business, SendNow is an absolute steal. The free plan allowed me to share important documents with clients professionally, and I got more insight than just knowing if they clicked. Upgrading to the Basic plan was a no-brainer."
  }
];

const Testimonials = () => {
  const { ref: testimonialRef, inView: testimonialInView } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-white" ref={testimonialRef}>
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={testimonialInView ? "visible" : "hidden"}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-primary mb-4">Loved by 10K+ Senders Worldwide</h2>
          <p className="text-lg text-[#333333]/80 max-w-2xl mx-auto">
            From freelancers to Fortune 500s, teams are using SendNow to boost engagement by up to 70%. 
            Check out the real stories behind the numbers.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div 
              key={testimonial.name}
              variants={testimonialVariants}
              initial="hidden"
              animate={testimonialInView ? "visible" : "hidden"}
              whileHover="hover"
              custom={i}
            >
              <Card className="bg-[#F8F6F3] shadow-md h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-10 w-10 bg-primary/20 text-primary mr-3">
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-[#333333]/60">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-[#333333]/80">{testimonial.quote}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
