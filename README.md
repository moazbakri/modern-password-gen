# 🛡️ CipherForge - Modern Password Generator

A sleek, lightweight, and cryptographically secure password generator web application built on Ubuntu inside a virtualized environment. 

This tool runs **100% client-side**—passwords are generated entirely within the user's browser context and are never transmitted across a network, ensuring absolute data privacy.

## 🛠️ The Tech Stack

*   **Frontend Ecosystem:** React (TypeScript) + Vite
*   **Styling Engine:** Tailwind CSS v4 (Utilizing the updated CSS-first `@import "tailwindcss"` pipeline)
*   **Cryptographic Core:** Native Web Crypto API (`window.crypto.getRandomValues()`)
*   **Server Tooling:** `@vitejs/plugin-basic-ssl` (Forces HTTPS execution to satisfy browser security boundaries)

---

## 💡 Key Infrastructure Hurdles & Fixes

### 1. Tailwind CSS v4 Configuration Shift
During installation, running `npx tailwindcss init -p` caused remote network errors because Tailwind v4 no longer uses a `tailwind.config.js` framework. 
*   **Solution:** Removed the legacy configuration files. Integrated `@tailwindcss/vite` straight into `vite.config.ts` as a native compiler plugin and called `@import "tailwindcss";` at the absolute top of `src/index.css`.

### 2. Browser Clipboard Security Block
When interacting with the app from a host machine browser via a VM network IP, `navigator.clipboard` failed silently because modern browsers restrict clipboard access to secure contexts (`https://` or `localhost`).
*   **Solution:** 
    1. Added a custom local domain mapping (`passgen.moaz.com`) inside the host machine's `hosts` file.
    2. Updated `vite.config.ts` with `server.allowedHosts` to whitelist the domain.
    3. Integrated `@vitejs/plugin-basic-ssl` to serve the app over an encrypted `https://` tunnel, unlocking the browser's native API privileges.

---

## 🚀 Local Development Setup

To run this project locally on your Ubuntu system or inside your VM setup:

### Prerequisites
Ensure Node.js v20+ and npm are installed on your environment.

### Installation
```bash
# Clone the repository
git clone [https://github.com/YOUR_USERNAME/modern-password-gen.git](https://github.com/YOUR_USERNAME/modern-password-gen.git)
cd modern-password-gen

# Install dependencies
npm install

Running Locally
npm run dev

Once the dev engine is live, navigate to https://passgen.moaz.com:5173 in your browser. Accept the local self-signed certificate warning to access the secure clipboard features.