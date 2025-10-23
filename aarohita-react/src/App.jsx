// src/App.jsx
import React, { useMemo, useState, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WebsiteDevelopment from "./pages/WebsiteDevelopment";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
// ⬇️ LAZY import so it won't load unless you visit /kunwar-kanhaiya-pandey
const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));
import SiteSeo from "./components/SiteSeo";

function Home({ year }) {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
      <Footer year={year} />
    </>
  );
}

function TeamPage() {
  return (
    <div className="pt-24 max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold">Our Team</h1>
      <p className="text-slate-600">Coming soon…</p>
    </div>
  );
}

export default function App() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-app-light text-strong font-sans relative">
      <SiteSeo />
      <Navbar open={open} setOpen={setOpen} />
      <main>
        {/* ⬇️ Suspense guards lazy routes from blanking the app */}
        <Suspense fallback={<div style={{ padding: 24, marginTop: 72 }}>Loading…</div>}>
          <Routes>
            <Route index element={<Home year={year} />} />
            <Route path="/" element={<Home year={year} />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/website-development" element={<WebsiteDevelopment />} />
            <Route path="/blog" element={<BlogList />} />
<Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/kunwar-kanhaiya-pandey" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
                      </Routes>
        </Suspense>
      </main>
    </div>
  );
}
