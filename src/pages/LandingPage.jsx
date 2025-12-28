import React, { useContext, useState, useEffect } from "react";
import HERO_IMG from "../assets/hero-img.png";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Modal from "../components/Modal";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";
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
} from "lucide-react";
import toast from "react-hot-toast";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  // Show toast for email verification redirect flags
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const verified = params.get("emailVerified");
    if (!verified) return;

    const handledKey = "emailVerifiedToastHandled";
    // Guard against StrictMode double-effect and repeated visits in same session
    if (sessionStorage.getItem(handledKey) === "true") {
      if (location.search) navigate(location.pathname, { replace: true });
      return;
    }

    const reason = params.get("reason");
    if (verified === "success") {
      toast.success("Email verified successfully. You can now log in.");
    } else if (verified === "failed") {
      toast.error(
        reason
          ? decodeURIComponent(reason)
          : "Email verification failed. Please request a new link."
      );
    }

    sessionStorage.setItem(handledKey, "true");
    // Clean URL via router so useLocation updates
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
      icon: <Edit3 className="w-8 h-8 text-blue-600" />,
      title: "Smart Editor",
      description:
        "Antarmuka seret dan lepas yang intuitif dengan pratinjau waktu nyata dan saran bertenaga AI..",
    },
    {
      icon: <Eye className="w-8 h-8 text-purple-600" />,
      title: "Live Preview",
      description:
        "Lihat perubahan Anda secara instan dengan teknologi pratinjau langsung canggih kami.",
    },
    {
      icon: <Download className="w-8 h-8 text-green-600" />,
      title: "Export Options",
      description:
        "Unduh dalam berbagai format: PDF, Word, atau bagikan dengan tautan khusus.",
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      title: "Lightning Fast",
      description:
        "Buat resume profesional dalam waktu kurang dari 5 menit dengan alur kerja kami yang dioptimalkan.",
    },
    {
      icon: <Shield className="w-8 h-8 text-red-600" />,
      title: "Secure & Private",
      description:
        "Data Anda dienkripsi dan aman. Kami tidak pernah membagikan informasi Anda.",
    },
    {
      icon: <Smartphone className="w-8 h-8 text-indigo-600" />,
      title: "Mobile Friendly",
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
    },
    {
      name: "Aldi Pratama",
      role: "Marketing Manager",
      company: "Microsoft",
      content:
        "Saya sudah mencoba banyak pembuat resume, tapi yang ini menonjol. Fitur live preview adalah game-changer.",
      rating: 5,
    },
    {
      name: "Akbar Juliandi",
      role: "UX Designer",
      company: "Apple",
      content:
        "Templat yang indah dan pengalaman pengeditan yang mulus. Sangat merekomendasikan kepada siapa saja yang mencari resume profesional.",
      rating: 5,
    },
  ];

  const stats = [
    { number: "50K+", label: "Resume Dibuat" },
    { number: "95%", label: "Tingkat Keberhasilan" },
    { number: "4.9/5", label: "Ratting Pengguna" },
    { number: "24/7", label: "Pendukung" },
  ];

  return (
    <div className="w-full min-h-full bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-600" />
              <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                Resume Maker CV
              </span>
            </div>
            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-2.5 rounded-full hover:shadow-lg transition-all duration-300 font-medium"
                onClick={() => setOpenAuthModal(true)}
              >
                Mulai Gratis
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Star className="w-4 h-4" />
                Dipercaya oleh lebih dari 50.000 profesional.
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Wujudkan impianmu
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  Buat CV Profesional
                </span>
                Hanya dalam Hitungan Menit
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Buat resume profesional yang menakjubkan dengan pembuat resume
                bertenaga AI kami. Tampil beda dari yang lain dan dapatkan
                pekerjaan impian Anda lebih cepat.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 font-semibold text-lg flex items-center gap-2 group"
                  onClick={handleCTA}
                >
                  Mulai Sekarang
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                {user && (
                  <Link
                    to={"/dashboard"}
                    className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full hover:border-gray-400 transition-colors font-semibold text-lg"
                  >
                    Lihat Template
                  </Link>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div className="text-2xl font-bold text-gray-900">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 relative">
              <div className="relative z-10">
                <img
                  src={HERO_IMG}
                  alt="Resume Builder Preview"
                  className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Semua Yang Anda Butuhkan Untuk
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Sukses
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fitur-fitur unggulan kami membantu Anda membuat resume profesional
              yang menarik perhatian pemberi kerja dan sistem ATS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 bg-white"
              >
                <div className="mb-6 p-3 bg-gray-50 rounded-xl w-fit group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Lihat Cara Kerjanya</h2>
            <p className="text-xl text-gray-600">
              Saksikan betapa mudahnya membuat cv seperti seseorang profesional.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-8">
              <div className="aspect-video rounded-xl overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/c_61lyKtseI"
                  title="Resume Builder Product Walkthrough"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="text-center mt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Panduan Produk Lengkap{" "}
                </h3>
                <p className="text-gray-600">
                  Lihat bagaimana para profesional membuat cv yang menakjubkan
                  hanya dalam hitungan menit.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Dengan Harga Yang Sangat Terjangkau
            </h2>
            <p className="text-xl text-gray-600">
              Pilih paket yang paling sesuai untuk Anda.{" "}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Coba Gratis</h3>
                <div className="text-4xl font-bold mb-2">Rp.0</div>
                <p className="text-gray-600">Sempurna untuk memulai</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>1 Template Professional</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Basic Editing Tools</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>PDF Download</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Support ke email anda</span>
                </li>
              </ul>

              <button
                className="w-full bg-gray-100 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                onClick={handleCTA}
              >
                Mulai Dengan Gratis
              </button>
            </div>

            {/* Premium Plan */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl p-8 relative overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                Popular
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Premium</h3>
                <div className="text-4xl font-bold mb-2">Rp.99Ribu</div>
                <p className="text-blue-100">Untuk semua fitur</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>Semua Templates Premium</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>Alat Pengeditan Tingkat Lanjut</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>Beberapa Format Ekspor</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>Dukungan Priorita</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>Branding Kustom</span>
                </li>
              </ul>

              <button
                className="w-full bg-white text-blue-600 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                onClick={handleCTA}
              >
                Upgrade ke Premium
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Dicintai Para Profesional
            </h2>
            <p className="text-xl text-gray-600">
              Lihat apa yang mereka katakan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Siap Membangun Masa Depan Anda?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Bergabunglah dengan ribuan profesional yang telah mendapatkan
            pekerjaan impian mereka{" "}
          </p>
          <button
            className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2 group"
            onClick={handleCTA}
          >
            Mulai Sekarang
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-4">
                ResumeMaker
              </div>
              <p className="text-gray-400 mb-4">
                Buat cv profesional yang akan membuat Anda dipekerjakan.
                Dipercaya oleh para profesional di seluruh dunia.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                  <Users className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                  <Award className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Produk</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Template
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Fitur
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Harga
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contoh
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Pendukung</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pusat Bantuan
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Hubungi Kami
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pertanyaan Yang Sering Diajukan
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Tutorial
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Perusahaan</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Tentang
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Karir
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Keamanan
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              &copy; 2025 ResumeMaker. Made with Kelompok 4 untuk Para
              profesional.
            </p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
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
