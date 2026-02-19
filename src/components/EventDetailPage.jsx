import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Navbar from "./Navbar";
import {
  ArrowLeft,
  Star,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Globe,
  Clock,
  ShieldCheck,
} from "lucide-react";

export default function EventDetailPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", eventId)
        .single();

      if (error) {
        console.error("Error fetching event:", error);
      } else {
        setEvent(data);
      }
      setLoading(false);
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-40 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-40 text-center">
          <p className="text-gray-500 text-xl font-semibold">Event not found</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 text-teal-600 hover:underline font-medium"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const features = event.features
    ? event.features.split(",").map((f) => f.trim())
    : [];

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Navbar />

      {/* Top Navigation Bar */}
      <div className="pt-24 pb-2 bg-white border-b border-gray-100">
        <div className="w-[90%] max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-teal-600 font-semibold transition-colors group"
          >
            {/* <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Events */}
          </button>
          <div className="flex gap-4">
            <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
              {event.category || "General"}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section: Matched to Homepage Gradient */}
      <div className="bg-gradient-to-r from-[#0f172a] via-[#1e1b4b] to-[#0d9488] py-20 shadow-inner">
        <div className="w-[90%] max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Info */}
            <div className="text-white">
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
                {event.title}
              </h1>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-1 w-20 bg-teal-400 rounded-full"></div>
                <p className="text-2xl font-light text-teal-50 uppercase tracking-widest">
                  {event.date
                    ? new Date(event.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Coming Soon"}
                </p>
              </div>
              <div className="flex items-baseline gap-2 mb-10">
                <span className="text-5xl font-bold">
                  ₹{event.price || "0"}
                </span>
                <span className="text-teal-200 text-lg">/ registration</span>
              </div>
              <button className="bg-teal-500 hover:bg-teal-400 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-3">
                <ShieldCheck size={24} />
                Secure Your Spot Now
              </button>
            </div>

            {/* Right Side - Poster */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-indigo-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-black rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                <img
                  src={
                    event.image_url ||
                    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4"
                  }
                  alt={event.title}
                  className="w-full h-full object-cover transform transition duration-700 group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="w-[90%] max-w-7xl mx-auto py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Details & About */}
          <div className="lg:col-span-2 space-y-12">
            {/* Quick Info Tiles */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="w-2 h-8 bg-teal-500 rounded-full"></div>
                Event Logistics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard
                  icon={<Calendar className="text-teal-600" />}
                  title="Date"
                  value={event.date}
                />
                <InfoCard
                  icon={<Clock className="text-teal-600" />}
                  title="Time"
                  value={event.time || "Check schedule"}
                />
                <InfoCard
                  icon={<MapPin className="text-teal-600" />}
                  title="Location"
                  value={event.location}
                />
                <InfoCard
                  icon={<Users className="text-teal-600" />}
                  title="Capacity"
                  value={`${event.capacity} seats total`}
                />
              </div>
            </section>

            {/* About Section */}
            <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                About the Event
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
                {event.description || "No description provided for this event."}
              </p>
            </section>
          </div>

          {/* Right Column: Sticky Sidebar / Features */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-8">
              {features.length > 0 && (
                <div className="bg-[#1e1b4b] text-white p-8 rounded-3xl shadow-xl">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Star className="text-teal-400" fill="currentColor" />
                    Key Highlights
                  </h3>
                  <ul className="space-y-4">
                    {features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-indigo-100"
                      >
                        <div className="w-1.5 h-1.5 bg-teal-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-md font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-teal-50 p-8 rounded-3xl border border-teal-100">
                <Globe className="text-teal-600 mb-4" size={32} />
                <h4 className="font-bold text-gray-900 mb-2">
                  Organizer Information
                </h4>
                <p className="text-teal-800 font-semibold">
                  {event.organizer_name || "Official Partner"}
                </p>
                <button className="mt-4 text-sm text-teal-600 font-bold hover:underline">
                  View Organizer Profile →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="bg-white border-t border-gray-200 py-12 mt-20">
        <div className="w-[90%] max-w-7xl mx-auto text-center">
          <p className="text-gray-400 text-sm mb-4">
            You are viewing an official event hosted on Magical Events
          </p>
          <div className="flex justify-center gap-8 text-gray-500 font-medium">
            <a href="#" className="hover:text-teal-600 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-teal-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-teal-600 transition-colors">
              Support Center
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Helper Component for the Info Cards
function InfoCard({ icon, title, value }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-teal-200 transition-all group">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-teal-50 rounded-xl group-hover:bg-teal-100 transition-colors">
          {icon}
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
            {title}
          </p>
          <p className="text-gray-800 font-bold text-lg">{value || "TBD"}</p>
        </div>
      </div>
    </div>
  );
}
