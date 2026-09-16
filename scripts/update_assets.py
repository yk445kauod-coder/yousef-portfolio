from pathlib import Path

home = Path('/home/ubuntu/yousef-portfolio/client/src/pages/Home.tsx')
css = Path('/home/ubuntu/yousef-portfolio/client/src/index.css')
html = Path('/home/ubuntu/yousef-portfolio/client/index.html')

text = home.read_text()
text = text.replace('import { useEffect, useRef, useState } from "react";', 'import { useEffect, useRef, useState } from "react";')
text = text.replace('const projects = [', '''const ASSETS = {
  portrait: "/manus-storage/yousef-portrait_5267d578.jpg",
  azura: "/manus-storage/azura-live_92476904.webp",
  smartboard: "/manus-storage/smartboard-live_c05a0e9b.webp",
  ambient: "/manus-storage/portfolio-ambient_cbd41c6e.mp3",
  pixelGrid: "/manus-storage/pixel-ai-grid_90cee77d.jpg",
  pixelOrbit: "/manus-storage/pixel-circuit-orbit_5f0ac662.jpg",
};

const projects = [''')
text = text.replace('accent: "lime",\n  },', 'accent: "lime",\n    image: ASSETS.pixelOrbit,\n  },')
text = text.replace('accent: "orange",\n  },', 'accent: "orange",\n    image: ASSETS.azura,\n  },')
text = text.replace('accent: "violet",\n  },', 'accent: "violet",\n    image: ASSETS.smartboard,\n  },')
text = text.replace('  return <div ref={mountRef} className="orbit-scene" aria-label="Interactive Three.js particle sphere" />;\n}', '''  return <div ref={mountRef} className="orbit-scene" aria-label="Interactive Three.js particle sphere" />;
}

function AudioToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); return; }
    try { await audio.play(); setPlaying(true); } catch { setPlaying(false); }
  };
  return <>
    <audio ref={audioRef} src={ASSETS.ambient} loop preload="none" />
    <button className={`audio-toggle ${playing ? "is-playing" : ""}`} onClick={toggle} aria-label={playing ? "Pause ambient sound" : "Play ambient sound"}>
      <span className="audio-bars"><i /><i /><i /><i /></span><span>{playing ? "SOUND ON" : "SOUND OFF"}</span>
    </button>
  </>;
}''')
text = text.replace('  const [menuOpen, setMenuOpen] = useState(false);', '  const [menuOpen, setMenuOpen] = useState(false);')
text = text.replace('        <div className="header-actions">', '        <div className="header-actions"><AudioToggle />')
text = text.replace('        <div className="hero-visual reveal-fade">\n          <OrbitScene />', '''        <div className="hero-visual reveal-fade">
          <div className="portrait-wrap"><img src={ASSETS.portrait} alt="Yousef Madbouly" /><span>YOUSEF<br />MADBOULY</span></div>
          <OrbitScene />''')
text = text.replace('              <div className="project-visual">', '              <div className="project-visual"><img className="project-live-image" src={project.image} alt={`${project.title} live project`} />')
home.write_text(text)

style = css.read_text()
style = style.replace('  --orange: #ff745d;\n  --violet: #b19cff;', '  --orange: #ff754d;\n  --blue: #36a3ff;\n  --violet: #b19cff;')
style = style.replace('font-family: "DM Sans", ui-sans-serif, system-ui, sans-serif;', 'font-family: "IBM Plex Sans Arabic", ui-sans-serif, system-ui, sans-serif;')
style = style.replace('background: #10120f;', 'background: #111315;')
style = style.replace('.site-header { height: 76px;', '.site-header { height: 76px; background: rgba(17,19,21,0.78); backdrop-filter: blur(16px);')
style = style.replace('.brand-mark span { color: var(--lime);', '.brand-mark span { color: var(--blue);')
style = style.replace('.availability { color:', '.audio-toggle { display:flex; align-items:center; gap:0.45rem; border:1px solid rgba(54,163,255,0.3); color:#aab3bd; background:rgba(54,163,255,0.06); padding:0.42rem 0.58rem; font:0.55rem "Pixelify Sans", monospace; letter-spacing:0.08em; } .audio-toggle:hover, .audio-toggle.is-playing { color:var(--blue); border-color:var(--blue); } .audio-bars { display:flex; gap:2px; align-items:end; height:11px; } .audio-bars i { width:2px; height:5px; background:currentColor; animation:audio-bar .8s ease-in-out infinite alternate; } .audio-bars i:nth-child(2) { height:9px; animation-delay:.12s; } .audio-bars i:nth-child(3) { height:6px; animation-delay:.24s; } .audio-bars i:nth-child(4) { height:10px; animation-delay:.36s; } .audio-toggle:not(.is-playing) .audio-bars i { animation-play-state:paused; opacity:.55; } .availability { color:')
style = style.replace('.hero-section { min-height: 100vh;', '.hero-section { min-height: 100vh; background-image: linear-gradient(90deg, rgba(17,19,21,0.98) 0%, rgba(17,19,21,0.88) 44%, rgba(17,19,21,0.35) 100%), url("/manus-storage/pixel-ai-grid_90cee77d.jpg"); background-size: cover; background-position: center;')
style = style.replace('color: var(--lime); font-size: 0.62rem;', 'color: var(--blue); font-size: 0.62rem;')
style = style.replace('h1 em, h2 em, .statement-lead em { color: var(--lime);', 'h1 em, h2 em, .statement-lead em { color: var(--blue);')
style = style.replace('.hero-visual { position: relative;', '.hero-visual { position: relative;')
style = style.replace('.orb-center { position: absolute;', '''.portrait-wrap { position:absolute; z-index:2; left:50%; bottom:11%; transform:translateX(-50%); width:118px; height:145px; overflow:hidden; border:2px solid var(--blue); box-shadow:7px 7px 0 var(--orange); background:#1a1d20; transform:translateX(-50%) rotate(2deg); }.portrait-wrap img { width:100%; height:100%; object-fit:cover; object-position:50% 22%; filter:saturate(.85) contrast(1.04); }.portrait-wrap span { position:absolute; bottom:0; left:0; right:0; background:rgba(17,19,21,.82); color:#fff; font:0.45rem/1.05 "Pixelify Sans", monospace; letter-spacing:.08em; padding:.45rem; }
.orb-center { position: absolute;''')
style = style.replace('.project-visual { min-height: 210px;', '.project-live-image { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:.18; filter:grayscale(.6) saturate(1.35) contrast(1.1); mix-blend-mode:screen; transition:opacity 260ms var(--ease-out), transform 260ms var(--ease-out); } .spotlight-card:hover .project-live-image { opacity:.32; transform:scale(1.04); } .project-visual { min-height: 210px;')
style = style.replace('.project-visual { min-height: 210px; border:', '.project-visual { min-height: 210px; border:')
style = style.replace('.project-type { color: var(--lime);', '.project-type { color: var(--blue);')
style = style.replace('.accent-orange .project-type { color: var(--orange); }', '.accent-orange .project-type { color: var(--orange); }')
style = style.replace('.contact-section { padding-top:', '.contact-section { padding-top:')
style = style.replace('background: #b6ff3f;', 'background: var(--orange);')
style = style.replace('.contact-section h2 em { color: #f36c55;', '.contact-section h2 em { color: var(--blue);')
style = style.replace('@keyframes pulse {', '@keyframes audio-bar { from { transform:scaleY(.55); } to { transform:scaleY(1.05); } }\n@keyframes pulse {')
style = style.replace('@media (max-width: 900px) {', '@media (max-width: 900px) {\n  .audio-toggle { display:none; }')
css.write_text(style)

page = html.read_text()
page = page.replace('family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700', 'family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Handjet:wght@400;500;600;700&family=Pixelify+Sans:wght@400;500;600;700')
html.write_text(page)
