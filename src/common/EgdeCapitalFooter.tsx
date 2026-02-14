import React, { useState } from 'react';
import { ArrowRight, Linkedin, Twitter, Instagram, Mail } from 'lucide-react';

const EdgeCapitalFooter = () => {
  const [emailHovered, setEmailHovered] = useState(false);
  
  return (
    <footer className="bg-gray-900 text-gray-400 py-16 px-6 md:px-12 lg:px-24">
      <div className="w-[98%] max-w-[1700px] mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo and Contact - Column 1 */}
          <div className="space-y-8">
            <div className="space-y-1">
              <h2 className="text-white text-3xl font-semibold">Edge Capital</h2>
              <p className="text-gray-500">Investing with an edge</p>
            </div>
            
            <div 
              className="inline-flex items-center border border-gray-700 rounded-md px-4 py-2 transition-colors duration-300 hover:border-gray-500 cursor-pointer group"
              onMouseEnter={() => setEmailHovered(true)}
              onMouseLeave={() => setEmailHovered(false)}
            >
              <Mail size={18} className="mr-2 opacity-70" />
              <span>hello@edgec.com</span>
              <ArrowRight 
                size={18} 
                className={`ml-2 transform transition-transform duration-300 ${emailHovered ? 'translate-x-1' : ''}`} 
              />
            </div>
          </div>
          
          {/* Navigation Links - Column 2 */}
          <div className="md:pl-8">
            <h3 className="font-medium text-white mb-4">Home</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-gray-300 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">EdgeFund</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">Edge Impact</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">Institutional</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">FAQ's</a></li>
            </ul>
          </div>
          
          {/* Help Center Links - Column 3 */}
          <div>
            <h3 className="font-medium text-white mb-4">Help center</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-gray-300 transition-colors">Knowledge Base</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">404</a></li>
            </ul>
          </div>
          
          {/* Social Links - Column 4 */}
          <div>
            <h3 className="font-medium text-white mb-4">Social</h3>
            <div className="flex flex-col space-y-3">
              <a 
                href="#" 
                className="flex items-center bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors w-fit"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} className="mr-2" />
                <span>LinkedIn</span>
              </a>
              
              <a 
                href="#" 
                className="flex items-center bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors w-fit"
                aria-label="Instagram"
              >
                <Instagram size={20} className="mr-2" />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="text-sm">
            © 2025 edgecapital. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm">All Systems Operational</span>
            </div>
            
            <a href="#" className="text-sm hover:text-gray-300 transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EdgeCapitalFooter;