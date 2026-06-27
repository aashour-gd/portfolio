"use client";

import { useState } from "react";
import { Send, Mail, Globe, ExternalLink } from "lucide-react";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { profile, socials } from "@/data/content";

const socialIcons: Record<string, React.ElementType> = {
  linkedin: ExternalLink,
  behance: Globe,
  dribbble: Globe,
};

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setSent(true);
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Something went wrong. Please try again.");
    }

    setSending(false);
  };

  return (
    <>
      <Nav />
      <main className="pt-[72px]">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-indigo-600/8 blur-[100px]" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Left */}
              <div>
                <span className="block font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
                  Contact
                </span>
                <h1 className="font-display text-5xl lg:text-6xl font-bold text-primary leading-tight mb-6">
                  Let's work together.
                </h1>
                <p className="font-body text-lg text-muted leading-relaxed mb-10">
                  Open to senior product design roles, design systems consultancy, and select
                  freelance engagements. Response within 24 hours.
                </p>

                <div className="flex flex-col gap-4 mb-12">
                  <a
                    href={`mailto:${profile.email}`}
                    className="group inline-flex items-center gap-3 text-primary hover:text-accent-light transition-colors duration-200 cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl border border-white/[0.08] bg-card flex items-center justify-center group-hover:border-accent/30 group-hover:bg-accent/5 transition-colors duration-200">
                      <Mail size={16} className="text-muted group-hover:text-accent-light" />
                    </div>
                    <span className="font-body text-sm">{profile.email}</span>
                  </a>
                  {socials.map((s) => {
                    const Icon = socialIcons[s.icon] ?? Globe;
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 text-primary hover:text-accent-light transition-colors duration-200 cursor-pointer"
                      >
                        <div className="w-10 h-10 rounded-xl border border-white/[0.08] bg-card flex items-center justify-center group-hover:border-accent/30 group-hover:bg-accent/5 transition-colors duration-200">
                          <Icon size={16} className="text-muted group-hover:text-accent-light" />
                        </div>
                        <span className="font-body text-sm">{s.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Form */}
              <div className="p-8 rounded-3xl border border-white/[0.08] bg-card">
                {sent ? (
                  <div className="text-center py-8">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                      <Send size={20} className="text-emerald-400" />
                    </div>
                    <h3 className="font-display font-semibold text-primary text-xl mb-2">Message sent!</h3>
                    <p className="font-body text-muted text-sm">I'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                      <label htmlFor="name" className="block font-body text-xs font-medium uppercase tracking-wider text-dim mb-2">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-lg border border-white/[0.08] bg-surface text-sm font-body text-primary placeholder:text-dim focus:outline-none focus:border-accent/50 transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block font-body text-xs font-medium uppercase tracking-wider text-dim mb-2">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-lg border border-white/[0.08] bg-surface text-sm font-body text-primary placeholder:text-dim focus:outline-none focus:border-accent/50 transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block font-body text-xs font-medium uppercase tracking-wider text-dim mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell me about your project..."
                        className="w-full px-4 py-3 rounded-lg border border-white/[0.08] bg-surface text-sm font-body text-primary placeholder:text-dim focus:outline-none focus:border-accent/50 transition-colors duration-200 resize-none"
                      />
                    </div>
                    {error && (
                      <p className="text-sm text-red-400 font-body">{error}</p>
                    )}
                    <button
                      type="submit"
                      disabled={sending}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent hover:bg-accent-light text-white text-sm font-medium font-body rounded-lg transition-colors duration-200 shadow-lg shadow-accent/20 cursor-pointer mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <Send size={16} /> {sending ? "Sending…" : "Send Message"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
