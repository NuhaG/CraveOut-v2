# CraveOut 🍽️ – AI Powered Recipe Explorer

**CraveOut** is a dynamic recipe explorer built using React, TypeScript, and Vite. It fetches delicious meals from the [TheMealDB API](https://www.themealdb.com/) and provides features like category browsing, trending meals, search functionality, theme toggling, AI generated recipes, and more – all with a responsive UI and modern design.

---

## 🔥 Features

### 🍴 Recipe Discovery

* Hero section with dynamic recipe search
* Trending recipes powered by random meal generation (single render on initial load)
* Category-based recipe browsing
* Quick recipe preview overlay
* Unified `RecipeCard` component across trending and category sections
* Skeleton loading states for trending, categories, and hero search results

### ⭐ Personalization

* Favorites page with LocalStorage persistence
* Easily save and remove favorite recipes

### 🤖 AI Cooking Assistant

* AI Chat page powered by Gemini
* Ask for recipe ideas, cooking tips, or meal suggestions
* Full-width chat layout with fixed composer input
* Auto-formatted markdown AI responses
* Quick action prompts (15-min meal, high protein, budget meal, healthy swap)
* Optional favorites-context toggle (uses saved favorites from LocalStorage)

### 🎨 UI / UX

* Responsive design with TailwindCSS
* Light / Dark theme toggle
* Smooth scrolling navigation
* Modern card-based UI
* Route-based navigation for Home, Favorites, and AI Chat
* Custom browser tab icon (`icon.png`)
* AI Chat page hides footer for distraction-free chatting

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/NuhaG/CraveOut-v2.git
cd CraveOut-v2
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

To generate an API key, visit [here](https://ai.google.dev/gemini-api/docs/api-key)

### 4. Run the development server

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
```

### 6. Preview production build

```bash
npm run preview
```

---

## 🛠 Tech Stack

Frontend:

* React
* TypeScript
* Vite
* TailwindCSS
* React Router DOM

APIs:

* TheMealDB API
* Google Gemini API

Libraries:

* react-markdown
* remark-gfm

---

## 📁 Project Structure

```
├── public/
│   ├── food.png
│   ├── home.png
│   └── icon.png
│
├── src/
│   ├── components/
│   │   ├── About.tsx
│   │   ├── AiChatPage.tsx
│   │   ├── Categories.tsx
│   │   ├── Donate.tsx
│   │   ├── FavoritesPage.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Instructions.tsx
│   │   ├── Navbar.tsx
│   │   ├── RecipeCard.tsx
│   │   ├── RecipeSkeleton.tsx
│   │   └── TrendingRecipes.tsx
│   │
│   ├── lib/
│   │   ├── favorites.ts
│   │   └── gemini.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── vite-env.d.ts
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── tsconfig.json
└── vite.config.ts
```

---

## 🧱 Static Version

CraveOut was originally built using HTML, CSS, and vanilla JavaScript. You can explore the [static version here](https://github.com/NuhaG/Crave_out).
This React version brings modularity, speed, and a richer developer experience using a modern frontend stack.

---

## 📸 UI Preview - Dark Mode

> All screenshots below showcase **Dark Mode**. Light mode is also supported in the app.

### Hero Section with Search Bar
![Hero](./screenshots/hero.png)

### Trending Recipes
![Trending](./screenshots/trending.png)

### Recipe Card Overlay
![Recipe Card](./screenshots/recipe-card.png)

---
