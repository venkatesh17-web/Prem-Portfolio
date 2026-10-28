# Prem Thorat — Next-Generation AI Engineer Portfolio ⚡

> **Curiosity into code. Ideas into intelligent systems.**  
> A cinematic, interactive portfolio built for Prem Thorat — B.Tech Computer Science & Engineering (AI & ML) student at Vishwakarma Institute of Technology (VIT), Pune.

---

## 🌟 Key Interactive Features

1. **Cinematic Intro**: Futuristic audio-visual entry sequence with an instant skip option.
2. **Interactive Neural Canvas (Hero Section)**: Dynamic particle physics that reacts in real time to mouse motion and ambient pulses.
3. **Orbital Skills Constellation**: Interactive SVG constellation map categorizing skills (Programming, Web, Computer Vision, Professional) with live tooltips and orbital animations.
4. **Interactive Engineering Lab**:
   - **Neural Network Simulator**: Real-time multi-layer perceptron architecture with forward propagation and customizable training epochs.
   - **Computer Vision Simulation**: Real-time edge detection and bounding-box tracking demonstration.
   - **Autonomous Path Following**: Interactive vehicle simulation tracking sensor-guided trajectory in real time.
5. **Interactive Project Portals**: Rich expandable modal breakdowns for *Smart Monitoring System* and *Line Following Vehicle*.
6. **Encrypted Dispatcher (Contact Section)**:
   - Live Indian Standard Time (IST) digital clock synced with VIT Pune.
   - One-click copy email button with feedback toast.
   - Terminal-style form dispatcher with client-side mailer trigger.
   - Real-time collaboration status beacon.
7. **Single Source of Truth**: All data and portfolio information is controlled in [`src/data/portfolio.ts`](./src/data/portfolio.ts).

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (Turbopack, App Router)
- **Language**: TypeScript 5
- **UI & Styling**: Vanilla CSS Design System + Tailwind CSS v4
- **Graphics & Motion**: HTML5 Canvas, SVG vectors, CSS custom keyframe physics
- **Icons**: Handcrafted lightweight SVG vectors
- **Font Stack**: Google Fonts (*Space Grotesk*, *Inter*, *JetBrains Mono*)

---

## 🚀 Running Locally

```bash
# Navigate to the portfolio folder
cd temp-portfolio

# Install dependencies (if not already done)
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 100% Free Deployment Guide

This portfolio can be deployed **completely free forever** with a custom URL and free SSL certificate.

### Option 1: Deploy with Vercel (Recommended — 2 Minutes)

1. Create a free account on [Vercel.com](https://vercel.com) using your GitHub account.
2. Push this project to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Prem Thorat AI Engineer Portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
3. In Vercel, click **"Add New"** → **"Project"** and select your repository.
4. Keep the default settings (Framework Preset: Next.js) and click **Deploy**.
5. Your portfolio is now live worldwide on a free `.vercel.app` domain with automated deployments on every `git push`!

### Option 2: Deploy with Netlify (Free)

1. Sign up for a free account at [Netlify.com](https://www.netlify.com).
2. Connect your GitHub repository.
3. Set Build command: `npm run build` and Publish directory: `.next`.
4. Click **Deploy Site**.

---

## 📝 Customizing Your Data

You can update any personal details, project descriptions, skills, or links simply by editing:
[`src/data/portfolio.ts`](./src/data/portfolio.ts)

To replace the profile photo:
- Place your photo at `public/images/prem-profile.webp`.
