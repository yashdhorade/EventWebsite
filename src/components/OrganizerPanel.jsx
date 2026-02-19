import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import Navbar from "./Navbar";
import { Plus, Edit, Trash2, ArrowLeft } from "lucide-react";

export default function OrganizerPanel() {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Music",
    date: "",
    time: "",
    location: "",
    price: "",
    capacity: "",
    image_url: "",
    organizer_name: "",
    features: "",
  });

  const categories = [
    "Music",
    "This Food & Drink",
    "Tech",
    "Sports",
    "Art & Culture",
    "Education",
  ];

  // Fetch user and their events
  useEffect(() => {
    const fetchUserAndEvents = async () => {
      setLoading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);

      if (session?.user) {
        const { data: eventsData } = await supabase
          .from("events")
          .select("*")
          .eq("organizer_id", session.user.id);

        setEvents(eventsData || []);
        setFormData((prev) => ({
          ...prev,
          organizer_name: session.user.email.split("@")[0],
        }));
      }
      setLoading(false);
    };

    fetchUserAndEvents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first");
      return;
    }

    const eventData = {
      ...formData,
      organizer_id: user.id,
      organizer_name: user.email.split("@")[0],
    };

    try {
      if (editingEvent) {
        // Update existing event
        const { error } = await supabase
          .from("events")
          .update(eventData)
          .eq("id", editingEvent.id);

        if (error) throw error;
        alert("Event updated successfully!");
      } else {
        // Create new event
        const { error } = await supabase.from("events").insert([eventData]);

        if (error) throw error;
        alert("Event created successfully!");
      }

      // Refresh events list
      const { data: updatedEvents } = await supabase
        .from("events")
        .select("*")
        .eq("organizer_id", user.id);

      setEvents(updatedEvents || []);
      resetForm();
    } catch (error) {
      alert("Error saving event: " + error.message);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      category: event.category,
      date: event.date,
      time: event.time || "",
      location: event.location,
      price: event.price || "",
      capacity: event.capacity || "",
      image_url: event.image_url || "",
      organizer_name: event.organizer_name,
      features: event.features || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const { error } = await supabase
          .from("events")
          .delete()
          .eq("id", eventId);

        if (error) throw error;
        alert("Event deleted successfully!");
        setEvents(events.filter((e) => e.id !== eventId));
      } catch (error) {
        alert("Error deleting event: " + error.message);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "Music",
      date: "",
      time: "",
      location: "",
      price: "",
      capacity: "",
      image_url: "",
      organizer_name: user?.email.split("@")[0] || "",
      features: "",
    });
    setEditingEvent(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="pt-24 text-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
        <div className="w-[90%] mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-2">
              Explore Your Events
            </h1>
            <p className="text-gray-600">Manage your event catalog</p>
          </div>

          {/* Add Event Form */}
          {showForm && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  {editingEvent
                    ? "Edit Event"
                    : "Add New Event with Complete Details"}
                </h2>
                <button
                  onClick={resetForm}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft size={20} />
                  Back
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Row 1 */}
                  <input
                    type="text"
                    name="title"
                    placeholder="Event Name"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="border border-gray-300 p-3 rounded-lg focus:border-teal-600 focus:outline-none"
                  />
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-3 rounded-lg focus:border-teal-600 focus:outline-none bg-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    name="price"
                    placeholder="Price (₹)"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-3 rounded-lg focus:border-teal-600 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Row 2 */}
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="border border-gray-300 p-3 rounded-lg focus:border-teal-600 focus:outline-none"
                  />
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-3 rounded-lg focus:border-teal-600 focus:outline-none"
                  />
                  <input
                    type="number"
                    name="capacity"
                    placeholder="Capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-3 rounded-lg focus:border-teal-600 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Row 3 */}
                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-3 rounded-lg focus:border-teal-600 focus:outline-none"
                  />
                  <input
                    type="url"
                    name="image_url"
                    placeholder="Image URL (optional)"
                    value={formData.image_url}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-3 rounded-lg focus:border-teal-600 focus:outline-none md:col-span-2"
                  />
                </div>

                <input
                  type="text"
                  name="features"
                  placeholder="Features (comma separated)"
                  value={formData.features}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:border-teal-600 focus:outline-none"
                />

                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="6"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:border-teal-600 focus:outline-none resize-none"
                />

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors"
                  >
                    <Plus size={20} />
                    {editingEvent ? "Update Event" : "Add Event with Details"}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-400 hover:bg-gray-500 text-white px-8 py-3 rounded-lg font-bold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Add Event Button */}
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors mb-12"
            >
              <Plus size={20} />
              Add New Event
            </button>
          )}

          {/* Events Grid */}
          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {/* Event Image */}
                  <div className="h-48 bg-gradient-to-br from-teal-500 to-teal-600 relative overflow-hidden">
                    {event.image_url && (
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>

                  {/* Event Details */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      Model: {event.date || "TBA"}
                    </p>
                    <p className="text-xl font-bold text-gray-900 mb-6">
                      Price: ₹{event.price || "0"}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(event)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors"
                      >
                        <Edit size={18} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors"
                      >
                        <Trash2 size={18} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !showForm && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">
                  No events yet. Create your first event!
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-bold transition-colors"
                >
                  Create Event
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
