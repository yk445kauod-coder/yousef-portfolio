// Cloudflare Pages Function for /api/chat
export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const { message, history } = await request.json();

    if (!message || typeof message !== "string") {
      return new Response(JSON.stringify({ error: "الرجاء إدخال رسالة صحيحة" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const openRouterApiKey = env?.OPENROUTER_API_KEY;

    if (!openRouterApiKey) {
      // Fallback smart response if API key is not yet set in Cloudflare dashboard
      const lowerMsg = message.toLowerCase();
      let reply = "أهلاً بك! أنا المساعد الذكي ليوسف. يسعدني إجابة أي سؤال حول مشاريع يوسف في الذكاء الاصطناعي وتطوير الويب متكامل الأركان!";

      if (lowerMsg.includes("مشروع") || lowerMsg.includes("مشاريع") || lowerMsg.includes("أعمال")) {
        reply = "قام يوسف بتطوير مشاريع استثنائية أبرزها:\n1. Egytronic_1.0: منصة ذكية لإنترنت الأشياء والمستشعرات.\n2. Azura Cafe: نظام رقمي متكامل لإدارة الطلبات والمبيعات.\n3. SmartBoard AI: سبورة تفاعلية مدعومة بالذكاء الاصطناعي!";
      } else if (lowerMsg.includes("تواصل") || lowerMsg.includes("إيميل") || lowerMsg.includes("اتصل") || lowerMsg.includes("هاتف")) {
        reply = "يمكنك التواصل مع يوسف مباشرة عبر قسم 'تواصل / Contact' في أسفل الصفحة، الهاتف: 01017835158، أو البريد الإلكتروني: yusf17835@gmail.com!";
      } else if (lowerMsg.includes("مهارات") || lowerMsg.includes("تقنيات")) {
        reply = "يتميز يوسف بإتقان React, TypeScript, Node.js, Three.js, بالإضافة لبناء أنظمة الذكاء الاصطناعي RAG و LLM Integrations!";
      }

      return new Response(JSON.stringify({ reply }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    const systemPrompt = `أنت "يوسف المساعد الذكي" (Yousef's Pixel AI Companion)، وكيل ذكاء اصطناعي تفاعلي على هيئة شخصية بكسل تمثل المطور يوسف خميس مدبولي (Yousef Khamees Madbooly).
تحدث بلغة عربية ودية، احترافية، حماسية ومباشرة.

معلومات يوسف:
- الاسم: يوسف خميس مدبولي (Yousef Khamees Madbooly)
- المسمى الوظيفي: مطور برمجيات وذكاء اصطناعي (Full-Stack & AI Engineer)
- المكان: الإسكندرية، مصر
- الهاتف: 01017835158 | البريد: yusf17835@gmail.com
- أبرز المشاريع:
  1. Egytronic_1.0: منصة إلكترونيات وإنترنت الأشياء والذكاء الاصطناعي.
  2. Azura Cafe: نظام رقمي متكامل لإدارة الطلبات والمبيعات للمقاهي والمطاعم.
  3. SmartBoard AI: سبورة تفاعلية مدعومة بالذكاء الاصطناعي ورؤية الحاسوب.
أجب الزائر بدقة ومباشرة.`;

    const formattedMessages = [
      { role: "system", content: systemPrompt },
      ...(Array.isArray(history) ? history.map(h => ({
        role: h.sender === "user" ? "user" : "assistant",
        content: h.text
      })) : []),
      { role: "user", content: message }
    ];

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openRouterApiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://yousef-portfolio.pages.dev",
        "X-Title": "Yousef Madbooly Portfolio AI"
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 450
      })
    });

    if (!response.ok) {
      return new Response(JSON.stringify({
        reply: "أهلاً بك! أنا المساعد الذكي ليوسف. يسعدني الإجابة على استفساراتك حول خبرات يوسف ومشاريعه!"
      }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "أهلاً بك! أنا المساعد الذكي ليوسف.";

    return new Response(JSON.stringify({ reply }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({
      reply: "أهلاً بك! أنا المساعد الذكي ليوسف. يسعدني الإجابة على استفساراتك حول خبرات يوسف ومشاريعه!"
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }
}
