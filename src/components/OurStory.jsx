import React from "react";
import Footer from "./Footer";

const OurStory = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-12">
          <h2 className="text-4xl font-serif font-bold text-[#1e2d2f] mb-3">
            Our Story
          </h2>
          <div className="h-1 w-24 bg-[#1e2d2f]"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
              alt="MagicalMoments Team"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
            {/* Optional decorative overlay */}
            <div className="absolute inset-0 bg-[#1e2d2f]/10"></div>
          </div>

          {/* Right Side: Content */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-slate-900 leading-tight">
              Connecting People Through{" "}
              <span className="text-[#1e2d2f]">Unforgettable Experiences</span>
            </h3>

            <p className="text-slate-600 text-lg leading-relaxed">
              MagicalMoments began with a simple belief: that the best memories
              are made when people come together. What started as a small
              project to help local artists find venues has grown into a
              comprehensive platform for events of all sizes.
            </p>

            <p className="text-slate-600 text-lg leading-relaxed">
              We empower organizers to dream big and attendees to discover their
              next passion. From intimate workshops to massive festivals, we
              bridge the gap between planning and partying, ensuring that every
              moment is truly magical.
            </p>

            <div className="pt-4">
              <button className="px-8 py-3 bg-slate-100 text-[#1e2d2f] font-bold rounded-lg hover:bg-[#1e2d2f] hover:text-white transition-colors duration-300">
                Read Full Journey
              </button>
            </div>
          </div>
        </div>
          </div>
        <Footer/>
      </section>
  );
};

export default OurStory;
