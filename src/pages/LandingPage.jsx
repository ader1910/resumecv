import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Modal from "../components/Modal";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";
import LiquidEther from "../components/LiquidEther";
import {
  Edit3,
  Download,
  Eye,
  Star,
  Check,
  ArrowRight,
  Users,
  TrendingUp,
  Award,
  Zap,
  Shield,
  Smartphone,
  FileText,
  Moon,
  Sun,
  Sparkles,
  Rocket,
} from "lucide-react";
import toast from "react-hot-toast";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const verified = params.get("emailVerified");
    if (!verified) return;

    const handledKey = "emailVerifiedToastHandled";
    if (sessionStorage.getItem(handledKey) === "true") {
      if (location.search) navigate(location.pathname, { replace: true });
      return;
    }

    const reason = params.get("reason");
    if (verified === "success") {
      toast.success("Email berhasil diverifikasi. Anda sekarang dapat masuk.");
    } else if (verified === "failed") {
      toast.error(
        reason
          ? decodeURIComponent(reason)
          : "Verifikasi email gagal. Silakan minta tautan baru."
      );
    }

    sessionStorage.setItem(handledKey, "true");
    navigate(location.pathname, { replace: true });
  }, [location.search, navigate]);

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  const features = [
    {
      icon: <Edit3 className="w-8 h-8 text-cyan-400" />,
      title: "Smart Editor",
      description:
        "Antarmuka seret dan lepas yang intuitif dengan pratinjau waktu nyata dan saran bertenaga AI.",
    },
    {
      icon: <Eye className="w-8 h-8 text-fuchsia-400" />,
      title: "Live Preview",
      description:
        "Lihat perubahan Anda secara instan dengan teknologi pratinjau langsung canggih kami.",
    },
    {
      icon: <Download className="w-8 h-8 text-blue-400" />,
      title: "Opsi Ekspor",
      description:
        "Unduh dalam berbagai format: PDF, Word, atau bagikan dengan tautan khusus.",
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: "Sangat Cepat",
      description:
        "Buat resume profesional dalam waktu kurang dari 5 menit dengan alur kerja kami yang dioptimalkan.",
    },
    {
      icon: <Shield className="w-8 h-8 text-emerald-400" />,
      title: "Aman & Privat",
      description:
        "Data Anda dienkripsi dan aman. Kami tidak pernah membagikan informasi pribadi Anda.",
    },
    {
      icon: <Smartphone className="w-8 h-8 text-violet-400" />,
      title: "Ramah Seluler",
      description:
        "Edit dan pratinjau resume Anda di perangkat apa pun, di mana saja, kapan saja.",
    },
  ];

  const testimonials = [
    {
      name: "Ade Rahman",
      role: "Software Engineer",
      company: "Google",
      content:
        "Pembuat resume ini membantu saya mendapatkan pekerjaan impian saya! Templatnya modern dan antarmukanya sangat ramah pengguna.",
      rating: 5,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ade",
    },
    {
      name: "Aldi Pratama",
      role: "Marketing Manager",
      company: "Microsoft",
      content:
        "Saya sudah mencoba banyak pembuat resume, tapi yang ini menonjol. Fitur live preview adalah game-changer.",
      rating: 5,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aldi",
    },
    {
      name: "Akbar Juliandi",
      role: "UX Designer",
      company: "Apple",
      content:
        "Templat yang indah dan pengalaman pengeditan yang mulus. Sangat merekomendasikan kepada siapa saja yang mencari resume profesional.",
      rating: 5,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Akbar",
    },
  ];

  const stats = [
    { number: "50K+", label: "Resume Dibuat" },
    { number: "95%", label: "Tingkat Keberhasilan" },
    { number: "4.9/5", label: "Rating Pengguna" },
    { number: "24/7", label: "Dukungan" },
  ];

  return (
    <div className="w-full min-h-screen bg-slate-950 font-display text-white selection:bg-cyan-500/30 overflow-x-hidden relative py-4 lg:py-8">
      {/* === Liquid 3D Background === */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <LiquidEther
          colors={["#0f172a", "#1e1b4b", "#312e81", "#020617"]}
          mouseForce={44}
          cursorSize={140}
          viscous={20}
          autoDemo={true}
        />
      </div>

      {/* === MAIN CONTAINER (No Glass) === */}
      <div className="relative z-10 max-w-[1400px] mx-auto overflow-hidden">
        {/* === Header === */}
        <header className="absolute top-0 left-0 w-full z-50 transition-all duration-300">
          <div className="container mx-auto px-6 lg:px-12 py-6">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <div
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => navigate("/")}
              >
                <div className="relative p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-[0_0_25px_rgba(6,182,212,0.6)] group-hover:shadow-[0_0_40px_rgba(6,182,212,0.8)] transition-all duration-300">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-200 transition-all">
                  ResumeMaker
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4">
                <button
                  onClick={toggleTheme}
                  className="p-2.5 rounded-full bg-slate-800 border border-white/10 hover:bg-slate-700 hover:border-cyan-500/50 text-slate-200 hover:text-cyan-300 transition-all duration-300"
                >
                  {isDarkMode ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>

                {user ? (
                  <ProfileInfoCard />
                ) : (
                  <button
                    className="relative group overflow-hidden px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300"
                    onClick={() => setOpenAuthModal(true)}
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-cyan-500 opacity-80 group-hover:opacity-100 transition-opacity"></span>
                    <span className="relative text-white z-10 flex items-center gap-2">
                      Mulai Gratis <ArrowRight className="w-4 h-4" />
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* === Hero Section (Split Layout) === */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 lg:px-12 overflow-hidden">
          <div className="container mx-auto relative z-10">
            {" "}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* --- Left Column: Content --- */}
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="inline-flex items-center gap-2 bg-slate-900 border border-white/10 text-cyan-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-8 shadow-lg animate-float">
                  <Sparkles className="w-4 h-4" />
                  <span className="tracking-wide">
                    AI-Powered Resume Builder
                  </span>
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
                  Wujudkan <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                    Impian Karirmu
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-xl leading-relaxed font-body font-light">
                  Buat resume profesional dalam hitungan menit dengan teknologi
                  AI. Desain modern, tata letak otomatis, dan hasil yang memukau
                  perekrut.
                </p>

                <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto mb-16 justify-center lg:justify-start">
                  <button
                    onClick={handleCTA}
                    className="relative px-8 py-4 rounded-full font-bold text-base text-white bg-slate-800 border border-cyan-500/30 hover:border-cyan-400 transition-all shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:-translate-y-1 overflow-hidden group"
                  >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-600/40 to-blue-600/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="relative flex items-center justify-center gap-2">
                      Buat Resume Sekarang{" "}
                      <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>

                  {user && (
                    <button
                      onClick={() => navigate("/dashboard")}
                      className="px-8 py-4 rounded-full font-semibold text-base text-slate-300 border border-white/10 hover:bg-white/5 transition-all hover:text-white"
                    >
                      Lihat Template
                    </button>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-center lg:justify-start gap-8 sm:gap-10 border-t border-white/10 pt-8 w-full">
                  {stats.map((stat, index) => (
                    <div key={index} className="flex flex-col">
                      <span className="text-2xl lg:text-3xl font-bold text-white mb-1">
                        {stat.number}
                      </span>
                      <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* --- Right Column: Visual (CSS 3D Floating Resume Card) --- */}
              <div
                className="relative w-full h-[500px] lg:h-[700px] flex items-center justify-center lg:justify-center pointer-events-none mt-8 lg:mt-0"
                style={{ perspective: "1000px" }}
              >
                {/* 1. Background Glow (Atmosphere) */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-500/20 to-blue-600/20 rounded-full blur-[100px] animate-pulse"></div>

                {/* 2. The 3D Card Container */}
                <div
                  className="relative z-10 animate-float transition-all duration-700 ease-out hover:scale-105"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: "rotateY(-12deg) rotateX(5deg) rotateZ(2deg)",
                  }}
                >
                  {/* === THE RESUME CARD === */}
                  <div className="w-[300px] sm:w-[360px] h-[450px] sm:h-[540px] bg-white rounded-2xl shadow-[30px_30px_60px_rgba(0,0,0,0.5)] border border-white/40 overflow-hidden relative flex flex-col">
                    {/* Glass Reflection Shine */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/60 via-transparent to-black/5 opacity-40 z-20 pointer-events-none"></div>

                    {/* Resume Header Skeleton */}
                    <div className="h-24 sm:h-28 bg-slate-50 border-b border-slate-100 p-4 sm:p-6 flex items-center gap-4 sm:gap-5 relative z-10">
                      {/* Avatar */}
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg ring-4 ring-white"></div>

                      {/* Name & Title Lines */}
                      <div className="flex-1 space-y-2.5">
                        <div className="h-3.5 sm:h-4 w-3/4 bg-slate-700 rounded-full opacity-80"></div>
                        <div className="h-2 sm:h-2.5 w-1/2 bg-slate-400 rounded-full opacity-60"></div>
                      </div>
                    </div>

                    {/* Resume Body Skeleton */}
                    <div className="p-4 sm:p-6 space-y-5 sm:y-7 flex-1 bg-white relative z-10">
                      {/* Section 1: Experience */}
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-blue-100 flex items-center justify-center">
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-500 rounded-sm"></div>
                          </div>
                          <div className="h-2 sm:h-2.5 w-1/3 bg-slate-800 rounded-full opacity-70"></div>
                        </div>
                        <div className="pl-7 sm:pl-8 space-y-2">
                          <div className="h-1.5 sm:h-2 w-full bg-slate-100 rounded-full"></div>
                          <div className="h-1.5 sm:h-2 w-5/6 bg-slate-100 rounded-full"></div>
                        </div>
                      </div>

                      {/* Section 2: Skills (Grid) */}
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-purple-100 flex items-center justify-center">
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-purple-500 rounded-sm"></div>
                          </div>
                          <div className="h-2 sm:h-2.5 w-1/4 bg-slate-800 rounded-full opacity-70"></div>
                        </div>
                        <div className="pl-7 sm:pl-8 grid grid-cols-2 gap-2 sm:gap-3">
                          {[1, 2, 3, 4].map((_, i) => (
                            <div
                              key={i}
                              className="h-6 sm:h-8 rounded-lg bg-slate-50 border border-slate-100 relative overflow-hidden"
                            >
                              <div className="absolute top-0 left-0 h-full w-2/3 bg-slate-200/50"></div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Section 3: Education */}
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-emerald-100 flex items-center justify-center">
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-500 rounded-sm"></div>
                          </div>
                          <div className="h-2 sm:h-2.5 w-1/3 bg-slate-800 rounded-full opacity-70"></div>
                        </div>
                        <div className="pl-7 sm:pl-8 flex items-center gap-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded bg-slate-50 border border-slate-100"></div>
                          <div className="space-y-1 flex-1">
                            <div className="h-1.5 sm:h-2 w-3/4 bg-slate-100 rounded-full"></div>
                            <div className="h-1 sm:h-1.5 w-1/2 bg-slate-100 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* === Floating Decorative Satellites (3D Space) === */}

                  {/* Badge 1: ATS Friendly */}
                  <div
                    className="absolute -right-4 sm:-right-8 top-12 sm:top-16 p-2 sm:p-3 bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] animate-float border border-white/50"
                    style={{
                      animationDelay: "1s",
                      transform: "translateZ(40px)",
                    }}
                  >
                    <Check
                      className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500"
                      strokeWidth={3}
                    />
                  </div>

                  {/* Badge 2: AI Powered */}
                  <div
                    className="absolute -left-4 sm:-left-6 bottom-24 sm:bottom-32 p-2 sm:p-3 bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] animate-float border border-white/50"
                    style={{
                      animationDelay: "2.5s",
                      transform: "translateZ(60px)",
                    }}
                  >
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500 fill-purple-100" />
                  </div>

                  {/* Badge 3: Fast Export */}
                  <div
                    className="absolute -right-1 sm:-right-2 bottom-8 sm:bottom-12 p-2 sm:p-3 bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] animate-float border border-white/50"
                    style={{
                      animationDelay: "1.5s",
                      transform: "translateZ(20px)",
                    }}
                  >
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 fill-yellow-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === Features Grid === */}
        <section className="py-24 relative z-10 border-t border-white/5">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-20">
              <h2 className="text-3xl sm:text-5xl font-bold mb-6 text-white">
                Fitur Unggulan
              </h2>
              <p className="text-slate-400 font-body max-w-2xl mx-auto text-lg">
                Semua yang Anda butuhkan untuk membuat resume kelas dunia.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group p-8 rounded-3xl bg-slate-900 border border-white/5 hover:border-cyan-500/30 hover:bg-slate-800 transition-all duration-300 relative overflow-hidden shadow-lg hover:shadow-cyan-500/10"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>

                  <div className="mb-6 inline-block p-4 rounded-2xl bg-slate-950 border border-white/10 shadow-lg group-hover:scale-110 group-hover:shadow-cyan-500/20 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed font-body">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === Testimonials === */}
        <section className="py-24 relative z-10 bg-slate-900 border-y border-white/5">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Apa Kata Mereka?
              </h2>
              <p className="text-slate-400 mt-2">
                Cerita sukses dari para profesional.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="bg-slate-950 p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all shadow-lg"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-12 h-12 rounded-full border-2 border-cyan-500/50"
                    />
                    <div>
                      <h4 className="font-bold text-white">{t.name}</h4>
                      <p className="text-xs text-slate-400">
                        {t.role} di {t.company}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-500 text-yellow-500"
                      />
                    ))}
                  </div>
                  <p className="text-slate-200 font-body text-sm italic">
                    "{t.content}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === CTA Footer === */}
        <section className="py-24 relative z-10 text-center">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-4xl mx-auto relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-fuchsia-600 blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
              <div className="relative bg-slate-900 border border-white/10 p-12 rounded-[40px] shadow-2xl overflow-hidden">
                {/* Inner Cosmic Texture */}
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]"></div>

                <h2 className="text-4xl sm:text-5xl font-bold mb-6 relative z-10 text-white">
                  Wujudkan Karir Impianmu Mulai Hari Ini{" "}
                </h2>
                <p className="text-slate-300 mb-8 max-w-xl mx-auto font-body relative z-10">
                  Persaingan kerja semakin ketat. Pastikan resume Anda lolos
                  seleksi sistem ATS dan tampil menonjol di mata HRD. Bangun
                  citra profesional Anda sekarang juga.
                </p>
                <button
                  onClick={handleCTA}
                  className="relative z-10 bg-white text-slate-950 px-12 py-5 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)]"
                >
                  Buat CV Profesional
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Details */}
        <footer className="py-12 bg-slate-950 border-t border-white/5 relative z-10">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 text-left">
              <div className="col-span-1 md:col-span-1">
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-1.5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg shadow-lg">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-white">
                    Resume Maker
                  </span>
                </div>
                <p className="text-slate-500 leading-relaxed text-sm font-body">
                  Membantu para pencari kerja menciptakan kesan pertama yang tak
                  terlupakan melalui resume berkualitas tinggi.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-white mb-6">Produk</h3>
                <ul className="space-y-3 text-slate-500 text-sm font-body">
                  <li>
                    <a
                      href="#"
                      className="hover:text-cyan-400 transition-colors"
                    >
                      Template
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-cyan-400 transition-colors"
                    >
                      Fitur
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-cyan-400 transition-colors"
                    >
                      Harga
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-cyan-400 transition-colors"
                    >
                      Blog
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-white mb-6">Bantuan</h3>
                <ul className="space-y-3 text-slate-500 text-sm font-body">
                  <li>
                    <a
                      href="#"
                      className="hover:text-cyan-400 transition-colors"
                    >
                      Pusat Bantuan
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-cyan-400 transition-colors"
                    >
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-cyan-400 transition-colors"
                    >
                      Kontak
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-cyan-400 transition-colors"
                    >
                      Kebijakan
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-white mb-6">Perusahaan</h3>
                <ul className="space-y-3 text-slate-500 text-sm font-body">
                  <li>
                    <a
                      href="#"
                      className="hover:text-cyan-400 transition-colors"
                    >
                      Tentang Kami
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-cyan-400 transition-colors"
                    >
                      Karir
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-cyan-400 transition-colors"
                    >
                      Kebijakan Privasi
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/5 pt-8 text-center text-slate-600 text-sm font-body">
              <p>
                &copy; 2025 ResumeMaker. All rights reserved. | Made with ⚡️ by
                Kelompok 4
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Auth Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div className="bg-slate-900 text-white rounded-lg">
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default LandingPage;
