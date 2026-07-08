import React, { useState } from 'react';
import { ContactInfo, UserMessage } from '../types';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';

interface ContactSectionProps {
  contactInfo: ContactInfo;
  onSendMessage: (msg: Omit<UserMessage, 'id' | 'timestamp'>) => void;
  sentMessagesCount: number;
}

export default function ContactSection({
  contactInfo,
  onSendMessage,
  sentMessagesCount
}: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setErrorMsg('Please fill in all the fields before sending.');
      return;
    }

    setIsSending(true);

    // Simulate network delay
    setTimeout(() => {
      onSendMessage(formData);
      setIsSending(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Clear success notification after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1200);
  };

  const contactCards = [
    {
      icon: Mail,
      title: 'Email Me',
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`
    },
    {
      icon: Phone,
      title: 'Call Me',
      value: contactInfo.phone,
      href: `tel:${contactInfo.phone}`
    },
    {
      icon: MapPin,
      title: 'Location',
      value: contactInfo.address,
      href: `https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}`
    }
  ];

  return (
    <section
      id="contact"
      className="py-20 px-6 sm:px-12 bg-[#111418] text-white border-b border-gray-900"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16 relative">
          <span className="text-7xl sm:text-8xl md:text-9xl font-extrabold uppercase opacity-5 select-none font-sans absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full text-center">
            Contact
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold relative z-10 font-display">
            Get in Touch
          </h2>
          <div className="w-16 h-[3px] bg-[#20c997] mx-auto mt-3 rounded-full" />
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Cards */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-gray-100">
              Contact Information
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed font-sans">
              Feel free to reach out for new opportunities, project collaborations, or just to say hello! I will do my best to respond within 24 hours.
            </p>

            <div className="space-y-4 pt-4">
              {contactCards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <a
                    key={idx}
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-5 rounded-2xl bg-[#1b1f24] border border-gray-800/60 hover:border-[#20c997]/20 hover:shadow-[#20c997]/5 transition-all duration-300 group"
                  >
                    <div className="p-3 rounded-xl bg-[#111418] border border-gray-800 text-[#20c997] group-hover:bg-[#20c997]/10 group-hover:border-[#20c997]/30 transition-all duration-300">
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">
                        {card.title}
                      </p>
                      <p className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">
                        {card.value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Message Sent Stat Counter (Shows real client-side work!) */}
            {sentMessagesCount > 0 && (
              <div className="p-4 rounded-xl bg-[#20c997]/5 border border-[#20c997]/20 flex items-center gap-3 text-[#20c997] text-xs font-mono">
                <MessageSquare size={16} />
                <span>
                  You have submitted <strong>{sentMessagesCount}</strong> message{sentMessagesCount > 1 ? 's' : ''} in this sandbox session.
                </span>
              </div>
            )}
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-8 bg-[#1b1f24] p-8 rounded-3xl border border-gray-800/60 shadow-xl space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-gray-100">
              Send Me a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="form-name" className="text-xs text-gray-400 font-medium">Your Name</label>
                  <input
                    type="text"
                    id="form-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#111418] border border-gray-800 focus:border-[#20c997]/60 focus:ring-1 focus:ring-[#20c997]/60 text-sm text-white placeholder-gray-600 focus:outline-none transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="form-email" className="text-xs text-gray-400 font-medium">Your Email</label>
                  <input
                    type="email"
                    id="form-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#111418] border border-gray-800 focus:border-[#20c997]/60 focus:ring-1 focus:ring-[#20c997]/60 text-sm text-white placeholder-gray-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label htmlFor="form-subject" className="text-xs text-gray-400 font-medium">Subject</label>
                <input
                  type="text"
                  id="form-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject of message"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#111418] border border-gray-800 focus:border-[#20c997]/60 focus:ring-1 focus:ring-[#20c997]/60 text-sm text-white placeholder-gray-600 focus:outline-none transition-colors"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="form-message" className="text-xs text-gray-400 font-medium">Message</label>
                <textarea
                  id="form-message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  className="w-full px-4 py-3.5 rounded-xl bg-[#111418] border border-gray-800 focus:border-[#20c997]/60 focus:ring-1 focus:ring-[#20c997]/60 text-sm text-white placeholder-gray-600 focus:outline-none resize-none transition-colors"
                />
              </div>

              {/* Error Warning */}
              {errorMsg && (
                <p className="text-xs text-rose-500 font-medium font-sans">
                  {errorMsg}
                </p>
              )}

              {/* Form Success Toast */}
              {isSuccess && (
                <div className="p-4 rounded-xl bg-[#20c997]/10 border border-[#20c997]/30 flex items-center gap-3 text-white text-sm animate-fade-in">
                  <CheckCircle2 size={18} className="text-[#20c997] flex-shrink-0" />
                  <span>Your message has been sent successfully! I will get back to you soon.</span>
                </div>
              )}

              {/* Action Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSending}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#20c997] hover:bg-[#1baa80] disabled:bg-[#20c997]/50 text-[#111418] font-bold tracking-wide text-sm shadow-lg shadow-[#20c997]/10 transition-all duration-300 active:scale-95 disabled:pointer-events-none focus:outline-none cursor-pointer"
                >
                  {isSending ? (
                    <span className="w-5 h-5 border-2 border-t-transparent border-[#111418] rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
