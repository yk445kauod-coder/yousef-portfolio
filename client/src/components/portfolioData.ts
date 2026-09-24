export const ASSETS = {
  avatar: "/assets/yousef-real-photo.jpg",
  mascot: "/assets/yousef-mascot-sphere.png",
  hero: "/assets/portfolio-hero-pixel.jpg",
  milestone: "/assets/milestone-lab-pixel.jpg",
  azura: "/assets/azura-latest.jpg",
  smartboard: "/assets/smartboard-latest.jpg",
  azuraLogo: "/assets/azura-logo.jpg",
  smartboardLogo: "/assets/smartboard-logo.png",
  chime: "/assets/terminal-chime.mp3",
  pyramidSprites: "/assets/pyramid-build-sprites.png",
  glassTexture: "/assets/liquid-glass-texture.jpg",
  egytronicFrame: "/assets/egytronic-card-frame.png",
  smartboardFrame: "/assets/smartboard-card-frame.png",
  azuraFrame: "/assets/azura-card-frame.png",
} as const;

export const projects = [
  { number: "01", kind: "AI / LLM", title: "Egytronic_1.0", text: "Fine-tuned 8B-parameter language model for Egyptian Arabic, local culture, and practical inference workflows.", tags: ["Llama 3.1", "Unsloth", "GGUF"], image: ASSETS.milestone, frame: ASSETS.egytronicFrame, link: "https://huggingface.co/YousefKhamis/Egytronic_1.0", cta: "View on Hugging Face" },
  { number: "02", kind: "EDTECH / AI", title: "SmartBoard AI", text: "An AI-powered classroom whiteboard that turns lesson intent into visual, interactive teaching moments.", tags: ["React", "AI Teacher", "Realtime"], image: ASSETS.smartboard, frame: ASSETS.smartboardFrame, logo: ASSETS.smartboardLogo, link: "https://smartboard-eg.pages.dev", cta: "Open live project" },
  { number: "03", kind: "PRODUCT / WEB", title: "Azura Cafe", text: "A mobile-first restaurant experience with QR access, realtime ordering, and a warm seasonal visual system.", tags: ["Firebase", "Cloudflare", "Framer Motion"], image: ASSETS.azura, frame: ASSETS.azuraFrame, logo: ASSETS.azuraLogo, link: "https://azura-app.pages.dev", cta: "Open live project" },
] as const;

export const skills = ["React", "TypeScript", "Tailwind", "Firebase RTDB", "Cloudflare Pages", "PyTorch", "Transformers", "Unsloth", "MCP", "Framer Motion", "GitHub", "Arabic RTL"];

export const context = "Yousef Khamis Ebrahim Madbouly is a junior software developer from Alexandria, Egypt and an independent builder with four years of self-directed development. He works across React, TypeScript, Firebase, Cloudflare, AI product development, Llama fine-tuning, PyTorch, Transformers, Unsloth, MCP, and educational technology. Featured work includes Egytronic_1.0, a fine-tuned 8B Llama 3.1 model for Egyptian Arabic on Hugging Face; SmartBoard AI, an AI classroom whiteboard; and Azura Cafe, a deployed mobile-first restaurant web app. GitHub: https://github.com/yk445kauod-coder. Hugging Face: https://huggingface.co/YousefKhamis. Live projects: https://smartboard-eg.pages.dev and https://azura-app.pages.dev.";

export type Project = (typeof projects)[number];
