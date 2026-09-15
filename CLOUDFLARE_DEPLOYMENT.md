# 🚀 Cloudflare Pages Deployment Guide

Here is the exact step-by-step configuration to deploy **Yousef Khamees Medbouly's Interactive 3D Portfolio** to **Cloudflare Pages**.

---

## 📋 Recommended Deployment Settings

When connecting your GitHub repository to **Cloudflare Pages**:

| Configuration Field | Recommended Value |
| :--- | :--- |
| **Framework preset** | `Vite` (or `None`) |
| **Build command** | `pnpm run build` |
| **Build output directory** | `dist/public` |
| **Root directory** | `/` (leave empty) |
| **Node.js Version** | `18.x` or `20.x` |

---

## 🔑 Environment Variables (Cloudflare Dashboard)

Navigate to **Cloudflare Pages > Settings > Environment Variables** and add:

| Key | Value | Description |
| :--- | :--- | :--- |
| `OPENROUTER_API_KEY` | `sk-or-v1-...` | Your OpenRouter API Key for live AI Personal Agent responses |
| `NODE_VERSION` | `20` | Ensures Cloudflare uses Node.js 20 build environment |

*(Note: If `OPENROUTER_API_KEY` is omitted, the AI Assistant function includes a built-in fallback response handler).*

---

## ⚡ How it Works on Cloudflare Pages

1. **Static Frontend Assets:**
   - Compiled by Vite into `dist/public`.
   - `client/public/_redirects` guarantees single-page application (SPA) client routing (`/* /index.html 200`).

2. **Serverless AI Assistant (`/api/chat`):**
   - Implemented via Cloudflare Edge Function in `functions/api/chat.js`.
   - Runs directly on Cloudflare's Global Edge Network with zero cold-start delay.

---

## 🛠️ Step-by-Step Deployment Instructions

1. **Push to GitHub:**
   Ensure your latest code branch is pushed to your GitHub repository (e.g. `main` or `feature/professional-interactive-portfolio`).

2. **Open Cloudflare Dashboard:**
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com/) -> **Workers & Pages**.
   - Click **Create application** -> **Pages** -> **Connect to Git**.

3. **Select Repository:**
   - Choose your portfolio repository.
   - Select the branch to deploy (`main`).

4. **Configure Build Settings:**
   - **Framework preset:** Vite
   - **Build command:** `pnpm run build`
   - **Build output directory:** `dist/public`

5. **Set Environment Variables:**
   - Add `OPENROUTER_API_KEY` under **Environment variables**.

6. **Deploy:**
   - Click **Save and Deploy**. Cloudflare will build and host your portfolio globally with custom SSL in under 1 minute!
