import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, message } = req.body;
      
      // Validate inputs
      if (!name || !email || !message) {
        return res.status(400).json({ 
          success: false, 
          message: 'Please provide name, email and message' 
        });
      }
      
      // In a real app, this would send an email or store in a database
      console.log('Contact form submission:', { name, email, message });
      
      // Return success
      return res.status(200).json({ 
        success: true, 
        message: 'Thank you for your message. We will get back to you soon!' 
      });
    } catch (error) {
      console.error('Error in contact submission:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'An error occurred while submitting your message' 
      });
    }
  });

  // Newsletter signup endpoint
  app.post('/api/newsletter-signup', async (req, res) => {
    try {
      const { email } = req.body;
      
      // Validate email
      if (!email || !email.includes('@')) {
        return res.status(400).json({ 
          success: false, 
          message: 'Please provide a valid email address' 
        });
      }
      
      // In a real app, this would add the email to a newsletter service
      console.log('Newsletter signup:', { email });
      
      // Return success
      return res.status(200).json({ 
        success: true, 
        message: 'Thank you for subscribing to our newsletter!' 
      });
    } catch (error) {
      console.error('Error in newsletter signup:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'An error occurred while processing your subscription' 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
