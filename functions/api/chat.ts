interface Env {
  OPENROUTER_API_KEY?: string;
  POLLINATIONS_API_KEY?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body = await context.request.json() as { messages?: Array<{ role: string; content: string }> };
    const messages = body.messages || [];

    const openRouterKey = context.env.OPENROUTER_API_KEY;
    const pollinationsKey = context.env.POLLINATIONS_API_KEY;

    // 1. Try OpenRouter API if key configured in environment
    if (openRouterKey) {
      try {
        const orRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${openRouterKey}`,
            "HTTP-Referer": "https://yousef-portfolio.pages.dev",
            "X-Title": "Yousef Khamis Portfolio AI",
          },
          body: JSON.stringify({
            model: "meta-llama/llama-3.3-70b-instruct:free",
            messages,
            temperature: 0.7,
            max_tokens: 1000,
          }),
        });

        if (orRes.ok) {
          const data = await orRes.json() as { choices?: Array<{ message?: { content?: string } }> };
          const reply = data.choices?.[0]?.message?.content;
          if (reply) {
            return new Response(JSON.stringify({ text: reply, provider: "openrouter" }), {
              headers: { "Content-Type": "application/json" },
            });
          }
        }
      } catch (err) {
        console.warn("OpenRouter API request error:", err);
      }
    }

    // 2. Pollinations text API (public inference endpoint)
    const polHeaders: Record<string, string> = { "Content-Type": "application/json" };
    if (pollinationsKey) {
      polHeaders["Authorization"] = `Bearer ${pollinationsKey}`;
    }

    const polRes = await fetch("https://text.pollinations.ai/", {
      method: "POST",
      headers: polHeaders,
      body: JSON.stringify({
        messages,
        model: "openai",
        jsonMode: false,
      }),
    });

    if (polRes.ok) {
      const text = await polRes.text();
      if (text && text.trim()) {
        return new Response(JSON.stringify({ text, provider: "pollinations" }), {
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    return new Response(
      JSON.stringify({ error: "Failed to generate response from AI providers" }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: String(error) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
