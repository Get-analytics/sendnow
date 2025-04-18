import { Twitter, Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const companyLinks = [
  { label: "About Us", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Press", href: "#" }
];

const productLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Analytics", href: "#" },
  { label: "API", href: "#" }
];

const resourceLinks = [
  { label: "Documentation", href: "#" },
  { label: "Help Center", href: "#" },
  { label: "Partners", href: "#" },
  { label: "Status", href: "#" }
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "GDPR", href: "#" },
  { label: "Cookie Policy", href: "#" }
];

const contactInfo = [
  { icon: <Mail className="h-5 w-5" />, text: "support@sendnow.com" },
  { icon: <Phone className="h-5 w-5" />, text: "+1 (555) 123-4567" },
  { icon: <MapPin className="h-5 w-5" />, text: "123 Analytics Way, Data City, DC 20001" }
];

const socialLinks = [
  { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
  { icon: <Facebook className="h-5 w-5" />, href: "#", label: "Facebook" },
  { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
  { icon: <Linkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" }
];

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter section */}
        <div className="py-12 border-b border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                Stay in the loop
              </h3>
              <p className="text-slate-600">
                Join our newsletter to get the latest news, updates and special offers delivered directly to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <Button 
                className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-3"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        {/* Main footer links */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-bold text-primary inline-block mb-4">
              SendNow
            </Link>
            <p className="text-slate-600 mb-6 max-w-md">
              Share smarter. Track better. Understand every click, view, and interaction with your shared content and make data-driven decisions.
            </p>
            
            <div className="space-y-3">
              {contactInfo.map((item, i) => (
                <div key={i} className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary mr-3">
                    {item.icon}
                  </div>
                  <span className="text-slate-600">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-800 mb-6">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-slate-600 hover:text-primary transition-colors duration-300">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-800 mb-6">Product</h4>
            <ul className="space-y-3">
              {productLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-slate-600 hover:text-primary transition-colors duration-300">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-800 mb-6">Resources</h4>
            <ul className="space-y-3">
              {resourceLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-slate-600 hover:text-primary transition-colors duration-300">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom footer */}
        <div className="py-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
            <p className="text-slate-500 mr-6">© {new Date().getFullYear()} SendNow. All rights reserved.</p>
            <div className="flex space-x-4 mt-3 md:mt-0">
              {legalLinks.map((link, i) => (
                <a 
                  key={i}
                  href={link.href} 
                  className="text-slate-500 hover:text-primary text-sm transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          
          <div className="flex space-x-4">
            {socialLinks.map((social, i) => (
              <a 
                key={i}
                href={social.href} 
                className="bg-slate-100 hover:bg-primary/10 text-slate-600 hover:text-primary p-2 rounded-full transition-colors duration-300"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
