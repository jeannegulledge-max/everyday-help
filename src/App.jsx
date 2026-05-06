import React, { useState, useEffect } from "react";
import {
  Search, Star, Clock, Shield, Sparkles, ArrowRight, ArrowLeft, Check,
  CheckCircle2, MapPin, Calendar, Heart, Menu, X, ShoppingBag, Home,
  Shirt, PawPrint, Trash2, Mail, Bed, UtensilsCrossed, Boxes, HandHeart,
  Phone, ChevronRight, Award, FileCheck, IdCard, CreditCard, Camera,
  Lock, Users, DollarSign, Zap, Crown,
} from "lucide-react";

// ============ THEME ============
const ink = "#1F1B16";
const cream = "#F5EDDB";
const cream2 = "#EDE2C4";
const clay = "#C5563B";
const clayDark = "#9C3E27";
const sage = "#6E8161";
const butter = "#E8B956";
const muted = "#7A6F5C";
const line = "#D9CBAC";

const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
  .display { font-family: 'Fraunces', Georgia, serif; letter-spacing: -0.015em; }
  .body { font-family: 'DM Sans', system-ui, sans-serif; }
  .grain {
    background-image: radial-gradient(rgba(31,27,22,0.04) 1px, transparent 1px), radial-gradient(rgba(31,27,22,0.03) 1px, transparent 1px);
    background-size: 3px 3px, 7px 7px; background-position: 0 0, 1px 1px;
  }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  .fade-up { animation: fadeUp 0.6s ease-out both; }
  .stagger-1 { animation-delay: 0.05s; }
  .stagger-2 { animation-delay: 0.15s; }
  .stagger-3 { animation-delay: 0.25s; }
  .stagger-4 { animation-delay: 0.35s; }
  @keyframes drift { 0%, 100% { transform: translate(0,0) rotate(0deg); } 50% { transform: translate(8px,-6px) rotate(2deg); } }
  .drift { animation: drift 9s ease-in-out infinite; }
  .btn-press { transition: transform 0.15s ease; }
  .btn-press:active { transform: translateY(1px); }
  input[type="range"] { accent-color: ${clay}; }
`;

// ============ DATA ============

const TRUST_PROMISES = [
  { icon: FileCheck, label: "Fingerprint background checked" },
  { icon: Shield, label: "Drug screened & references verified" },
  { icon: IdCard, label: "Customers ID-verified at signup" },
  { icon: Award, label: "Insured, bonded & branded" },
];

const TASK_CATEGORIES = [
  { icon: Shirt, label: "Laundry" },
  { icon: Boxes, label: "Organizing" },
  { icon: ShoppingBag, label: "Errands" },
  { icon: UtensilsCrossed, label: "Kitchen reset" },
  { icon: PawPrint, label: "Pet care" },
  { icon: Bed, label: "Linens & beds" },
  { icon: Trash2, label: "Trash & tidying" },
  { icon: HandHeart, label: "Senior visits" },
];

const HELPERS = [
  {
    id: 1, name: "Maya R.", initials: "MR", color: clay,
    title: "Organizing & Home Reset", rate: 32, rating: 4.96, reviews: 213,
    distance: 1.2, jobs: 387, verified: ["ID", "Background", "Drug", "References", "Insured"],
    skills: ["Closet organization", "Laundry & folding", "Kitchen reset", "Move-in unpacking"],
    bio: "Eight years organizing homes across Little Rock. I bring my own supplies, work fast and quiet, and treat your space like it's mine.",
    availability: "This week",
  },
  {
    id: 2, name: "Devon K.", initials: "DK", color: sage,
    title: "Errands & Heavy Lifting", rate: 28, rating: 4.92, reviews: 156,
    distance: 2.4, jobs: 241, verified: ["ID", "Background", "Drug", "References", "Driving", "Insured"],
    skills: ["Grocery pickup", "Pharmacy runs", "Furniture moves", "Donation drop-offs"],
    bio: "Pickup truck, dollies, and patience included. If it needs doing, picking up, or hauling — I've got it.",
    availability: "Today",
  },
  {
    id: 3, name: "Priya S.", initials: "PS", color: clayDark,
    title: "Senior Companionship & Errands", rate: 30, rating: 5.0, reviews: 94,
    distance: 0.8, jobs: 162, verified: ["ID", "Background", "Drug", "References", "Driving", "Insured"],
    skills: ["Senior check-ins", "Appointment rides", "Pharmacy runs", "Light meal prep"],
    bio: "Former in-home caregiver. I make seniors and post-surgery folks feel cared for, not managed. Patient, kind, and reliable.",
    availability: "This week",
  },
  {
    id: 4, name: "Marcus T.", initials: "MT", color: butter,
    title: "Move-Ins & Heavy Organizing", rate: 38, rating: 4.88, reviews: 178,
    distance: 3.1, jobs: 304, verified: ["ID", "Background", "Drug", "References", "Insured"],
    skills: ["Move-in setup", "Garage organization", "Seasonal decorating", "Furniture assembly"],
    bio: "Twenty years in service work. I show up early, work clean, and leave a recap so you know exactly what got done.",
    availability: "Next week",
  },
  {
    id: 5, name: "Sarah B.", initials: "SB", color: sage,
    title: "Home Reset & Organizing", rate: 30, rating: 4.95, reviews: 87,
    distance: 1.8, jobs: 132, verified: ["ID", "Background", "Drug", "References", "Insured"],
    skills: ["Laundry", "Kitchen reset", "Closet organization", "Pet care"],
    bio: "Mom of two who knows what an overwhelmed household feels like. No judgment, just help.",
    availability: "This week",
  },
  {
    id: 6, name: "James W.", initials: "JW", color: clay,
    title: "Errands & Pet Care", rate: 26, rating: 4.91, reviews: 64,
    distance: 4.2, jobs: 89, verified: ["ID", "Background", "Drug", "References", "Driving", "Insured"],
    skills: ["Pet errands", "Dog walks", "Grocery pickup", "Appointment assistance"],
    bio: "UCA student, dog dad, completely reliable. Especially good with anxious pups and senior pets.",
    availability: "Weekends",
  },
];

const REVIEWS = [
  { name: "Sarah L.", rating: 5, text: "Maya turned my chaos kitchen into a magazine spread in three hours. Already booked her again.", date: "2 weeks ago" },
  { name: "James P.", rating: 5, text: "Showed up early, worked steadily, didn't try to upsell me. Refreshing.", date: "1 month ago" },
  { name: "Amelia R.", rating: 4, text: "Great work overall. Took a little longer than estimated but quality was excellent.", date: "1 month ago" },
];

const PLANS = [
  {
    id: "free", name: "Free Member", price: 0, tagline: "Try us out, no commitment",
    color: cream2, text: ink,
    features: [
      { t: "Account & saved payment", on: true },
      { t: "Browse & book any helper", on: true },
      { t: "Standard $14 booking fees apply", on: false },
      { t: "Standard booking window", on: true },
      { t: "Helper assigned by category", on: true },
    ],
    cta: "Sign up free",
  },
  {
    id: "member", name: "Member", price: 15, tagline: "Pays for itself in 1–2 bookings",
    color: clay, text: cream, popular: true,
    features: [
      { t: "Everything in Free, plus:", on: true, header: true },
      { t: "All booking fees waived ($14 saved per booking)", on: true },
      { t: "Favorite & request helpers", on: true },
      { t: "48-hour priority booking window", on: true },
      { t: "1 free late cancellation per month", on: true },
      { t: "Recurring auto-scheduling", on: true },
    ],
    cta: "Become a Member",
  },
  {
    id: "plus", name: "Member+", price: 35, tagline: "For households who use us a lot",
    color: ink, text: cream,
    features: [
      { t: "Everything in Member, plus:", on: true, header: true },
      { t: "Concierge match — text or call to book", on: true },
      { t: "Unlimited free late cancellations", on: true },
      { t: "Access to Member+ exclusive helpers", on: true },
      { t: "Priority customer support", on: true },
      { t: "Activation fee waived ($25 value)", on: true },
    ],
    cta: "Go Member+",
  },
];

const TESTIMONIALS = [
  { name: "Rachel T.", role: "Mom of three, Little Rock", text: "Found Maya through Everyday Help six months ago. She's basically family now. The Member subscription pays for itself by week two." },
  { name: "Bill & Marjorie K.", role: "Retired, North Little Rock", text: "Same helper every visit. She brings in mail, runs us to the pharmacy, sometimes just sits and chats. Worth every penny." },
  { name: "James P.", role: "Recovering from surgery, Conway", text: "Member+ during my recovery — the concierge feature was a lifesaver. Texted what I needed, they sent the right person." },
];

// ============ LOGO ============

function Logo({ size = "md", color }) {
  const sizes = { sm: 20, md: 26, lg: 36 };
  const c = color || ink;
  return (
    <div className="flex items-center gap-2">
      <svg width={sizes[size]} height={sizes[size]} viewBox="0 0 32 32" fill="none">
        <path d="M5 16 L16 6 L27 16 L27 26 L20 26 L20 19 L12 19 L12 26 L5 26 Z" stroke={c} strokeWidth="1.5" fill="none" strokeLinejoin="round" />
        <circle cx="16" cy="22" r="2.2" fill={clay} />
      </svg>
      <span className="display font-medium tracking-tight" style={{ color: c, fontSize: size === "lg" ? 28 : size === "md" ? 21 : 17 }}>
        Everyday Help
      </span>
    </div>
  );
}

// ============ HEADER ============

function Header({ setView, onJoinHelper }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b body" style={{ background: cream + "F2", backdropFilter: "blur(8px)", borderColor: line }}>
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-4 flex items-center justify-between">
        <button onClick={() => setView("home")}><Logo /></button>
        <nav className="hidden md:flex items-center gap-7 text-sm" style={{ color: ink }}>
          <button onClick={() => setView("browse")} className="hover:opacity-70">Browse helpers</button>
          <button onClick={() => setView("pricing")} className="hover:opacity-70">Memberships</button>
          <button onClick={() => setView("trust")} className="hover:opacity-70">Our promise</button>
          <button onClick={onJoinHelper} className="hover:opacity-70">Become a helper</button>
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <button onClick={() => setView("signup")} className="text-sm hover:opacity-70" style={{ color: ink }}>Sign in</button>
          <button onClick={() => setView("signup")} className="text-sm px-5 py-2.5 rounded-full btn-press" style={{ background: ink, color: cream }}>
            Sign up free
          </button>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={22} color={ink} /> : <Menu size={22} color={ink} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t px-5 py-4 flex flex-col gap-4 text-sm" style={{ borderColor: line, color: ink }}>
          <button onClick={() => { setView("browse"); setOpen(false); }} className="text-left">Browse helpers</button>
          <button onClick={() => { setView("pricing"); setOpen(false); }} className="text-left">Memberships</button>
          <button onClick={() => { setView("trust"); setOpen(false); }} className="text-left">Our promise</button>
          <button onClick={() => { onJoinHelper(); setOpen(false); }} className="text-left">Become a helper</button>
          <button onClick={() => { setView("signup"); setOpen(false); }} className="text-sm px-5 py-2.5 rounded-full text-center mt-2" style={{ background: ink, color: cream }}>
            Sign up free
          </button>
        </div>
      )}
    </header>
  );
}

// ============ LANDING ============

function Landing({ setView, onJoinHelper, onPickHelper }) {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: cream }}>
        <div className="grain absolute inset-0 opacity-60 pointer-events-none" />
        <div className="absolute top-16 right-8 drift hidden md:block">
          <svg width="200" height="200" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="88" fill="none" stroke={clay} strokeWidth="1" opacity="0.25" />
            <circle cx="100" cy="100" r="60" fill="none" stroke={sage} strokeWidth="1" opacity="0.4" />
            <circle cx="100" cy="100" r="32" fill={butter} opacity="0.35" />
          </svg>
        </div>
        <div className="max-w-6xl mx-auto px-5 md:px-8 pt-14 pb-20 md:pt-20 md:pb-24 relative">
          <div className="max-w-3xl">
            <div className="fade-up inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs body font-medium" style={{ background: butter + "55", color: clayDark }}>
              <Sparkles size={12} /> Now serving Little Rock, North Little Rock & Conway
            </div>
            <h1 className="display fade-up stagger-1 text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.98] mb-7" style={{ color: ink }}>
              Help with the <span style={{ color: clay }}>everyday.</span>
            </h1>
            <p className="body fade-up stagger-2 text-lg md:text-xl max-w-xl leading-relaxed mb-9" style={{ color: muted }}>
              Browse vetted, branded, independent helpers in central Arkansas. Book a single visit or join a membership for ongoing help. Helpers set their own rates — we just bring you together safely.
            </p>
            <div className="fade-up stagger-3 flex flex-col sm:flex-row gap-3">
              <button onClick={() => setView("signup")} className="btn-press group flex items-center justify-center gap-2 px-7 py-4 rounded-full body font-medium" style={{ background: ink, color: cream }}>
                Sign up & browse helpers
                <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
              </button>
              <button onClick={() => setView("pricing")} className="btn-press flex items-center justify-center gap-2 px-7 py-4 rounded-full body font-medium border-2" style={{ borderColor: ink, color: ink, background: "transparent" }}>
                See memberships
              </button>
            </div>
            <div className="fade-up stagger-4 mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm body" style={{ color: muted }}>
              <div className="flex items-center gap-2"><Shield size={15} style={{ color: sage }} /><span>Both sides ID-verified</span></div>
              <div className="flex items-center gap-2"><Heart size={15} style={{ color: clay }} /><span>Favorite your helpers</span></div>
              <div className="flex items-center gap-2"><Star size={15} style={{ color: clay }} fill={clay} /><span>4.9 from real Arkansas families</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="py-8 border-y" style={{ background: ink, color: cream, borderColor: ink }}>
        <div className="max-w-6xl mx-auto px-5 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {TRUST_PROMISES.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.label} className="flex items-center gap-3">
                <Icon size={20} style={{ color: butter }} className="flex-shrink-0" />
                <span className="body text-sm" style={{ color: cream }}>{p.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 md:py-24" style={{ background: cream }}>
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <p className="body text-sm tracking-widest uppercase mb-3" style={{ color: clay, letterSpacing: "0.18em" }}>How it works</p>
          <h2 className="display text-4xl md:text-5xl font-medium mb-14 max-w-2xl" style={{ color: ink }}>Three steps. That's the whole thing.</h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              { n: "01", t: "Sign up & verify", d: "Quick ID check, payment method on file, and a few intake questions. Takes 5 minutes. Free to join." },
              { n: "02", t: "Browse & book", d: "See vetted helpers near you, their rates, skills, and reviews. Book the one whose vibe matches the job." },
              { n: "03", t: "Done & paid through us", d: "Helper arrives in branded gear, completes the work, and gets paid securely through Everyday Help. You rate the visit." },
            ].map((step) => (
              <div key={step.n}>
                <div className="display text-6xl font-light mb-5" style={{ color: clay }}>{step.n}</div>
                <h3 className="display text-2xl font-medium mb-3" style={{ color: ink }}>{step.t}</h3>
                <p className="body text-base leading-relaxed" style={{ color: muted }}>{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20 md:py-24" style={{ background: cream2 }}>
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <p className="body text-sm tracking-widest uppercase mb-3" style={{ color: clay, letterSpacing: "0.18em" }}>What we help with</p>
          <h2 className="display text-4xl md:text-5xl font-medium mb-12" style={{ color: ink }}>The everyday stuff that piles up.</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TASK_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <button key={cat.label} onClick={() => setView("browse")} className="p-6 rounded-2xl border text-left btn-press hover:-translate-y-1 transition" style={{ background: cream, borderColor: line }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3" style={{ background: clay + "20" }}>
                    <Icon size={20} style={{ color: clay }} />
                  </div>
                  <div className="display text-lg font-medium" style={{ color: ink }}>{cat.label}</div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED HELPERS */}
      <section className="py-20 md:py-24" style={{ background: cream }}>
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <p className="body text-sm tracking-widest uppercase mb-3" style={{ color: clay, letterSpacing: "0.18em" }}>Top-rated nearby</p>
              <h2 className="display text-4xl md:text-5xl font-medium" style={{ color: ink }}>Meet your helpers.</h2>
            </div>
            <button onClick={() => setView("browse")} className="body text-sm flex items-center gap-2 hover:gap-3 transition-all" style={{ color: ink }}>
              Browse all <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {HELPERS.slice(0, 4).map((h) => (
              <button key={h.id} onClick={() => onPickHelper(h)} className="text-left p-6 md:p-7 rounded-2xl border btn-press hover:-translate-y-1 transition-all" style={{ background: cream2, borderColor: line }}>
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 display font-medium text-xl" style={{ background: h.color, color: h.color === butter ? ink : cream }}>
                    {h.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="display text-xl font-medium" style={{ color: ink }}>{h.name}</h3>
                      <div className="flex items-center gap-1 text-sm body" style={{ color: ink }}>
                        <Star size={14} fill={clay} style={{ color: clay }} />
                        <span className="font-medium">{h.rating}</span>
                        <span style={{ color: muted }}>({h.reviews})</span>
                      </div>
                    </div>
                    <p className="body text-sm mb-3" style={{ color: muted }}>{h.title} · {h.distance} mi · {h.jobs} jobs</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {h.skills.slice(0, 3).map((s) => (
                        <span key={s} className="text-xs px-2.5 py-1 rounded-full body" style={{ background: cream, color: ink, border: `1px solid ${line}` }}>{s}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="display text-2xl font-medium" style={{ color: ink }}>
                        ${h.rate}<span className="body text-sm font-normal" style={{ color: muted }}>/hr</span>
                      </div>
                      <span className="body text-sm flex items-center gap-1" style={{ color: clay }}>
                        View profile <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP PREVIEW */}
      <section className="py-20 md:py-24" style={{ background: ink, color: cream }}>
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="max-w-2xl mb-12">
            <p className="body text-sm tracking-widest uppercase mb-3" style={{ color: butter, letterSpacing: "0.18em" }}>Memberships</p>
            <h2 className="display text-4xl md:text-5xl font-medium mb-5">Pay-as-you-go or save with membership.</h2>
            <p className="body text-lg leading-relaxed" style={{ color: cream + "BB" }}>
              Free to sign up and browse. Members skip the booking fees and get same-helper favorites. Use the math: a $15 Member subscription pays for itself in 2 bookings a month.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {PLANS.map((p) => (
              <div key={p.id} className="rounded-3xl p-7 flex flex-col" style={{ background: p.color === ink ? "#2A251D" : p.color, color: p.text, border: p.popular ? `2px solid ${butter}` : `1px solid ${line + "40"}` }}>
                {p.popular && <div className="mb-3 inline-block px-2.5 py-1 rounded-full body text-xs font-medium self-start" style={{ background: butter, color: ink }}>Most popular</div>}
                <div className="display text-2xl font-medium mb-1">{p.name}</div>
                <p className="body text-sm mb-5 opacity-80">{p.tagline}</p>
                <div className="display text-5xl font-medium mb-1">{p.price === 0 ? "Free" : `$${p.price}`}<span className="body text-base font-normal opacity-80">{p.price === 0 ? "" : "/mo"}</span></div>
                <div className="mt-5 flex-1"></div>
                <button onClick={() => setView("pricing")} className="w-full px-5 py-3 rounded-full body font-medium btn-press" style={{ background: p.text, color: p.color === ink ? ink : p.color === clay ? clay : ink }}>
                  See details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="py-20 md:py-24" style={{ background: cream2 }}>
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="max-w-2xl mb-12">
            <p className="body text-sm tracking-widest uppercase mb-3" style={{ color: clay, letterSpacing: "0.18em" }}>Who we help</p>
            <h2 className="display text-4xl md:text-5xl font-medium leading-tight mb-5" style={{ color: ink }}>Anyone who could use a hand.</h2>
            <p className="body text-lg leading-relaxed" style={{ color: muted }}>
              No one's earned a medal for doing it all alone.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["Busy parents", "Single parents", "Working professionals", "Seniors aging at home", "Post-surgery recovery", "New baby families", "Caregivers needing a break", "Anyone overwhelmed"].map((g) => (
              <div key={g} className="px-5 py-4 rounded-xl body text-sm" style={{ background: cream, color: ink, border: `1px solid ${line}` }}>{g}</div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 md:py-24" style={{ background: cream }}>
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <p className="body text-sm tracking-widest uppercase mb-3" style={{ color: clay, letterSpacing: "0.18em" }}>Real Arkansas families</p>
          <h2 className="display text-4xl md:text-5xl font-medium mb-12" style={{ color: ink }}>Trusted by people just like you.</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="p-7 rounded-2xl" style={{ background: cream2, border: `1px solid ${line}` }}>
                <div className="flex mb-4">{[...Array(5)].map((_, i) => <Star key={i} size={14} fill={clay} style={{ color: clay }} />)}</div>
                <p className="display text-lg leading-relaxed mb-5" style={{ color: ink }}>"{t.text}"</p>
                <div className="body text-sm font-medium" style={{ color: ink }}>{t.name}</div>
                <div className="body text-xs" style={{ color: muted }}>{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DUAL CTA */}
      <section className="py-20 md:py-24" style={{ background: cream2 }}>
        <div className="max-w-6xl mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-5">
          <div className="rounded-3xl p-10 md:p-12" style={{ background: clay, color: cream }}>
            <Sparkles size={36} className="mb-5 opacity-90" />
            <h3 className="display text-3xl md:text-4xl font-medium mb-4">Need a hand?</h3>
            <p className="body mb-7 leading-relaxed opacity-95">Sign up free, browse helpers in your zip code, book in minutes.</p>
            <button onClick={() => setView("signup")} className="btn-press inline-flex items-center gap-2 px-6 py-3 rounded-full body font-medium" style={{ background: cream, color: clayDark }}>
              Sign up free <ArrowRight size={16} />
            </button>
          </div>
          <div className="rounded-3xl p-10 md:p-12" style={{ background: sage, color: cream }}>
            <HandHeart size={36} className="mb-5 opacity-90" />
            <h3 className="display text-3xl md:text-4xl font-medium mb-4">Be your own boss.</h3>
            <p className="body mb-7 leading-relaxed opacity-95">Set your own rates, schedule, and skills. We bring the customers, you bring the work ethic.</p>
            <button onClick={onJoinHelper} className="btn-press inline-flex items-center gap-2 px-6 py-3 rounded-full body font-medium" style={{ background: cream, color: ink }}>
              Apply as a helper <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============ SIGNUP / VETTING ============

function Signup({ setView }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ tier: "" });
  const update = (k, v) => setData({ ...data, [k]: v });

  return (
    <div style={{ background: cream }}>
      <div className="max-w-2xl mx-auto px-5 md:px-8 py-10 md:py-16">
        <button onClick={() => setView("home")} className="body text-sm flex items-center gap-2 mb-6 hover:opacity-70" style={{ color: muted }}>
          <ArrowLeft size={14} /> Back home
        </button>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <div key={s} className="flex-1 h-1 rounded-full" style={{ background: s <= step ? clay : line }} />
            ))}
          </div>
          <div className="body text-xs" style={{ color: muted }}>Step {step} of 6 · Vetting takes about 5 minutes</div>
        </div>

        {step === 1 && (
          <div>
            <h2 className="display text-4xl md:text-5xl font-medium mb-3" style={{ color: ink }}>Welcome to Everyday Help.</h2>
            <p className="body text-lg mb-8 leading-relaxed" style={{ color: muted }}>
              We vet every customer and every helper before any booking happens. It's why both sides feel safe. Let's get you set up.
            </p>

            <div className="space-y-3 mb-8">
              {[
                { i: Mail, t: "Email & phone", d: "We'll send a verification code" },
                { i: IdCard, t: "Government ID + selfie", d: "Quick ID check, takes 30 seconds" },
                { i: Home, t: "Service address", d: "Must match your ID" },
                { i: CreditCard, t: "Payment method", d: "Card on file — no charge until you book" },
                { i: Users, t: "Household intake", d: "Pets, access notes, who's home" },
                { i: Check, t: "Code of conduct", d: "Mutual respect for helpers" },
              ].map((s, i) => {
                const Icon = s.i;
                return (
                  <div key={s.t} className="flex items-start gap-4 p-4 rounded-xl border" style={{ background: cream2, borderColor: line }}>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 body font-medium text-sm" style={{ background: ink, color: cream }}>{i + 1}</div>
                    <div className="flex-1">
                      <div className="display font-medium" style={{ color: ink }}>{s.t}</div>
                      <div className="body text-sm" style={{ color: muted }}>{s.d}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button onClick={() => setStep(2)} className="w-full px-6 py-4 rounded-full body font-medium btn-press flex items-center justify-center gap-2" style={{ background: ink, color: cream }}>
              Get started <ArrowRight size={16} />
            </button>
            <p className="body text-xs text-center mt-4" style={{ color: muted }}>Free to sign up. You can always upgrade to Member later.</p>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="display text-4xl font-medium mb-2" style={{ color: ink }}>Your contact info.</h2>
            <p className="body mb-8" style={{ color: muted }}>We'll text and email confirmations.</p>

            <div className="space-y-4">
              <div>
                <label className="block body text-sm font-medium mb-2" style={{ color: ink }}>Full name</label>
                <input className="w-full p-4 rounded-2xl border body text-base outline-none" style={{ background: cream2, borderColor: line, color: ink }} />
              </div>
              <div>
                <label className="block body text-sm font-medium mb-2" style={{ color: ink }}>Email</label>
                <input type="email" className="w-full p-4 rounded-2xl border body text-base outline-none" style={{ background: cream2, borderColor: line, color: ink }} />
              </div>
              <div>
                <label className="block body text-sm font-medium mb-2" style={{ color: ink }}>Phone</label>
                <input type="tel" placeholder="(501) 555-0123" className="w-full p-4 rounded-2xl border body text-base outline-none" style={{ background: cream2, borderColor: line, color: ink }} />
                <p className="body text-xs mt-2" style={{ color: muted }}>We'll text a verification code.</p>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button onClick={() => setStep(1)} className="px-6 py-4 rounded-full body font-medium border-2" style={{ borderColor: ink, color: ink }}>Back</button>
              <button onClick={() => setStep(3)} className="flex-1 px-6 py-4 rounded-full body font-medium btn-press flex items-center justify-center gap-2" style={{ background: ink, color: cream }}>
                Continue <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="display text-4xl font-medium mb-2" style={{ color: ink }}>Verify your identity.</h2>
            <p className="body mb-8" style={{ color: muted }}>Quick ID check protects you and your helper. We use bank-grade verification.</p>

            <div className="space-y-3">
              <button className="w-full p-6 rounded-2xl border-2 text-left btn-press flex items-center gap-4" style={{ background: cream2, borderColor: line }}>
                <Camera size={24} style={{ color: clay }} />
                <div className="flex-1">
                  <div className="display font-medium" style={{ color: ink }}>Scan your driver's license</div>
                  <div className="body text-sm" style={{ color: muted }}>Front and back · 30 seconds</div>
                </div>
                <ArrowRight size={18} style={{ color: muted }} />
              </button>
              <button className="w-full p-6 rounded-2xl border-2 text-left btn-press flex items-center gap-4" style={{ background: cream2, borderColor: line }}>
                <Camera size={24} style={{ color: clay }} />
                <div className="flex-1">
                  <div className="display font-medium" style={{ color: ink }}>Take a selfie</div>
                  <div className="body text-sm" style={{ color: muted }}>Match your face to your ID</div>
                </div>
                <ArrowRight size={18} style={{ color: muted }} />
              </button>
            </div>

            <div className="mt-6 p-4 rounded-xl flex items-start gap-3" style={{ background: sage + "20" }}>
              <Lock size={16} style={{ color: sage }} className="flex-shrink-0 mt-0.5" />
              <p className="body text-sm" style={{ color: ink }}>Your ID is encrypted and never shown to helpers. We delete the image after verification.</p>
            </div>

            <div className="flex gap-3 mt-8">
              <button onClick={() => setStep(2)} className="px-6 py-4 rounded-full body font-medium border-2" style={{ borderColor: ink, color: ink }}>Back</button>
              <button onClick={() => setStep(4)} className="flex-1 px-6 py-4 rounded-full body font-medium btn-press flex items-center justify-center gap-2" style={{ background: ink, color: cream }}>
                Continue <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="display text-4xl font-medium mb-2" style={{ color: ink }}>Your address.</h2>
            <p className="body mb-8" style={{ color: muted }}>Where helpers will be visiting. Must match the address on your ID. No PO boxes.</p>

            <div className="space-y-4">
              <div>
                <label className="block body text-sm font-medium mb-2" style={{ color: ink }}>Street address</label>
                <input placeholder="123 Main St" className="w-full p-4 rounded-2xl border body text-base outline-none" style={{ background: cream2, borderColor: line, color: ink }} />
              </div>
              <div>
                <label className="block body text-sm font-medium mb-2" style={{ color: ink }}>Apt / unit (optional)</label>
                <input className="w-full p-4 rounded-2xl border body text-base outline-none" style={{ background: cream2, borderColor: line, color: ink }} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block body text-sm font-medium mb-2" style={{ color: ink }}>City</label>
                  <select className="w-full p-4 rounded-2xl border body text-base outline-none" style={{ background: cream2, borderColor: line, color: ink }}>
                    <option>Little Rock</option>
                    <option>North Little Rock</option>
                    <option>Conway</option>
                  </select>
                </div>
                <div>
                  <label className="block body text-sm font-medium mb-2" style={{ color: ink }}>ZIP</label>
                  <input placeholder="72201" className="w-full p-4 rounded-2xl border body text-base outline-none" style={{ background: cream2, borderColor: line, color: ink }} />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button onClick={() => setStep(3)} className="px-6 py-4 rounded-full body font-medium border-2" style={{ borderColor: ink, color: ink }}>Back</button>
              <button onClick={() => setStep(5)} className="flex-1 px-6 py-4 rounded-full body font-medium btn-press flex items-center justify-center gap-2" style={{ background: ink, color: cream }}>
                Continue <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="display text-4xl font-medium mb-2" style={{ color: ink }}>Tell us about your home.</h2>
            <p className="body mb-8" style={{ color: muted }}>This helps your helper come prepared and stay safe.</p>

            <div className="space-y-5">
              <div>
                <label className="block body text-sm font-medium mb-2" style={{ color: ink }}>Household size</label>
                <select className="w-full p-4 rounded-2xl border body text-base outline-none" style={{ background: cream2, borderColor: line, color: ink }}>
                  <option>Just me</option>
                  <option>2 adults</option>
                  <option>Family with kids</option>
                  <option>Multi-generational</option>
                </select>
              </div>
              <div>
                <label className="block body text-sm font-medium mb-2" style={{ color: ink }}>Pets in the home? (select all)</label>
                <div className="flex flex-wrap gap-2">
                  {["No pets", "Friendly dog", "Reactive dog", "Cat(s)", "Other"].map((p) => (
                    <button key={p} className="px-4 py-2 rounded-full body text-sm border-2" style={{ borderColor: line, background: cream2, color: ink }}>{p}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block body text-sm font-medium mb-2" style={{ color: ink }}>Anything we should know?</label>
                <textarea rows={4} placeholder="e.g., Side door access, alarm code provided after booking, dog needs to be put in crate first." className="w-full p-4 rounded-2xl border body text-base outline-none" style={{ background: cream2, borderColor: line, color: ink }} />
              </div>
              <div>
                <label className="block body text-sm font-medium mb-2" style={{ color: ink }}>Anyone else in the home during visits? (optional)</label>
                <input placeholder="e.g., elderly parent, kids home from school, partner works from home" className="w-full p-4 rounded-2xl border body text-base outline-none" style={{ background: cream2, borderColor: line, color: ink }} />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button onClick={() => setStep(4)} className="px-6 py-4 rounded-full body font-medium border-2" style={{ borderColor: ink, color: ink }}>Back</button>
              <button onClick={() => setStep(6)} className="flex-1 px-6 py-4 rounded-full body font-medium btn-press flex items-center justify-center gap-2" style={{ background: ink, color: cream }}>
                Continue <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {step === 6 && (
          <div>
            <h2 className="display text-4xl font-medium mb-2" style={{ color: ink }}>Payment & code of conduct.</h2>
            <p className="body mb-8" style={{ color: muted }}>Card on file lets you book in one tap. We don't charge until 24 hrs before your visit.</p>

            <label className="block body text-sm font-medium mb-2" style={{ color: ink }}>Card on file</label>
            <div className="p-5 rounded-2xl border-2 mb-6 flex items-center gap-3" style={{ background: cream2, borderColor: line }}>
              <CreditCard size={20} style={{ color: muted }} />
              <input placeholder="Card number" className="flex-1 bg-transparent outline-none body text-base" style={{ color: ink }} />
            </div>

            <div className="p-5 rounded-2xl mb-6" style={{ background: cream2, border: `1px solid ${line}` }}>
              <div className="display font-medium mb-3" style={{ color: ink }}>Code of conduct</div>
              <ul className="body text-sm space-y-2" style={{ color: muted }}>
                <li className="flex gap-2"><Check size={14} className="mt-1 flex-shrink-0" style={{ color: sage }} /><span>Treat helpers with respect — they're independent professionals.</span></li>
                <li className="flex gap-2"><Check size={14} className="mt-1 flex-shrink-0" style={{ color: sage }} /><span>No requests outside the booked scope (no childcare, medical, or unsafe tasks).</span></li>
                <li className="flex gap-2"><Check size={14} className="mt-1 flex-shrink-0" style={{ color: sage }} /><span>Helpers may report concerns. Two reports trigger account review.</span></li>
                <li className="flex gap-2"><Check size={14} className="mt-1 flex-shrink-0" style={{ color: sage }} /><span>Tipping is welcome but never expected.</span></li>
              </ul>
              <label className="flex items-center gap-2 mt-4 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
                <span className="body text-sm" style={{ color: ink }}>I agree to the code of conduct and Terms of Service</span>
              </label>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(5)} className="px-6 py-4 rounded-full body font-medium border-2" style={{ borderColor: ink, color: ink }}>Back</button>
              <button onClick={() => setView("welcome")} className="flex-1 px-6 py-4 rounded-full body font-medium btn-press flex items-center justify-center gap-2" style={{ background: clay, color: cream }}>
                Complete signup <Check size={16} />
              </button>
            </div>
            <p className="body text-xs text-center mt-4" style={{ color: muted }}>$25 one-time activation charged at first booking. Free to browse.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Welcome({ setView }) {
  return (
    <div style={{ background: cream, minHeight: "70vh" }} className="flex items-center justify-center">
      <div className="max-w-md text-center px-5 py-16">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: sage }}>
          <Check size={36} color={cream} />
        </div>
        <h2 className="display text-4xl font-medium mb-4" style={{ color: ink }}>You're verified!</h2>
        <p className="body text-base leading-relaxed mb-8" style={{ color: muted }}>
          Welcome to Everyday Help. You're a Free Member — start browsing helpers in your area.
        </p>
        <div className="flex flex-col gap-3">
          <button onClick={() => setView("browse")} className="px-6 py-3 rounded-full body font-medium btn-press" style={{ background: ink, color: cream }}>
            Browse helpers
          </button>
          <button onClick={() => setView("pricing")} className="px-6 py-3 rounded-full body font-medium" style={{ color: ink }}>
            Or upgrade to Member →
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ BROWSE ============

function Browse({ setView, onPickHelper }) {
  const [activeCat, setActiveCat] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  return (
    <div style={{ background: cream }}>
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-14">
        <button onClick={() => setView("home")} className="body text-sm flex items-center gap-2 mb-6 hover:opacity-70" style={{ color: muted }}>
          <ArrowLeft size={14} /> Back home
        </button>
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <p className="body text-sm tracking-widest uppercase mb-2" style={{ color: clay, letterSpacing: "0.18em" }}>Browse helpers</p>
            <h1 className="display text-4xl md:text-5xl font-medium" style={{ color: ink }}>Helpers near you.</h1>
          </div>
          <div className="flex items-center gap-2 body text-sm">
            <MapPin size={14} style={{ color: muted }} />
            <span style={{ color: ink }}>Little Rock, AR</span>
          </div>
        </div>

        {/* Member upgrade banner */}
        <div className="mb-6 p-4 rounded-2xl flex items-center justify-between gap-4 flex-wrap" style={{ background: clay + "15", border: `1px solid ${clay + "40"}` }}>
          <div className="flex items-center gap-3">
            <Crown size={18} style={{ color: clay }} />
            <span className="body text-sm" style={{ color: ink }}>You're a Free Member. Upgrade to Member ($15/mo) to skip booking fees and favorite helpers.</span>
          </div>
          <button onClick={() => setView("pricing")} className="body text-sm font-medium px-4 py-2 rounded-full btn-press whitespace-nowrap" style={{ background: clay, color: cream }}>
            See plans
          </button>
        </div>

        {/* Search */}
        <div className="mb-6 flex gap-3 flex-wrap">
          <div className="flex-1 min-w-[260px] flex items-center gap-3 px-5 py-4 rounded-full border" style={{ background: cream2, borderColor: line }}>
            <Search size={18} style={{ color: muted }} />
            <input placeholder="What do you need help with?" className="flex-1 bg-transparent outline-none body text-base" style={{ color: ink }} />
          </div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-5 py-4 rounded-full border body text-sm cursor-pointer" style={{ background: cream2, borderColor: line, color: ink }}>
            <option value="rating">Top rated</option>
            <option value="price">Lowest price</option>
            <option value="distance">Closest</option>
          </select>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 flex-wrap mb-8">
          <button onClick={() => setActiveCat("all")} className="px-4 py-2 rounded-full body text-sm transition border-2" style={{ background: activeCat === "all" ? ink : "transparent", color: activeCat === "all" ? cream : ink, borderColor: activeCat === "all" ? ink : line }}>
            All categories
          </button>
          {TASK_CATEGORIES.map((cat) => (
            <button key={cat.label} onClick={() => setActiveCat(cat.label)} className="px-4 py-2 rounded-full body text-sm transition border-2" style={{ background: activeCat === cat.label ? ink : "transparent", color: activeCat === cat.label ? cream : ink, borderColor: activeCat === cat.label ? ink : line }}>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Helper cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {HELPERS.map((h) => (
            <button key={h.id} onClick={() => onPickHelper(h)} className="text-left p-6 md:p-7 rounded-2xl border btn-press hover:-translate-y-1 transition-all" style={{ background: cream2, borderColor: line }}>
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 display font-medium text-xl" style={{ background: h.color, color: h.color === butter ? ink : cream }}>
                  {h.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="display text-xl font-medium" style={{ color: ink }}>{h.name}</h3>
                    <div className="flex items-center gap-1 text-sm body" style={{ color: ink }}>
                      <Star size={14} fill={clay} style={{ color: clay }} />
                      <span className="font-medium">{h.rating}</span>
                    </div>
                  </div>
                  <p className="body text-sm mb-3" style={{ color: muted }}>{h.title} · {h.distance} mi · {h.jobs} jobs</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {h.skills.slice(0, 3).map((s) => (
                      <span key={s} className="text-xs px-2.5 py-1 rounded-full body" style={{ background: cream, color: ink, border: `1px solid ${line}` }}>{s}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="display text-2xl font-medium" style={{ color: ink }}>
                      ${h.rate}<span className="body text-sm font-normal" style={{ color: muted }}>/hr</span>
                    </div>
                    <span className="body text-xs flex items-center gap-1" style={{ color: sage }}>
                      <Clock size={12} /> {h.availability}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ HELPER PROFILE ============

function Profile({ helper, setView, onBook }) {
  if (!helper) return null;
  return (
    <div style={{ background: cream }}>
      <div className="max-w-5xl mx-auto px-5 md:px-8 py-10 md:py-14">
        <button onClick={() => setView("browse")} className="body text-sm flex items-center gap-2 mb-8 hover:opacity-70" style={{ color: muted }}>
          <ArrowLeft size={14} /> Back to helpers
        </button>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          <div className="md:col-span-2">
            <div className="flex items-start gap-5 mb-8">
              <div className="w-24 h-24 rounded-full flex items-center justify-center flex-shrink-0 display font-medium text-3xl" style={{ background: helper.color, color: helper.color === butter ? ink : cream }}>
                {helper.initials}
              </div>
              <div className="flex-1">
                <h1 className="display text-4xl font-medium mb-1" style={{ color: ink }}>{helper.name}</h1>
                <p className="body mb-3" style={{ color: muted }}>{helper.title} · {helper.distance} mi away</p>
                <div className="flex flex-wrap items-center gap-4 text-sm body" style={{ color: ink }}>
                  <div className="flex items-center gap-1">
                    <Star size={14} fill={clay} style={{ color: clay }} />
                    <span className="font-medium">{helper.rating}</span>
                    <span style={{ color: muted }}>({helper.reviews} reviews)</span>
                  </div>
                  <div style={{ color: muted }}>·</div>
                  <div style={{ color: muted }}>{helper.jobs} jobs completed</div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="display text-xl font-medium mb-3" style={{ color: ink }}>About</h2>
              <p className="body text-base leading-relaxed" style={{ color: ink }}>{helper.bio}</p>
            </div>

            <div className="mb-8">
              <h2 className="display text-xl font-medium mb-3" style={{ color: ink }}>What I help with</h2>
              <div className="flex flex-wrap gap-2">
                {helper.skills.map((s) => (
                  <span key={s} className="text-sm px-4 py-2 rounded-full body" style={{ background: cream2, color: ink, border: `1px solid ${line}` }}>{s}</span>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <h2 className="display text-xl font-medium mb-4" style={{ color: ink }}>Verified by Everyday Help</h2>
              <div className="flex flex-wrap gap-3">
                {helper.verified.map((v) => (
                  <div key={v} className="flex items-center gap-2 px-4 py-2 rounded-full body text-sm" style={{ background: sage + "22", color: ink }}>
                    <Check size={14} style={{ color: sage }} />
                    {v}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="display text-2xl font-medium mb-5" style={{ color: ink }}>Recent reviews</h2>
              <div className="space-y-4">
                {REVIEWS.map((r, i) => (
                  <div key={i} className="p-5 rounded-2xl border" style={{ background: cream2, borderColor: line }}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="display font-medium" style={{ color: ink }}>{r.name}</div>
                      <div className="flex">
                        {[...Array(5)].map((_, j) => <Star key={j} size={14} fill={j < r.rating ? clay : "transparent"} style={{ color: clay }} />)}
                      </div>
                    </div>
                    <p className="body text-sm mb-2 leading-relaxed" style={{ color: ink }}>{r.text}</p>
                    <p className="body text-xs" style={{ color: muted }}>{r.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-24 p-6 rounded-2xl border" style={{ background: cream2, borderColor: line }}>
              <div className="display text-3xl font-medium mb-1" style={{ color: ink }}>
                ${helper.rate}<span className="body text-base font-normal" style={{ color: muted }}>/hour</span>
              </div>
              <p className="body text-xs mb-5" style={{ color: muted }}>1 hour minimum · cancel free up to 24h</p>

              <button onClick={() => onBook(helper)} className="w-full px-6 py-4 rounded-full body font-medium btn-press flex items-center justify-center gap-2 mb-3" style={{ background: ink, color: cream }}>
                Book {helper.name.split(" ")[0]} <ArrowRight size={16} />
              </button>
              <button className="w-full px-6 py-3 rounded-full body font-medium border-2 flex items-center justify-center gap-2" style={{ borderColor: ink, color: ink }}>
                <Heart size={14} /> Add to favorites
              </button>
              <p className="body text-xs text-center mt-2" style={{ color: muted }}>Favorites available with Member plan</p>

              <div className="mt-5 pt-5 border-t space-y-3 body text-sm" style={{ color: ink, borderColor: line }}>
                <div className="flex items-center gap-2"><Clock size={14} style={{ color: muted }} /><span>Usually responds &lt; 1 hr</span></div>
                <div className="flex items-center gap-2"><Calendar size={14} style={{ color: muted }} /><span>Available {helper.availability.toLowerCase()}</span></div>
                <div className="flex items-center gap-2"><Shield size={14} style={{ color: muted }} /><span>Covered by our guarantee</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ BOOKING ============

function Booking({ helper, setView, currentTier = "free" }) {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [hours, setHours] = useState(2);
  const [notes, setNotes] = useState("");
  const [tasks, setTasks] = useState([]);

  const toggleTask = (label) => setTasks(tasks.includes(label) ? tasks.filter((t) => t !== label) : [...tasks, label]);

  if (!helper) return null;
  const subtotal = helper.rate * hours;
  const isMember = currentTier !== "free";
  const bookingFee = isMember ? 0 : 9;
  const trustFee = isMember ? 0 : 5;
  const activationFee = 25; // first booking only
  const total = subtotal + bookingFee + trustFee + activationFee;

  return (
    <div style={{ background: cream }}>
      <div className="max-w-3xl mx-auto px-5 md:px-8 py-10 md:py-14">
        <button onClick={() => setView("profile")} className="body text-sm flex items-center gap-2 mb-8 hover:opacity-70" style={{ color: muted }}>
          <ArrowLeft size={14} /> Back to {helper.name.split(" ")[0]}'s profile
        </button>

        <div className="flex items-center gap-2 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 h-1 rounded-full" style={{ background: s <= step ? clay : line }} />
          ))}
        </div>

        {step === 1 && (
          <div>
            <p className="body text-sm tracking-widest uppercase mb-2" style={{ color: clay, letterSpacing: "0.18em" }}>Step 1 of 3</p>
            <h2 className="display text-4xl md:text-5xl font-medium mb-8" style={{ color: ink }}>When do you need {helper.name.split(" ")[0]}?</h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block body text-sm font-medium mb-2" style={{ color: ink }}>Date</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-4 rounded-2xl border body text-base outline-none" style={{ background: cream2, borderColor: line, color: ink }} />
              </div>
              <div>
                <label className="block body text-sm font-medium mb-2" style={{ color: ink }}>Start time</label>
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full p-4 rounded-2xl border body text-base outline-none" style={{ background: cream2, borderColor: line, color: ink }} />
              </div>
            </div>

            <label className="block body text-sm font-medium mb-2" style={{ color: ink }}>How many hours?</label>
            <div className="flex gap-2 mb-2 flex-wrap">
              {[1, 2, 3, 4, 6, 8].map((h) => (
                <button key={h} onClick={() => setHours(h)} className="flex-1 min-w-[60px] py-3 rounded-xl body font-medium border-2 transition" style={{ background: hours === h ? ink : "transparent", color: hours === h ? cream : ink, borderColor: hours === h ? ink : line }}>
                  {h}h
                </button>
              ))}
            </div>
            <p className="body text-sm mb-8" style={{ color: muted }}>${helper.rate}/hr × {hours}h = <span style={{ color: ink, fontWeight: 500 }}>${subtotal}</span></p>

            <button onClick={() => setStep(2)} disabled={!date || !time} className="w-full px-6 py-4 rounded-full body font-medium btn-press flex items-center justify-center gap-2" style={{ background: date && time ? ink : line, color: cream }}>
              Continue <ArrowRight size={16} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="body text-sm tracking-widest uppercase mb-2" style={{ color: clay, letterSpacing: "0.18em" }}>Step 2 of 3</p>
            <h2 className="display text-4xl md:text-5xl font-medium mb-3" style={{ color: ink }}>What do you need done?</h2>
            <p className="body mb-7" style={{ color: muted }}>Pick what's on your mind. Helper will come prepared.</p>

            <div className="grid grid-cols-2 gap-2 mb-6">
              {TASK_CATEGORIES.map((t) => {
                const active = tasks.includes(t.label);
                const Icon = t.icon;
                return (
                  <button key={t.label} onClick={() => toggleTask(t.label)} className="flex items-center gap-3 p-4 rounded-xl border-2 text-left transition btn-press" style={{ background: active ? sage : cream2, borderColor: active ? sage : line, color: active ? cream : ink }}>
                    <Icon size={16} className="flex-shrink-0" />
                    <span className="body text-sm">{t.label}</span>
                  </button>
                );
              })}
            </div>

            <label className="block body text-sm font-medium mb-2" style={{ color: ink }}>Anything else? (optional)</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} placeholder="e.g., Big dog named Beans, please refill her water. Coffee maker is finicky — there's a note on it." className="w-full p-4 rounded-2xl border body text-base outline-none mb-6" style={{ background: cream2, borderColor: line, color: ink }} />

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="px-6 py-4 rounded-full body font-medium border-2" style={{ borderColor: ink, color: ink }}>Back</button>
              <button onClick={() => setStep(3)} className="flex-1 px-6 py-4 rounded-full body font-medium btn-press flex items-center justify-center gap-2" style={{ background: ink, color: cream }}>
                Continue <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <p className="body text-sm tracking-widest uppercase mb-2" style={{ color: clay, letterSpacing: "0.18em" }}>Step 3 of 3</p>
            <h2 className="display text-4xl md:text-5xl font-medium mb-8" style={{ color: ink }}>Review & confirm.</h2>

            <div className="p-6 rounded-2xl border mb-5" style={{ background: cream2, borderColor: line }}>
              <div className="flex items-center gap-3 mb-4 pb-4 border-b" style={{ borderColor: line }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center display font-medium" style={{ background: helper.color, color: helper.color === butter ? ink : cream }}>{helper.initials}</div>
                <div>
                  <div className="display font-medium" style={{ color: ink }}>{helper.name}</div>
                  <div className="body text-sm" style={{ color: muted }}>{helper.title}</div>
                </div>
              </div>

              <div className="space-y-2 body text-sm">
                <div className="flex justify-between"><span style={{ color: muted }}>When</span><span style={{ color: ink }}>{date} at {time}</span></div>
                <div className="flex justify-between"><span style={{ color: muted }}>Duration</span><span style={{ color: ink }}>{hours} hours</span></div>
                {tasks.length > 0 && (
                  <div className="pt-3 mt-3 border-t" style={{ borderColor: line }}>
                    <div className="mb-2" style={{ color: muted }}>Tasks</div>
                    <div className="flex flex-wrap gap-1.5">
                      {tasks.map((t) => <span key={t} className="text-xs px-2.5 py-1 rounded-full body" style={{ background: cream, color: ink, border: `1px solid ${line}` }}>{t}</span>)}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-5 pt-5 border-t space-y-2 body text-sm" style={{ borderColor: line }}>
                <div className="flex justify-between"><span style={{ color: muted }}>${helper.rate}/hr × {hours}h</span><span style={{ color: ink }}>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between">
                  <span style={{ color: muted }}>Booking fee {isMember && <span className="text-xs" style={{ color: sage }}>(waived)</span>}</span>
                  <span style={{ color: ink }}>{isMember ? <span style={{ textDecoration: "line-through", color: muted }}>$9</span> : "$9.00"}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: muted }}>Trust & support fee {isMember && <span className="text-xs" style={{ color: sage }}>(waived)</span>}</span>
                  <span style={{ color: ink }}>{isMember ? <span style={{ textDecoration: "line-through", color: muted }}>$5</span> : "$5.00"}</span>
                </div>
                <div className="flex justify-between"><span style={{ color: muted }}>One-time activation (first booking)</span><span style={{ color: ink }}>${activationFee.toFixed(2)}</span></div>
                <div className="flex justify-between display font-medium text-lg pt-2"><span style={{ color: ink }}>Total</span><span style={{ color: ink }}>${total.toFixed(2)}</span></div>
              </div>
            </div>

            {!isMember && (
              <div className="p-4 rounded-2xl mb-5 flex items-start gap-3" style={{ background: clay + "15", border: `1px solid ${clay + "40"}` }}>
                <Crown size={18} style={{ color: clay }} className="flex-shrink-0 mt-0.5" />
                <div className="flex-1 body text-sm" style={{ color: ink }}>
                  <strong>Save $14 on this booking</strong> — Members skip booking + trust fees ($15/mo). <button onClick={() => setView("pricing")} className="underline">See plans</button>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3 p-4 rounded-xl mb-6" style={{ background: sage + "20" }}>
              <Shield size={18} style={{ color: sage }} className="flex-shrink-0 mt-0.5" />
              <p className="body text-sm" style={{ color: ink }}>Covered by the Everyday Help Guarantee. Not happy? We re-do or refund.</p>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="px-6 py-4 rounded-full body font-medium border-2" style={{ borderColor: ink, color: ink }}>Back</button>
              <button onClick={() => setView("confirmed")} className="flex-1 px-6 py-4 rounded-full body font-medium btn-press flex items-center justify-center gap-2" style={{ background: clay, color: cream }}>
                Confirm & book <Check size={16} />
              </button>
            </div>
            <p className="body text-xs text-center mt-3" style={{ color: muted }}>Card not charged until 24 hrs before your visit.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Confirmed({ setView }) {
  return (
    <div style={{ background: cream, minHeight: "70vh" }} className="flex items-center justify-center">
      <div className="max-w-md text-center px-5 py-16">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: sage }}>
          <Check size={36} color={cream} />
        </div>
        <h2 className="display text-4xl font-medium mb-4" style={{ color: ink }}>Booked!</h2>
        <p className="body text-base leading-relaxed mb-8" style={{ color: muted }}>
          We'll text you a confirmation. Your helper will reach out within an hour.
        </p>
        <button onClick={() => setView("home")} className="px-6 py-3 rounded-full body font-medium btn-press" style={{ background: ink, color: cream }}>
          Back home
        </button>
      </div>
    </div>
  );
}

// ============ PRICING ============

function Pricing({ setView }) {
  return (
    <div style={{ background: cream }}>
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-12 md:py-16">
        <button onClick={() => setView("home")} className="body text-sm flex items-center gap-2 mb-6 hover:opacity-70" style={{ color: muted }}>
          <ArrowLeft size={14} /> Back home
        </button>
        <p className="body text-sm tracking-widest uppercase mb-3" style={{ color: clay, letterSpacing: "0.18em" }}>Memberships</p>
        <h1 className="display text-4xl md:text-6xl font-medium mb-5" style={{ color: ink }}>Pick your pace.</h1>
        <p className="body text-lg max-w-2xl mb-12 leading-relaxed" style={{ color: muted }}>
          Free to sign up, browse, and book. Members skip the fees and unlock favorites. Member+ gets the full concierge experience.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {PLANS.map((p) => (
            <div key={p.id} className="relative rounded-3xl p-7 md:p-8 flex flex-col" style={{ background: p.color, color: p.text, border: p.popular ? `2px solid ${ink}` : `1px solid ${line}` }}>
              {p.popular && <div className="absolute -top-3 left-8 px-3 py-1 rounded-full body text-xs font-medium" style={{ background: butter, color: ink }}>Most popular</div>}
              <div className="display text-2xl font-medium mb-1">{p.name}</div>
              <p className="body text-sm mb-6 opacity-90">{p.tagline}</p>
              <div className="display text-5xl font-medium mb-7">{p.price === 0 ? "Free" : `$${p.price}`}<span className="body text-base font-normal opacity-80">{p.price === 0 ? "" : "/mo"}</span></div>
              <ul className="body text-sm space-y-2.5 mb-8 flex-1">
                {p.features.map((f, i) => (
                  <li key={i} className={f.header ? "font-medium pt-1" : "flex items-start gap-2.5"}>
                    {!f.header && (f.on ? <Check size={15} className="flex-shrink-0 mt-0.5" /> : <X size={15} className="flex-shrink-0 mt-0.5 opacity-50" />)}
                    <span>{f.t}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => setView("signup")} className="w-full px-5 py-3 rounded-full body font-medium btn-press" style={{ background: p.text, color: p.color === ink ? ink : p.color === clay ? clay : ink }}>
                {p.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Fee structure breakdown */}
        <div className="rounded-3xl p-8 md:p-10 mb-10" style={{ background: cream2, border: `1px solid ${line}` }}>
          <h2 className="display text-2xl md:text-3xl font-medium mb-3" style={{ color: ink }}>The math, plain and simple.</h2>
          <p className="body mb-6" style={{ color: muted }}>For a 3-hour booking with a $32/hr helper:</p>

          <div className="overflow-x-auto">
            <table className="w-full body text-sm">
              <thead>
                <tr style={{ borderBottom: `2px solid ${line}` }}>
                  <th className="text-left py-3 pr-4 display font-medium" style={{ color: ink }}>Line item</th>
                  <th className="text-right py-3 px-3 display font-medium" style={{ color: ink }}>Free Member</th>
                  <th className="text-right py-3 px-3 display font-medium" style={{ color: ink }}>Member</th>
                  <th className="text-right py-3 pl-3 display font-medium" style={{ color: ink }}>Member+</th>
                </tr>
              </thead>
              <tbody style={{ color: ink }}>
                <tr style={{ borderBottom: `1px solid ${line + "80"}` }}>
                  <td className="py-3 pr-4">Helper time (3 hrs × $32)</td>
                  <td className="text-right py-3 px-3">$96</td>
                  <td className="text-right py-3 px-3">$96</td>
                  <td className="text-right py-3 pl-3">$96</td>
                </tr>
                <tr style={{ borderBottom: `1px solid ${line + "80"}` }}>
                  <td className="py-3 pr-4">Booking fee</td>
                  <td className="text-right py-3 px-3">$9</td>
                  <td className="text-right py-3 px-3" style={{ color: sage }}>Waived</td>
                  <td className="text-right py-3 pl-3" style={{ color: sage }}>Waived</td>
                </tr>
                <tr style={{ borderBottom: `1px solid ${line + "80"}` }}>
                  <td className="py-3 pr-4">Trust & support fee</td>
                  <td className="text-right py-3 px-3">$5</td>
                  <td className="text-right py-3 px-3" style={{ color: sage }}>Waived</td>
                  <td className="text-right py-3 pl-3" style={{ color: sage }}>Waived</td>
                </tr>
                <tr style={{ borderBottom: `2px solid ${ink}` }}>
                  <td className="py-3 pr-4 display font-medium">You pay</td>
                  <td className="text-right py-3 px-3 display font-medium">$110</td>
                  <td className="text-right py-3 px-3 display font-medium">$96</td>
                  <td className="text-right py-3 pl-3 display font-medium">$96</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 italic" style={{ color: muted }}>Save vs Free</td>
                  <td className="text-right py-3 px-3" style={{ color: muted }}>—</td>
                  <td className="text-right py-3 px-3" style={{ color: sage }}>$14/booking</td>
                  <td className="text-right py-3 pl-3" style={{ color: sage }}>$14/booking</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="body text-sm mt-6" style={{ color: muted }}>
            <strong style={{ color: ink }}>$15/month Member pays for itself in 1.1 bookings.</strong> Anyone using us more than once a month is better off as a Member.
          </p>
        </div>

        {/* Other fees */}
        <div className="rounded-3xl p-8 md:p-10" style={{ background: ink, color: cream }}>
          <h2 className="display text-2xl md:text-3xl font-medium mb-5">A few other things to know.</h2>
          <div className="grid md:grid-cols-2 gap-6 body text-sm" style={{ color: cream + "DD" }}>
            <div>
              <div className="display font-medium mb-1" style={{ color: cream }}>One-time activation: $25</div>
              <p>Charged at first booking only. Covers your vetting & onboarding. Waived for Member+ signups.</p>
            </div>
            <div>
              <div className="display font-medium mb-1" style={{ color: cream }}>Cancellation</div>
              <p>Free up to 24 hrs before. Late cancel: $15. No-show: 1 hour at booked rate. Members get free late cancellations.</p>
            </div>
            <div>
              <div className="display font-medium mb-1" style={{ color: cream }}>Helper rates</div>
              <p>Helpers set their own hourly rates. We never discount helper pay — your membership savings come from waived platform fees.</p>
            </div>
            <div>
              <div className="display font-medium mb-1" style={{ color: cream }}>Tipping</div>
              <p>Welcome but never expected. 100% of any tip goes to your helper.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ TRUST PAGE ============

function Trust({ setView }) {
  return (
    <div style={{ background: cream }}>
      <div className="max-w-4xl mx-auto px-5 md:px-8 py-12 md:py-16">
        <button onClick={() => setView("home")} className="body text-sm flex items-center gap-2 mb-6 hover:opacity-70" style={{ color: muted }}>
          <ArrowLeft size={14} /> Back home
        </button>
        <p className="body text-sm tracking-widest uppercase mb-3" style={{ color: clay, letterSpacing: "0.18em" }}>Our promise</p>
        <h1 className="display text-4xl md:text-6xl font-medium mb-5 leading-tight" style={{ color: ink }}>Vetted. Trusted. Reliable. Helpful.</h1>
        <p className="body text-lg max-w-2xl mb-10 leading-relaxed" style={{ color: muted }}>
          Trust is a two-way street. Both customers and helpers go through verification before any booking happens.
        </p>

        <h2 className="display text-2xl md:text-3xl font-medium mb-5 mt-10" style={{ color: ink }}>How we vet helpers</h2>
        <div className="space-y-3 mb-10">
          {[
            { i: FileCheck, t: "Fingerprint background check", d: "Multi-state criminal + Arkansas State Police + FBI" },
            { i: Shield, t: "Drug screen", d: "5-panel drug test, pre-onboarding and random" },
            { i: HandHeart, t: "Three references", d: "Personal or professional, verified by phone" },
            { i: Award, t: "Confidentiality agreement", d: "What happens in your home stays in your home" },
            { i: MapPin, t: "Driving record", d: "Verified annually for helpers running errands" },
            { i: IdCard, t: "Branded gear & ID badge", d: "So you know exactly who's at your door" },
            { i: CheckCircle2, t: "Insured & bonded", d: "$1M general liability + fidelity bond covers every visit" },
          ].map((c) => {
            const Icon = c.i;
            return (
              <div key={c.t} className="flex items-start gap-5 p-5 rounded-2xl border" style={{ background: cream2, borderColor: line }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: clay }}>
                  <Icon size={20} style={{ color: cream }} />
                </div>
                <div className="flex-1">
                  <h3 className="display text-lg font-medium mb-1" style={{ color: ink }}>{c.t}</h3>
                  <p className="body text-sm leading-relaxed" style={{ color: muted }}>{c.d}</p>
                </div>
              </div>
            );
          })}
        </div>

        <h2 className="display text-2xl md:text-3xl font-medium mb-5 mt-10" style={{ color: ink }}>How we vet customers</h2>
        <p className="body mb-5" style={{ color: muted }}>
          Helpers are putting themselves in your home. They deserve the same protection you do. Every customer signs up through:
        </p>
        <div className="space-y-3 mb-10">
          {[
            { i: IdCard, t: "Government ID + selfie verification", d: "Confirmed at signup, before any booking" },
            { i: Home, t: "Address verification", d: "Must match your ID — no PO boxes" },
            { i: CreditCard, t: "Card on file", d: "Real payment method, not cash or Venmo" },
            { i: Users, t: "Household intake questions", d: "Pets, access, who's home — so helpers come prepared" },
            { i: Check, t: "Code of conduct agreement", d: "Mutual respect, defined scope of services" },
          ].map((c) => {
            const Icon = c.i;
            return (
              <div key={c.t} className="flex items-start gap-5 p-5 rounded-2xl border" style={{ background: cream2, borderColor: line }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: sage }}>
                  <Icon size={20} style={{ color: cream }} />
                </div>
                <div className="flex-1">
                  <h3 className="display text-lg font-medium mb-1" style={{ color: ink }}>{c.t}</h3>
                  <p className="body text-sm leading-relaxed" style={{ color: muted }}>{c.d}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-7 rounded-2xl mb-8" style={{ background: ink, color: cream }}>
          <h3 className="display text-2xl font-medium mb-2">The Everyday Help Guarantee</h3>
          <p className="body leading-relaxed opacity-90">
            If you're not happy with a visit — for any reason — we'll send a different helper to redo it free. If you're still not happy after that, we'll refund the visit. No fine print.
          </p>
        </div>

        <div className="text-center">
          <button onClick={() => setView("signup")} className="btn-press inline-flex items-center gap-2 px-7 py-4 rounded-full body font-medium" style={{ background: clay, color: cream }}>
            Sign up free <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ BECOME A HELPER ============

function BecomeHelper({ setView }) {
  const [step, setStep] = useState(0);
  return (
    <div style={{ background: cream }}>
      {step === 0 && (
        <div>
          <section className="relative overflow-hidden" style={{ background: sage, color: cream }}>
            <div className="max-w-5xl mx-auto px-5 md:px-8 py-16 md:py-20 relative">
              <button onClick={() => setView("home")} className="body text-sm flex items-center gap-2 mb-6 opacity-80 hover:opacity-100" style={{ color: cream }}>
                <ArrowLeft size={14} /> Back home
              </button>
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs body font-medium" style={{ background: cream + "30", color: cream }}>
                  <HandHeart size={12} /> Hiring vetted helpers across central Arkansas
                </div>
                <h1 className="display text-4xl md:text-6xl font-medium leading-tight mb-5">Be your own boss. We bring the customers.</h1>
                <p className="body text-lg md:text-xl leading-relaxed mb-8 opacity-95">
                  Set your own rates. Pick your own schedule. Show up in our branded gear, do the work, get paid weekly. We're the marketplace — you run your own business.
                </p>
                <button onClick={() => setStep(1)} className="btn-press inline-flex items-center gap-2 px-7 py-4 rounded-full body font-medium" style={{ background: cream, color: ink }}>
                  Start your application <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </section>

          {/* Helper economics */}
          <section className="py-20" style={{ background: cream }}>
            <div className="max-w-5xl mx-auto px-5 md:px-8">
              <h2 className="display text-3xl md:text-4xl font-medium mb-3" style={{ color: ink }}>The honest deal.</h2>
              <p className="body text-lg mb-10" style={{ color: muted }}>No hidden fees, no surprise commissions. Here's exactly how it works.</p>

              <div className="grid md:grid-cols-3 gap-4 mb-10">
                <div className="p-7 rounded-2xl" style={{ background: cream2, border: `1px solid ${line}` }}>
                  <DollarSign size={24} style={{ color: clay }} className="mb-4" />
                  <h3 className="display text-xl font-medium mb-2" style={{ color: ink }}>Onboarding fee</h3>
                  <div className="display text-3xl font-medium mb-2" style={{ color: clay }}>$49</div>
                  <p className="body text-sm leading-relaxed" style={{ color: muted }}>One-time fee covers part of your background check, drug screen, and branded gear. <strong style={{ color: ink }}>Refunded after 10 completed bookings.</strong></p>
                </div>
                <div className="p-7 rounded-2xl" style={{ background: cream2, border: `1px solid ${line}` }}>
                  <Clock size={24} style={{ color: clay }} className="mb-4" />
                  <h3 className="display text-xl font-medium mb-2" style={{ color: ink }}>Stay-active fee</h3>
                  <div className="display text-3xl font-medium mb-2" style={{ color: clay }}>$19/mo</div>
                  <p className="body text-sm leading-relaxed" style={{ color: muted }}><strong style={{ color: ink }}>Waived</strong> any month you complete 4+ bookings. Active workers never pay it.</p>
                </div>
                <div className="p-7 rounded-2xl" style={{ background: cream2, border: `1px solid ${line}` }}>
                  <Zap size={24} style={{ color: clay }} className="mb-4" />
                  <h3 className="display text-xl font-medium mb-2" style={{ color: ink }}>Platform commission</h3>
                  <div className="display text-3xl font-medium mb-2" style={{ color: clay }}>20%</div>
                  <p className="body text-sm leading-relaxed" style={{ color: muted }}>Per completed booking. You set your own hourly rate. Take-home runs ~$25-30/hr typical.</p>
                </div>
              </div>

              <div className="rounded-3xl p-8 md:p-10" style={{ background: ink, color: cream }}>
                <h3 className="display text-2xl font-medium mb-4">Your math, on a real booking</h3>
                <p className="body mb-6 opacity-90">You charge $32/hr. Customer books 3 hours.</p>
                <div className="space-y-2 body text-sm" style={{ color: cream + "DD" }}>
                  <div className="flex justify-between"><span>Customer time × your rate</span><span>$96.00</span></div>
                  <div className="flex justify-between"><span>Platform commission (20%)</span><span>-$19.20</span></div>
                  <div className="flex justify-between display font-medium text-lg pt-3 mt-3 border-t" style={{ borderColor: cream + "30" }}><span style={{ color: cream }}>You take home</span><span style={{ color: butter }}>$76.80</span></div>
                </div>
                <p className="body text-xs mt-5 opacity-70">Plus mileage reimbursement at federal rate, paid weekly via direct deposit.</p>
              </div>
            </div>
          </section>

          {/* What you get */}
          <section className="py-20" style={{ background: cream2 }}>
            <div className="max-w-5xl mx-auto px-5 md:px-8">
              <h2 className="display text-3xl md:text-4xl font-medium mb-12" style={{ color: ink }}>What you get from us.</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { t: "Branded gear", d: "2 polos, ID badge, branded tote — so customers know exactly who's at their door." },
                  { t: "Vetted customers", d: "Every customer is ID-verified, address-checked, and on a real payment method. No sketchy bookings." },
                  { t: "Direct deposit weekly", d: "Stripe Connect deposits to your bank. No waiting two weeks." },
                  { t: "Mileage reimbursement", d: "Federal rate per mile for any driving you do for a booking." },
                  { t: "Insurance coverage", d: "$1M general liability covers you while you're on a booking." },
                  { t: "Real human support", d: "Text or call us with questions. Not an algorithm." },
                ].map((x) => (
                  <div key={x.t} className="p-6 rounded-2xl" style={{ background: cream, border: `1px solid ${line}` }}>
                    <h3 className="display text-xl font-medium mb-2" style={{ color: ink }}>{x.t}</h3>
                    <p className="body text-sm leading-relaxed" style={{ color: muted }}>{x.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* What we don't do */}
          <section className="py-20" style={{ background: cream }}>
            <div className="max-w-3xl mx-auto px-5 md:px-8">
              <h2 className="display text-3xl md:text-4xl font-medium mb-5" style={{ color: ink }}>What we DON'T do.</h2>
              <p className="body text-lg mb-8" style={{ color: muted }}>
                We're a marketplace, not an employer. That distinction matters.
              </p>
              <ul className="space-y-3 body text-base" style={{ color: ink }}>
                <li className="flex gap-3"><X size={18} style={{ color: clay }} className="flex-shrink-0 mt-1" /><span><strong>We don't train you.</strong> You bring your own skills and methods.</span></li>
                <li className="flex gap-3"><X size={18} style={{ color: clay }} className="flex-shrink-0 mt-1" /><span><strong>We don't set your rate.</strong> You pick your hourly. Adjust anytime.</span></li>
                <li className="flex gap-3"><X size={18} style={{ color: clay }} className="flex-shrink-0 mt-1" /><span><strong>We don't dictate your schedule.</strong> Available means available; full means full.</span></li>
                <li className="flex gap-3"><X size={18} style={{ color: clay }} className="flex-shrink-0 mt-1" /><span><strong>We don't tell you how to do the job.</strong> Customers book you for your way, not ours.</span></li>
                <li className="flex gap-3"><X size={18} style={{ color: clay }} className="flex-shrink-0 mt-1" /><span><strong>We don't guarantee you work.</strong> The better your reviews, the more bookings you'll get.</span></li>
              </ul>
              <div className="text-center mt-12">
                <button onClick={() => setStep(1)} className="btn-press inline-flex items-center gap-2 px-7 py-4 rounded-full body font-medium" style={{ background: ink, color: cream }}>
                  Apply now <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </section>
        </div>
      )}

      {step >= 1 && step <= 4 && (
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-12 md:py-16">
          <button onClick={() => step === 1 ? setStep(0) : setStep(step - 1)} className="body text-sm flex items-center gap-2 mb-6 hover:opacity-70" style={{ color: muted }}>
            <ArrowLeft size={14} /> Back
          </button>
          <div className="flex items-center gap-2 mb-10">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex-1 h-1 rounded-full" style={{ background: s <= step ? sage : line }} />
            ))}
          </div>

          {step === 1 && (
            <div>
              <p className="body text-sm tracking-widest uppercase mb-2" style={{ color: sage, letterSpacing: "0.18em" }}>Step 1 of 4</p>
              <h2 className="display text-4xl md:text-5xl font-medium mb-8" style={{ color: ink }}>Tell us about you.</h2>

              <div className="space-y-4">
                <div>
                  <label className="block body text-sm font-medium mb-2" style={{ color: ink }}>Full name</label>
                  <input className="w-full p-4 rounded-2xl border body text-base outline-none" style={{ background: cream2, borderColor: line, color: ink }} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block body text-sm font-medium mb-2" style={{ color: ink }}>Phone</label>
                    <input type="tel" className="w-full p-4 rounded-2xl border body text-base outline-none" style={{ background: cream2, borderColor: line, color: ink }} />
                  </div>
                  <div>
                    <label className="block body text-sm font-medium mb-2" style={{ color: ink }}>City</label>
                    <select className="w-full p-4 rounded-2xl border body text-base outline-none" style={{ background: cream2, borderColor: line, color: ink }}>
                      <option>Little Rock</option>
                      <option>North Little Rock</option>
                      <option>Conway</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block body text-sm font-medium mb-2" style={{ color: ink }}>Email</label>
                  <input type="email" className="w-full p-4 rounded-2xl border body text-base outline-none" style={{ background: cream2, borderColor: line, color: ink }} />
                </div>
              </div>

              <button onClick={() => setStep(2)} className="w-full mt-8 px-6 py-4 rounded-full body font-medium btn-press flex items-center justify-center gap-2" style={{ background: ink, color: cream }}>
                Continue <ArrowRight size={16} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <p className="body text-sm tracking-widest uppercase mb-2" style={{ color: sage, letterSpacing: "0.18em" }}>Step 2 of 4</p>
              <h2 className="display text-4xl md:text-5xl font-medium mb-2" style={{ color: ink }}>What do you offer?</h2>
              <p className="body mb-8" style={{ color: muted }}>Pick your skills, set your rate, write your bio. You can change any of this later.</p>

              <label className="block body text-sm font-medium mb-2" style={{ color: ink }}>Your hourly rate</label>
              <div className="p-6 rounded-2xl mb-6 text-center" style={{ background: cream2, border: `1px solid ${line}` }}>
                <div className="display text-5xl font-medium" style={{ color: ink }}>$30</div>
                <div className="body text-sm" style={{ color: muted }}>per hour · adjust as you build reviews</div>
                <input type="range" min="20" max="60" defaultValue="30" className="w-full mt-4" />
                <div className="body text-xs mt-2" style={{ color: muted }}>Take-home: <strong style={{ color: ink }}>$24/hr after 20% commission</strong></div>
              </div>

              <label className="block body text-sm font-medium mb-2" style={{ color: ink }}>Your skills (pick all that apply)</label>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {TASK_CATEGORIES.map((t) => {
                  const Icon = t.icon;
                  return (
                    <button key={t.label} className="flex items-center gap-2 p-3 rounded-xl border-2 text-left body text-sm" style={{ background: cream2, borderColor: line, color: ink }}>
                      <Icon size={14} /> {t.label}
                    </button>
                  );
                })}
              </div>

              <label className="block body text-sm font-medium mb-2" style={{ color: ink }}>Short bio</label>
              <textarea rows={4} placeholder="Tell customers about your experience and what makes you reliable. 1-3 sentences works." className="w-full p-4 rounded-2xl border body text-base outline-none" style={{ background: cream2, borderColor: line, color: ink }} />

              <button onClick={() => setStep(3)} className="w-full mt-8 px-6 py-4 rounded-full body font-medium btn-press flex items-center justify-center gap-2" style={{ background: ink, color: cream }}>
                Continue <ArrowRight size={16} />
              </button>
            </div>
          )}

          {step === 3 && (
            <div>
              <p className="body text-sm tracking-widest uppercase mb-2" style={{ color: sage, letterSpacing: "0.18em" }}>Step 3 of 4</p>
              <h2 className="display text-4xl md:text-5xl font-medium mb-2" style={{ color: ink }}>Verification.</h2>
              <p className="body mb-8" style={{ color: muted }}>Required for every helper. Most folks finish in under 10 minutes.</p>

              <div className="space-y-3 mb-6">
                {[
                  { t: "ID + selfie verification", d: "Snap your driver's license + a selfie" },
                  { t: "Fingerprint background check", d: "Standard third-party (24-48hr)" },
                  { t: "Drug screen", d: "5-panel test, lab nearby" },
                  { t: "Three references", d: "Personal or professional" },
                  { t: "Driving record (if applicable)", d: "Only if you'll run errands" },
                ].map((x, i) => (
                  <div key={x.t} className="flex items-start gap-4 p-5 rounded-2xl" style={{ background: cream2, border: `1px solid ${line}` }}>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 body font-medium text-sm" style={{ background: sage, color: cream }}>{i + 1}</div>
                    <div>
                      <div className="display font-medium mb-0.5" style={{ color: ink }}>{x.t}</div>
                      <div className="body text-sm" style={{ color: muted }}>{x.d}</div>
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={() => setStep(4)} className="w-full px-6 py-4 rounded-full body font-medium btn-press flex items-center justify-center gap-2" style={{ background: ink, color: cream }}>
                Continue <ArrowRight size={16} />
              </button>
            </div>
          )}

          {step === 4 && (
            <div>
              <p className="body text-sm tracking-widest uppercase mb-2" style={{ color: sage, letterSpacing: "0.18em" }}>Step 4 of 4</p>
              <h2 className="display text-4xl md:text-5xl font-medium mb-2" style={{ color: ink }}>One last thing — the fees.</h2>
              <p className="body mb-8" style={{ color: muted }}>We're transparent about every charge. No surprises later.</p>

              <div className="space-y-3 mb-8">
                <div className="p-5 rounded-2xl flex items-center justify-between" style={{ background: cream2, border: `1px solid ${line}` }}>
                  <div>
                    <div className="display font-medium" style={{ color: ink }}>Onboarding fee</div>
                    <div className="body text-sm" style={{ color: muted }}>Refunded after 10 completed bookings</div>
                  </div>
                  <div className="display text-2xl font-medium" style={{ color: clay }}>$49</div>
                </div>
                <div className="p-5 rounded-2xl flex items-center justify-between" style={{ background: cream2, border: `1px solid ${line}` }}>
                  <div>
                    <div className="display font-medium" style={{ color: ink }}>Stay-active fee</div>
                    <div className="body text-sm" style={{ color: muted }}>Waived if you book 4+ visits/mo</div>
                  </div>
                  <div className="display text-2xl font-medium" style={{ color: clay }}>$19/mo</div>
                </div>
                <div className="p-5 rounded-2xl flex items-center justify-between" style={{ background: cream2, border: `1px solid ${line}` }}>
                  <div>
                    <div className="display font-medium" style={{ color: ink }}>Platform commission</div>
                    <div className="body text-sm" style={{ color: muted }}>Per completed booking</div>
                  </div>
                  <div className="display text-2xl font-medium" style={{ color: clay }}>20%</div>
                </div>
              </div>

              <label className="flex items-start gap-3 mb-6 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 mt-0.5" />
                <span className="body text-sm" style={{ color: ink }}>I understand the fee structure and agree to the Independent Contractor Agreement and Code of Conduct.</span>
              </label>

              <button onClick={() => setView("helperWelcome")} className="w-full px-6 py-4 rounded-full body font-medium btn-press flex items-center justify-center gap-2" style={{ background: clay, color: cream }}>
                Submit application & pay $49 <Check size={16} />
              </button>
              <p className="body text-xs text-center mt-3" style={{ color: muted }}>$49 charged after we approve your application — not now.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function HelperWelcome({ setView }) {
  return (
    <div style={{ background: cream, minHeight: "70vh" }} className="flex items-center justify-center">
      <div className="max-w-md text-center px-5 py-16">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: clay }}>
          <HandHeart size={36} color={cream} />
        </div>
        <h2 className="display text-4xl font-medium mb-4" style={{ color: ink }}>Application received.</h2>
        <p className="body text-base leading-relaxed mb-8" style={{ color: muted }}>
          We'll review and reach out within 48 hours. Once you're approved, we'll send your background check link and ship your branded gear.
        </p>
        <button onClick={() => setView("home")} className="px-6 py-3 rounded-full body font-medium btn-press" style={{ background: ink, color: cream }}>
          Back home
        </button>
      </div>
    </div>
  );
}

// ============ FOOTER ============

function Footer({ setView, onJoinHelper }) {
  return (
    <footer className="border-t pt-14 pb-10" style={{ background: ink, color: cream, borderColor: ink }}>
      <div className="max-w-6xl mx-auto px-5 md:px-8 grid md:grid-cols-4 gap-10 body text-sm">
        <div className="md:col-span-2">
          <Logo color={cream} />
          <p className="mt-4 max-w-xs leading-relaxed opacity-80">
            Vetted, branded, independent helpers for everyday life. Serving Little Rock, North Little Rock, and Conway.
          </p>
          <div className="mt-5 flex items-center gap-2 opacity-80">
            <Phone size={14} /> (501) 555-1234
          </div>
        </div>
        <div>
          <div className="display font-medium mb-3">Get help</div>
          <ul className="space-y-2 opacity-80">
            <li><button onClick={() => setView("browse")} className="hover:opacity-100">Browse helpers</button></li>
            <li><button onClick={() => setView("pricing")} className="hover:opacity-100">Memberships</button></li>
            <li><button onClick={() => setView("trust")} className="hover:opacity-100">Our promise</button></li>
            <li><button onClick={() => setView("signup")} className="hover:opacity-100">Sign up free</button></li>
          </ul>
        </div>
        <div>
          <div className="display font-medium mb-3">Work with us</div>
          <ul className="space-y-2 opacity-80">
            <li><button onClick={onJoinHelper} className="hover:opacity-100">Become a helper</button></li>
            <li>Helper agreement</li>
            <li>Pay & fees</li>
            <li>Refer a helper</li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-5 md:px-8 pt-8 mt-10 border-t body text-xs flex justify-between opacity-60" style={{ borderColor: cream + "20" }}>
        <span>© 2026 Everyday Help. Locally owned in Arkansas.</span>
        <span>Insured · Bonded · Both sides verified</span>
      </div>
    </footer>
  );
}

// ============ APP ============

export default function App() {
  const [view, setView] = useState("home");
  const [helper, setHelper] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [view]);

  const onPickHelper = (h) => { setHelper(h); setView("profile"); };
  const onBook = (h) => { setHelper(h); setView("book"); };
  const onJoinHelper = () => setView("become");

  return (
    <div className="min-h-screen body" style={{ background: cream, color: ink }}>
      <style>{fontStyles}</style>
      <Header setView={setView} onJoinHelper={onJoinHelper} />
      {view === "home" && <Landing setView={setView} onJoinHelper={onJoinHelper} onPickHelper={onPickHelper} />}
      {view === "browse" && <Browse setView={setView} onPickHelper={onPickHelper} />}
      {view === "profile" && <Profile helper={helper} setView={setView} onBook={onBook} />}
      {view === "book" && <Booking helper={helper} setView={setView} />}
      {view === "confirmed" && <Confirmed setView={setView} />}
      {view === "signup" && <Signup setView={setView} />}
      {view === "welcome" && <Welcome setView={setView} />}
      {view === "pricing" && <Pricing setView={setView} />}
      {view === "trust" && <Trust setView={setView} />}
      {view === "become" && <BecomeHelper setView={setView} />}
      {view === "helperWelcome" && <HelperWelcome setView={setView} />}
      <Footer setView={setView} onJoinHelper={onJoinHelper} />
    </div>
  );
}
