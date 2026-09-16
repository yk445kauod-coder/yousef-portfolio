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

const products = [
  {
    number: "01",
    icon: "🦙",
    type: "AI · LLM · EGYPTIAN ARABIC",
    title: "Egytronic 16-bit",
    titleAr: "إيجترونيك 16-بت",
    tagline: "Fine-tuned Arabic Language Model on HuggingFace",
    description:
      "Decoder-only language model trained on Egyptian dialect, civil/labor law, and social datasets with GGUF & F16 open weights.",
    stack: ["LLaMA 3.1 8B", "Unsloth", "PyTorch", "Hugging Face", "GGUF"],
    href: "https://huggingface.co/YousefKhamis/Egytronic_1.0",
    accent: "gold",
    badge: "OPEN WEIGHTS",
  },
  {
    number: "02",
    icon: "📋",
    type: "EDTECH · AI TEACHER",
    title: "Smartboard AI",
    titleAr: "السبورة الذكية",
    tagline: "AI-Powered Classroom Workspace",
    description:
      "Interactive classroom digital whiteboard transforming teacher inputs into structured lesson plans, LaTeX math formulas, and dynamic visual aids.",
    stack: ["React", "AI SDK", "LaTeX", "Web Speech", "Tailwind CSS"],
    href: "https://smartboard-eg.pages.dev",
    accent: "gold",
    badge: "LIVE APP",
  },
  {
    number: "03",
    icon: "🏪",
    type: "FULL-STACK · APP MARKETPLACE",
    title: "Azura Cafe & Webstore",
    titleAr: "أزورا كافيه والمتاجر",
    tagline: "Dynamic QR Menu Reel Experience",
    description:
      "Mobile menu platform with real-time Firebase syncing, Groq AI assistant, and dynamic video browsing for Egyptian local businesses.",
    stack: ["React", "TypeScript", "Firebase", "Groq AI", "Cloudflare Pages"],
    href: "https://azura-app.pages.dev",
    accent: "gold",
    badge: "LIVE APP",
  },
];

const methodology = [
  {
    num: "01",
    icon: "🧠",
    title: "Human Architecture",
    description: "Designing resilient system blueprints and data pipelines before implementation.",
  },
  {
    num: "02",
    icon: "🤖",
    title: "Agent-Driven Dev",
    description: "Leveraging custom AI agent pipelines to build faster while adhering to architectural blueprints.",
  },
  {
    num: "03",
    icon: "🔍",
    title: "Precision Review",
    description: "Conducting thorough engineering reviews for security, performance, and compliance.",
  },
  {
    num: "04",
    icon: "🚀",
    title: "Ship & Iterate",
    description: "Shipping fast, learning from real users, and continuously feeding feedback into new cycles.",
  },
];

const skills = [
  { name: "LLaMA / Fine-Tuning", tag: "AI Research" },
  { name: "PyTorch & Hugging Face", tag: "ML Engineering" },
  { name: "React / Vite / TypeScript", tag: "Frontend" },
  { name: "Unsloth & PEFT / LoRA", tag: "Model Optimization" },
  { name: "Tailwind CSS & Framer Motion", tag: "UI / UX" },
  { name: "Firebase & Cloudflare Pages", tag: "Infrastructure" },
  { name: "Web Audio & Speech API", tag: "Audio & Web" },
  { name: "Python / Express / Node.js", tag: "Backend" },
];

/* Glowing Pyramid SVG Element from egytronic.pages.dev design reference */
function PyramidGraphic() {
  return (
    <div className="pyramid-wrap w-full max-w-[340px] mx-auto flex items-center justify-center select-none">
      <svg
        viewBox="0 0 300 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-[0_0_25px_rgba(255,165,0,0.3)] animate-pulse"
      >
        <polygon points="150,20 40,200 260,200" stroke="#FFA500" strokeWidth="1.5" fill="none" opacity="0.8" />
        <polygon points="150,20 150,200 260,200" stroke="#FFD700" strokeWidth="1" fill="rgba(255,165,0,0.04)" />
        <polygon points="150,20 40,200 150,200" stroke="#00FFCC" strokeWidth="1" fill="rgba(0,255,204,0.03)" />
        <line x1="150" y1="20" x2="150" y2="200" stroke="#FFA500" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="80" y1="120" x2="220" y2="120" stroke="#C8A96E" strokeWidth="1" opacity="0.5" />
        <line x1="105" y1="160" x2="195" y2="160" stroke="#C8A96E" strokeWidth="1" opacity="0.5" />
        <circle cx="150" cy="20" r="5" fill="#FFD700" className="animate-ping" />
      </svg>
    </div>
  );
}

/* 2D Orbit Cyber Radar */
function OrbitScene() {
  return (
    <div
      className="orbit-scene flex items-center justify-center relative overflow-hidden select-none"
      aria-label="Interactive Cybernetic Orbit Radar"
    >
      <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center">
        {/* Outer Pulsing Radar Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#FFA500]/30 animate-[spin_30s_linear_infinite]" />
        <div className="absolute inset-4 rounded-full border border-[#00FFCC]/20 animate-[spin_20s_linear_infinite_reverse]" />

        {/* Primary Elliptical Orbit Paths */}
        <div className="absolute w-full h-48 border-2 border-[#FFA500]/70 rounded-full rotate-[-25deg] animate-pulse shadow-[0_0_15px_rgba(255,165,0,0.3)]" />
        <div className="absolute w-[110%] h-40 border border-[#00FFCC]/80 rounded-full rotate-[35deg] animate-pulse shadow-[0_0_15px_rgba(0,255,204,0.3)]" />

        {/* Concentric Geometric Radar */}
        <svg
          className="absolute inset-0 w-full h-full text-[#C8A96E]/40 pointer-events-none"
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
            stroke="#FFA500"
            strokeOpacity="0.3"
            fill="none"
          />
        </svg>

        {/* Satellite Orbit Nodes */}
        <div className="absolute w-full h-full animate-[spin_12s_linear_infinite]">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#FFA500] rounded-full shadow-[0_0_10px_#FFA500]" />
        </div>
        <div className="absolute w-full h-full animate-[spin_18s_linear_infinite_reverse]">
          <div className="absolute bottom-6 right-10 w-2.5 h-2.5 bg-[#00FFCC] rounded-full shadow-[0_0_10px_#00FFCC]" />
        </div>
      </div>
    </div>
  );
}

/* Founder Badge Photo Card */
function FounderCard() {
  return (
    <div className="relative group w-64 h-72 md:w-72 md:h-80 shrink-0 rounded-2xl overflow-hidden border-2 border-[#FFA500] shadow-[0_0_25px_rgba(255,165,0,0.3)] hover:shadow-[0_0_35px_rgba(255,215,0,0.45)] transition-all duration-300 cursor-pointer select-none">
      {/* Specular Glow Gradient Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-[#00FFCC]/20 via-transparent to-[#FFA500]/30" />

      {/* Portrait Image */}
      <img
        src="/yousef.jpg"
        alt="Yousef Khamis - Founder of Egytronic"
        className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
      />

      {/* Dynamic Dark Gradient Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#07070f] via-transparent to-transparent opacity-85 z-10" />

      {/* Founder Badge */}
      <div className="absolute bottom-3 left-3 right-3 z-30 px-3 py-2 bg-[#07070f]/95 backdrop-blur-md border border-[#FFA500] rounded-xl text-xs font-en-pixel text-[#FFA500] flex flex-col gap-1 shadow-[0_0_15px_rgba(255,165,0,0.4)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FFA500] animate-ping" />
            <span className="font-bold tracking-wider text-[#ede9e3] text-sm">
              YOUSEF KHAMIS
            </span>
          </div>
          <span className="px-1.5 py-0.5 bg-[#FFA500] text-[#07070f] font-bold rounded text-[10px]">
            FOUNDER
          </span>
        </div>
        <div className="text-[#00FFCC] text-[11px] font-ar-pixel">
          مؤسس إيجترونيك (Egytronic Founder)
        </div>
      </div>

      {/* Top Tag */}
      <div className="absolute top-3 right-3 z-30 px-2 py-0.5 bg-[#FFA500] text-[#07070f] font-en-pixel text-[10px] font-bold rounded shadow-md">
        EGYTRONIC
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
      {/* Interactive Pixel Art Mascot */}
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
          يوسف خميس <span className="font-en-pixel">/ EGYTRONIC FOUNDER</span>
        </button>
        <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`}>
          <button
            onClick={() => scrollTo("products")}
            onMouseEnter={playHoverSound}
          >
            المنتجات / PRODUCTS
          </button>
          <button
            onClick={() => scrollTo("about")}
            onMouseEnter={playHoverSound}
          >
            عني / ABOUT
          </button>
          <button
            onClick={() => scrollTo("methodology")}
            onMouseEnter={playHoverSound}
          >
            المنهجية / METHODOLOGY
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
            className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#FFA500]/10 hover:bg-[#FFA500]/20 border border-[#FFA500]/40 text-[#FFA500] text-xs font-ar-pixel transition-all"
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
              <Volume2 size={16} className="text-[#FFA500]" />
            ) : (
              <VolumeX size={16} className="text-[#8a8070]" />
            )}
            <span className="font-en-pixel text-[0.6rem] hidden sm:inline">
              {soundOn ? "AUDIO: ON" : "AUDIO: OFF"}
            </span>
          </button>
          <span className="availability">
            <i /> 🇪🇬 Founder @ Egytronic
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

      {/* Hero Section */}
      <section id="top" className="hero-section">
        <div className="hero-copy reveal-up">
          <div className="eyebrow flex items-center gap-2">
            <span className="px-2.5 py-1 bg-[#FFA500]/10 border border-[#FFA500]/40 text-[#FFA500] font-en-pixel text-xs rounded">
              🇪🇬 EGYTRONIC FOUNDER · ALEXANDRIA
            </span>
          </div>
          <h1>
            Build · Ship ·
            <br />
            <em className="text-[#FFA500]">Innovate.</em>
          </h1>
          <p className="hero-intro">
            أنا <strong>يوسف خميس</strong> — مؤسس <strong>إيجترونيك (Egytronic)</strong>. أعمل على تطوير منصات ونماذج ذكاء اصطناعي وتطبيقات ويب تجمع بين <strong>الابتكار البرمجي</strong> و <strong>الهندسة الدقيقة</strong>.
          </p>
          <div className="hero-actions">
            <UiverseButton href="https://huggingface.co/YousefKhamis/Egytronic_1.0">
              🤗 HuggingFace Model
            </UiverseButton>
            <a
              className="text-link"
              href="#products"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
            >
              استكشف المشاريع <ArrowDownRight size={16} />
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-6 text-xs font-en-pixel text-[#8a8070]">
            <span className="pill">
              🇪🇬 <em>Made in Egypt</em>
            </span>
            <span className="pill">
              🤗 <em>HuggingFace</em>
            </span>
            <span className="pill">
              ⚡ <em>LLaMA-based</em>
            </span>
            <span className="pill">
              🔓 <em>Open Weights</em>
            </span>
          </div>
        </div>

        <div className="hero-visual reveal-fade">
          <OrbitScene />
          <div className="orb-label orb-label-top font-en-pixel">
            <span>EGYTRONIC // RADAR SYNC</span>
            <i />
          </div>
          <div className="orb-label orb-label-bottom font-en-pixel">
            <span>ALEXANDRIA, EG</span>
            <span>31.20° N / 29.91° E</span>
          </div>
          <div className="orb-center font-en-pixel text-[#FFA500]">𓂀</div>
        </div>

        {/* Marquee Ticker */}
        <div className="col-span-full mt-10 py-3 border-y border-[rgba(200,169,110,0.14)] bg-[#0c0c18] overflow-hidden text-xs font-en-pixel text-[#C8A96E]">
          <div className="whitespace-nowrap animate-[marquee_25s_linear_infinite] flex gap-8">
            <span>Egytronic ⟡ 16-bit AI ⟡ Smartboard AI ⟡ Webstore ⟡ Made in Egypt ⟡ LLaMA Fine-tune ⟡ Alexandria ⟡ Yousef Khamis Founder</span>
            <span>Egytronic ⟡ 16-bit AI ⟡ Smartboard AI ⟡ Webstore ⟡ Made in Egypt ⟡ LLaMA Fine-tune ⟡ Alexandria ⟡ Yousef Khamis Founder</span>
          </div>
        </div>
      </section>

      {/* About Founder & Vision */}
      <section className="statement-section" id="about">
        <div className="section-kicker">
          <span>WHO WE ARE</span>
          <span className="eyebrow-line" />
          <span className="font-ar-pixel text-lg text-[#00FFCC]">رؤية إيجترونيك</span>
        </div>
        <div className="statement-grid">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start col-span-full">
            {/* Founder Card */}
            <FounderCard />

            <div className="flex-1">
              <div className="inline-block px-3 py-1 bg-[#FFA500]/10 border border-[#FFA500] text-[#FFA500] font-ar-pixel text-xs rounded mb-4">
                مؤسس إيجترونيك (Founder)
              </div>
              <p className="statement-lead">
                أصمم وأطور أنظمة تدمج بين <em>الذكاء الاصطناعي والتنفيذ التقني العالي</em>.
              </p>
              <div className="statement-body mt-4">
                <p>
                  بصفتي <strong>مؤسس إيجترونيك</strong>، أقود عملية بناء وتدريب النماذج اللغوية وهندسة البرمجيات بالكامل — من تدريب نموذج <strong>Egytronic 16-bit</strong> المخصص للغة العربية، وحتى تطوير منصات <strong>Smartboard AI</strong> و <strong>Azura Cafe</strong>.
                </p>
                <div className="mt-4 flex flex-wrap gap-4 items-center">
                  <a
                    className="arrow-link text-[#FFA500]"
                    href="https://huggingface.co/YousefKhamis"
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={playHoverSound}
                    onClick={playClickSound}
                  >
                    تصفح أوزان النماذج على HuggingFace <ArrowUpRight size={17} />
                  </a>
                  <button
                    onClick={() => {
                      playClickSound();
                      setChatOpen(true);
                    }}
                    onMouseEnter={playHoverSound}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-[#00FFCC]/10 border border-[#00FFCC] text-[#00FFCC] hover:bg-[#00FFCC] hover:text-[#07070f] text-xs font-ar-pixel transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>تحدث مع المساعد الذكي عن خبراتي</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Pyramid Graphic from reference */}
            <div className="w-full md:w-auto hidden lg:block">
              <PyramidGraphic />
              <div className="text-center font-en-pixel text-xs text-[#8a8070] mt-2">
                𓂀 𓁹 𓋴𓂝𓅱𓇋
              </div>
            </div>
          </div>
        </div>

        {/* Live Metrics */}
        <div className="metrics-row font-en-pixel">
          <div>
            <strong className="text-[#FFA500]">03</strong>
            <span>Live Products Shipped</span>
          </div>
          <div>
            <strong className="text-[#00FFCC]">16B</strong>
            <span>LLM Parameter Capacity</span>
          </div>
          <div>
            <strong className="text-[#FFA500]">100M</strong>
            <span>Targeted Users</span>
          </div>
          <div>
            <strong className="text-[#00FFCC]">∞</strong>
            <span>Innovation & Craft</span>
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section className="work-section" id="products">
        <div className="section-heading">
          <div className="section-kicker">
            <span>OUR PRODUCTS</span>
            <span className="eyebrow-line" />
            <span className="font-ar-pixel text-lg text-[#00FFCC]">منتجات إيجترونيك</span>
          </div>
          <h2>
            What We've <em className="text-[#FFA500]">Built.</em>
          </h2>
          <p>
            ثلاثة مشاريع رئيسية تم إطلاقها في مجالات الذكاء الاصطناعي اللغوي، تكنولوجيا التعليم، والتطبيقات الرقمية.
          </p>
        </div>

        <div className="project-list">
          {products.map(product => (
            <SpotlightCard
              key={product.number}
              className="project-card"
            >
              <div className="project-number font-en-pixel flex items-center gap-2">
                <span>{product.number}</span>
                <span className="text-xl">{product.icon}</span>
              </div>
              <div className="project-main">
                <div className="project-type font-en-pixel">{product.type}</div>
                <h3>
                  {product.title}{" "}
                  <small className="font-ar-pixel text-lg text-[#FFA500] font-normal">
                    ({product.titleAr})
                  </small>
                </h3>
                <p className="text-[#FFA500] text-xs font-semibold mb-1">
                  {product.tagline}
                </p>
                <p>{product.description}</p>
                <div className="project-stack font-en-pixel">
                  {product.stack.map(item => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
              <a
                className="project-arrow"
                href={product.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${product.title}`}
                onMouseEnter={playHoverSound}
                onClick={playClickSound}
              >
                <ArrowUpRight size={24} />
              </a>
              <div className="project-visual">
                {product.number === "01" && (
                  <>
                    <div className="terminal-top font-en-pixel">
                      <span>
                        <i />
                        <i />
                        <i />
                      </span>
                      <small>egytronic_16bit.py</small>
                    </div>
                    <div className="terminal-code font-en-pixel">
                      <span>01</span>
                      <b>model</b> = <em>"Egytronic_1.0"</em>
                      <br />
                      <span>02</span>
                      <b>founder</b> = <em>"Yousef Khamis"</em>
                      <br />
                      <span>03</span>
                      <b>dialect</b> = <em>"ar-eg / Masri"</em>
                      <br />
                      <span>04</span>
                      <b>weights</b> ={" "}
                      <strong className="text-[#FFA500]">"HuggingFace Open"</strong>
                    </div>
                  </>
                )}
                {product.number === "02" && (
                  <>
                    <div className="board-frame p-4 w-full h-full flex flex-col justify-center items-center">
                      <div className="board-toolbar font-en-pixel w-full flex justify-between mb-2">
                        <span className="text-[#00FFCC] flex items-center gap-1">
                          <BrainCircuit size={15} /> SmartBoard AI
                        </span>
                      </div>
                      <div className="text-center font-en-pixel text-xs text-[#ede9e3]">
                        <Sparkles size={20} className="text-[#FFA500] mx-auto mb-1" />
                        <b>AI Teacher Agent Active</b>
                      </div>
                    </div>
                    <div className="ai-pill font-en-pixel absolute bottom-2 right-2 text-[#00FFCC] text-[10px]">
                      EDTECH MODE
                    </div>
                  </>
                )}
                {product.number === "03" && (
                  <>
                    <div className="phone-frame text-center p-3">
                      <div className="phone-top font-en-pixel text-[10px] text-[#FFA500]">
                        AZURA MENU
                      </div>
                      <div className="my-2 font-en-pixel text-xs text-[#ede9e3]">
                        Reel Browsing & AI
                      </div>
                    </div>
                    <div className="scan-pill font-en-pixel absolute bottom-2 right-2 text-[#FFA500] text-[10px]">
                      <Radio size={12} /> LIVE DEPLOYED
                    </div>
                  </>
                )}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* Methodology Section */}
      <section className="statement-section" id="methodology">
        <div className="section-kicker">
          <span>METHODOLOGY</span>
          <span className="eyebrow-line" />
          <span className="font-ar-pixel text-lg text-[#00FFCC]">منهجية العمل</span>
        </div>
        <div className="statement-heading mb-8">
          <h2>
            How We <em className="text-[#FFA500]">Build.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#C8A96E]/14 border border-[#C8A96E]/14">
          {methodology.map(item => (
            <div
              key={item.num}
              className="p-6 bg-[#0c0c18] flex flex-col justify-between hover:bg-[#FFA500]/5 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3 font-en-pixel">
                  <span className="text-[#FFA500] text-lg font-bold">{item.num}</span>
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <h3 className="text-base font-bold text-[#ede9e3] mb-2">{item.title}</h3>
                <p className="text-xs text-[#8a8070] leading-relaxed">{item.description}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-[rgba(200,169,110,0.14)] text-[10px] font-en-pixel text-[#00FFCC]">
                METHODOLOGY
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Arsenal */}
      <section className="toolkit-section">
        <div className="section-kicker">
          <span>TECH STACK</span>
          <span className="eyebrow-line" />
          <span className="font-ar-pixel text-lg text-[#00FFCC]">التقنيات والترسانة</span>
        </div>
        <div className="toolkit-grid">
          <div>
            <h2>
              Our Tech
              <br />
              <em className="text-[#FFA500]">Arsenal.</em>
            </h2>
            <p>
              التقنيات التي نستخدمها في إيجترونيك لبناء وتدريب النماذج والمنصات التفاعلية:
            </p>
          </div>
          <div className="skills-cloud font-en-pixel">
            {skills.map((skill, index) => (
              <span key={skill.name} onMouseEnter={playHoverSound}>
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
            <Code2 size={18} className="text-[#00FFCC]" />
            <span>AI & ML Research</span>
            <b className="font-en-pixel">LLaMA + HuggingFace + PyTorch</b>
          </div>
          <div>
            <Cpu size={18} className="text-[#FFA500]" />
            <span>AI Systems & Fine-Tuning</span>
            <b className="font-en-pixel">Unsloth + Transformers + GGUF</b>
          </div>
          <div>
            <Layers3 size={18} className="text-[#00FFCC]" />
            <span>Full-Stack Infrastructure</span>
            <b className="font-en-pixel">React + Firebase + Cloudflare</b>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <div className="contact-glow" />
        <div className="section-kicker">
          <span>CONTACT</span>
          <span className="eyebrow-line" />
          <span className="font-ar-pixel text-lg text-[#FFA500]">تواصل مع المؤسس</span>
        </div>
        <h2>
          Build with
          <br />
          <em className="text-[#FFA500]">Egytronic.</em>
        </h2>
        <p>
          يسعدني التواصل معك لبحث الاستشارات التقنية، أبحاث النماذج اللغوية، أو التعاون التقني في إيجترونيك.
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
        <span>EGYTRONIC © 2025 // YOUSEF KHAMIS (FOUNDER)</span>
        <span>
          CRAFTED WITH PRECISION & INTENT{" "}
          <Zap size={13} className="text-[#FFA500]" />
        </span>
        <span>ALEXANDRIA, EG</span>
      </footer>
    </main>
  );
}
