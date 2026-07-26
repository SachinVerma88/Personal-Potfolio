'use client';

import { useState } from 'react';
import { SITE_DATA } from '@/data/content';
import { motion } from 'framer-motion';
import { Mail, CheckCircle2, ArrowDown, LoaderCircle, Send, Linkedin } from 'lucide-react';

export function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    engagementType: 'Freelance Development',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setIsSubmitting(true);

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_CONTACT_API_URL?.replace(/\/$/, '') || '';
      const response = await fetch(`${apiBaseUrl}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(payload?.message || 'Unable to send your inquiry right now.');
      }

      setFormSubmitted(true);
      setFormData({
        name: '',
        email: '',
        message: '',
        engagementType: 'Freelance Development',
      });
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Unable to send your inquiry right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-28 md:py-36 border-t border-white/10 relative bg-zinc-950/60">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column: Engagement & Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-500/10 border border-sky-500/20 text-sky-400 font-mono text-xs font-medium mb-6">
              <Mail className="w-3.5 h-3.5" />
              <span>08 // LET'S WORK TOGETHER</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              {SITE_DATA.contact.headline}
            </h2>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
              {SITE_DATA.contact.subhead}
            </p>

            {/* 3 Checkmarked Engagement Types */}
            <div className="space-y-4 w-full mb-10">
              {SITE_DATA.contact.engagementTypes.map((type) => (
                <div key={type.title} className="glass-panel p-4 rounded-xl border border-white/10 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-white">{type.title}</h3>
                    <p className="text-xs text-zinc-400 mt-0.5 leading-normal">{type.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-300">
              <a
                href={`mailto:${SITE_DATA.identity.email}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 hover:border-sky-400 hover:text-white active:scale-[0.98] transition-all focus-ring"
              >
                <Mail className="w-4 h-4 text-sky-400" />
                <span>{SITE_DATA.identity.email}</span>
              </a>
              <a
                href={SITE_DATA.identity.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 hover:border-sky-400 hover:text-white active:scale-[0.98] transition-all focus-ring"
              >
                <Linkedin className="w-4 h-4 text-sky-400" />
                <span>LinkedIn Profile</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-6 w-full"
          >
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
                <h3 className="text-lg font-bold text-white">Send a Direct Inquiry</h3>
                <a
                  href="#inquiry-form"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-400 text-zinc-950 font-semibold text-xs hover:bg-sky-300 active:scale-[0.98] transition-all focus-ring"
                >
                  <span>{SITE_DATA.contact.ctaButton}</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </a>
              </div>

              {formSubmitted ? (
                <div className="py-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Message Received!</h4>
                  <p className="text-zinc-400 text-sm mt-1">Thank you for reaching out. I'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form id="inquiry-form" onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                  <div>
                    <label htmlFor="fullName" className="block text-zinc-400 mb-1.5 uppercase tracking-wider">
                      Your Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      placeholder="e.g. Alex Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-white/10 text-zinc-100 placeholder-zinc-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:border-transparent transition-all font-sans text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="emailAddress" className="block text-zinc-400 mb-1.5 uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      id="emailAddress"
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-white/10 text-zinc-100 placeholder-zinc-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:border-transparent transition-all font-sans text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="engagementInterest" className="block text-zinc-400 mb-1.5 uppercase tracking-wider">
                      Engagement Interest
                    </label>
                    <select
                      id="engagementInterest"
                      value={formData.engagementType}
                      onChange={(e) => setFormData({ ...formData, engagementType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-white/10 text-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:border-transparent transition-all font-sans text-sm"
                    >
                      <option value="Freelance Development">Freelance MVP Build / AI Integration</option>
                      <option value="Long-term Contract">Long-term Contract Capacity</option>
                      <option value="Full-time Engineer">Full-time Full Stack / AI Role</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="projectMessage" className="block text-zinc-400 mb-1.5 uppercase tracking-wider">
                      Project Details / Message
                    </label>
                    <textarea
                      id="projectMessage"
                      rows={4}
                      required
                      placeholder="Describe your product requirements, timeline, or technical goals..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-white/10 text-zinc-100 placeholder-zinc-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:border-transparent transition-all font-sans text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-white text-zinc-950 font-sans font-bold text-sm hover:bg-sky-400 hover:text-zinc-950 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg focus-ring cursor-pointer"
                  >
                    {isSubmitting ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    <span>{isSubmitting ? 'Sending Inquiry…' : 'Submit Inquiry'}</span>
                  </button>
                  {formError && (
                    <p role="alert" className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2.5 text-rose-200 leading-relaxed">
                      {formError}
                    </p>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
