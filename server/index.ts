import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  // AI Chat Assistant Route
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "الرجاء إدخال رسالة صحيحة" });
      }

      const openrouterApiKey = process.env.OPENROUTER_API_KEY;

      const systemPrompt = `أنت "يوسف المساعد الذكي" (Yousef's Pixel AI Companion)، وكيل ذكاء اصطناعي تفاعلي على هيئة شخصية بكسل (Pixel Art Mascot) تمثل المطور يوسف خميس مدبولي (Yousef Khamees Madbooly).
تحدث بلغة عربية ودية، احترافية، حماسية ومباشرة (مع إمكانية إدخال مصطلحات برمجية بالإنجليزية عند الحاجة).

معلومات المطور يوسف:
- الاسم: يوسف خميس مدبولي (Yousef Khamees Madbooly)
- المسمى الوظيفي: مطور برمجيات وذكاء اصطناعي (Full-Stack & AI Engineer)
- المكان: الإسكندرية، مصر (Alexandria, Egypt)
- التخصص: بناء منتجات رقمية تجمع بين الذكاء الاصطناعي التطبيقي وتطوير الويب متكامل الأركان (Full-Stack Web + Applied AI).
- المهارات والتقنيات الأساسية:
  - Frontend: React, TypeScript, Next.js, Three.js, Tailwind CSS, Web Audio API, Canvas.
  - Backend & AI: Node.js, Express, Python, OpenAI/OpenRouter APIs, HuggingFace, RAG System Architecture, Vector Databases.
- أهم المشاريع البارزة في السي في (Case Studies):
  1. Egytronic_1.0: منصة ذكاء اصطناعي متكاملة لإلكترونيات ومستشعرات وتطبيقات إنترنت الأشياء، توفر حلول تحكم وتحليل بيانات لحظية.
  2. Azura Cafe (أزورا كافيه): نظام إدارة طلبات ومبيعات وسلسلة توريد رقمية لمقهى ذكي مع واجهة تفاعلية فورية وتحليلات سريعة.
  3. SmartBoard AI (السبورة الذكية): نظام سبورة تفاعلية مدعوم بالذكاء الاصطناعي مع إمكانية التعرف على الرسم والتخطيط التلقائي وتخزين السبورة في السحابة.

طريقة الإجابة:
- أجب عن أسئلة الزائر باختصار ووضوح وبطريقة تقنية ولكن ممتعة.
- أظهر فخرك بمشاريع يوسف وشغفه بالتقنية وتطوير البرمجيات ذات الأثر الحقيقي.
- إذا سألك الزائر عن كيفية التواصل مع يوسف، وجّهه إلى زر "تواصل معي / Contact" أو إيميل التواصل.`;

      const formattedMessages = [
        { role: "system", content: systemPrompt },
        ...(Array.isArray(history) ? history.map((h: any) => ({
          role: h.sender === "user" ? "user" : "assistant",
          content: h.text
        })) : []),
        { role: "user", content: message }
      ];

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openrouterApiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://yousef-portfolio.dev",
          "X-Title": "Yousef Madbooly Portfolio AI"
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-lite-preview-02-05:free",
          messages: formattedMessages,
          temperature: 0.7,
          max_tokens: 450
        })
      });

      if (!response.ok) {
        // Fallback to local structured responses if external AI API times out or fails
        const lowerMsg = message.toLowerCase();
        let fallbackText = "أهلاً بك! أنا المساعد الذكي ليوسف. يسعدني جداً إجابة أي سؤال حول مشاريع يوسف في الذكاء الاصطناعي وتطوير الويب متكامل الأركان!";
        if (lowerMsg.includes("مشروع") || lowerMsg.includes("مشاريع") || lowerMsg.includes("أعمال")) {
          fallbackText = "قام يوسف بتطوير مشاريع استثنائية أبرزها: \n1. Egytronic_1.0: منصة ذكية لإنترنت الأشياء والمستشعرات.\n2. Azura Cafe: نظام رقمي متكامل لإدارة الطلبات والمبيعات.\n3. SmartBoard AI: سبورة تفاعلية مدعومة بالذكاء الاصطناعي!";
        } else if (lowerMsg.includes("تواصل") || lowerMsg.includes("إيميل") || lowerMsg.includes("اتصل")) {
          fallbackText = "يمكنك التواصل مع يوسف مباشرة عبر قسم 'تواصل / Contact' في أسفل الصفحة أو عبر حسابه الرسمي على LinkedIn & GitHub!";
        } else if (lowerMsg.includes("مهارات") || lowerMsg.includes("تقنيات")) {
          fallbackText = "يتميز يوسف بإتقان React, TypeScript, Node.js, Three.js, بالإضافة لبناء أنظمة الذكاء الاصطناعي RAG و LLM Integrations!";
        }
        return res.json({ reply: fallbackText });
      }

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || "أهلاً بك! أنا المساعد الذكي ليوسف.";
      return res.json({ reply });

    } catch (err) {
      console.error("Chat API error:", err);
      return res.json({
        reply: "أهلاً بك! أنا المساعد الذكي ليوسف. يسعدني الإجابة على استفساراتك حول خبرات يوسف ومشاريعه في الذكاء الاصطناعي وتطوير الويب!"
      });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
