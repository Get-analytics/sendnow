import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const Testimonials: React.FC = () => {
  const [sectionRef, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const testimonials = [
    {
      text: "Sendnow has completely changed how I understand my audience. As a marketer, I used to guess which parts of my presentations were resonating. Now, with Sendnow's heatmaps, I have clear visual data that's helping me refine my content for better engagement. It's like having X-ray vision for my presentations!",
      name: "Sarah M.",
      title: "Marketing Manager",
      rating: 5
    },
    {
      text: "As a video creator, knowing if people are actually watching my entire video or dropping off is crucial. Sendnow's detailed video analytics, showing watch time and even when viewers rewind, is a game-changer. I can now tailor my content to keep my audience hooked. Finally, meaningful video stats in one place!",
      name: "Raj Patel",
      title: "Content Creator",
      rating: 5
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <section id="testimonials" className="py-16 bg-[#F8F6F3]" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-[#7C5832] mb-4">Loved by 10K+ Senders Worldwide</h2>
          <p className="text-gray-600">
            From freelancers to Fortune 500s, teams are using Sendnow to boost engagement by up to 70%. Check out the real stories behind the numbers.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-8 shadow-md"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="flex items-start mb-6">
                <div className="text-[#7C5832]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-10 h-10 opacity-20">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-gray-600 mb-4">{testimonial.text}</p>
                  <div className="flex items-center">
                    <div className="mr-4">
                      <h4 className="font-medium text-gray-800">{testimonial.name}</h4>
                      <p className="text-gray-500 text-sm">{testimonial.title}</p>
                    </div>
                    <div className="flex">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="flex justify-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button 
            className="bg-[#7C5832] hover:bg-[#7C5832]/90 text-white rounded-full px-6"
          >
            Read Their Stories
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
