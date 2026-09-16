// Cloudflare Pages Function for /api/chat
export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const { message, history } = await request.json();

    if (!message || typeof message !== "string") {
      return new Response(
        JSON.stringify({ error: "الرجاء إدخال رسالة صحيحة" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const openRouterApiKey = env?.OPENROUTER_API_KEY;

    const cvContextPrompt = `أنت "المساعد الذكي ليوسف خميس مدبولي" (Yousef's Pixel AI Companion). أنت وكيل ذكاء اصطناعي تفاعلي يمثل المطور يوسف خميس مدبولي.
تحدث بلغة عربية ودية، احترافية، حماسية ودقيقة جداً.

السيرة الذاتية والمعلومات الكاملة عن يوسف خميس مدبولي:
- الاسم الكامل: يوسف خميس مدبولي (Yousef Khamis Madbouly)
- المسمى الوظيفي الحقيقي: مطور برمجيات (Software Developer) متخـصص في الـ Full-Stack وتطبيقات الذكاء الاصطناعي (AI Practitioner).
- حساب Hugging Face الرسمي: https://huggingface.co/YousefKhamis
- حساب GitHub الرسمي: https://github.com/yk445kauod-coder
- المكان: الإسكندرية، مصر (Alexandria, Egypt)
- البريد الإلكتروني: Yousefkhamismadbouly@googlemail.com | yusf17835@gmail.com
- رقم الهاتف / واتساب: 01017835158 (+201017835158)
- سياق llm.txt التفاعلي: متوفر عبر الرابط /llm.txt لتزويد جميع نماذج وكلاء الذكاء الاصطناعي (Cursor, Claude Code, OpenHands, Cline, ChatGPT) بالسيرة الذاتية المنسقة.

المشاريع الحقيقية المعروضة:
1. Egytronic_1.0 (نموذج ذكاء اصطناعي):
   - رابط Hugging Face: https://huggingface.co/YousefKhamis/Egytronic_1.0
   - تفاصيل: نموذج لغوي بحجم 8 مليارات معلمة (Llama 3.1 8B) مدرب مخصصاً للعامية المصرية، مع دعم كمية GGUF/F16 للاستدلال السريع.
   - التقنيات: PyTorch, Unsloth, Hugging Face, GGUF, LoRA.
2. Azura Cafe (منصة مطاعم ومقاهي):
   - الرابط المباشر: https://azura-app.pages.dev
   - تفاصيل: قائمة طعام تفاعلية QR بنمط مقاطع الفيديو (Reel Style) مع تزامن متأقلم عبر Firebase ومساعد ذكي من Groq AI.
   - التقنيات: React, TypeScript, Firebase, Groq AI, Cloudflare Pages.
3. SmartBoard AI (سبورة تعليمية ذكية):
   - الرابط المباشر: https://smartboard-eg.pages.dev
   - تفاصيل: بيئة عمل تفاعلية للمعلمين تحول الشرح إلى خطط دراسية، معادلات LaTeX، وأصوات TTS وتجسيم 3D.
   - التقنيات: React, Vercel AI SDK, Three.js, LaTeX.

التقنيات التي يتقنها:
- الواجهات (Frontend): React, TypeScript, Tailwind CSS, Framer Motion, Three.js / WebGL.
- الخلفيات والسحاب (Backend & Cloud): Node.js, Express, Cloudflare Pages Functions, Firebase.
- الذكاء الاصطناعي (AI & ML): PyTorch, Hugging Face, Fine-Tuning (Unsloth), GGUF Quantization, Groq & OpenRouter APIs.

توجيهات الإجابة:
- إذا سألك المستخدم عن رابط Hugging Face، أعطه https://huggingface.co/YousefKhamis فوراً.
- إذا سألك عن ملف llm.txt، وضح له أنه يتيح تزويد AI agents بالسيرة الذاتية عبر /llm.txt.
- إذا سألك عن المسمى الوظيفي ليوسف، قل بثقة وسلاسة: "مطور برمجيات (Software Developer)".
- استخدم التنسيق السلس بالربط والMarkdown البسيط (نقاط، خط عريض) عند الحاجة.`;

    if (!openRouterApiKey) {
      // Intelligent Offline / Fallback Handler with Full CV coverage
      const lowerMsg = message.toLowerCase();
      let reply = "";

      if (lowerMsg.includes("hugging") || lowerMsg.includes("هاجينج") || lowerMsg.includes("hf") || lowerMsg.includes("موديل")) {
        reply = "حساب يوسف الرسمي على **Hugging Face** هو:\n🔗 [https://huggingface.co/YousefKhamis](https://huggingface.co/YousefKhamis)\n\nحيث قام بنشر نموذج **Egytronic_1.0** (Llama 3.1 8B Fine-tuned) للعامية المصرية!";
      } else if (lowerMsg.includes("llm.txt") || lowerMsg.includes("llm") || lowerMsg.includes("agent") || lowerMsg.includes("cursor")) {
        reply = "يوفر يوسف ملف **llm.txt** المكتوب وفق معيار الذكاء الاصطناعي الموحد!\nيمكنك تحميله أو إرساله لأي وكيل AI مثل Cursor أو Claude Code عبر الرابط المباشر:\n📄 [yousef-portfolio.pages.dev/llm.txt](/llm.txt)";
      } else if (lowerMsg.includes("مشروع") || lowerMsg.includes("مشاريع") || lowerMsg.includes("أعمال")) {
        reply = "قام يوسف بتطوير مشاريع بارزة مخصصة:\n\n1. **Egytronic_1.0**: نموذج لغوي (Llama 3.1 8B) متوفر على [Hugging Face](https://huggingface.co/YousefKhamis/Egytronic_1.0).\n2. **Azura Cafe**: نظام QR Menu بنمط فيديو Reels على [Azura App](https://azura-app.pages.dev).\n3. **SmartBoard AI**: منصة تعليمية ذكية للمعلمين على [SmartBoard EG](https://smartboard-eg.pages.dev).";
      } else if (lowerMsg.includes("تواصل") || lowerMsg.includes("إيميل") || lowerMsg.includes("اتصل") || lowerMsg.includes("واتس") || lowerMsg.includes("هاتف")) {
        reply = "تستطيع التواصل المباشر مع يوسف خميس:\n- 📧 البريد: Yousefkhamismadbouly@googlemail.com\n- 📱 الهاتف/واتساب: `+201017835158`\n- 🌐 GitHub: [yk445kauod-coder](https://github.com/yk445kauod-coder)\n- 🤗 HuggingFace: [YousefKhamis](https://huggingface.co/YousefKhamis)";
      } else if (lowerMsg.includes("مين") || lowerMsg.includes("من هو") || lowerMsg.includes("وظيفة") || lowerMsg.includes("cv")) {
        reply = "يوسف خميس مدبولي هو **مطوّر برمجيات (Software Developer)** من الإسكندرية، مصر.\nمتخصص في بناء تطبيقات الويب المتكاملة (Full-Stack) وتدريب وتطوير نماذج الذكاء الاصطناعي (AI/ML).";
      } else {
        reply = `أهلاً بك! أنا المساعد الذكي ليوسف خميس مدبولي (Software Developer).\n\nيسعدني جداً إجابة أي سؤال حول خبراته، مشاريعه مثل **Egytronic_1.0** على [Hugging Face](https://huggingface.co/YousefKhamis)، أو تزويدك بملف [llm.txt](/llm.txt) المخصص للذكاء الاصطناعي!`;
      }

      return new Response(JSON.stringify({ reply }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    const formattedMessages = [
      { role: "system", content: cvContextPrompt },
      ...(Array.isArray(history)
        ? history.map(h => ({
            role: h.sender === "user" ? "user" : "assistant",
            content: h.text,
          }))
        : []),
      { role: "user", content: message },
    ];

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openRouterApiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://yousef-portfolio.pages.dev",
          "X-Title": "Yousef Madbouly Portfolio AI",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-lite",
          messages: formattedMessages,
          temperature: 0.7,
          max_tokens: 500,
        }),
      }
    );

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          reply:
            "أهلاً بك! أنا المساعد الذكي ليوسف خميس مدبولي (Software Developer). يسعدني الإجابة على استفساراتك حول خبرات يوسف ومشاريعه ويمكنك زيارة حساب [Hugging Face](https://huggingface.co/YousefKhamis) أو مشاهدة ملف [llm.txt](/llm.txt)!",
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();
    const reply =
      data.choices?.[0]?.message?.content ||
      "أهلاً بك! أنا المساعد الذكي ليوسف خميس مدبولي.";

    return new Response(JSON.stringify({ reply }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        reply:
          "أهلاً بك! أنا المساعد الذكي ليوسف. بإمكانك استكشاف مشاريع يوسف على Hugging Face أو تحميل ملف llm.txt في أي وقت!",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
