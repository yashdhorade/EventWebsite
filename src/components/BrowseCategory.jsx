import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: 1,
    title: "Business",
    // Using simple emojis or placeholder icons for now to avoid external dependencies breaking
    icon: "💼",
    bgColor: "bg-yellow-400",
    path: "business",
  },
  {
    id: 2,
    title: "Conference",
    icon: "🎤",
    bgColor: "bg-orange-400",
    path: "conference",
  },
  {
    id: 3,
    title: "Exhibitions",
    icon: "🖼️",
    bgColor: "bg-teal-400",
    path: "exhibitions",
  },
  {
    id: 4,
    title: "Music",
    icon: "🎵",
    bgColor: "bg-pink-400",
    path: "music",
  },
  {
    id: 5,
    title: "Party",
    icon: "🎉",
    bgColor: "bg-purple-400",
    path: "party",
  },
];

const BrowseCategory = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryPath) => {
    // Navigate to the events page with a query parameter
    // Example: /events?category=business
    navigate(`/events?category=${categoryPath}`);
  };

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-2 font-serif">
        Browse By Category
      </h2>
      <div className="w-24 h-1 bg-[#1e2d2f] mx-auto mb-10"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-4">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category.path)}
            className={`relative h-40 rounded-xl p-4 shadow-md overflow-hidden ${category.bgColor} 
                       transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer group`}
          >
            <h3 className="text-xl font-bold text-white tracking-wide z-10 relative">
              {category.title}
            </h3>

            {/* Decorative Icon/Image */}
            <div className="absolute bottom-2 right-2 text-6xl opacity-80 group-hover:scale-110 transition-transform duration-300">
              {category.icon}
            </div>

            {/* Subtle overlay for depth */}
            <div className="absolute inset-0 bg-black/5 hover:bg-black/0 transition-colors"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseCategory;
