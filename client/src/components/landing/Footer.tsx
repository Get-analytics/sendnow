import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-[#333333] py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">SendNow</h3>
            <p className="text-white/70 mb-4">
              Share smarter. Track better. Understand every click, view, and interaction with your shared content.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-300">About Us</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-300">Careers</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-300">Blog</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-300">Press</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-300">Documentation</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-300">Help Center</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-300">API</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-300">Status</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-300">Terms of Service</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-300">GDPR</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-300">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8 bg-white/20" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70">© {new Date().getFullYear()} SendNow (LinkSavvy). All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-white/70 hover:text-white transition-colors duration-300">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-white/70 hover:text-white transition-colors duration-300">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-white/70 hover:text-white transition-colors duration-300">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" className="text-white/70 hover:text-white transition-colors duration-300">
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
