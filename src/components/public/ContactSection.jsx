import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, ExternalLink } from 'lucide-react';
import { InstagramIcon, FacebookIcon, YoutubeIcon, PlayStoreIcon } from '../common/SocialIcons';

export const ContactSection = ({ instituteInfo }) => {
  return (
    <section id="contact" className="py-16 bg-white border-b border-slate-200 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-100/70 px-3 py-1 rounded-full border border-orange-200">
            Contact & Campus Location
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-3">
            Welcome to Saryoday Academics
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Visit our campus or connect via phone, WhatsApp or social media for course details, batch schedules & career guidance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Details Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Address Card */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/90 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                <MapPin size={22} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Campus Location</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {instituteInfo?.address || "B-Colony, Near Geeta Vatika Mandir & Airtel Store, Shahpur, Gorakhpur, UP – 273006"}
                </p>
                <a
                  href="https://maps.google.com/?q=Shahpur+Gorakhpur+Geeta+Vatika"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-orange-600 mt-2 hover:underline"
                >
                  <span>View on Google Maps</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/90 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <Phone size={22} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Helpline & Admissions Desk</h4>
                <div className="text-xs text-slate-600 mt-1 space-y-0.5">
                  <p><a href="tel:08400100814" className="hover:text-blue-600 font-semibold">+91 84001 00814</a> (Director Desk)</p>
                  <p><a href="tel:08400100813" className="hover:text-blue-600 font-semibold">+91 84001 00813</a> (Admin Office)</p>
                </div>
              </div>
            </div>

            {/* Timings Card */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/90 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <Clock size={22} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Office Timings</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {instituteInfo?.timings || "Monday – Saturday: 07:00 AM to 07:00 PM (Sunday: Special Doubt Sessions)"}
                </p>
              </div>
            </div>

            {/* WhatsApp Direct */}
            <div className="bg-emerald-50 p-4 sm:p-5 rounded-2xl border border-emerald-200 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-emerald-900">Instant WhatsApp Support</h4>
                <p className="text-xs text-emerald-700">Get syllabus, fees & batch timing directly on WhatsApp</p>
              </div>
              <a
                href="https://wa.me/918400100814?text=Hello%20Saryoday%20Academics,%20I%20would%20like%20information%20about%20IIT-JEE/NEET%20coaching%20and%20admissions."
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow shrink-0"
              >
                <MessageSquare size={14} />
                <span>Chat Now</span>
              </a>
            </div>

            {/* Social Media Connect (Instagram, Facebook, YouTube, Google Play Store) */}
            <div className="space-y-2 pt-1">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Connect on Official Channels
              </h4>
              <div className="grid grid-cols-2 gap-2.5">
                {/* Instagram Card */}
                <a
                  href={instituteInfo?.instagram || "https://www.instagram.com/saryoday_gorakhpur/"}
                  target="_blank"
                  rel="noreferrer"
                  className="group p-3 rounded-xl border border-pink-200 bg-gradient-to-br from-pink-50/70 via-white to-rose-50/40 hover:shadow hover:border-pink-300 transition flex items-center gap-2.5"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-xs group-hover:scale-105 transition">
                    <InstagramIcon size={16} />
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-[11px] font-bold text-slate-900 group-hover:text-rose-600 transition truncate">Instagram</h5>
                    <p className="text-[10px] text-rose-600 font-semibold truncate">@saryoday_gorakhpur</p>
                  </div>
                </a>

                {/* Facebook Card */}
                <a
                  href={instituteInfo?.facebook || "https://www.facebook.com/saryoday/"}
                  target="_blank"
                  rel="noreferrer"
                  className="group p-3 rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50/70 via-white to-sky-50/40 hover:shadow hover:border-blue-300 transition flex items-center gap-2.5"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#1877F2] flex items-center justify-center text-white shrink-0 shadow-xs group-hover:scale-105 transition">
                    <FacebookIcon size={16} />
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-[11px] font-bold text-slate-900 group-hover:text-blue-600 transition truncate">Facebook</h5>
                    <p className="text-[10px] text-[#1877F2] font-semibold truncate">/saryoday</p>
                  </div>
                </a>

                {/* YouTube Card */}
                <a
                  href={instituteInfo?.youtube || "https://www.youtube.com/@saryodayacademics"}
                  target="_blank"
                  rel="noreferrer"
                  className="group p-3 rounded-xl border border-red-200 bg-gradient-to-br from-red-50/70 via-white to-orange-50/40 hover:shadow hover:border-red-300 transition flex items-center gap-2.5"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#FF0000] flex items-center justify-center text-white shrink-0 shadow-xs group-hover:scale-105 transition">
                    <YoutubeIcon size={16} />
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-[11px] font-bold text-slate-900 group-hover:text-red-600 transition truncate">YouTube</h5>
                    <p className="text-[10px] text-red-600 font-semibold truncate">Video Lectures</p>
                  </div>
                </a>

                {/* Google Play Store Card */}
                <a
                  href={instituteInfo?.playstore || "https://play.google.com/store/apps/details?id=com.saryoday.academics"}
                  target="_blank"
                  rel="noreferrer"
                  className="group p-3 rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/40 hover:shadow hover:border-emerald-300 transition flex items-center gap-2.5"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center text-white shrink-0 shadow-xs group-hover:scale-105 transition">
                    <PlayStoreIcon size={16} />
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-[11px] font-bold text-slate-900 group-hover:text-emerald-700 transition truncate">Play Store</h5>
                    <p className="text-[10px] text-emerald-700 font-semibold truncate">Saryoday App</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Google Map Embed */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-slate-300 shadow-md min-h-[380px] relative bg-slate-100">
            <iframe
              title="Saryoday Academics Shahpur Gorakhpur Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14247.96265778832!2d83.3761!3d26.7725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39914467c6999999%3A0x9999999999999999!2sShahpur%2C%20Gorakhpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              className="w-full h-full min-h-[380px] border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-slate-200 text-xs">
              <p className="font-black text-slate-900">Saryoday Academics</p>
              <p className="text-[11px] text-slate-500">B-Colony, Shahpur, Gorakhpur</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
