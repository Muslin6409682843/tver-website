# TVER Website

Modern responsive website built with Next.js and modern frontend technologies.

---

## Technology Stack

### Framework

* Next.js 16.2.6
* React 19.2.4
* React DOM 19.2.4

### Language

* TypeScript 5.9.3

### UI Styling

* Tailwind CSS 4.3.0
* PostCSS 8.5.15
* @tailwindcss/postcss 4.3.0

### Routing System

* Next.js File-based Routing
* App Router (`app/` directory)

### Animation

* Framer Motion 12.40.0

### Icon Libraries

* Lucide React 1.16.0
* Iconify (`@iconify/react`) 6.0.2

### Charts & Data Visualization

* Recharts 3.10.1

### Code Quality & Linting

* ESLint 9.39.4
* eslint-config-next 16.2.6

### Build Tool

* Next.js Built-in Build System
* Development: `next dev`
* Production Build: `next build`

---

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the website at:

```text
http://localhost:3000
```

---

## Build Production

To create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

---

## Project Pages

### Main Website

```text
/
```

### Second Life Battery

```text
/projects/second-life-battery
```

### Seller Evaluation

```text
/projects/second-life-battery/seller
```

---

## Project Structure

```text
frontend/
├── app/
│   ├── components/
│   ├── projects/
│   ├── robots.txt/
│   └── sitemap.xml/
├── public/
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

---

## Project Status

This project is a front-end mockup developed as part of an educational project.

The Second Life Battery section provides a mock evaluation flow for used EV battery performance and pricing.

No database or backend service is required for the current version.
