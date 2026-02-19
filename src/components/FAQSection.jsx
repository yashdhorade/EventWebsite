import React, { useState } from "react";
import { Search, Plus, Minus } from "lucide-react";

const faqData = [
  {
    id: 1,
    question: "How do I book tickets?",
    answer:
      'Simply browse our "Events" page, select the event you wish to attend, choose your ticket category, and proceed to secure checkout.',
  },
  {
    id: 2,
    question: "Can I get a refund?",
    answer:
      "Refund policies are set by individual event organizers. You can find the specific policy on the event details page or contact the organizer directly.",
  },
  {
    id: 3,
    question: "How do I list my event?",
    answer:
      'Sign up as an "Organizer," go to your dashboard, and click "Create Event." Fill in the details, upload a poster, and publish it instantly.',
  },
  {
    id: 4,
    question: "Is my payment secure?",
    answer:
      "Yes. We use industry-standard encryption (SSL) and trusted payment gateways like Stripe and PayPal to ensure your financial data is 100% safe.",
  },
  {
    id: 5,
    question: "Where are my tickets?",
    answer:
      'After booking, your tickets are emailed to you. You can also view and download them anytime from the "My Bookings" section of your profile.',
  },
  {
    id: 6,
    question: "Can I transfer tickets?",
    answer:
      'Yes, ticket transfers are available up to 24 hours before the event starts. Go to "My Bookings" and select the "Transfer" option.',
  },
  {
    id: 7,
    question: "Are there booking fees?",
    answer:
      "MagicalMoments charges a small platform fee per ticket to maintain our secure services. This is displayed clearly before you checkout.",
  },
  {
    id: 8,
    question: "How do I contact support?",
    answer:
      'Our support team is available 24/7. You can reach us via the "Help" widget in your dashboard or email support@magicalmoments.com.',
  },
];

const FAQSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openId, setOpenId] = useState(null);

  // Toggle accordion logic
  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  // Filter FAQs based on search
  const filteredFAQs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-[#1e2d2f] mb-4">
            Questions & Answers
          </h2>
          <div className="h-1 w-24 bg-[#1e2d2f] mx-auto rounded-full mb-8"></div>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder="Search for questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-5 pr-12 py-4 rounded-lg border border-slate-300 shadow-sm focus:border-[#1e2d2f] focus:ring-1 focus:ring-[#1e2d2f] outline-none transition-all"
            />
            <div className="absolute right-2 top-2 bg-[#1e2d2f] p-2 rounded-md text-white">
              <Search size={20} />
            </div>
          </div>
        </div>

        {/* Subheader */}
        <h3 className="text-xl font-bold text-[#1e2d2f] mb-6">Common Topics</h3>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq) => (
              <div
                key={faq.id}
                onClick={() => toggleFAQ(faq.id)}
                className={`bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer h-fit ${
                  openId === faq.id ? "ring-2 ring-[#1e2d2f]" : ""
                }`}
              >
                <div className="flex justify-between items-start gap-4">
                  <h4 className="font-bold text-[#1e2d2f] text-lg leading-tight">
                    {faq.question}
                  </h4>
                  <button className="text-[#1e2d2f] min-w-[24px]">
                    {openId === faq.id ? (
                      <div className="bg-[#1e2d2f] rounded-full p-1">
                        <Minus size={14} className="text-white" />
                      </div>
                    ) : (
                      <div className="bg-[#1e2d2f] rounded-full p-1">
                        <Plus size={14} className="text-white" />
                      </div>
                    )}
                  </button>
                </div>

                {/* Answer Dropdown with smooth transition */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openId === faq.id
                      ? "max-h-40 opacity-100 mt-4"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-slate-500">
              No questions found matching your search.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
