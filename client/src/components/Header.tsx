import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { X, Menu } from "lucide-react";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Analytics", href: "#analytics" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? "bg-white shadow-sm py-3" : "bg-transparent py-5"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div 
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <Link href="/">
            <a className="flex items-center">
              <img 
                src="/attached_assets/Asset 2@4x_1744978710412.png" 
                alt="Sendnow Logo" 
                className="h-8" 
              />
            </a>
          </Link>
        </motion.div>

        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-800 hover:text-[#7C5832] transition-all duration-300"
              onClick={(e) => {
                e.preventDefault();
                const element = document.querySelector(link.href);
                if (element) {
                  element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <a 
            href="#"
            className="hidden md:inline-block text-gray-800 hover:text-[#7C5832] transition-all duration-300"
          >
            Login
          </a>
          <Button 
            className="bg-[#7C5832] hover:bg-[#7C5832]/90 text-white rounded-full"
          >
            Try for Free
          </Button>
          <button
            className="md:hidden text-gray-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-md"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-800 hover:text-[#7C5832] transition-all py-2"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    const element = document.querySelector(link.href);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#"
                className="text-gray-800 hover:text-[#7C5832] transition-all py-2"
              >
                Login
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
