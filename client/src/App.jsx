import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Page404 from "./pages/Page404";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPricing from "./pages/AdminPricing";
import AdminUsers from "./pages/AdminUsers";
import AdminContacts from "./pages/AdminContacts";
import AdminFAQ from "./pages/AdminFAQ";
import AdminFeatures from "./pages/AdminFeatures";
import AdminHowItWorks from "./pages/AdminHowItWorks";
import AdminTestimonials from "./pages/AdminTestimonials";

const Home = lazy(() => import("./pages/Home"));
const Features = lazy(() => import("./components/Features"));
const Pricing = lazy(() => import("./components/Pricing"));

const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const VerifyOTP = lazy(() => import("./pages/VerifyOTP"));

const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));

const App = () => {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  const isAdminRoute = location.pathname.startsWith("/dashboard");

  return (
    <>
      {/* Public Navbar only */}
      {!isAdminRoute && <Navbar />}

      <ScrollToTop />

      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <Routes>
          {/* =====================================================
              PUBLIC ROUTES
          ===================================================== */}

          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/features" element={<Features />} />

          <Route path="/pricing" element={<Pricing />} />

          {/* =====================================================
              ADMIN ROUTES
          ===================================================== */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute adminOnly>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/pricing"
            element={
              <ProtectedRoute adminOnly>
                <AdminLayout>
                  <AdminPricing />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/users"
            element={
              <ProtectedRoute adminOnly>
                <AdminLayout>
                  <AdminUsers />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/contacts"
            element={
              <ProtectedRoute adminOnly>
                <AdminLayout>
                  <AdminContacts />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/faq"
            element={
              <ProtectedRoute adminOnly>
                <AdminLayout>
                  <AdminFAQ />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/features"
            element={
              <ProtectedRoute adminOnly>
                <AdminLayout>
                  <AdminFeatures />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/how-it-works"
            element={
              <ProtectedRoute adminOnly>
                <AdminLayout>
                  <AdminHowItWorks />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/testimonials"
            element={
              <ProtectedRoute adminOnly>
                <AdminLayout>
                  <AdminTestimonials />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* =====================================================
              AUTHENTICATION
          ===================================================== */}

          <Route path="/register" element={<Register />} />

          <Route path="/login" element={<Login />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/verify-otp" element={<VerifyOTP />} />

          <Route path="/reset-password" element={<ResetPassword />} />

          {/* =====================================================
              LEGAL
          ===================================================== */}

          <Route path="/terms-conditions" element={<TermsConditions />} />

          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* =====================================================
              404
          ===================================================== */}

          <Route path="*" element={<Page404 />} />
        </Routes>
      </Suspense>

      {/* Public Footer only */}
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;
