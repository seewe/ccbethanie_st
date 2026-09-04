import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Users,
  Heart,
  Play,
  ArrowRight,
  Baby,
  Sparkles,
  BookOpen,
  Clock,
  HeartHandshake,
  Globe,
  Church,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Mail,
  X,
  ZoomIn,
  Maximize2,
} from "lucide-react";
import { apiService } from "../services/api.js";
import Logo from "../components/Logo.jsx";
import CommunityOriginsSection from "../components/CommunityOriginsSection.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function HomePage({
  onOpenVisitModal,
  onOpenDonationModal,
  onOpenPrayerModal,
  onPlaySermon,
}) {
  const { t, language } = useLanguage();
  const [sermons, setSermons] = useState([]);
  const [events, setEvents] = useState([]);
  const [team, setTeam] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState(null);

  const communityPhotos = [
    {
      url: "/ci13.jpg",
      title: t("photoTitle1"),
      subtitle: t("photoDesc1"),
      tag: t("photoTagSunday"),
      gridClass:
        "col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-2 min-h-[260px] sm:min-h-[300px] lg:min-h-0",
    },
    {
      url: "/ci2.jpg",
      title: t("photoTitle2"),
      subtitle: t("photoDesc2"),
      tag: t("photoTagYouth"),
      gridClass:
        "col-span-1 sm:col-span-1 lg:col-span-1 lg:row-span-2 min-h-[200px] sm:min-h-[240px] lg:min-h-0",
    },
    {
      url: "/ci3.jpg",
      title: t("photoTitle3"),
      subtitle: t("photoDesc3"),
      tag: t("photoTagWelcome"),
      gridClass:
        "col-span-1 sm:col-span-1 lg:col-span-1 lg:row-span-1 min-h-[190px] sm:min-h-[220px] lg:min-h-0",
    },
    {
      url: "/ci4.jpg",
      title: t("photoTitle4"),
      subtitle: t("photoDesc4"),
      tag: t("photoTagFellowship"),
      gridClass:
        "col-span-1 sm:col-span-1 lg:col-span-1 lg:row-span-1 min-h-[190px] sm:min-h-[220px] lg:min-h-0",
    },
    {
      url: "/ci5.jpg",
      title: t("photoTitle5"),
      subtitle: t("photoDesc5"),
      tag: t("photoTagFamily"),
      gridClass:
        "col-span-1 sm:col-span-1 lg:col-span-1 lg:row-span-2 min-h-[200px] sm:min-h-[240px] lg:min-h-0",
    },
    {
      url: "/ci6.jpg",
      title: t("photoTitle6"),
      subtitle: t("photoDesc6"),
      tag: t("photoTagPrayer"),
      gridClass:
        "col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-1 min-h-[190px] sm:min-h-[220px] lg:min-h-0",
    },
    {
      url: "/ci7.jpg",
      title: t("photoTitle7"),
      subtitle: t("photoDesc7"),
      tag: t("photoTagStudy"),
      gridClass:
        "col-span-1 sm:col-span-1 lg:col-span-1 lg:row-span-2 min-h-[200px] sm:min-h-[240px] lg:min-h-0",
    },
    {
      url: "/ci8.jpg",
      title: t("photoTitle8"),
      subtitle: t("photoDesc8"),
      tag: t("photoTagSanctuary"),
      gridClass:
        "col-span-1 sm:col-span-1 lg:col-span-2 lg:row-span-1 min-h-[190px] sm:min-h-[220px] lg:min-h-0",
    },
  ];

  // Lightbox keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedPhotoIdx === null) return;
      if (e.key === "Escape") setSelectedPhotoIdx(null);
      if (e.key === "ArrowRight")
        setSelectedPhotoIdx((prev) => (prev + 1) % communityPhotos.length);
      if (e.key === "ArrowLeft")
        setSelectedPhotoIdx(
          (prev) =>
            (prev - 1 + communityPhotos.length) % communityPhotos.length,
        );
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhotoIdx, communityPhotos.length]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [sermonsData, eventsData, teamData, testimonialsData] =
          await Promise.all([
            apiService.getSermons(),
            apiService.getEvents(),
            apiService.getTeam(),
            apiService.getTestimonials(),
          ]);
        setSermons(sermonsData);
        setEvents(eventsData);
        setTeam(teamData);
        setTestimonials(testimonialsData);
      } catch (err) {
        console.error("Error loading home page dynamic content", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const featuredSermon = sermons.find((s) => s.featured) || sermons[0];

  return (
    <div className="bg-white min-h-screen">
      {/* =========================================================================
          HERO SECTION (Inspired by both "exemple de site.jpeg" & "exemple de site 1.jpeg")
          ========================================================================= */}
      <section className="relative w-full min-h-[620px] lg:min-h-[700px] flex items-center bg-gray-900 overflow-hidden">
        {/* Background Image with warm amber/gold atmospheric overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=2000&q=85"
            alt="Communauté Chrétienne Béthanie Rassemblement"
            className="w-full h-full object-cover object-center opacity-45 brightness-90 transform scale-105 transition-transform duration-1000 ease-out"
          />
          {/* Subtle Warm Gradient Overlay matching the brand colors */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F141C]/95 via-[#181F2C]/80 to-[#2A1F13]/70"></div>
          <div className="absolute inset-0 bg-radial-at-t from-transparent via-[#0F141C]/40 to-[#0F141C]/90"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-white text-center lg:text-left">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#8F4D12]/40 backdrop-blur-md border border-[#F5C05F]/50 text-[#FCE1A8] text-xs sm:text-sm font-extrabold uppercase tracking-widest shadow-lg shadow-black/20">
                <Sparkles className="w-4 h-4 text-[#F5C05F] shrink-0" />
                <span>{t("affiliation")}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15]">
                {t("heroTitleStart")}
                <span className="text-[#F2B852] italic font-normal">
                  {t("heroTitleEnd")}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-gray-200 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {t("heroDescription")}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/contact"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#D48E2E] to-[#A85C16] hover:from-[#E2A03C] hover:to-[#BD6B1E] shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t("btnContact")}</span>
                </Link>
              </div>
            </div>

            {/* Right Floating Card (as featured prominently in "exemple de site.jpeg") */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-7 shadow-2xl border border-white/40 text-gray-900 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C9862C]">
                    {t("nextCelebrationTitle")}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-bold bg-green-100 text-green-800">
                    {t("inPersonBadge")}
                  </span>
                </div>

                <div className="flex items-start gap-4 pt-1">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF3E7] text-[#C9862C] flex items-center justify-center shrink-0 border border-[#E8D4B8]">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900">
                      {t("sundayTime")}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {t("sundayProgram")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF3E7] text-[#C9862C] flex items-center justify-center shrink-0 border border-[#E8D4B8]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900">
                      {t("churchAddressFull")}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {t("churchCityParking")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF3E7] text-[#C9862C] flex items-center justify-center shrink-0 border border-[#E8D4B8]">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900">
                      {t("openToAll")}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {t("openToAllDesc")}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-center text-[#8F4D12] bg-[#FAF3E7] border border-[#EAC996] shadow-sm flex items-center justify-center gap-2">
                    <Heart className="w-4 h-4 text-[#C9862C] fill-[#C9862C]/20" />
                    <span>{t("weAwaitForYou")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 ACCÈS RAPIDES
          ========================================================================= */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Qui sommes-nous ? */}
            <div className="p-6 rounded-2xl bg-[#FCFAF6] hover:bg-[#FAF3E7] border border-[#EFE5D5] transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-white text-[#C9862C] shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                {t("quickWhoTitle")}
              </h3>
              <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                {t("quickWhoDesc")}
              </p>
              <Link
                to="/notre-eglise"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#8F4D12] uppercase tracking-wider hover:gap-2 transition-all"
              >
                <span>{t("btnLearnMore")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 2. Prochains événements */}
            <div className="p-6 rounded-2xl bg-[#FCFAF6] hover:bg-[#FAF3E7] border border-[#EFE5D5] transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-white text-[#C9862C] shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                {t("quickEventsTitle")}
              </h3>
              <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                {t("quickEventsDesc")}
              </p>
              <Link
                to="/evenements"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#8F4D12] uppercase tracking-wider hover:gap-2 transition-all"
              >
                <span>{t("quickEventsBtn")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 3. Besoin de prière ? */}
            <div className="p-6 rounded-2xl bg-[#FCFAF6] hover:bg-[#FAF3E7] border border-[#EFE5D5] transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-white text-[#C9862C] shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                {t("quickPrayerTitle")}
              </h3>
              <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                {t("quickPrayerDesc")}
              </p>
              <button
                onClick={onOpenPrayerModal}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#8F4D12] uppercase tracking-wider hover:gap-2 transition-all cursor-pointer"
              >
                <span>{t("quickPrayerBtn")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 : NOS MEMBRES VIENNENT DE... (Marquee Défilement des Communautés)
          ========================================================================= */}
      <CommunityOriginsSection />

      {/* =========================================================================
          SECTION TÉMOIGNAGES & ÉQUIPE PASTORALE (As in "exemple de site 1.jpeg")
          ========================================================================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: TÉMOIGNAGES */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-xl text-[#C9862C] font-serif font-black">
                  ❝
                </span>
                <h3 className="text-base font-bold uppercase tracking-wider text-gray-900">
                  {t("testimonialsBadge")}
                </h3>
              </div>

              {testimonials.length > 0 && (
                <div className="bg-[#FAF6EE] p-7 rounded-2xl border border-[#E8D9C0] relative space-y-4">
                  <p className="text-sm text-gray-700 italic leading-relaxed">
                    «{" "}
                    {(language === "en"
                      ? testimonials[activeTestimonialIdx]?.quote_en
                      : testimonials[activeTestimonialIdx]?.quote) ||
                      testimonials[activeTestimonialIdx]?.quote ||
                      t("defaultTestimonialQuote")}{" "}
                    »
                  </p>
                  <div>
                    <h5 className="text-xs font-bold text-[#8F4D12] uppercase tracking-wider">
                      —{" "}
                      {testimonials[activeTestimonialIdx]?.author ||
                        "Carole M."}
                    </h5>
                    <span className="text-[11px] text-gray-500">
                      {(language === "en"
                        ? testimonials[activeTestimonialIdx]?.role_en
                        : testimonials[activeTestimonialIdx]?.role) ||
                        testimonials[activeTestimonialIdx]?.role ||
                        t("defaultTestimonialRole")}
                    </span>
                  </div>

                  {/* Carousel Dots */}
                  <div className="flex items-center gap-1.5 pt-2">
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveTestimonialIdx(idx)}
                        aria-label={`Testimonial ${idx + 1}`}
                        className={`h-2 rounded-full transition-all ${
                          activeTestimonialIdx === idx
                            ? "w-6 bg-[#C9862C]"
                            : "w-2 bg-gray-300 hover:bg-gray-400"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: NOTRE PASTEUR */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#C9862C]"></span>
                  <h3 className="text-base font-bold uppercase tracking-wider text-gray-900">
                    {t("pastorBadge")}
                  </h3>
                </div>
                <Link
                  to="/notre-eglise#pasteur"
                  className="text-xs font-bold text-[#8F4D12] hover:text-[#C9862C] uppercase tracking-wider flex items-center gap-1"
                >
                  <span>{t("btnFullProfile")}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="bg-[#FAF8F5] p-6 sm:p-7 rounded-2xl border border-[#EDE3D3] flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-sm hover:shadow-md transition-shadow">
                {/* Photo & Badge */}
                <div className="shrink-0 text-center">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-md border-2 border-white ring-2 ring-[#C9862C]/30 mx-auto">
                    <img
                      src={
                        team.find((m) =>
                          m.role?.toLowerCase().includes("principal"),
                        )?.photo || "/past-narcisse.jpg"
                      }
                      alt="Pasteur Narcisse F. T"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <span className="inline-block mt-3 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FAF0DD] text-[#8F4D12] border border-[#E4CEAB]">
                    {t("pastorRoleBadge")}
                  </span>
                </div>

                {/* Profile Details */}
                <div className="flex-1 text-center sm:text-left space-y-3">
                  <div>
                    <h4 className="text-xl font-bold font-serif text-gray-900">
                      {team.find((m) =>
                        m.role?.toLowerCase().includes("principal"),
                      )?.name ||
                        (language === "en"
                          ? "Pastor Narcisse F. T"
                          : "Pasteur Narcisse F. T")}
                    </h4>
                    <p className="text-xs font-semibold text-[#C9862C] mt-0.5">
                      {t("pastorTitle")}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {t("pastorShortBio")}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                    <a
                      href="mailto:pasteur@ccbethanie.ca"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-[#C9862C] hover:bg-[#B37220] transition-colors shadow-sm"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{t("btnContactPastor")}</span>
                    </a>
                    <button
                      onClick={onOpenPrayerModal}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-[#8F4D12] bg-white border border-[#E0CEB5] hover:bg-[#FAF4EB] transition-colors cursor-pointer"
                    >
                      <HeartHandshake className="w-3.5 h-3.5 text-[#C9862C]" />
                      <span>{t("btnRequestCounsel")}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION "NOTRE COMMUNAUTÉ EN IMAGES" (Disposition Masonry)
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-[#FAFAFA] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with Title */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF3E7] border border-[#F2D7AC] mb-3">
              <span className="h-2 w-2 rounded-full bg-[#C9862C]"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8F4D12]">
                {t("galleryBadge")}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-gray-900 tracking-tight">
              {t("galleryTitle")}
            </h2>
            <p className="text-xs sm:text-base text-gray-600 mt-2 leading-relaxed">
              {t("gallerySubtitle")}
            </p>
          </div>

          {/* Masonry / Bento Complete Square Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-4 gap-4 sm:gap-5 w-full max-w-6xl mx-auto lg:h-[780px] xl:h-[840px]">
            {communityPhotos.map((photo, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPhotoIdx(idx)}
                className={`${photo.gridClass} group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-gray-900 border border-gray-100 cursor-pointer flex flex-col`}
                tabIndex={0}
                role="button"
                aria-label={`${photo.title} - ${t("viewPhotoFull")}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    setSelectedPhotoIdx(idx);
                }}
              >
                <div className="w-full h-full min-h-full overflow-hidden relative flex-1">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                    loading="lazy"
                  />

                  {/* Subtle Top-Right Quick Expand Icon */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>

                  {/* Gradient Overlay & Captions */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-4 sm:p-5 text-white transition-opacity duration-300">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#C9862C] text-white shadow-sm">
                        {photo.tag}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold font-serif text-white leading-snug group-hover:text-[#F2B852] transition-colors line-clamp-1 sm:line-clamp-2">
                      {photo.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-gray-300 mt-1 leading-relaxed line-clamp-2 hidden sm:block">
                      {photo.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox / Zoom Modal */}
      {selectedPhotoIdx !== null && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
          onClick={() => setSelectedPhotoIdx(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedPhotoIdx(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-50 cursor-pointer focus:outline-none"
            aria-label={t("closeLightbox")}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPhotoIdx(
                (prev) =>
                  (prev - 1 + communityPhotos.length) % communityPhotos.length,
              );
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all z-50 cursor-pointer focus:outline-none"
            aria-label={t("prevPhoto")}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPhotoIdx(
                (prev) => (prev + 1) % communityPhotos.length,
              );
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all z-50 cursor-pointer focus:outline-none"
            aria-label={t("nextPhoto")}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image & Detail Card */}
          <div
            className="relative max-w-4xl w-full bg-[#121820] rounded-2xl overflow-hidden shadow-2xl border border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-h-[70vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={communityPhotos[selectedPhotoIdx].url}
                alt={communityPhotos[selectedPhotoIdx].title}
                className="w-full h-full max-h-[70vh] object-contain"
              />
            </div>

            <div className="p-5 sm:p-6 bg-[#18202A] border-t border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#C9862C] text-white">
                    {communityPhotos[selectedPhotoIdx].tag}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    {selectedPhotoIdx + 1} / {communityPhotos.length}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-serif text-white">
                  {communityPhotos[selectedPhotoIdx].title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 mt-1">
                  {communityPhotos[selectedPhotoIdx].subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
