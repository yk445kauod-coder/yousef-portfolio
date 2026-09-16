import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Sparkles, Minimize2, Maximize2, Download, Copy, Check, Loader2 } from "lucide-react";
import { Mascot } from "page-mascot";
import { playClickSound, playHoverSound } from "@/lib/audio";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

const SYSTEM_PROMPT = `You are the official AI Assistant on the portfolio website of Yousef Khamis.
Key facts about Yousef Khamis:
- Title: Founder of Egytronic & Software Developer (مطور برمجيات)
- Location: Alexandria, Egypt
- Hugging Face Profile: https://huggingface.co/YousefKhamis
- GitHub: https://github.com/yk445kauod-coder
- Email: Yousefkhamismadbouly@googlemail.com

Main Projects & Accomplishments:
1. Egytronic_1.0: An 8B-parameter decoder-only language model fine-tuned for Egyptian Arabic, local linguistic context, and practical inference workflows using Llama 3.1, Unsloth, PyTorch, and Hugging Face.
2. Azura Cafe & Restaurant: A mobile-first QR reel menu platform with live admin workflows, Firebase Realtime synchronization, and AI acceleration using Groq and Llama 3.3.
3. SmartBoard AI: An interactive classroom AI application transforming teacher prompts into structured lessons, visual assets, LaTeX math formulas, TTS, and active learning modes.

Tech Stack & Skills:
- React 19, TypeScript, Vite, Tailwind CSS, Framer Motion
- Python, PyTorch, Transformers, Unsloth Llama 3.1 Fine-Tuning
- Firebase Realtime DB, Cloudflare Pages/R2, Node.js, Express

Guidelines for response:
- Be concise, helpful, friendly, and professional.
- Support both Arabic (Egyptian / Standard) and English fluently.
- Always refer to Yousef Khamis strictly as "Founder of Egytronic" and "Software Developer" (never use CEO, AI Research Engineer, or vibe coder).
- Use Markdown headers, bullet points, and links when appropriate.`;

function generateSmartReply(input: string): string {
  const query = input.toLowerCase();

  if (query.includes("egytronic") || query.includes("model") || query.includes("llama") || query.includes("8b") || query.includes("hugging")) {
    return `### ⚡ Egytronic_1.0 Language Model\nYousef Khamis developed **Egytronic_1.0**, an 8B-parameter decoder-only language model custom fine-tuned for Egyptian Arabic context and workflows.\n\n- **Stack**: Llama 3.1, Unsloth, PyTorch, Transformers\n- **Hugging Face Model**: [Egytronic_1.0 Model](https://huggingface.co/YousefKhamis/Egytronic_1.0)\n- **Profile**: [YousefKhamis Hugging Face](https://huggingface.co/YousefKhamis)`;
  }

  if (query.includes("azura") || query.includes("cafe") || query.includes("menu") || query.includes("qr")) {
    return `### ☕ Azura Cafe & Restaurant\nA mobile-first restaurant platform turning QR scans into a real-time reel menu experience.\n\n- **Stack**: React, Firebase Realtime Database, Groq AI (Llama 3.3), Cloudflare Pages\n- **Live Product**: [Azura Cafe App](https://azura-app.pages.dev)`;
  }

  if (query.includes("smartboard") || query.includes("education") || query.includes("school") || query.includes("teacher")) {
    return `### 🎓 SmartBoard AI\nAn interactive educational platform enabling teachers to turn prompts into live structured lessons, active learning, and visual math formulas.\n\n- **Stack**: AI SDKs, LaTeX, TTS, React, Cloudflare\n- **Live Product**: [SmartBoard AI](https://smartboard-eg.pages.dev)`;
  }

  if (query.includes("skill") || query.includes("tech") || query.includes("stack") || query.includes("code")) {
    return `### 💻 Technical Skills & Stack\nYousef Khamis specializes in full-stack engineering and applied AI systems:\n\n- **Languages**: TypeScript, JavaScript, Python\n- **Frontend**: React, Vite, Tailwind CSS, Framer Motion\n- **AI & ML**: PyTorch, Hugging Face Transformers, Unsloth Fine-Tuning, LLM APIs\n- **Backend & Cloud**: Firebase, Cloudflare Pages/R2, Node.js, Express`;
  }

  if (query.includes("contact") || query.includes("email") || query.includes("hire") || query.includes("github") || query.includes("location")) {
    return `### 📬 Contact & Links\n- **Title**: Founder of Egytronic & Software Developer (مطور برمجيات)\n- **Location**: Alexandria, Egypt\n- **Email**: \`Yousefkhamismadbouly@googlemail.com\`\n- **Hugging Face**: [YousefKhamis Profile](https://huggingface.co/YousefKhamis)\n- **GitHub**: [yk445kauod-coder](https://github.com/yk445kauod-coder)\n- **Download AI Context**: You can download \`llm.txt\` anytime!`;
  }

  return `### 🤖 Egytronic AI Assistant\nI have full context on **Yousef Khamis** (Founder of Egytronic & Software Developer):\n\n1. **Egytronic_1.0**: 8B Egyptian Arabic model on [Hugging Face](https://huggingface.co/YousefKhamis/Egytronic_1.0)\n2. **Azura Cafe**: Mobile-first QR restaurant app at [azura-app.pages.dev](https://azura-app.pages.dev)\n3. **SmartBoard AI**: Educational whiteboard app at [smartboard-eg.pages.dev](https://smartboard-eg.pages.dev)\n\nWhat would you like to know about his projects, skills, or contact info?`;
}

function renderMarkdown(content: string) {
  const lines = content.split("\n");
  return lines.map((line, lineIdx) => {
    if (line.startsWith("### ")) {
      return <h4 key={lineIdx} className="text-sm font-bold text-[#FF754D] mt-2 mb-1 font-['Pixelify_Sans']">{line.replace("### ", "")}</h4>;
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
      return <strong key={idx} className="font-semibold text-[#FF754D]">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={idx} className="bg-[#0c0c18] border border-[#36A3FF]/30 text-[#36A3FF] px-1 rounded text-[10px] font-mono">{part.slice(1, -1)}</code>;
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a key={idx} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-[#36A3FF] underline hover:text-[#FF754D] font-medium">
          {linkMatch[1]}
        </a>
      );
    }
    return part;
  });
}

export function AiCompanionModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "### 👋 Ahlan! I'm Egytronic AI Companion\nI am connected live to Pollinations AI with full context on **Yousef Khamis** (Founder of Egytronic & Software Developer). Ask me about **Egytronic_1.0**, **Azura Cafe**, **SmartBoard AI**, or his tech stack!",
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

  const fetchAiResponse = async (userPrompt: string, history: Message[]): Promise<string> => {
    try {
      const apiMessages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...history.slice(-6).map((m) => ({
          role: m.sender === "user" ? "user" : "assistant",
          content: m.text,
        })),
        { role: "user", content: userPrompt },
      ];

      const res = await fetch("https://text.pollinations.ai/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: apiMessages,
          model: "openai",
          jsonMode: false,
        }),
      });

      if (!res.ok) {
        throw new Error(`Pollinations status: ${res.status}`);
      }

      const text = await res.text();
      return text && text.trim() ? text : generateSmartReply(userPrompt);
    } catch (e) {
      console.warn("Pollinations AI fetch failed, using smart fallback:", e);
      return generateSmartReply(userPrompt);
    }
  };

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isLoading) return;

    playClickSound();

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const currentHistory = [...messages, userMsg];
    setMessages(currentHistory);
    if (!textToSend) setInput("");
    setIsLoading(true);

    const replyText = await fetchAiResponse(text, currentHistory);

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      sender: "ai",
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, aiMsg]);
    setIsLoading(false);
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
    const ctxText = `Yousef Khamis - Founder of Egytronic & Software Developer\nHugging Face: https://huggingface.co/YousefKhamis\nGitHub: https://github.com/yk445kauod-coder\nEmail: Yousefkhamismadbouly@googlemail.com\nProjects: Egytronic_1.0, Azura Cafe, SmartBoard AI`;
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
          <div className="mb-1 pointer-events-auto flex items-center gap-1.5 bg-[#07070f]/95 border border-[#FF754D]/70 px-2.5 py-1 rounded-full text-[10px] text-[#ECEAE3] font-['Pixelify_Sans'] shadow-[0_0_15px_rgba(255,117,77,0.35)] animate-bounce">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF754D] animate-pulse" />
            <span>Chat AI</span>
            <Sparkles size={11} className="text-[#36A3FF]" />
          </div>
        )}

        <div className="pointer-events-auto filter drop-shadow-[0_0_12px_rgba(255,117,77,0.35)] hover:drop-shadow-[0_0_18px_rgba(54,163,255,0.5)] transition-all transform hover:scale-105">
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
          className={`fixed z-50 transition-all duration-300 flex flex-col border border-[#FF754D]/50 bg-[#07070f]/95 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.85)] rounded-xl overflow-hidden font-['IBM_Plex_Sans_Arabic'] ${
            isExpanded
              ? "bottom-4 right-4 left-4 top-20 md:left-auto md:w-[600px] md:h-[650px]"
              : "bottom-28 right-4 w-[90vw] max-w-[380px] h-[480px]"
          }`}
          role="dialog"
          aria-label="Egytronic AI Companion Chat Modal"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#0c0c18] border-b border-[#FF754D]/30 select-none">
            <div className="flex items-center gap-2">
              <Bot size={18} className="text-[#FF754D]" />
              <div>
                <div className="text-xs font-bold text-[#ECEAE3] font-['Pixelify_Sans'] tracking-wider flex items-center gap-1.5">
                  EGYTRONIC_AI <span className="text-[9px] text-[#36A3FF] bg-[#36A3FF]/10 px-1 py-0.5 rounded border border-[#36A3FF]/30">POLLINATIONS AI</span>
                </div>
                <div className="text-[10px] text-[#FFA500] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF754D] animate-pulse" /> Live CV Model Context
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={copyContext}
                title="Copy Context"
                className="p-1 text-[#828c97] hover:text-[#36A3FF] transition-colors"
                aria-label="Copy Context"
              >
                {copied ? <Check size={14} className="text-[#FF754D]" /> : <Copy size={14} />}
              </button>
              <button
                onClick={downloadLlmTxt}
                title="Download llm.txt for AI agents"
                className="p-1 text-[#828c97] hover:text-[#36A3FF] transition-colors"
                aria-label="Download llm.txt"
              >
                <Download size={14} />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 text-[#828c97] hover:text-[#ECEAE3] transition-colors"
                aria-label={isExpanded ? "Minimize Chat" : "Expand Chat"}
              >
                {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-[#828c97] hover:text-[#FF754D] transition-colors"
                aria-label="Close Chat Modal"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages scroll area */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-[#07070f]/90 scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div className="text-[9px] text-[#828c97] font-mono mb-0.5 px-1">
                  {msg.sender === "user" ? "YOU" : "EGYTRONIC_AI"} • {msg.timestamp}
                </div>
                <div
                  className={`p-2.5 rounded-lg max-w-[88%] text-xs border ${
                    msg.sender === "user"
                      ? "bg-[#FF754D]/15 text-[#ECEAE3] border-[#FF754D]/40 rounded-br-none"
                      : "bg-[#0c0c18] text-[#ECEAE3] border-[#36A3FF]/30 rounded-bl-none shadow-[0_2px_10px_rgba(54,163,255,0.08)]"
                  }`}
                >
                  {renderMarkdown(msg.text)}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-[#36A3FF] font-['Pixelify_Sans'] p-2 bg-[#0c0c18] border border-[#36A3FF]/20 rounded w-fit">
                <Loader2 size={14} className="animate-spin text-[#FF754D]" />
                <span>Thinking via Pollinations AI...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-2.5 py-1.5 bg-[#0c0c18]/90 border-t border-[#FF754D]/20 flex gap-1.5 overflow-x-auto scrollbar-none text-[10px] font-['Pixelify_Sans']">
            <button
              onClick={() => handleSend("Tell me about Egytronic_1.0 model")}
              className="whitespace-nowrap px-2 py-0.5 border border-[#FF754D]/40 bg-[#FF754D]/10 text-[#FF754D] hover:border-[#36A3FF] hover:text-[#36A3FF] rounded transition-colors"
            >
              ⚡ Egytronic_1.0
            </button>
            <button
              onClick={() => handleSend("What are Yousef's top skills?")}
              className="whitespace-nowrap px-2 py-0.5 border border-[#36A3FF]/40 bg-[#36A3FF]/10 text-[#36A3FF] hover:border-[#FF754D] hover:text-[#FF754D] rounded transition-colors"
            >
              🛠️ Skills
            </button>
            <button
              onClick={() => handleSend("Show Hugging Face profile")}
              className="whitespace-nowrap px-2 py-0.5 border border-[#FFA500]/40 bg-[#FFA500]/10 text-[#FFA500] hover:border-[#FF754D] hover:text-[#FF754D] rounded transition-colors"
            >
              🤗 HuggingFace
            </button>
            <button
              onClick={() => handleSend("How can I contact Yousef?")}
              className="whitespace-nowrap px-2 py-0.5 border border-[#36A3FF]/40 bg-[#36A3FF]/10 text-[#36A3FF] hover:border-[#FF754D] hover:text-[#FF754D] rounded transition-colors"
            >
              📬 Contact
            </button>
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="p-2 bg-[#0c0c18] border-t border-[#FF754D]/30 flex items-center gap-2"
          >
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask AI about Yousef Khamis..."
                disabled={isLoading}
                className="w-full bg-[#07070f] border border-[#FF754D]/30 text-[#ECEAE3] placeholder-[#828c97]/60 px-3 py-1.5 rounded text-xs focus:outline-none focus:border-[#36A3FF] font-['IBM_Plex_Sans_Arabic']"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="p-2 bg-[#FF754D] hover:bg-[#36A3FF] text-[#07070f] rounded font-bold transition-colors flex items-center justify-center disabled:opacity-50"
              aria-label="Send message to AI companion"
            >
              {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
