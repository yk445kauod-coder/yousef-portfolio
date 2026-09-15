import { useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BrainCircuit,
  Code2,
  Cpu,
  Github,
  Globe2,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Radio,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  Zap,
  MessageSquare,
  Bot,
} from "lucide-react";
import {
  playClickSound,
  playHoverSound,
  playSectionSwitchSound,
  setSoundEnabled,
} from "../lib/audio";
import { PixelMascot } from "../components/PixelMascot";
import { ChatDrawer } from "../components/ChatDrawer";

const projects = [
  {
    number: "01",
    type: "AI / MODEL FINE-TUNING",
    title: "Egytronic_1.0",
    titleAr: "إيجـترونيك 1.0",
    description:
      "8B-parameter decoder-only language model fine-tuned for Egyptian Arabic, local linguistic context, instruction datasets, and practical GGUF/F16 inference.",
    stack: ["Llama 3.1 8B", "Unsloth", "PyTorch", "Hugging Face", "GGUF"],
    href: "https://huggingface.co/YousefKhamis/Egytronic_1.0",
    accent: "blue",
    badge: "MODEL / HF",
  },
  {
    number: "02",
    type: "FULL-STACK / REEL MENU",
    title: "Azura Cafe",
    titleAr: "أزورا كافيه",
    description:
      "A mobile-first QR menu turning traditional menus into dynamic reel-style video browsing with real-time Firebase sync, Groq AI assistance, and live admin panel.",
    stack: ["React", "TypeScript", "Firebase", "Groq AI", "Cloudflare Pages"],
    href: "https://azura-app.pages.dev",
    accent: "orange",
    badge: "LIVE APP",
  },
  {
    number: "03",
    type: "EDTECH / AI WORKSPACE",
    title: "SmartBoard AI",
    titleAr: "السبورة الذكية",
    description:
      "Interactive classroom environment transforming teacher inputs into reusable lesson plans, LaTeX mathematical formulas, TTS audio, and interactive UI visualizers.",
    stack: ["React", "AI SDK", "LaTeX", "Web Speech", "Tailwind CSS"],
    href: "https://smartboard-eg.pages.dev",
    accent: "blue",
    badge: "LIVE APP",
  },
];

const skills = [
  { name: "React / Vite", tag: "Frontend" },
  { name: "TypeScript", tag: "Language" },
  { name: "SVG / Canvas 2D", tag: "UI Effects" },
  { name: "Tailwind CSS", tag: "Styling" },
  { name: "Framer Motion", tag: "Animation" },
  { name: "PyTorch & Hugging Face", tag: "AI / ML" },
  { name: "Unsloth & LLaMA", tag: "Fine-Tuning" },
  { name: "Firebase & Cloudflare", tag: "Infrastructure" },
  { name: "Web Audio API", tag: "Audio Effects" },
  { name: "Python / Express", tag: "Backend" },
];

/* Pure 2D Cybernetic Animated Orbit Radar (Replaces 3D WebGL Canvas) */
function OrbitScene() {
  return (
    <div
      className="orbit-scene flex items-center justify-center relative overflow-hidden select-none"
      aria-label="Interactive 2D Cybernetic Orbit Radar"
    >
      <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center">
        {/* Outer Pulsing Radar Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#36A3FF]/30 animate-[spin_30s_linear_infinite]" />
        <div className="absolute inset-4 rounded-full border border-[#36A3FF]/20 animate-[spin_20s_linear_infinite_reverse]" />

        {/* Primary Elliptical Orbit Paths */}
        <div className="absolute w-full h-48 border-2 border-[#FF754D]/70 rounded-full rotate-[-25deg] animate-pulse shadow-[0_0_15px_rgba(255,117,77,0.3)]" />
        <div className="absolute w-[110%] h-40 border border-[#36A3FF]/80 rounded-full rotate-[35deg] animate-pulse shadow-[0_0_15px_rgba(54,163,255,0.3)]" />

        {/* Cyber Concentric Geometric Crosshair */}
        <svg
          className="absolute inset-0 w-full h-full text-[#36A3FF]/40 pointer-events-none"
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
        >
          <circle cx="100" cy="100" r="85" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="55" />
          <circle cx="100" cy="100" r="25" strokeDasharray="2 2" />
          <line x1="100" y1="0" x2="100" y2="200" strokeDasharray="4 4" />
          <line x1="0" y1="100" x2="200" y2="100" strokeDasharray="4 4" />
          <polygon
            points="100,20 170,100 100,180 30,100"
            stroke="#36A3FF"
            strokeOpacity="0.25"
            fill="none"
          />
        </svg>

        {/* Orbiting Satellite Nodes */}
        <div className="absolute w-full h-full animate-[spin_12s_linear_infinite]">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#FF754D] rounded-full shadow-[0_0_10px_#FF754D]" />
        </div>
        <div className="absolute w-full h-full animate-[spin_18s_linear_infinite_reverse]">
          <div className="absolute bottom-6 right-10 w-2.5 h-2.5 bg-[#36A3FF] rounded-full shadow-[0_0_10px_#36A3FF]" />
        </div>
      </div>
    </div>
  );
}

/* Pure 2D Photo Card with Brand Specular Hover & Glow Effects (No 3D depth/perspective) */
function PhotoCard() {
  return (
    <div className="relative group w-56 h-64 md:w-64 md:h-72 shrink-0 rounded-2xl overflow-hidden border-2 border-[#36A3FF] shadow-[0_0_20px_rgba(54,163,255,0.25)] hover:shadow-[0_0_30px_rgba(255,117,77,0.4)] transition-all duration-300 cursor-pointer select-none">
      {/* Specular Glow Gradient Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-[#36A3FF]/20 via-transparent to-[#FF754D]/20" />

      {/* Portrait Image */}
      <img
        src="/yousef.jpg"
        alt="Yousef Madbouly"
        className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
      />

      {/* Dynamic Dark Gradient Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#111315] via-transparent to-transparent opacity-80 z-10" />

      {/* Badge (Yousef Madbouly) */}
      <div className="absolute bottom-3 left-3 right-3 z-30 px-3 py-1.5 bg-[#111315]/90 backdrop-blur-md border border-[#36A3FF] rounded-lg text-xs font-en-pixel text-[#FF754D] flex justify-between items-center shadow-[0_0_15px_rgba(54,163,255,0.4)]">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#FF754D] animate-ping" />
          <span className="font-semibold tracking-wider text-[#F5F3EE]">
            YOUSEF MADBOULY
          </span>
        </div>
        <span className="text-[#36A3FF]">FULL-STACK & AI</span>
      </div>

      {/* Top Location Tag */}
      <div className="absolute top-3 right-3 z-30 px-2 py-0.5 bg-[#FF754D] text-[#111315] font-en-pixel text-[10px] font-bold rounded shadow-md">
        ALEXANDRIA, EG
      </div>
    </div>
  );
}

function SpotlightCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const onMouseEnter = () => {
    playHoverSound();
  };

  return (
    <div onMouseEnter={onMouseEnter} className={`spotlight-card ${className}`}>
      {children}
    </div>
  );
}

function UiverseButton({
  children,
  href,
  outline = false,
}: {
  children: React.ReactNode;
  href: string;
  outline?: boolean;
}) {
  return (
    <a
      className={`uiverse-button ${outline ? "uiverse-button-outline" : ""}`}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      onMouseEnter={playHoverSound}
      onClick={playClickSound}
    >
      <span>{children}</span>
      <ArrowUpRight size={16} strokeWidth={2.4} />
    </a>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playClickSound();
  };

  const scrollTo = (id: string) => {
    playSectionSwitchSound();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main className="portfolio-shell">
      {/* Interactive Pixel Art Boy Mascot */}
      <PixelMascot onOpenChat={() => setChatOpen(true)} />

      {/* AI Personal Agent Chat Drawer */}
      <ChatDrawer isOpen={chatOpen} onClose={() => setChatOpen(false)} />

      <div className="grain" />
      <header className="site-header">
        <button
          className="brand-mark font-ar-pixel"
          onClick={() => scrollTo("top")}
          onMouseEnter={playHoverSound}
          aria-label="Back to top"
        >
          يوسف مدبولي <span className="font-en-pixel">/ YK-01</span>
        </button>
        <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`}>
          <button
            onClick={() => scrollTo("work")}
            onMouseEnter={playHoverSound}
          >
            الأعمال / WORK
          </button>
          <button
            onClick={() => scrollTo("about")}
            onMouseEnter={playHoverSound}
          >
            عني / ABOUT
          </button>
          <button
            onClick={() => scrollTo("contact")}
            onMouseEnter={playHoverSound}
          >
            تواصل / CONTACT
          </button>
        </nav>
        <div className="header-actions">
          <button
            className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FF754D]/10 hover:bg-[#FF754D]/20 border border-[#FF754D]/50 text-[#FF754D] text-xs font-ar-pixel transition-all"
            onClick={() => {
              playClickSound();
              setChatOpen(true);
            }}
            onMouseEnter={playHoverSound}
          >
            <Bot className="w-4 h-4" />
            <span>اسأل المساعد الذكي</span>
          </button>

          <button
            className="sound-toggle"
            onClick={toggleSound}
            aria-label="Toggle sound effects"
            title="Toggle Web Audio SFX"
          >
            {soundOn ? (
              <Volume2 size={16} className="text-[#36A3FF]" />
            ) : (
              <VolumeX size={16} className="text-[#9198A1]" />
            )}
            <span className="font-en-pixel text-[0.6rem] hidden sm:inline">
              {soundOn ? "AUDIO: ON" : "AUDIO: OFF"}
            </span>
          </button>
          <span className="availability">
            <i /> متاه للعمل الشغوف
          </span>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <section id="top" className="hero-section">
        <div className="hero-copy reveal-up">
          <div className="eyebrow">
            <span className="font-en-pixel">01</span>
            <span className="eyebrow-line" />
            <span className="font-ar-pixel text-lg">
              مطوّر برمجيات وذكاء اصطناعي
            </span>
          </div>
          <h1>
            Building
            <br />
            <em className="text-[#FF754D]">Useful</em>
            <br />
            Intelligence.
          </h1>
          <p className="hero-intro">
            أنا <strong>يوسف خميس مدبولي</strong> — مطوّر برمجيات من الإسكندرية،
            أعمل على بناء منتجات رقمية تجمع بين{" "}
            <strong>الذكاء الاصطناعي التطبيقي</strong>، و
            <strong>تطوير الويب متكامل الأركان (Full-Stack)</strong>.
          </p>
          <div className="hero-actions">
            <UiverseButton href="#work">استكشف المشاريع</UiverseButton>
            <a
              className="text-link"
              href="mailto:Yousefkhamismadbouly@googlemail.com"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
            >
              تحدث معي <ArrowDownRight size={16} />
            </a>
          </div>
        </div>
        <div className="hero-visual reveal-fade">
          <OrbitScene />
          <div className="orb-label orb-label-top font-en-pixel">
            <span>LIVE SYNC // RADAR</span>
            <i />
          </div>
          <div className="orb-label orb-label-bottom font-en-pixel">
            <span>ALEXANDRIA, EG</span>
            <span>31.20° N / 29.91° E</span>
          </div>
          <div className="orb-center font-en-pixel text-[#FF754D]">YK</div>
        </div>
        <div className="hero-meta">
          <span className="font-ar-pixel text-base">الإسكندرية، مصر</span>
          <span className="font-en-pixel">
            SCROLL TO EXPLORE <ArrowDownRight size={15} />
          </span>
        </div>
      </section>

      <section className="statement-section" id="about">
        <div className="section-kicker">
          <span className="font-en-pixel">02</span>
          <span className="eyebrow-line" />
          <span className="font-ar-pixel text-lg">منهجية العمل والخبرة</span>
        </div>
        <div className="statement-grid">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start col-span-full">
            {/* Interactive Photo Card for Yousef's Photo */}
            <PhotoCard />

            <div>
              <p className="statement-lead">
                أصمم وأطور أنظمة تجمع بين{" "}
                <em>الذكاء الاصطناعي والتنفيذ التقني المحترف</em>.
              </p>
              <div className="statement-body mt-4">
                <p>
                  أربع سنوات من التعلّم الذاتي والتطوير المستقل علّمتني بناء
                  الدورة البرمجية كاملة — من صياغة المفهوم الأولي وحتى إطلاق
                  منتج حقيقي يخدم المستخدمين.
                </p>
                <p>
                  سواء كان ذلك تدريب نموذج لغوي بالعامية المصرية
                  (Egytronic_1.0)، أو إنشاء قائمة طعام تفاعلية تعمل عبر كود QR
                  (Azura Cafe)، أو سبورة تعليمية ذكية للمدرسين (SmartBoard AI).
                </p>
                <div className="mt-4 flex flex-wrap gap-3 items-center">
                  <a
                    className="arrow-link text-[#FF754D]"
                    href="https://github.com/yk445kauod-coder"
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={playHoverSound}
                    onClick={playClickSound}
                  >
                    تصفح مستودع الكود على GitHub <ArrowUpRight size={17} />
                  </a>
                  <button
                    onClick={() => {
                      playClickSound();
                      setChatOpen(true);
                    }}
                    onMouseEnter={playHoverSound}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#36A3FF]/15 border border-[#36A3FF] text-[#36A3FF] hover:bg-[#36A3FF] hover:text-[#111315] text-xs font-ar-pixel transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>تحدث مع المساعد الذكي عن خبراتي</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="metrics-row font-en-pixel">
          <div>
            <strong className="text-[#FF754D]">04+</strong>
            <span>Years of independent engineering</span>
          </div>
          <div>
            <strong className="text-[#36A3FF]">08B</strong>
            <span>Parameters in Egytronic_1.0</span>
          </div>
          <div>
            <strong className="text-[#FF754D]">03</strong>
            <span>Shipped production platforms</span>
          </div>
          <div>
            <strong className="text-[#36A3FF]">100%</strong>
            <span>Driven by craft & problem solving</span>
          </div>
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="section-heading">
          <div className="section-kicker">
            <span className="font-en-pixel">03</span>
            <span className="eyebrow-line" />
            <span className="font-ar-pixel text-lg">
              معرض المشاريع الحقيقية
            </span>
          </div>
          <h2>
            Proof of <em className="text-[#FF754D]">Practice.</em>
          </h2>
          <p>
            مشاريع واقعية مبنية وأُطلقت للعلن — كل مشروع يعالج تحدياً تقنياً
            حقيقياً بلمسة هندسية متقنة.
          </p>
        </div>
        <div className="project-list">
          {projects.map(project => (
            <SpotlightCard
              key={project.number}
              className={`project-card accent-${project.accent}`}
            >
              <div className="project-number font-en-pixel">
                {project.number}
              </div>
              <div className="project-main">
                <div className="project-type font-en-pixel">{project.type}</div>
                <h3>
                  {project.title}{" "}
                  <small className="font-ar-pixel text-lg text-[#FF754D] font-normal">
                    ({project.titleAr})
                  </small>
                </h3>
                <p>{project.description}</p>
                <div className="project-stack font-en-pixel">
                  {project.stack.map(item => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
              <a
                className="project-arrow"
                href={project.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${project.title}`}
                onMouseEnter={playHoverSound}
                onClick={playClickSound}
              >
                <ArrowUpRight size={24} />
              </a>
              <div className="project-visual">
                {project.accent === "blue" && project.number === "01" && (
                  <>
                    <div className="terminal-top font-en-pixel">
                      <span>
                        <i />
                        <i />
                        <i />
                      </span>
                      <small>egytronic_1.0.py</small>
                    </div>
                    <div className="terminal-code font-en-pixel">
                      <span>01</span>
                      <b>model</b> = <em>"Egytronic_1.0"</em>
                      <br />
                      <span>02</span>
                      <b>architecture</b> = <em>"Llama-3.1-8B"</em>
                      <br />
                      <span>03</span>
                      <b>dialect</b> = <em>"ar-eg"</em>
                      <br />
                      <span>04</span>
                      <b>quantization</b> ={" "}
                      <strong className="text-[#FF754D]">"GGUF / F16"</strong>
                    </div>
                  </>
                )}
                {project.accent === "orange" && (
                  <>
                    <div className="phone-frame">
                      <div className="phone-top font-en-pixel">
                        AZURA <span>REEL MENU</span>
                      </div>
                      <div className="phone-food" />
                      <div className="phone-caption">
                        Taste
                        <br />
                        <em>The Moment.</em>
                      </div>
                      <div className="phone-dots">
                        <i />
                        <i />
                        <i />
                        <i />
                      </div>
                    </div>
                    <div className="scan-pill font-en-pixel">
                      <Radio size={13} /> LIVE DEPLOYED APP
                    </div>
                  </>
                )}
                {project.accent === "blue" && project.number === "03" && (
                  <>
                    <div className="board-frame">
                      <div className="board-toolbar font-en-pixel">
                        <span>
                          <BrainCircuit size={15} /> SmartBoard AI
                        </span>
                        <i />
                      </div>
                      <div className="board-lines">
                        <span />
                        <span />
                        <span />
                        <div>
                          <Sparkles size={19} className="text-[#36A3FF]" />
                          <b className="font-en-pixel">
                            LaTeX & AI Lesson Active
                          </b>
                        </div>
                        <span />
                        <span />
                      </div>
                    </div>
                    <div className="ai-pill font-en-pixel">
                      <Sparkles size={13} /> TEACHER MODE
                    </div>
                  </>
                )}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      <section className="toolkit-section">
        <div className="section-kicker">
          <span className="font-en-pixel">04</span>
          <span className="eyebrow-line" />
          <span className="font-ar-pixel text-lg">التقنيات والأدوات</span>
        </div>
        <div className="toolkit-grid">
          <div>
            <h2>
              Curious by
              <br />
              <em className="text-[#FF754D]">Default.</em>
            </h2>
            <p>
              التقنيات هي وسيلة لتجسيد الأفكار الحية. هذه هي أسلحتي البرمجية
              التي أعتمد عليها لبناء المنتجات من الصفر:
            </p>
          </div>
          <div className="skills-cloud font-en-pixel">
            {skills.map((skill, index) => (
              <span
                key={skill.name}
                style={{ "--delay": `${index * 0.04}s` } as React.CSSProperties}
                onMouseEnter={playHoverSound}
              >
                {skill.name}{" "}
                <small className="opacity-60 text-[0.6rem] ml-1">
                  [{skill.tag}]
                </small>
              </span>
            ))}
          </div>
        </div>
        <div className="stack-notes">
          <div>
            <Code2 size={18} className="text-[#36A3FF]" />
            <span>Frontend Engineering</span>
            <b className="font-en-pixel">React + TypeScript + Tailwind CSS</b>
          </div>
          <div>
            <Cpu size={18} className="text-[#FF754D]" />
            <span>Applied AI & Fine-Tuning</span>
            <b className="font-en-pixel">PyTorch + Hugging Face + Unsloth</b>
          </div>
          <div>
            <Layers3 size={18} className="text-[#36A3FF]" />
            <span>Product Infrastructure</span>
            <b className="font-en-pixel">Firebase + Cloudflare Pages</b>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-glow" />
        <div className="section-kicker">
          <span className="font-en-pixel">05</span>
          <span className="eyebrow-line" />
          <span className="font-ar-pixel text-lg">ابدأ المحادثة</span>
        </div>
        <h2>
          Have a good
          <br />
          <em className="text-[#FF754D]">Problem?</em>
        </h2>
        <p>
          أنا دائمًا منفتح للمشاركات الشغوفة، والمنتجات الطموحة، والمحادثات
          التقنية المثمرة.
        </p>
        <UiverseButton href="mailto:Yousefkhamismadbouly@googlemail.com">
          إرسال بريد إلكتروني
        </UiverseButton>
        <div className="contact-details font-en-pixel">
          <a
            href="mailto:Yousefkhamismadbouly@googlemail.com"
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
          >
            <Mail size={15} /> Yousefkhamismadbouly@googlemail.com
          </a>
          <span>
            <MapPin size={15} /> Alexandria, Egypt
          </span>
          <div className="socials">
            <a
              href="https://github.com/yk445kauod-coder"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
            >
              <Github size={18} />
            </a>
            <a
              href="https://huggingface.co/YousefKhamis"
              target="_blank"
              rel="noreferrer"
              aria-label="Hugging Face Profile"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
            >
              <Globe2 size={18} />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer font-en-pixel">
        <span>YOUSEF MADBOULY // YK-01</span>
        <span>
          CRAFTED WITH PRECISION & INTENT{" "}
          <Zap size={13} className="text-[#36A3FF]" />
        </span>
        <span>ALEXANDRIA, EG</span>
      </footer>
    </main>
  );
}
