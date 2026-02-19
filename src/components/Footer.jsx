import React from "react";
import { Twitter, Linkedin, Instagram, Facebook, Sparkles } from "lucide-react";

const Footer = () => {
  return (
    // Reduced padding from pt-16 pb-8 to pt-10 pb-6
    <footer className="bg-[#1e2d2f] text-white pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Reduced grid gap (gap-8) and bottom margin (mb-8) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="text-white w-5 h-5" />
              {/* Reduced text size to xl */}
              <span className="text-xl font-serif font-bold tracking-tight">
                MagicalMoments
              </span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed max-w-sm">
              The all-in-one platform for discovering, booking, and managing
              events. We bring the magic to your moments, one ticket at a time.
            </p>
          </div>

          {/* Links Column 1 */}
          <div className="space-y-3">
            <h4 className="font-bold text-base">Discover</h4>
            <ul className="space-y-1.5 text-slate-300 text-xs">
              <li>
                <a
                  href="/events"
                  className="hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  All Events
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Featured Artists
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Venues
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Trending Now
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="space-y-3">
            <h4 className="font-bold text-base">Company</h4>
            <ul className="space-y-1.5 text-slate-300 text-xs">
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Press
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div className="space-y-3">
            <h4 className="font-bold text-base">Support</h4>
            <ul className="space-y-1.5 text-slate-300 text-xs">
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs">
            © 2026 MagicalMoments. Made with Magic.
          </p>

          {/* Social Icons - Reduced size slightly */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Twitter size={16} />
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Instagram size={16} />
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Facebook size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
