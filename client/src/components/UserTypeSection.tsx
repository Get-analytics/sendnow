import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  BarChart, 
  Video, 
  Briefcase, 
  GraduationCap,
  Presentation
} from "lucide-react";

const UserTypeSection: React.FC = () => {
  const [sectionRef, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const userTypes = [
    {
      icon: <BarChart className="w-6 h-6 text-[#7C5832]" />,
      title: "Marketers",
      description: "Track campaign performance, understand content engagement, and optimize your strategies."
    },
    {
      icon: <Video className="w-6 h-6 text-[#7C5832]" />,
      title: "Creators",
      description: "Gain deep insights into how your audience interacts with your videos, documents, and presentations."
    },
    {
      icon: <Briefcase className="w-6 h-6 text-[#7C5832]" />,
      title: "Small Business Owners",
      description: "Share information professionally and understand what resonates with your clients and prospects."
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-[#7C5832]" />,
      title: "Educators",
      description: "Track student engagement with learning materials and identify areas for improvement."
    },
    {
      icon: <Presentation className="w-6 h-6 text-[#7C5832]" />,
      title: "Sales Professionals",
      description: "Share presentations and proposals with confidence, knowing you can track engagement and follow up effectively."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="user-types" className="py-16 bg-[#F8F6F3]" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-[#7C5832] mb-4">You Had Me at 'Content'.</h2>
          <p className="text-gray-600 text-lg">
            Sendnow is the perfect solution for:
          </p>
        </motion.div>
        
        <motion.div
          className="max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {userTypes.map((userType, index) => (
            <motion.div
              key={index}
              className="flex items-start mb-10 bg-white rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md"
              variants={itemVariants}
            >
              <div className="bg-[#7C5832] bg-opacity-10 w-12 h-12 rounded-full flex items-center justify-center shrink-0 mr-6">
                {userType.icon}
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-gray-800">{userType.title}</h3>
                <p className="text-gray-600">{userType.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default UserTypeSection;