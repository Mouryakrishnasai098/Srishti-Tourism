# Srishti Tourism – Android APK + PC app

One codebase (`www/`) runs on:
- **Android** – built into an APK with Capacitor
- **PC (Windows/Mac/Linux)** – installed from Chrome/Edge as a PWA

## A) Get the Android APK (easiest: no Android Studio needed)
1. Create a free GitHub account and a new repository.
2. Upload everything in this folder (keep the `.github` folder).
3. Open the repo > **Actions** > **Build Android APK** > **Run workflow**.
4. After ~5 minutes, open the finished run and download **Srishti-Tourism-APK** (contains `app-debug.apk`).
5. Copy it to your phone and install (allow "install unknown apps").

## B) Build the APK on your own PC (Android Studio)
1. Install Node.js LTS and Android Studio.
2. In this folder run:
   ```
   npm install
   npm run build
   npx cap add android
   npx cap sync android
   npx cap open android
   ```
3. In Android Studio: Build > Build Bundle(s)/APK(s) > Build APK(s).
4. For Play Store: Build > Generate Signed Bundle / APK and create **your own keystore**. Back it up; you need it for every update.

## C) Use it on PC
1. Put the `www` folder on any HTTPS host (Netlify Drop, GitHub Pages, Cloudflare Pages).
2. Open the site in Chrome or Edge and click the **Install** icon in the address bar.
   The app then opens in its own window with the Srishti logo.

## After editing the app
Change files in `www/` (for new Tailwind classes edit `www/index.html` or `www/app.js`), then run `npm run build` and `npx cap sync android`, and rebuild the APK.

## Notes
- Tailwind CSS and Chart.js are now bundled locally (no CDN), so the app shell works offline. Wikipedia photos, Google Fonts and web links still need internet.
- App ID: `com.srishti.tourism` (change in `capacitor.config.json` before publishing, because it can't change later).
- Existing `localStorage` data (saved trips) lives per device.
