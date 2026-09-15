import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  ArrowDownRight,
  ArrowUpRight,
  BrainCircuit,
  Check,
  ChevronRight,
  Code2,
  ExternalLink,
  Github,
  Globe2,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Radio,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  Zap,
  Terminal,
  Cpu,
  Smartphone,
  Layers,
  Flame,
} from "lucide-react";
import {
  isSoundEnabled,
  playClickSound,
  playHoverSound,
  playSectionSwitchSound,
  setSoundEnabled,
} from "../lib/audio";

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
      "Interactive classroom environment transforming teacher inputs into reusable lesson plans, LaTeX mathematical formulas, TTS audio, and interactive 3D visualizations.",
    stack: ["React", "AI SDK", "LaTeX", "Three.js", "Web Speech"],
    href: "https://smartboard-eg.pages.dev",
    accent: "blue",
    badge: "LIVE APP",
  },
];

const skills = [
  { name: "React / Vite", tag: "Frontend" },
  { name: "TypeScript", tag: "Language" },
  { name: "Three.js / WebGL", tag: "3D & Graphics" },
  { name: "Tailwind CSS", tag: "Styling" },
  { name: "Framer Motion", tag: "Animation" },
  { name: "PyTorch & Hugging Face", tag: "AI / ML" },
  { name: "Unsloth & LLaMA", tag: "Fine-Tuning" },
  { name: "Firebase & Cloudflare", tag: "Infrastructure" },
  { name: "Web Audio API", tag: "Audio Effects" },
  { name: "Python / Express", tag: "Backend" },
];

function OrbitScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0, 7.3);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Bright Blue Outer Wireframe
    const sphere = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.7, 2),
      new THREE.MeshBasicMaterial({ color: 0x36a3ff, wireframe: true, transparent: true, opacity: 0.42 })
    );
    group.add(sphere);

    // White Inner Wireframe
    const inner = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.18, 1),
      new THREE.MeshBasicMaterial({ color: 0xf5f3ee, wireframe: true, transparent: true, opacity: 0.25 })
    );
    group.add(inner);

    // Orange Primary Orbit Ring
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.16, 0.012, 12, 120),
      new THREE.MeshBasicMaterial({ color: 0xff754d, transparent: true, opacity: 0.85 })
    );
    ring.rotation.x = Math.PI / 2.7;
    ring.rotation.y = 0.45;
    group.add(ring);

    // Bright Blue Secondary Ring
    const ringTwo = new THREE.Mesh(
      new THREE.TorusGeometry(2.43, 0.008, 12, 120),
      new THREE.MeshBasicMaterial({ color: 0x36a3ff, transparent: true, opacity: 0.5 })
    );
    ringTwo.rotation.x = -Math.PI / 3.5;
    ringTwo.rotation.z = 0.7;
    group.add(ringTwo);

    // Particle Cloud
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 480;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      const radius = 2.8 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particlesGeometry,
      new THREE.PointsMaterial({ color: 0x36a3ff, size: 0.024, transparent: true, opacity: 0.65 })
    );
    scene.add(particles);

    let targetX = 0;
    let targetY = 0;
    const onPointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.45;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.35;
    };
    mount.addEventListener("pointermove", onPointerMove);

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      group.rotation.y += 0.0029;
      group.rotation.x += 0.0007;
      group.rotation.x += (targetY - group.rotation.x) * 0.012;
      group.rotation.z += (targetX - group.rotation.z) * 0.012;
      particles.rotation.y -= 0.0007;
      particles.rotation.x += 0.00025;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      mount.removeEventListener("pointermove", onPointerMove);
      renderer.dispose();
      particlesGeometry.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="orbit-scene" aria-label="Interactive Three.js particle sphere" />;
}

function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={playHoverSound}
      className={`spotlight-card ${className}`}
    >
      {children}
    </div>
  );
}

function UiverseButton({ children, href, outline = false }: { children: React.ReactNode; href: string; outline?: boolean }) {
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
          <button onClick={() => scrollTo("work")} onMouseEnter={playHoverSound}>
            الأعمال / WORK
          </button>
          <button onClick={() => scrollTo("about")} onMouseEnter={playHoverSound}>
            عني / ABOUT
          </button>

          <button onClick={() => scrollTo("contact")} onMouseEnter={playHoverSound}>
            تواصل / CONTACT
          </button>
        </nav>
        <div className="header-actions">
          <button
            className="sound-toggle"
            onClick={toggleSound}
            aria-label="Toggle sound effects"
            title="Toggle Web Audio SFX"
          >
            {soundOn ? <Volume2 size={16} className="text-[#36A3FF]" /> : <VolumeX size={16} className="text-[#9198A1]" />}
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
            <span className="font-ar-pixel text-lg">مطوّر برمجيات وذكاء اصطناعي</span>
          </div>
          <h1>
            Building<br />
            <em className="text-[#FF754D]">Useful</em><br />
            Intelligence.
          </h1>
          <p className="hero-intro">
            أنا <strong>يوسف خميس مدبولي</strong> — مطوّر برمجيات من الإسكندرية، أعمل على بناء منتجات رقمية تجمع بين <strong>الذكاء الاصطناعي التطبيقي</strong>، و<strong>تطوير الويب متكامل الأركان (Full-Stack)</strong>.
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
            <span>LIVE SYNC // 3D CANVAS</span>
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
          <span className="font-ar-pixel text-lg">منهجية العمل</span>
        </div>
        <div className="statement-grid">
          <div className="flex flex-col md:flex-row gap-8 items-start col-span-full">
            <div className="relative group w-48 h-48 md:w-56 md:h-56 shrink-0 rounded-2xl overflow-hidden border-2 border-[#36A3FF] shadow-[0_0_20px_rgba(54,163,255,0.25)]">
              <img
                src="/yousef.jpg"
                alt="Yousef Madbouly"
                className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111315] via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-2 left-2 right-2 px-2 py-1 bg-[#111315]/80 backdrop-blur border border-[#36A3FF]/40 rounded text-[0.65rem] font-en-pixel text-[#FF754D] flex justify-between">
                <span>YOUSEF MADBOULY</span>
                <span>EG</span>
              </div>
            </div>
            <div>
              <p className="statement-lead">
                أصمم وأطور أنظمة تجعل التقنيات المعقدة <em>سلسة ومباشرة</em> للاستخدام.
              </p>
              <div className="statement-body mt-4">
                <p>
                  أربع سنوات من التعلّم الذاتي والتطوير المستقل علّمتني بناء الدورة البرمجية كاملة — من صياغة المفهوم الأولي وحتى إطلاق منتج حقيقي يخدم المستخدمين.
                </p>
                <p>
                  سواء كان ذلك تدريب نموذج لغوي بالعامية المصرية، أو إنشاء قائمة طعام تفاعلية تعمل عبر كود QR، أو سبورة تعليمية ذكية للمدرسين.
                </p>
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
            <span className="font-ar-pixel text-lg">معرض المشاريع الحقيقية</span>
          </div>
          <h2>
            Proof of <em className="text-[#FF754D]">Practice.</em>
          </h2>
          <p>
            مشاريع واقعية مبنية وأُطلقت للعلن — كل مشروع يعالج تحدياً تقنياً حقيقياً بلمسة هندسية متقنة.
          </p>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <SpotlightCard key={project.number} className={`project-card accent-${project.accent}`}>
              <div className="project-number font-en-pixel">{project.number}</div>
              <div className="project-main">
                <div className="project-type font-en-pixel">{project.type}</div>
                <h3>
                  {project.title} <small className="font-ar-pixel text-lg text-[#FF754D] font-normal">({project.titleAr})</small>
                </h3>
                <p>{project.description}</p>
                <div className="project-stack font-en-pixel">
                  {project.stack.map((item) => (
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
                      <b>quantization</b> = <strong className="text-[#FF754D]">"GGUF / F16"</strong>
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
                          <b className="font-en-pixel">3D & LaTeX Lesson Active</b>
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
              Curious by<br />
              <em className="text-[#FF754D]">Default.</em>
            </h2>
            <p>
              التقنيات هي وسيلة لتجسيد الأفكار الحية. هذه هي أسلحتي البرمجية التي أعتمد عليها لبناء المنتجات من الصفر:
            </p>
          </div>
          <div className="skills-cloud font-en-pixel">
            {skills.map((skill, index) => (
              <span
                key={skill.name}
                style={{ "--delay": `${index * 0.04}s` } as React.CSSProperties}
                onMouseEnter={playHoverSound}
              >
                {skill.name} <small className="opacity-60 text-[0.6rem] ml-1">[{skill.tag}]</small>
              </span>
            ))}
          </div>
        </div>
        <div className="stack-notes">
          <div>
            <Code2 size={18} className="text-[#36A3FF]" />
            <span>Frontend Engineering</span>
            <b className="font-en-pixel">React + TypeScript + Three.js</b>
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
          Have a good<br />
          <em className="text-[#FF754D]">Problem?</em>
        </h2>
        <p>
          أنا دائمًا منفتح للمشاركات الشغوفة، والمنتجات الطموحة، والمحادثات التقنية المثمرة.
        </p>
        <UiverseButton href="mailto:Yousefkhamismadbouly@googlemail.com">إرسال بريد إلكتروني</UiverseButton>
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
          CRAFTED WITH THREE.JS & INTENT <Zap size={13} className="text-[#36A3FF]" />
        </span>
        <span>ALEXANDRIA, EG</span>
      </footer>
    </main>
  );
}
