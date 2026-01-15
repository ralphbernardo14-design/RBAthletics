import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  Dumbbell,
  Flame,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Play,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

// shadcn/ui
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const brand = {
  name: "RB Athletics",
  tagline: "Mentor-style coaching. Real results. Strong community.",
  city: "Vaughan / York Region, ON",
  phone: "(555) 123-4567",
  email: "hello@rbathletics.ca",
  instagram: "rbathletics",
};

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function DotGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_70%)]"
    >
      <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.18)_1px,transparent_0)] [background-size:22px_22px]" />
    </div>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200/70 bg-white/70 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/60 dark:text-slate-200">
      {children}
    </span>
  );
}

const services = [
  {
    icon: Dumbbell,
    title: "1:1 Personal Training",
    desc: "Customized strength + conditioning with coaching, cues, and accountability. Built around your goals and schedule.",
    bullets: ["Assessment + plan", "Technique coaching", "Progress tracking"],
  },
  {
    icon: Users,
    title: "Small-Group Training",
    desc: "Premium community sessions: athletic, fun, and structured. You get coaching + energy without the big-class chaos.",
    bullets: ["Capped group size", "Scalable workouts", "Team culture"],
  },
  {
    icon: Flame,
    title: "Performance Conditioning",
    desc: "Boxing-inspired conditioning + running support for athletes and busy professionals who want elite fitness.",
    bullets: ["Intervals + tempo", "VO₂-focused blocks", "Sport-ready conditioning"],
  },
  {
    icon: ShieldCheck,
    title: "Habits + Mindset Coaching",
    desc: "Mentor-style coaching to build consistency, confidence, and discipline—so your results last.",
    bullets: ["Weekly check-ins", "Systems + routines", "Sustainable lifestyle"],
  },
];

const pricing = [
  {
    name: "Starter",
    price: "$199",
    cadence: "/mo",
    note: "Best if you want structure + accountability.",
    features: [
      "Personalized plan",
      "1 weekly check-in",
      "Habit tracker",
      "Form feedback (video)",
    ],
    popular: false,
  },
  {
    name: "Coached",
    price: "$399",
    cadence: "/mo",
    note: "Most popular: coaching + progress tracking.",
    features: [
      "Everything in Starter",
      "2 weekly check-ins",
      "Training adjustments",
      "Nutrition guidelines",
      "Priority support",
    ],
    popular: true,
  },
  {
    name: "Elite",
    price: "$699",
    cadence: "/mo",
    note: "For transformation or performance goals.",
    features: [
      "Everything in Coached",
      "Weekly call",
      "Detailed progress reviews",
      "Race/competition prep",
      "Lifestyle strategy",
    ],
    popular: false,
  },
];

const testimonials = [
  {
    name: "Laura",
    role: "Client • 1+ year",
    quote:
      "I feel stronger, more confident, and I actually look forward to training. The coaching and community kept me consistent.",
    stars: 5,
  },
  {
    name: "Mike",
    role: "Busy professional",
    quote:
      "Workouts were efficient and tailored. My energy is up, body composition improved, and my knee pain settled down.",
    stars: 5,
  },
  {
    name: "Sana",
    role: "Runner",
    quote:
      "The plan was structured and smart. I got faster without feeling broken—and finally understand how to train.",
    stars: 5,
  },
];

const faqs = [
  {
    q: "Do I need to be fit before starting?",
    a: "No. We start with an assessment and scale everything to your level. The plan meets you where you are and builds you up safely.",
  },
  {
    q: "Where do sessions happen?",
    a: `In-person sessions are offered in ${brand.city}. Online coaching is available anywhere.`,
  },
  {
    q: "How fast will I see results?",
    a: "Most people feel better within 2–3 weeks. Visible changes typically start around weeks 4–8 depending on consistency, sleep, and nutrition.",
  },
  {
    q: "Do you include nutrition?",
    a: "Yes—guidelines, habits, and simple targets. If you need medical nutrition therapy, we’ll coordinate with a registered dietitian.",
  },
];

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/60">
      <div className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
        {value}
      </div>
      <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">{label}</div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, desc }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? (
        <div className="mb-3 flex justify-center">
          <Pill>{eyebrow}</Pill>
        </div>
      ) : null}
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
        {title}
      </h2>
      {desc ? (
        <p className="mt-3 text-pretty text-base text-slate-600 dark:text-slate-300 sm:text-lg">
          {desc}
        </p>
      ) : null}
    </div>
  );
}

function Nav({ onBook }) {
  const links = useMemo(
    () => [
      { label: "Services", href: "#services" },
      { label: "Results", href: "#results" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
      { label: "Contact", href: "#contact" },
    ],
    []
  );

  return (
    <div className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/70 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-center gap-2">
          <div className="flex items-center">
            <img
              src="/RBAthletics_logo_transparent.png"
              alt="RB Athletics logo"
              className="h-9 w-auto"
            />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-slate-900 dark:text-white">
              {brand.name}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300">
              Personal Training
            </div>
          </div>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="hidden sm:inline-flex" onClick={onBook}>
            <Calendar className="mr-2 h-4 w-4" />
            Book a call
          </Button>
          <Button onClick={onBook} className="sm:hidden">
            Book
          </Button>
        </div>
      </div>
    </div>
  );
}

function BookingDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Book a free strategy call</DialogTitle>
          <DialogDescription>
            Drop your details and we’ll reach out with next steps.
          </DialogDescription>
        </DialogHeader>

        <form
          className="grid gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            alert(
              "Submitted! Hook this form to your email/CRM (e.g., Formspree, Tally, HubSpot) when you publish."
            );
            onOpenChange(false);
          }}
        >
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="grid gap-1">
              <label className="text-sm font-medium">Name</label>
              <Input placeholder="Your name" required />
            </div>
            <div className="grid gap-1">
              <label className="text-sm font-medium">Phone</label>
              <Input placeholder="(###) ###-####" />
            </div>
          </div>
          <div className="grid gap-1">
            <label className="text-sm font-medium">Email</label>
            <Input type="email" placeholder="you@email.com" required />
          </div>
          <div className="grid gap-1">
            <label className="text-sm font-medium">Goal</label>
            <Textarea
              placeholder="Fat loss, muscle, performance, confidence… tell me what you’re aiming for."
              required
            />
          </div>
          <Button type="submit" className="mt-1">
            Submit <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            By submitting, you agree to be contacted about coaching.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function RBAthleticsLanding() {
  const [bookOpen, setBookOpen] = useState(false);
  const [dark, setDark] = useState(true);

  return (
    <div className={cn("min-h-screen", dark ? "dark" : "")}> 
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
        <div id="top" />
        <Nav onBook={() => setBookOpen(true)} />
        <BookingDialog open={bookOpen} onOpenChange={setBookOpen} />

        {/* Hero */}
        <header className="relative overflow-hidden">
          <DotGrid />
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <motion.div
                variants={fade}
                initial="hidden"
                animate="show"
                transition={{ duration: 0.6 }}
              >
                <div className="flex flex-wrap gap-2">
                  <Pill>
                    <MapPin className="mr-1 h-3.5 w-3.5" /> {brand.city}
                  </Pill>
                  <Pill>
                    <ShieldCheck className="mr-1 h-3.5 w-3.5" /> Evidence-based training
                  </Pill>
                  <Pill>
                    <Users className="mr-1 h-3.5 w-3.5" /> Community-first
                  </Pill>
                </div>

                <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                  Train with a coach who builds more than muscles—
                  <span className="text-slate-500 dark:text-slate-300"> builds you.</span>
                </h1>
                <p className="mt-4 max-w-xl text-pretty text-base text-slate-600 dark:text-slate-300 sm:text-lg">
                  {brand.tagline} Whether you want fat loss, strength, or performance,
                  you’ll get a structured plan, real coaching, and a culture that keeps you consistent.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button size="lg" onClick={() => setBookOpen(true)}>
                    Book a free call <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => {
                      const el = document.querySelector("#services");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    View programs <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-3">
                  <Stat label="Average sessions/week" value="2–3" />
                  <Stat label="Typical results window" value="4–8 wks" />
                  <Stat label="Focus" value="Strength + conditioning" />
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <Button
                    variant="ghost"
                    className="px-2"
                    onClick={() => setDark((d) => !d)}
                  >
                    {dark ? "Switch to light" : "Switch to dark"}
                  </Button>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Tip: keep your brand colors in Tailwind config.
                  </span>
                </div>
              </motion.div>

              <motion.div
                variants={fade}
                initial="hidden"
                animate="show"
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className="relative overflow-hidden rounded-3xl border-slate-200/70 bg-white/70 shadow-lg backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/60">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(148,163,184,0.18),transparent_55%)]" />
                  <CardHeader className="relative">
                    <CardTitle className="text-xl">Your 14-day kickoff</CardTitle>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      A simple, structured start that creates momentum.
                    </p>
                  </CardHeader>
                  <CardContent className="relative grid gap-4">
                    <div className="grid gap-2">
                      {["Assessment + goals", "2 workouts/week", "Daily habit focus", "Progress check"].map(
                        (t) => (
                          <div
                            key={t}
                            className="flex items-center gap-2 rounded-2xl border border-slate-200/70 bg-white/60 p-3 text-sm dark:border-slate-800/80 dark:bg-slate-950/40"
                          >
                            <span className="grid h-7 w-7 place-items-center rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                              <Check className="h-4 w-4" />
                            </span>
                            <span className="text-slate-700 dark:text-slate-200">{t}</span>
                          </div>
                        )
                      )}
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="rounded-2xl">
                          <Play className="mr-2 h-4 w-4" /> Watch how it works
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Quick overview</DialogTitle>
                          <DialogDescription>
                            Replace this with an embedded video (YouTube/Vimeo) when you publish.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="aspect-video w-full rounded-2xl border border-slate-200/70 bg-slate-100 dark:border-slate-800/80 dark:bg-slate-900/40" />
                      </DialogContent>
                    </Dialog>

                    <div className="rounded-2xl border border-slate-200/70 bg-white/60 p-4 text-sm text-slate-600 dark:border-slate-800/80 dark:bg-slate-950/40 dark:text-slate-300">
                      <strong className="text-slate-900 dark:text-white">No guesswork.</strong> You’ll know what to do each week, why you’re doing it, and how to progress.
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </header>

        {/* Services */}
        <section id="services" className="border-t border-slate-200/60 dark:border-slate-800/70">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <SectionHeading
              eyebrow="Programs"
              title="Coaching options that fit your life"
              desc="Choose the level of support you want—then we build the plan around your goals, schedule, and starting point."
            />

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((s) => (
                <Card
                  key={s.title}
                  className="rounded-3xl border-slate-200/70 bg-white/70 shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/60"
                >
                  <CardHeader>
                    <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">{s.title}</CardTitle>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{s.desc}</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="grid gap-2 text-sm text-slate-700 dark:text-slate-200">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2">
                          <Check className="h-4 w-4" /> {b}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" onClick={() => setBookOpen(true)}>
                Get matched to a program <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  const el = document.querySelector("#pricing");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                See pricing
              </Button>
            </div>
          </div>
        </section>

        {/* Results / Social Proof */}
        <section id="results" className="border-t border-slate-200/60 dark:border-slate-800/70">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <SectionHeading
              eyebrow="Results"
              title="Real coaching that keeps you consistent"
              desc="Technique, structure, and a culture that makes showing up easier than skipping."
            />

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {testimonials.map((t) => (
                <Card
                  key={t.name}
                  className="rounded-3xl border-slate-200/70 bg-white/70 shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/60"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base">{t.name}</CardTitle>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{t.role}</p>
                      </div>
                      <div className="flex gap-0.5" aria-label={`${t.stars} star rating`}>
                        {Array.from({ length: t.stars }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-700 dark:text-slate-200">“{t.quote}”</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <Card className="rounded-3xl border-slate-200/70 bg-white/70 shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/60">
                <CardHeader>
                  <CardTitle className="text-lg">What you’ll build</CardTitle>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Not a temporary push—skills and systems you keep.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2 text-sm">
                    {["Strength + muscle", "Better conditioning", "Confidence + momentum", "Consistency habits"].map(
                      (x) => (
                        <div key={x} className="flex items-center gap-2">
                          <span className="grid h-7 w-7 place-items-center rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                            <Check className="h-4 w-4" />
                          </span>
                          <span className="text-slate-700 dark:text-slate-200">{x}</span>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-slate-200/70 bg-white/70 shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/60">
                <CardHeader>
                  <CardTitle className="text-lg">Coach’s promise</CardTitle>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Clear plan, honest coaching, and respect.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 text-sm text-slate-700 dark:text-slate-200">
                    <div className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4" />
                      <span>
                        You’ll always know what to do next—no random workouts.
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4" />
                      <span>
                        Coaching that scales to your life (stress, schedule, injuries).
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4" />
                      <span>
                        Culture-first training: you’ll feel supported, not judged.
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-t border-slate-200/60 dark:border-slate-800/70">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <SectionHeading
              eyebrow="Pricing"
              title="Simple packages—pick your level of support"
              desc="Replace these with your real prices. Keep it easy to understand, and strong on outcomes."
            />

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {pricing.map((p) => (
                <Card
                  key={p.name}
                  className={cn(
                    "rounded-3xl border-slate-200/70 bg-white/70 shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/60",
                    p.popular
                      ? "ring-2 ring-slate-900 dark:ring-white"
                      : ""
                  )}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{p.name}</CardTitle>
                      {p.popular ? <Badge>Most popular</Badge> : null}
                    </div>
                    <div className="mt-2 flex items-end gap-1">
                      <div className="text-4xl font-semibold tracking-tight">
                        {p.price}
                      </div>
                      <div className="pb-1 text-sm text-slate-600 dark:text-slate-300">
                        {p.cadence}
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{p.note}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid gap-2 text-sm text-slate-700 dark:text-slate-200">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-center gap-2">
                          <Check className="h-4 w-4" /> {f}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="mt-5 w-full"
                      variant={p.popular ? "default" : "outline"}
                      onClick={() => setBookOpen(true)}
                    >
                      Choose {p.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 rounded-3xl border border-slate-200/70 bg-white/70 p-6 text-sm text-slate-600 shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/60 dark:text-slate-300">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="font-medium text-slate-900 dark:text-white">
                    Want in-person sessions?
                  </div>
                  <div>
                    In-person pricing depends on session frequency and location.
                  </div>
                </div>
                <Button variant="outline" onClick={() => setBookOpen(true)}>
                  Get a quote
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t border-slate-200/60 dark:border-slate-800/70">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
            <SectionHeading
              eyebrow="FAQ"
              title="Answers, upfront"
              desc="If you’ve got questions, you’re normal. Here are the big ones."
            />

            <div className="mt-10">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((f, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`}>
                    <AccordionTrigger className="text-left">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 dark:text-slate-300">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="border-t border-slate-200/60 dark:border-slate-800/70">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <SectionHeading
              eyebrow="Contact"
              title="Let’s get you started"
              desc="Send a message, or book a free call. We’ll map the simplest plan to your goal."
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <Card className="rounded-3xl border-slate-200/70 bg-white/70 shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/60">
                <CardHeader>
                  <CardTitle className="text-lg">Message</CardTitle>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    This form is front-end only in this demo. Hook it to a form tool when you publish.
                  </p>
                </CardHeader>
                <CardContent>
                  <form
                    className="grid gap-3"
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert(
                        "Message sent! (Demo) Connect to Formspree/Tally/HubSpot to receive submissions."
                      );
                    }}
                  >
                    <div className="grid gap-2 sm:grid-cols-2">
                      <div className="grid gap-1">
                        <label className="text-sm font-medium">Name</label>
                        <Input placeholder="Your name" required />
                      </div>
                      <div className="grid gap-1">
                        <label className="text-sm font-medium">Email</label>
                        <Input type="email" placeholder="you@email.com" required />
                      </div>
                    </div>
                    <div className="grid gap-1">
                      <label className="text-sm font-medium">Message</label>
                      <Textarea placeholder="Tell me your goal and current schedule." required />
                    </div>
                    <Button type="submit">
                      Send message <Mail className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="grid gap-4">
                <Card className="rounded-3xl border-slate-200/70 bg-white/70 shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/60">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick links</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-3 text-sm text-slate-700 dark:text-slate-200">
                    <a
                      className="flex items-center gap-2 rounded-2xl border border-slate-200/70 bg-white/60 p-3 hover:bg-white/80 dark:border-slate-800/80 dark:bg-slate-950/40 dark:hover:bg-slate-950/70"
                      href={`mailto:${brand.email}`}
                    >
                      <Mail className="h-4 w-4" /> {brand.email}
                    </a>
                    <a
                      className="flex items-center gap-2 rounded-2xl border border-slate-200/70 bg-white/60 p-3 hover:bg-white/80 dark:border-slate-800/80 dark:bg-slate-950/40 dark:hover:bg-slate-950/70"
                      href={`tel:${brand.phone.replace(/[^0-9+]/g, "")}`}
                    >
                      <Phone className="h-4 w-4" /> {brand.phone}
                    </a>
                    <a
                      className="flex items-center gap-2 rounded-2xl border border-slate-200/70 bg-white/60 p-3 hover:bg-white/80 dark:border-slate-800/80 dark:bg-slate-950/40 dark:hover:bg-slate-950/70"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setBookOpen(true);
                      }}
                    >
                      <Calendar className="h-4 w-4" /> Book a free call
                      <ArrowRight className="ml-auto h-4 w-4" />
                    </a>
                    <a
                      className="flex items-center gap-2 rounded-2xl border border-slate-200/70 bg-white/60 p-3 hover:bg-white/80 dark:border-slate-800/80 dark:bg-slate-950/40 dark:hover:bg-slate-950/70"
                      href={`https://instagram.com/${brand.instagram}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Instagram className="h-4 w-4" /> @{brand.instagram}
                      <ArrowRight className="ml-auto h-4 w-4" />
                    </a>
                  </CardContent>
                </Card>

                <Card className="rounded-3xl border-slate-200/70 bg-white/70 shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/60">
                  <CardHeader>
                    <CardTitle className="text-lg">Location</CardTitle>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Update with your gym / studio address.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-2xl border border-slate-200/70 bg-slate-100 p-4 text-sm text-slate-700 dark:border-slate-800/80 dark:bg-slate-900/40 dark:text-slate-200">
                      <div className="flex items-start gap-2">
                        <MapPin className="mt-0.5 h-4 w-4" />
                        <div>
                          <div className="font-medium">{brand.city}</div>
                          <div className="text-slate-600 dark:text-slate-300">
                            Add address + Google Maps embed
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-200/60 dark:border-slate-800/70">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-slate-600 dark:text-slate-300 sm:px-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="font-medium text-slate-900 dark:text-white">{brand.name}</div>
              <div>© {new Date().getFullYear()} • All rights reserved.</div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => setBookOpen(true)}>
                Book a call
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setDark((d) => !d)}>
                {dark ? "Light mode" : "Dark mode"}
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
