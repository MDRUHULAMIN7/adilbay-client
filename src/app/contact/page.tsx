'use client';

import React, { useState } from 'react';
import { Container } from '@/components/layout/container';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { useToast } from '@/components/ui/toast';

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        type: 'success',
        title: 'Message Sent Successfully',
        message: 'Thank you for reaching out! Our design consultant will contact you within 2 hours.',
      });
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: '',
      });
    }, 600);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground text-left">
      <section className="py-12 sm:py-16 border-b border-border/40 bg-surface/5">
        <Container variant="wide" className="flex flex-col gap-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold self-start">
            <Icon name="mail" className="h-3.5 w-3.5" />
            <span>We are here to assist you</span>
          </div>
          <Heading level={1} className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight">
            Contact Our Woodcraft Consultants
          </Heading>
          <Text className="text-stone-500 text-sm leading-relaxed">
            Have questions regarding custom furniture sizing, wood seasoning, or showroom visits? Drop us a message or call our support line directly.
          </Text>
        </Container>
      </section>

      <section className="py-12">
        <Container variant="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Form */}
            <form
              onSubmit={handleSubmit}
              className="lg:col-span-7 flex flex-col gap-6 p-8 rounded-2xl bg-card border border-border/60 shadow-soft"
            >
              <Heading level={2} className="font-display font-bold text-xl text-foreground">
                Send Us a Message
              </Heading>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-stone-600 dark:text-stone-300">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tanvir Ahmed"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="bg-background border border-border/80 rounded-xl px-4 py-3 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-stone-600 dark:text-stone-300">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="tanvir@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-background border border-border/80 rounded-xl px-4 py-3 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-stone-600 dark:text-stone-300">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+880 1700-000000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-background border border-border/80 rounded-xl px-4 py-3 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-stone-600 dark:text-stone-300">Inquiry Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="bg-background border border-border/80 rounded-xl px-4 py-3 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Custom Furniture Order">Custom Furniture Order</option>
                    <option value="Showroom Visit Booking">Showroom Visit Booking</option>
                    <option value="Warranty & Service">Warranty & Service</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-stone-600 dark:text-stone-300">Your Message</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Describe your query or furniture design preference..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-background border border-border/80 rounded-xl p-4 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg shadow-primary/20 transition-all cursor-pointer"
              >
                {isSubmitting ? 'Sending Message...' : 'Submit Message'}
              </button>
            </form>

            {/* Right Information Column */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Showroom Details Card */}
              <div className="p-8 rounded-2xl bg-card border border-border/60 shadow-soft flex flex-col gap-6">
                <Heading level={2} className="font-display font-bold text-xl text-foreground">
                  Flagship Showroom
                </Heading>

                <div className="flex flex-col gap-5 text-xs text-stone-600 dark:text-stone-300">
                  <div className="flex items-start gap-3">
                    <Icon name="mapPin" className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="font-bold text-foreground">Dhaka Experience Center</span>
                      <span>Level 4, Plot 12, Gulshan Avenue, Dhaka-1212, Bangladesh</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Icon name="phone" className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="font-bold text-foreground">Phone Hotline</span>
                      <span>+880 1800-FURNIXO (+880 1800-387649)</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Icon name="mail" className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="font-bold text-foreground">Support Email</span>
                      <span>support@furnixo.com</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Icon name="clock" className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="font-bold text-foreground">Showroom Hours</span>
                      <span>Saturday – Thursday: 10:00 AM – 8:30 PM</span>
                      <span className="text-stone-400">Friday: 3:00 PM – 8:30 PM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Card */}
              <div className="p-6 rounded-2xl bg-stone-900 text-white flex flex-col gap-3 border border-border/40">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Visit Us</span>
                <span className="font-display font-bold text-base">Gulshan-2 Showroom & Studio</span>
                <span className="text-xs text-stone-300 leading-relaxed">
                  Valet parking available for all visitors. Walk-ins welcome or call ahead to reserve a dedicated furniture interior consultant.
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
