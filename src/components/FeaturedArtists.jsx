import React from "react";
import { Ticket, Calendar, Building2 } from "lucide-react";

const artists = [
  {
    id: 1,
    name: "Jam Siber",
    role: "Guitarist",
    image:
      "https://cdn.mos.cms.futurecdn.net/v2/t:0,l:150,cw:900,ch:675,q:80,w:900/Yycxn88YbzjySb5t3J737j.jpg",
  },
  {
    id: 2,
    name: "Bun Eigm",
    role: "DJ Producer",
    image:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    id: 3,
    name: "Argit Singh",
    role: "Singer",
    image:
      "https://i.pinimg.com/474x/4b/7c/86/4b7c867c013b385e86e167f6772346d3.jpg",
  },
  {
    id: 4,
    name: "A.R Rehman",
    role: "Music Composer",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSic-wsWF4h4d1x0M_iIYbmAkNDRdkyyQBCJewKTIAupYZ_gqmtc-5xKU-KaB3JSeLYw7W1Ez5XYgWj1nz50GHQLLwfq4WKUX4LSA64JZY&s=10",
  },
  {
    id: 5,
    name: "Jubin Nautiyal",
    role: "Indian Playback Singer",
    image:
      "https://d3lzcn6mbbadaf.cloudfront.net/media/details/ANI-20250624113847.jpg",
  },
];

const stats = [
  {
    id: 1,
    label: "Tickets Sold",
    value: "15 MILLION+",
    icon: <Ticket className="w-8 h-8 text-teal-400 mb-2 opacity-80" />,
  },
  {
    id: 2,
    label: "Events Organized",
    value: "3000+",
    icon: <Calendar className="w-8 h-8 text-teal-400 mb-2 opacity-80" />,
  },
  {
    id: 3,
    label: "Venues Partnered",
    value: "1000+",
    icon: <Building2 className="w-8 h-8 text-teal-400 mb-2 opacity-80" />,
  },
];

const FeaturedArtists = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">
            Featured Artists
          </h2>
          <div className="h-1 w-24 bg-[#1e2d2f] mx-auto rounded-full"></div>
        </div>

        {/* Artists Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-20">
          {artists.map((artist) => (
            <div
              key={artist.id}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="relative mb-4">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-slate-100 shadow-lg group-hover:border-[#1e2d2f] transition-all duration-300">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {artist.name}
              </h3>
              <p className="text-sm text-slate-500">{artist.role}</p>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="bg-[#1e2d2f] rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Decorative background circle */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10 relative z-10">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="flex flex-col items-center text-center pt-8 md:pt-0 px-4"
              >
                {stat.icon}
                <span className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </span>
                <span className="text-sm md:text-base text-slate-400 uppercase tracking-widest font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtists;
