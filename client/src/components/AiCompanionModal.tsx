import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Sparkles, Minimize2, Maximize2, Download, Copy, Check } from "lucide-react";
import { Mascot } from "page-mascot";
import { playClickSound, playHoverSound } from "@/lib/audio";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

const KNOWLEDGE_BASE = {
  name: "Yousef Khamis",
  title: "Founder of Egytronic & Software Developer (مطور برمجيات)",
  location: "Alexandria, Egypt",
  huggingface: "https://huggingface.co/YousefKhamis",
  github: "https://github.com/yk445kauod-coder",
  email: "Yousefkhamismadbouly@googlemail.com",
  projects: [
    {
      name: "Egytronic_1.0",
      description: "An 8B-parameter decoder-only language model fine-tuned for Egyptian Arabic, local linguistic context, and practical inference workflows using Llama 3.1, Unsloth, PyTorch, and Hugging Face.",
      url: "https://huggingface.co/YousefKhamis/Egytronic_1.0",
    },
    {
      name: "Azura Cafe & Restaurant",
      description: "A mobile-first QR reel menu platform with live admin workflows, Firebase Realtime synchronization, and AI acceleration using Groq and Llama 3.3.",
      url: "https://azura-app.pages.dev",
    },
    {
      name: "SmartBoard AI",
      description: "An interactive classroom AI application transforming teacher prompts into structured lessons, visual assets, LaTeX math formulas, TTS, and active learning modes.",
      url: "https://smartboard-eg.pages.dev",
    },
  ],
  skills: [
    "React", "TypeScript", "Python", "PyTorch", "Transformers", "LLM Fine-Tuning (Unsloth)", "Firebase", "Cloudflare Pages", "Tailwind CSS", "Vite"
  ]
};

function renderMarkdown(content: string) {
  const lines = content.split("\n");
  return lines.map((line, lineIdx) => {
    if (line.startsWith("### ")) {
      return <h4 key={lineIdx} className="text-sm font-bold text-[#36A3FF] mt-2 mb-1 font-['Pixelify_Sans']">{line.replace("### ", "")}</h4>;
    }
    if (line.startsWith("## ") || line.startsWith("# ")) {
      return <h3 key={lineIdx} className="text-base font-bold text-[#FFA500] mt-2 mb-1 font-['Pixelify_Sans']">{line.replace(/^#+\s*/, "")}</h3>;
    }

    if (line.startsWith("- ") || line.startsWith("* ")) {
      const listText = line.replace(/^[-*]\s*/, "");
      return (
        <li key={lineIdx} className="ml-4 list-disc text-xs leading-relaxed text-[#ECEAE3]">
          {parseInline(listText)}
        </li>
      );
    }

    if (/^\d+\.\s/.test(line)) {
      const listText = line.replace(/^\d+\.\s*/, "");
      return (
        <li key={lineIdx} className="ml-4 list-decimal text-xs leading-relaxed text-[#ECEAE3]">
          {parseInline(listText)}
        </li>
      );
    }

    if (line.startsWith("```")) {
      return <div key={lineIdx} className="my-1 border-l-2 border-[#36A3FF] bg-[#0c0c18] p-1.5 font-mono text-[11px] text-[#36A3FF]">{line.replace(/```/g, "")}</div>;
    }

    if (!line.trim()) {
      return <div key={lineIdx} className="h-1.5" />;
    }

    return (
      <p key={lineIdx} className="text-xs leading-relaxed my-0.5 text-[#ECEAE3]">
        {parseInline(line)}
      </p>
    );
  });
}

function parseInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={idx} className="font-semibold text-[#FFA500]">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={idx} className="bg-[#0c0c18] border border-[#36A3FF]/30 text-[#36A3FF] px-1 rounded text-[10px] font-mono">{part.slice(1, -1)}</code>;
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a key={idx} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-[#36A3FF] underline hover:text-[#FFA500] font-medium">
          {linkMatch[1]}
        </a>
      );
    }
    return part;
  });
}

function generateSmartReply(input: string): string {
  const query = input.toLowerCase();

  if (query.includes("egytronic") || query.includes("model") || query.includes("llama") || query.includes("8b") || query.includes("hugging")) {
    return `### ⚡ Egytronic_1.0 Language Model
Yousef Khamis developed **Egytronic_1.0**, an 8B-parameter decoder-only language model custom fine-tuned for Egyptian Arabic context and workflows.

- **Stack**: Llama 3.1, Unsloth, PyTorch, Transformers
- **Hugging Face Model**: [Egytronic_1.0 Model](https://huggingface.co/YousefKhamis/Egytronic_1.0)
- **Profile**: [YousefKhamis Hugging Face](https://huggingface.co/YousefKhamis)`;
  }

  if (query.includes("azura") || query.includes("cafe") || query.includes("menu") || query.includes("qr")) {
    return `### ☕ Azura Cafe & Restaurant
A mobile-first restaurant platform turning QR scans into a real-time reel menu experience.

- **Stack**: React, Firebase Realtime Database, Groq AI (Llama 3.3), Cloudflare Pages
- **Live Product**: [Azura Cafe App](https://azura-app.pages.dev)`;
  }

  if (query.includes("smartboard") || query.includes("education") || query.includes("school") || query.includes("teacher")) {
    return `### 🎓 SmartBoard AI
An interactive educational platform enabling teachers to turn prompts into live structured lessons, active learning, and visual math formulas.

- **Stack**: AI SDKs, LaTeX, TTS, React, Cloudflare
- **Live Product**: [SmartBoard AI](https://smartboard-eg.pages.dev)`;
  }

  if (query.includes("skill") || query.includes("tech") || query.includes("stack") || query.includes("code")) {
    return `### 💻 Technical Skills & Stack
Yousef Khamis specializes in full-stack engineering and applied AI systems:

- **Languages**: TypeScript, JavaScript, Python
- **Frontend**: React, Vite, Tailwind CSS, Framer Motion
- **AI & ML**: PyTorch, Hugging Face Transformers, Unsloth Fine-Tuning, LLM APIs
- **Backend & Cloud**: Firebase, Cloudflare Pages/R2, Node.js, Express`;
  }

  if (query.includes("contact") || query.includes("email") || query.includes("hire") || query.includes("github") || query.includes("location")) {
    return `### 📬 Contact & Links
- **Title**: Founder of Egytronic & Software Developer (مطور برمجيات)
- **Location**: Alexandria, Egypt
- **Email**: \`Yousefkhamismadbouly@googlemail.com\`
- **Hugging Face**: [YousefKhamis Profile](https://huggingface.co/YousefKhamis)
- **GitHub**: [yk445kauod-coder](https://github.com/yk445kauod-coder)
- **Download AI Context**: You can download \`llm.txt\` anytime!`;
  }

  if (query.includes("who") || query.includes("yousef") || query.includes("founder") || query.includes("about")) {
    return `### 👋 Meet Yousef Khamis
**Yousef Khamis** is the **Founder of Egytronic** and a **Software Developer (مطور برمجيات)** based in Alexandria, Egypt.

He builds full-stack web products, applied AI systems, and educational technology.
- **Hugging Face**: [https://huggingface.co/YousefKhamis](https://huggingface.co/YousefKhamis)
- **Projects**: Egytronic_1.0 (8B Model), Azura Cafe, SmartBoard AI.`;
  }

  return `### 🤖 Egytronic AI Assistant
I have full context on **Yousef Khamis** (Founder of Egytronic & Software Developer):

1. **Egytronic_1.0**: 8B Egyptian Arabic model on [Hugging Face](https://huggingface.co/YousefKhamis/Egytronic_1.0)
2. **Azura Cafe**: Mobile-first QR restaurant app at [azura-app.pages.dev](https://azura-app.pages.dev)
3. **SmartBoard AI**: Educational whiteboard app at [smartboard-eg.pages.dev](https://smartboard-eg.pages.dev)

What would you like to know about his projects, skills, or contact info?`;
}

export function AiCompanionModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "### 👋 Ahlan! I'm Egytronic AI Companion\nI have full context on **Yousef Khamis** (Founder of Egytronic & Software Developer). Ask me about **Egytronic_1.0**, **Azura Cafe**, **SmartBoard AI**, or his tech stack!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [messages, isOpen]);

  const handleMascotClick = () => {
    playClickSound();
    setIsOpen(true);
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    playClickSound();

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");

    setTimeout(() => {
      const replyText = generateSmartReply(text);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 400);
  };

  const downloadLlmTxt = () => {
    playClickSound();
    const element = document.createElement("a");
    element.href = "/llm.txt";
    element.download = "llm.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const copyContext = () => {
    playClickSound();
    const ctxText = `Yousef Khamis - Founder of Egytronic & Software Developer\nHugging Face: ${KNOWLEDGE_BASE.huggingface}\nGitHub: ${KNOWLEDGE_BASE.github}\nEmail: ${KNOWLEDGE_BASE.email}\nProjects: Egytronic_1.0, Azura Cafe, SmartBoard AI`;
    navigator.clipboard.writeText(ctxText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Page Mascot Interactive Companion Widget */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end pointer-events-none select-none">
        {/* Floating Bubble Label when Chat is Closed */}
        {!isOpen && (
          <div className="mb-1 pointer-events-auto flex items-center gap-1.5 bg-[#07070f]/95 border border-[#36A3FF]/60 px-2.5 py-1 rounded-full text-[10px] text-[#F5F3EE] font-['Pixelify_Sans'] shadow-[0_0_15px_rgba(54,163,255,0.3)] animate-bounce">
            <span className="w-1.5 h-1.5 rounded-full bg-[#36A3FF] animate-pulse" />
            <span>Chat AI</span>
            <Sparkles size={11} className="text-[#FFA500]" />
          </div>
        )}

        <div className="pointer-events-auto filter drop-shadow-[0_0_12px_rgba(54,163,255,0.3)] hover:drop-shadow-[0_0_18px_rgba(255,165,0,0.5)] transition-all transform hover:scale-105">
          <div onClick={handleMascotClick} onMouseEnter={playHoverSound}>
            <Mascot
              directions="/mascots/crt-directions.webp"
              reactions="/mascots/crt-reactions.webp"
              size={96}
              label="Egytronic CRT AI Mascot"
            />
          </div>
        </div>
      </div>

      {/* Floating Modal Window */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 flex flex-col border border-[#36A3FF]/40 bg-[#07070f]/95 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.8)] rounded-xl overflow-hidden font-['IBM_Plex_Sans_Arabic'] ${
            isExpanded
              ? "bottom-4 right-4 left-4 top-20 md:left-auto md:w-[600px] md:h-[650px]"
              : "bottom-28 right-4 w-[90vw] max-w-[380px] h-[480px]"
          }`}
          role="dialog"
          aria-label="Egytronic AI Companion Chat Modal"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#0c0c18] border-b border-[#36A3FF]/30 select-none">
            <div className="flex items-center gap-2">
              <Bot size={18} className="text-[#36A3FF]" />
              <div>
                <div className="text-xs font-bold text-[#F5F3EE] font-['Pixelify_Sans'] tracking-wider flex items-center gap-1.5">
                  EGYTRONIC_AI <span className="text-[9px] text-[#FFA500] bg-[#FFA500]/10 px-1 py-0.5 rounded border border-[#FFA500]/30">v2.0</span>
                </div>
                <div className="text-[10px] text-[#36A3FF] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#36A3FF] animate-pulse" /> Live CV Context
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={copyContext}
                title="Copy Context"
                className="p-1 text-[#aab3bd] hover:text-[#36A3FF] transition-colors"
                aria-label="Copy Context"
              >
                {copied ? <Check size={14} className="text-[#FFA500]" /> : <Copy size={14} />}
              </button>
              <button
                onClick={downloadLlmTxt}
                title="Download llm.txt for AI agents"
                className="p-1 text-[#aab3bd] hover:text-[#36A3FF] transition-colors"
                aria-label="Download llm.txt"
              >
                <Download size={14} />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 text-[#aab3bd] hover:text-[#F5F3EE] transition-colors"
                aria-label={isExpanded ? "Minimize Chat" : "Expand Chat"}
              >
                {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-[#aab3bd] hover:text-[#FFA500] transition-colors"
                aria-label="Close Chat Modal"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages scroll area */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-[#07070f]/80 scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div className="text-[9px] text-[#aab3bd] font-mono mb-0.5 px-1">
                  {msg.sender === "user" ? "YOU" : "EGYTRONIC_AI"} • {msg.timestamp}
                </div>
                <div
                  className={`p-2.5 rounded-lg max-w-[88%] text-xs border ${
                    msg.sender === "user"
                      ? "bg-[#FFA500]/15 text-[#F5F3EE] border-[#FFA500]/40 rounded-br-none"
                      : "bg-[#0c0c18] text-[#ECEAE3] border-[#36A3FF]/30 rounded-bl-none shadow-[0_2px_10px_rgba(54,163,255,0.08)]"
                  }`}
                >
                  {renderMarkdown(msg.text)}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-2.5 py-1.5 bg-[#0c0c18]/90 border-t border-[#36A3FF]/20 flex gap-1.5 overflow-x-auto scrollbar-none text-[10px] font-['Pixelify_Sans']">
            <button
              onClick={() => handleSend("Tell me about Egytronic_1.0 model")}
              className="whitespace-nowrap px-2 py-0.5 border border-[#36A3FF]/30 bg-[#36A3FF]/10 text-[#36A3FF] hover:border-[#FFA500] hover:text-[#FFA500] rounded transition-colors"
            >
              ⚡ Egytronic_1.0
            </button>
            <button
              onClick={() => handleSend("What are Yousef's top skills?")}
              className="whitespace-nowrap px-2 py-0.5 border border-[#36A3FF]/30 bg-[#36A3FF]/10 text-[#36A3FF] hover:border-[#FFA500] hover:text-[#FFA500] rounded transition-colors"
            >
              🛠️ Skills
            </button>
            <button
              onClick={() => handleSend("Show Hugging Face profile")}
              className="whitespace-nowrap px-2 py-0.5 border border-[#36A3FF]/30 bg-[#36A3FF]/10 text-[#36A3FF] hover:border-[#FFA500] hover:text-[#FFA500] rounded transition-colors"
            >
              🤗 HuggingFace
            </button>
            <button
              onClick={() => handleSend("How can I contact Yousef?")}
              className="whitespace-nowrap px-2 py-0.5 border border-[#36A3FF]/30 bg-[#36A3FF]/10 text-[#36A3FF] hover:border-[#FFA500] hover:text-[#FFA500] rounded transition-colors"
            >
              📬 Contact
            </button>
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="p-2 bg-[#0c0c18] border-t border-[#36A3FF]/30 flex items-center gap-2"
          >
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask AI about Yousef Khamis..."
                className="w-full bg-[#07070f] border border-[#36A3FF]/30 text-[#F5F3EE] placeholder-[#aab3bd]/60 px-3 py-1.5 rounded text-xs focus:outline-none focus:border-[#FFA500] font-['IBM_Plex_Sans_Arabic']"
              />
            </div>
            <button
              type="submit"
              className="p-2 bg-[#36A3FF] hover:bg-[#FFA500] text-[#07070f] rounded font-bold transition-colors flex items-center justify-center"
              aria-label="Send message to AI companion"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
