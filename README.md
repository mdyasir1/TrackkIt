# TrackKit

[![Live Demo](https://img.shields.io/badge/Live%20Demo-TrackKit-blue)](https://trackkit.vercel.app/)  
Inventory & Sales Management MVP for small shops — built with modern web technologies.

---

## 📌 Project Overview

**TrackKit** is a lightweight, full-stack application designed to help small businesses manage their **inventory and sales seamlessly**.  
It provides an intuitive interface to register, manage products, track sales, and get a clear overview of the business performance.

### **Aim of the Project**
- To create a simple yet scalable **inventory and sales management system**.
- Designed to be an MVP (Minimum Viable Product) for quick onboarding of small shopkeepers.
- Focused on **speed, simplicity, and modern UI/UX**.

---

## 🛠️ Tech Stack

- **Frontend:** [Next.js 14 (App Router)](https://nextjs.org/) + TypeScript + TailwindCSS  
- **Backend:** Next.js API routes (Server Actions)  
- **Database:** [Supabase PostgreSQL](https://supabase.com/) with Prisma ORM  
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)  
- **State Management:** Built-in React Hooks + Server State via Prisma  
- **Deployment:** [Vercel](https://vercel.com/)  

---

## 🚀 Live Demo

[**Click here to explore TrackKit →**](https://trackkit.vercel.app/)

---

## 📖 Process & Implementation (Step by Step)

This section explains **how TrackKit was built and structured**.

---

### 1. **Core Setup**
- Initialized the project using **Next.js (App Router)** with **TypeScript**.
- Added essential tools: **ESLint, Prettier, TailwindCSS** for styling, and basic folder structure.

---

### 2. **Authentication**
- Integrated **NextAuth.js** for user login & registration.
- Managed sessions using **SessionProvider** in `providers.tsx`.
- Created authentication pages:  
  - `/login` for user sign-in  
  - `/register` for new users  

---

### 3. **Database & ORM**
- Chose **Supabase PostgreSQL** for its scalability and simplicity.
- Managed database using **Prisma ORM**:
  - Defined models: `User`, `Inventory`, `Sales`.
  - Ran Prisma migrations to sync schema with the database.
  - Used **connection pooling** in production for optimized queries.

---

### 4. **State Management**
- For client-side state: used **React hooks** (`useState`, `useEffect`).
- For server-side data: leveraged **Next.js Server Components & Server Actions** to fetch data directly via Prisma.

---

### 5. **UI & Components**
- Built reusable UI components:
  - **Header** – navigation & branding.
  - **AuthForm** – handles login/register.
  - **Inventory Dashboard** – displays products, sales, and stats.
- Added a global layout (`layout.tsx`) to wrap all pages with **header, footer, and providers**.

---

### 6. **Routing Structure**
- Organized using Next.js App Router with clear segments:
```
app/
├─ (auth)/
│ ├─ login/
│ └─ register/
├─ dashboard/
└─ layout.tsx
```

---

### 7. **Deployment**
- Deployed using **Vercel** for fast CI/CD.
- Configured environment variables (`DATABASE_URL`, `NEXTAUTH_SECRET`) via Vercel dashboard.
- Used:
  - **Direct Database URL** for migrations.
  - **Connection Pooling URL** for production runtime.

---

## 🔮 Future Enhancements

- Add **Role-Based Access Control (RBAC)** for multi-user shops.
- Implement **Dark & Light Theme toggle**.
- Build an **Analytics Dashboard** with charts & sales trends.
- Add **Product Barcode Scanning** for easy stock management.
- Enable **Offline Mode** using Service Workers.
- Enhance **validation & error handling** (e.g., Zod for schema validation).

---

## 🧑‍💻 How to Run Locally

```bash
# Clone the repository
git clone https://github.com/mdyasir1/TrackkIt.git
cd TrackkIt

# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env.local

# Run the development server
pnpm dev

# Open http://localhost:3000 in your browser
```
---
##  Author

**Yasir**  
- [LinkedIn](https://www.linkedin.com/in/mdyasirarafath)  
- [Portfolio](https://yasirarafath.vercel.app)  
- [Github](https://github.com/mdyasir1)
---