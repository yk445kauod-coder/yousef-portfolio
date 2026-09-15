import React, { useState, useRef, useEffect } from "react";
import { Send, X, Bot, Sparkles, User, RefreshCw } from "lucide-react";
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
  "حدثني عن خبرة يوسف في الذكاء الاصطناعي 🧠",
  "ما هي أهم مشاريع يوسف في السي في؟ 🚀",
  "ما هي التقنيات واللغات التي يقنها؟ 💻",
  "كيف يمكنني التواصل مع يوسف مباشرة؟ 📩",
];

export const ChatDrawer: React.FC<ChatDrawerProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "أهلاً بك! أنا يوسف الذكي (AI Mascot Companion). يسعدني جداً إجابة أي أسئلة حول خبرات يوسف، مشاريعه (Egytronic_1.0, SmartBoard AI, Azura Cafe)، أو إمكانية العمل معاً! كيف أقدر أساعدك؟",
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
        text: "حدث خطأ بسيط في الاتصال بالشبكة، ولكن بإمكانك معرفة كافة التفاصيل عن مشاريع يوسف في قسم الأعمال والمشاريع بالأسفل!",
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
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in dir-rtl">
      {/* Drawer Container */}
      <div className="w-full max-w-md bg-[#111315] border-r border-[#36A3FF]/40 h-full flex flex-col shadow-[0_0_40px_rgba(54,163,255,0.2)] text-[#F5F3EE]">
        {/* Header */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-[#17191C]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#FF754D]/20 border border-[#FF754D]/50 flex items-center justify-center text-[#FF754D]">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-ar-pixel text-base text-[#F5F3EE] flex items-center gap-2">
                مساعد يوسف الذكي (AI Agent)
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </h3>
              <p className="text-xs text-gray-400">
                أسئلة وأجوبة تفاعلية بالذكاء الاصطناعي
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            onMouseEnter={playHoverSound}
            className="p-1.5 rounded-md hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${
                msg.sender === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-md flex items-center justify-center text-xs shrink-0 ${
                  msg.sender === "user"
                    ? "bg-[#36A3FF]/20 border border-[#36A3FF] text-[#36A3FF]"
                    : "bg-[#FF754D]/20 border border-[#FF754D] text-[#FF754D]"
                }`}
              >
                {msg.sender === "user" ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
              </div>

              <div
                className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-[#36A3FF]/15 border border-[#36A3FF]/40 text-white rounded-tr-none"
                    : "bg-[#1B1E22] border border-gray-800 text-gray-200 rounded-tl-none whitespace-pre-line font-arabic"
                }`}
              >
                <p>{msg.text}</p>
                <span className="text-[10px] text-gray-500 block mt-1 text-left">
                  {msg.time}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-[#36A3FF] text-xs font-ar-pixel animate-pulse p-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>جاري التحليل والتفكير في الإجابة...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Suggested Quick Questions */}
        <div className="px-4 py-2 border-t border-gray-800/60 bg-[#141619]">
          <p className="text-[11px] text-gray-400 mb-2 font-ar-pixel">
            أسئلة مقترحة للبدء:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                onMouseEnter={playHoverSound}
                className="text-xs bg-[#1D2126] hover:bg-[#FF754D]/20 hover:border-[#FF754D] border border-gray-800 text-gray-300 hover:text-[#FF754D] px-2.5 py-1 rounded-md transition-all text-right"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Box */}
        <div className="p-3 border-t border-gray-800 bg-[#17191C]">
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
              placeholder="اكتب سؤالك هنا عن يوسف أو مشاريعه..."
              className="flex-1 bg-[#111315] border border-gray-700 focus:border-[#36A3FF] rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              onMouseEnter={playHoverSound}
              className="p-2.5 rounded-lg bg-[#FF754D] hover:bg-[#e05f38] disabled:opacity-50 text-white transition-all shadow-[0_0_15px_rgba(255,117,77,0.4)]"
            >
              <Send className="w-4 h-4 rotate-180" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
