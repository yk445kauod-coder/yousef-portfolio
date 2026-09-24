import { useState } from "react";
import { Send, X } from "lucide-react";

type Message = { from: "bot" | "user"; text: string };

function answerQuestion(question: string) {
  const query = question.toLowerCase();
  if (query.includes("egytronic") || query.includes("model") || query.includes("llm") || query.includes("نموذج")) return "Egytronic_1.0 هو نموذج 8B مبني على Llama 3.1، تم ضبطه للهجة المصرية والسياقات الثقافية. منشور على Hugging Face بصيغ F16 وGGUF.";
  if (query.includes("smart") || query.includes("board") || query.includes("تعليم")) return "SmartBoard AI سبورة تعليمية مدعومة بـAI teacher: تولّد الدروس، تعرضها بصرياً، وتدعم real-time workflows للمدرسين والطلاب.";
  if (query.includes("skill") || query.includes("stack") || query.includes("تقنيات")) return "الـcore stack: React وTypeScript وTailwind وFramer Motion، مع Firebase وCloudflare، وTransformers وPyTorch وUnsloth في الـAI.";
  if (query.includes("contact") || query.includes("تواصل")) return "تقدر تتواصل مع Yousef عبر yousefkhamismadbouly@googlemail.com أو GitHub، أو تحمل llm.txt لأي coding agent.";
  return "أقدر أساعدك في فهم خبرة Yousef، Egytronic_1.0، SmartBoard AI، Azura Cafe، أو اختياراته التقنية. جرّب سؤالاً أكثر تحديداً.";
}

export default function ChatModal({ onClose }: { onClose: () => void }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "أهلاً! أنا YK's portfolio agent. اسألني عن مشاريعه، الـstack، أو Egytronic_1.0." },
  ]);

  const send = () => {
    const question = input.trim();
    if (!question) return;
    setMessages((current) => [...current, { from: "user", text: question }, { from: "bot", text: answerQuestion(question) }]);
    setInput("");
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section className="chat-modal" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label="Chat with YK portfolio agent">
        <header className="chat-head">
          <div><div className="eyebrow"><span className="status-dot" /> ONLINE / CV CONTEXT LOADED</div><h2>YK_AGENT<span className="cursor">_</span></h2></div>
          <button className="icon-button" onClick={onClose} aria-label="Close chat"><X size={18} /></button>
        </header>
        <div className="chat-body">{messages.map((message, index) => <div className={`message ${message.from}`} key={`${message.from}-${index}`}><span className="message-label">{message.from === "bot" ? "yk_agent" : "you"}</span><p>{message.text}</p></div>)}</div>
        <div className="chat-input"><input value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === "Enter" && send()} placeholder="Ask about the work... / اسأل عن الشغل" aria-label="Chat message" /><button onClick={send} aria-label="Send message"><Send size={16} /></button></div>
      </section>
    </div>
  );
}
