import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  BarChart3, 
  PlayCircle, 
  Map,
  ArrowRight,
  Upload,
  Link,
  Flame,
  Users,
  Globe,
  UserCheck,
  DownloadCloud,
  Globe2,
  Badge
} from "lucide-react";

const FeatureSection: React.FC = () => {
  const [sectionRef, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const features = [
    {
      icon: <Upload className="w-7 h-7 text-[#7C5832]" />,
      title: "Upload & Share Anything",
      description: "Effortlessly upload and share all your important files – PDFs, documents, presentations, images, and videos – with simple link sharing."
    },
    {
      icon: <Link className="w-7 h-7 text-[#7C5832]" />,
      title: "Short & Sweet Links",
      description: "Create clean, professional shortened links that are easy to share and track across all your marketing channels."
    },
    {
      icon: <Flame className="w-7 h-7 text-[#7C5832]" />,
      title: "Heatmap Analytics",
      description: "See exactly where your audience spends their time and what captures their attention on your documents and presentations."
    },
    {
      icon: <PlayCircle className="w-7 h-7 text-[#7C5832]" />,
      title: "Video Engagement Deep Dive",
      description: "Track video watch time, seek behavior, and rewind actions to understand how viewers interact with your video content."
    },
    {
      icon: <Users className="w-7 h-7 text-[#7C5832]" />,
      title: "Overall Session Analytics",
      description: "Get a comprehensive view of total sessions, unique visitors, and bounce rates for your shared links."
    },
    {
      icon: <Globe className="w-7 h-7 text-[#7C5832]" />,
      title: "Location & Time Insights",
      description: "Understand where and when your audience is engaging with your content for targeted future campaigns."
    },
    {
      icon: <UserCheck className="w-7 h-7 text-[#7C5832]" />,
      title: "Return User Tracking",
      description: "Identify and understand your most engaged audience segments to better tailor your content strategy."
    },
    {
      icon: <DownloadCloud className="w-7 h-7 text-[#7C5832]" />,
      title: "Analytics Export",
      description: "Available on paid plans: Export your valuable data for further analysis and reporting in your favorite tools."
    },
    {
      icon: <Globe2 className="w-7 h-7 text-[#7C5832]" />,
      title: "Custom Domain",
      description: "Available on Pro & Enterprise: Brand your links with your own domain for a professional touch that builds trust."
    },
    {
      icon: <Badge className="w-7 h-7 text-[#7C5832]" />,
      title: "No Watermarks",
      description: "Available on paid plans: Share your content without any distracting watermarks for a clean, professional experience."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="features" className="py-16 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-[#7C5832] mb-4">Built for Every Workflow</h2>
          <p className="text-gray-600">
            Whether you're pitching investors, teaching online, or marketing your latest drop, Sendnow arms you with the insights to level up your content game.
          </p>
        </motion.div>
        
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => {
            const isPremiumFeature = 
              feature.description.includes("Available on paid plans") || 
              feature.description.includes("Available on Pro");
            
            return (
              <motion.div
                key={index}
                className={`feature-card ${isPremiumFeature ? 'bg-gradient-to-br from-[#F8F6F3] to-[#F0EBE4]' : 'bg-[#F8F6F3]'} rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden`}
                variants={itemVariants}
              >
                {isPremiumFeature && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-[#7C5832] bg-opacity-10 text-[#7C5832] text-xs font-medium px-2 py-1 rounded-full">
                      Premium
                    </span>
                  </div>
                )}
                <div className="bg-[#7C5832] bg-opacity-10 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <a href="#" className="text-[#7C5832] font-medium flex items-center group">
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureSection;
