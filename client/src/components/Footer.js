import React from 'react';
import { Link } from 'react-router-dom';
import { Mountain, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Mountain className="h-8 w-8 text-primary-500" />
              <span className="font-display font-bold text-xl">Awara Safar</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your adventure companion for unforgettable trekking and touring experiences.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://www.instagram.com/_.awara_safar._/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-500 transition">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-500 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  Shree Ganesh Nagar, Panchkutir Powai, Mumbai, Maharashtra 400076
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-500" />
                <span className="text-gray-400 text-sm">+91 96534 41749</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-500" />
                <span className="text-gray-400 text-sm">+91 79773 89554</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-500" />
                <span className="text-gray-400 text-sm">awara.safar3@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center space-y-1">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Awara Safar. All rights reserved.</p>
          <p className="text-gray-400 text-xs flex items-center justify-center gap-2">
            <span>Website credits:</span>
            <span className="font-semibold text-white">Atharva Nagalkar</span>
            <span>·</span>
            <a className="underline hover:text-primary-400" href="mailto:hithisisnagalkaratharva@gmail.com">hithisisnagalkaratharva@gmail.com</a>
            <span>·</span>
            <a className="underline hover:text-primary-400" href="tel:+917021446836">+91 7021446836</a>
            <a href="https://www.linkedin.com/in/atharva-nagalkar-55796a357/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 ml-1 inline-flex items-center">
              <Linkedin className="h-4 w-4" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
