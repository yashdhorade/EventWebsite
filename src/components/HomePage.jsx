import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Navbar from "./Navbar";
import { Search, Volume2 } from "lucide-react";
import BrowseCategory from "./BrowseCategory";
import FeaturedArtists from "./FeaturedArtists";
import FAQSection from "./FAQSection";
import OurStory from "./OurStory";
import OrganizerPanel from "./OrganizerPanel";
import EventDetailPage from "./EventDetailPage";

export default function HomePage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchTerm, setSearchTerm] = useState("");
  const [backgroundImageIndex, setBackgroundImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const backgroundImages = [
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
    "https://images.unsplash.com/photo-1533900298318-6b8da08a523e",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea",
  ];

  const categories = [
    "Today",
    "Music",
    "This Food & Drink",
    "Tech",
    "All Categories",
  ];

  // Rotate background images
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fetch events from Supabase
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("events").select("*");

      if (error) {
        console.error("Error fetching events:", error);
      } else {
        setEvents(data || []);
        setFilteredEvents(data || []);
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

  // Filter events based on category and search
  useEffect(() => {
    let filtered = events;

    // Category filter
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter(
        (event) =>
          event.category?.toLowerCase() ===
          selectedCategory.toLowerCase().replace(" & ", " "),
      );
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    setFilteredEvents(filtered);
  }, [selectedCategory, searchTerm, events]);

  return (
    <>
      <Navbar />
      <div className="pt-24 pb-20 bg-gray-50">
        {/* Hero Section */}
        <div
          className="relative w-[90%] mx-auto h-[400px] rounded-3xl overflow-hidden bg-cover bg-center transition-all duration-1000 shadow-xl"
          style={{
            backgroundImage: `url(${backgroundImages[backgroundImageIndex]})`,
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative h-full flex flex-col justify-center px-8 md:px-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Discover Unforgettable Experiences
            </h1>
            <p className="text-xl text-gray-100 mb-8">
              Find register for events that spark your passion.
            </p>

            {/* Search Bar */}
            <div className="flex gap-3 w-full max-w-2xl">
              <div className="flex-1 flex items-center bg-white rounded-lg px-4 py-3 shadow-lg">
                <Search size={20} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 ml-3 outline-none text-gray-700"
                />
              </div>
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors">
                <Volume2 size={20} />
                Ellenscat
              </button>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="w-[90%] mx-auto mt-12 border-b border-gray-200">
          <div className="flex gap-8 overflow-x-auto pb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap pb-3 font-semibold transition-colors ${
                  selectedCategory === category
                    ? "text-teal-600 border-b-2 border-teal-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="w-[90%] mx-auto mt-12">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading events...</p>
            </div>
          ) : filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate(`/event/${event.id}`)}
                >
                  {/* Event Image */}
                  <div className="relative h-48 bg-gray-300 overflow-hidden">
                    {event.image_url && (
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    )}
                    {event.date && (
                      <div className="absolute top-4 right-4 bg-teal-600 text-white px-3 py-1 rounded text-sm font-bold">
                        {new Date(event.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    )}
                  </div>

                  {/* Event Details */}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-1 truncate">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {event.organizer_name}
                    </p>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                      {event.description}
                    </p>

                    {/* Location and Price */}
                    <div className="space-y-2 mb-4 text-sm">
                      {event.location && (
                        <div className="flex items-start gap-2">
                          <span className="text-teal-600">📍</span>
                          <span className="text-gray-600">
                            {event.location}
                          </span>
                        </div>
                      )}
                      {event.price && (
                        <div className="flex items-center gap-2">
                          <span className="text-teal-600">💰</span>
                          <span className="text-gray-600">
                            Rs: {event.price}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Get Tickets Button */}
                    <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded font-semibold transition-colors">
                      Get Tickets
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No events found matching your search.
              </p>
            </div>
          )}
        </div>
        <OrganizerPanel />
        {/* Browse By Category Section */}
        <BrowseCategory />
        {/* Featured Artists Section */}
        <FeaturedArtists />
        {/* FAQ Section */}
        <FAQSection />
        <OurStory />


        {/* Footer */}
        <div className="text-center mt-2 text-gray-500 text-sm">
          &copy; 2026 EventWeb. All rights reserved.
        </div>
      </div>
    </>
  );
}
