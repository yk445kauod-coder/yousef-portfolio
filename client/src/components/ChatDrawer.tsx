import React, { useState, useRef, useEffect } from "react";
import { Send, X, Bot, Sparkles, User, RefreshCw, FileText, ExternalLink, Download } from "lucide-react";
import { playClickSound, playHoverSound } from "../lib/audio";

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  time: string;
}

const SUGGESTED_QUESTIONS = [
  "حدثني عن خبرة يوسف كمطور برمجيات 💻",
  "ما هو نموذج Egytronic_1.0 على Hugging Face؟ 🤗",
  "كيف يمكن استخدام ملف llm.txt مع AI Agents؟ 🤖",
  "ما هي وسائل التواصل المباشرة مع يوسف؟ 📩",
];

// Lightweight, robust Markdown renderer component
const FormattedMarkdown: React.FC<{ content: string }> = ({ content }) => {
  const parseInline = (text: string): React.ReactNode[] => {
    // Regex for inline elements: **bold**, [link](url), `code`
    const regex = /(\*\*[^*]+?\*\*|\[[^\]]+?\]\([^)]+?\)|`[^`]+?`)/g;
    const parts = text.split(regex);

    return parts.map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={idx} className="font-semibold text-[#FFA500]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code key={idx} className="px-1.5 py-0.5 bg-[#0a0b0d] border border-gray-800 rounded text-xs font-mono text-[#00FFCC] dir-ltr inline-block">
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith("[") && part.includes("](")) {
        const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (linkMatch) {
          const linkText = linkMatch[1];
          const linkUrl = linkMatch[2];
          return (
            <a
              key={idx}
              href={linkUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[#36A3FF] hover:text-[#FF754D] underline font-medium inline-flex items-center gap-1 mx-0.5"
            >
              {linkText}
              {linkUrl.startsWith("http") && <ExternalLink size={11} className="inline" />}
            </a>
          );
        }
      }
      return part;
    });
  };

  const parseMarkdown = (raw: string) => {
    // Split text by code blocks first
    const parts = raw.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith("```") && part.endsWith("```")) {
        const codeContent = part.slice(3, -3).replace(/^[a-z]+\n/, "");
        return (
          <pre
            key={index}
            className="my-2 p-2.5 bg-[#0a0b0d] border border-gray-800 rounded-lg text-xs font-mono text-[#00FFCC] overflow-x-auto dir-ltr text-left"
          >
            <code>{codeContent}</code>
          </pre>
        );
      }

      // Process line by line for bullet points and inline formatting
      const lines = part.split("\n");
      return (
        <span key={index}>
          {lines.map((line, lIdx) => {
            const isBullet = line.trim().startsWith("- ") || line.trim().startsWith("* ");
            const lineContent = isBullet ? line.trim().substring(2) : line;
            const parsedNodes = parseInline(lineContent);

            if (isBullet) {
              return (
                <div key={lIdx} className="flex items-start gap-1.5 my-1 pr-1">
                  <span className="text-[#FF754D] text-xs font-bold mt-0.5">•</span>
                  <div className="flex-1">{parsedNodes}</div>
                </div>
              );
            }

            return (
              <React.Fragment key={lIdx}>
                {parsedNodes}
                {lIdx < lines.length - 1 && <br />}
              </React.Fragment>
            );
          })}
        </span>
      );
    });
  };

  return <div className="markdown-render space-y-1">{parseMarkdown(content)}</div>;
};

export const ChatDrawer: React.FC<ChatDrawerProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "أهلاً بك! أنا **مساعد يوسف الذكي** (AI Companion).\n\nيسعدني جداً إجابة أي أسئلة حول خبرات يوسف كمطور برمجيات، مشاريعه مثل **Egytronic_1.0** على [Hugging Face](https://huggingface.co/YousefKhamis)، أو إمكانية العمل معاً!\n\nيمكنك أيضاً تحميل ملف **[llm.txt](/llm.txt)** لتزويد أي نموذج AI بسيرته الذاتية الكاملة 🚀",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    playClickSound();

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          history: messages,
        }),
      });

      const data = await res.json();
      const aiReplyText =
        data.reply ||
        "أهلاً بك! أنا المساعد الذكي ليوسف. يسعدني الإجابة عن كل استفساراتك!";

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: aiReplyText,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: "يمكنك استكشاف سيرة يوسف الذاتية بالكامل عبر ملف [llm.txt](/llm.txt) أو مراجعة حسابه على [Hugging Face](https://huggingface.co/YousefKhamis)!",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end p-2 sm:p-6 bg-black/40 backdrop-blur-xs animate-fade-in dir-rtl pointer-events-auto">
      {/* Floating Modal Box */}
      <div className="w-full max-w-md bg-[#111315]/95 border border-[#36A3FF]/40 rounded-2xl h-[88vh] sm:h-[600px] flex flex-col shadow-[0_10px_40px_rgba(0,0,0,0.8)] text-[#F5F3EE] overflow-hidden backdrop-blur-md">
        {/* Modal Header */}
        <div className="p-3.5 border-b border-gray-800/80 flex items-center justify-between bg-[#17191C]/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FF754D]/20 border border-[#FF754D]/50 flex items-center justify-center text-[#FF754D] shrink-0">
              <Bot className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <h3 className="font-ar-pixel text-sm text-[#F5F3EE] flex items-center gap-1.5">
                مساعد يوسف الذكي (AI Companion)
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </h3>
              <p className="text-[11px] text-gray-400">
                مطوّر برمجيات • اسأل AI عن أي شيء
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Quick LLM.txt download link */}
            <a
              href="/llm.txt"
              target="_blank"
              rel="noreferrer"
              title="عرض وتنزيل llm.txt للذكاء الاصطناعي"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
              className="px-2 py-1 rounded-md bg-[#36A3FF]/15 border border-[#36A3FF]/40 text-[#36A3FF] hover:bg-[#36A3FF]/30 text-[11px] font-en-pixel flex items-center gap-1 transition-all"
            >
              <FileText size={12} />
              <span>llm.txt</span>
            </a>

            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              onMouseEnter={playHoverSound}
              className="p-1.5 rounded-md hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Chat History Area */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-start gap-2 ${
                msg.sender === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-md flex items-center justify-center text-xs shrink-0 mt-1 ${
                  msg.sender === "user"
                    ? "bg-[#36A3FF]/20 border border-[#36A3FF] text-[#36A3FF]"
                    : "bg-[#FF754D]/20 border border-[#FF754D] text-[#FF754D]"
                }`}
              >
                {msg.sender === "user" ? (
                  <User className="w-3.5 h-3.5" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
              </div>

              <div
                className={`max-w-[84%] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-[#36A3FF]/15 border border-[#36A3FF]/40 text-white rounded-tr-none"
                    : "bg-[#181A1D] border border-gray-800 text-gray-200 rounded-tl-none font-arabic"
                }`}
              >
                {msg.sender === "user" ? (
                  <p>{msg.text}</p>
                ) : (
                  <FormattedMarkdown content={msg.text} />
                )}
                <span className="text-[9px] text-gray-500 block mt-1.5 text-left dir-ltr">
                  {msg.time}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-[#36A3FF] text-xs font-ar-pixel animate-pulse p-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>جاري تحليل السؤال وصياغة الإجابة...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Suggested Quick Questions */}
        <div className="px-3.5 py-2 border-t border-gray-800/60 bg-[#141619]">
          <p className="text-[10px] text-gray-400 mb-1.5 font-ar-pixel">
            أسئلة سريعة مقترحة:
          </p>
          <div className="flex flex-wrap gap-1">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                onMouseEnter={playHoverSound}
                className="text-[11px] bg-[#1D2126] hover:bg-[#FF754D]/20 hover:border-[#FF754D] border border-gray-800 text-gray-300 hover:text-[#FF754D] px-2 py-1 rounded-md transition-all text-right"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Box */}
        <div className="p-2.5 border-t border-gray-800 bg-[#17191C]">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="اكتب سؤالك عن يوسف، Hugging Face، أو llm.txt..."
              className="flex-1 bg-[#111315] border border-gray-700 focus:border-[#36A3FF] rounded-lg px-3 py-1.5 text-xs sm:text-sm text-white focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              onMouseEnter={playHoverSound}
              className="p-2 rounded-lg bg-[#FF754D] hover:bg-[#e05f38] disabled:opacity-50 text-white transition-all shadow-[0_0_15px_rgba(255,117,77,0.4)] shrink-0"
            >
              <Send className="w-3.5 h-3.5 rotate-180" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
