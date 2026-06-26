import Image from "next/image";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { profile, timeline, tools, expertise } from "@/data/content";

export const metadata = {
  title: "About",
  description: "Senior Product Designer with 5+ years in enterprise platforms, design systems, and creative direction.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="pt-[72px]">
        {/* Hero */}
        <div className="relative overflow-hidden border-b border-white/[0.06]">
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px]" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="block font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
                About Me
              </span>
              <h1 className="font-display text-5xl lg:text-6xl font-bold text-primary leading-tight mb-6">
                Hi, I'm {profile.name.split(" ")[0]}.
              </h1>
              <p className="font-body text-xl text-muted leading-relaxed mb-4">
                {profile.bio}
              </p>
              <p className="font-body text-base text-muted/80 leading-relaxed mb-8">
                My work sits at the intersection of strategy, design systems, and user experience — building
                tools for people who use them every day to do serious work.
              </p>
              <a
                href={profile.resumeUrl}
                className="inline-flex items-center gap-2 px-5 py-3 bg-accent hover:bg-accent-light text-white text-sm font-medium font-body rounded-lg transition-colors duration-200 shadow-lg shadow-accent/20 cursor-pointer"
              >
                Download CV
              </a>
            </div>
            {/* Photo */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-80 h-96">
                <div className="absolute inset-0 rounded-3xl bg-indigo-600/15 blur-2xl scale-95 translate-y-3" />
                <div className="relative h-full rounded-3xl border border-white/[0.08] overflow-hidden">
                  <Image
                    src="/assets/me_img.png"
                    alt={profile.name}
                    fill
                    className="object-cover object-top"
                    sizes="320px"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <span className="block font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            Experience
          </span>
          <h2 className="font-display text-4xl font-bold text-primary mb-14">Career Timeline</h2>
          <div className="relative">
            <div className="absolute left-0 top-2 bottom-2 w-px bg-white/[0.06] hidden sm:block" />
            <div className="flex flex-col gap-10">
              {timeline.map((item, i) => (
                <div key={i} className="sm:pl-10 relative">
                  <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent hidden sm:block" />
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mb-2">
                    <span className="font-body text-xs font-semibold text-accent uppercase tracking-wider">
                      {item.year}
                    </span>
                    <span className="hidden sm:block text-dim text-xs">·</span>
                    <span className="font-display font-semibold text-primary">{item.role}</span>
                    <span className="hidden sm:block text-dim text-xs">@</span>
                    <span className="font-body text-sm text-accent-light">{item.company}</span>
                  </div>
                  <p className="font-body text-sm text-muted leading-relaxed max-w-2xl">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills & Expertise */}
        <div className="border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <span className="block font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
                  Disciplines
                </span>
                <h2 className="font-display text-4xl font-bold text-primary mb-8">Expertise</h2>
                <div className="grid grid-cols-1 gap-3">
                  {expertise.map((e) => (
                    <div
                      key={e.label}
                      className="flex items-start gap-4 p-4 rounded-xl border border-white/[0.06] bg-card hover:border-white/[0.12] transition-colors duration-200"
                    >
                      <div className="w-1 h-full rounded-full bg-accent/40 shrink-0 self-stretch min-h-[1.5rem]" />
                      <div>
                        <p className="font-body text-sm font-semibold text-primary mb-0.5">{e.label}</p>
                        <p className="font-body text-xs text-muted leading-relaxed">{e.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <span className="block font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
                  Toolkit
                </span>
                <h2 className="font-display text-4xl font-bold text-primary mb-8">Tools</h2>
                <div className="flex flex-wrap gap-3">
                  {tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-4 py-2 rounded-xl border border-white/[0.08] bg-card font-body text-sm text-muted hover:border-accent/30 hover:text-accent-light transition-colors duration-200 cursor-default"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
