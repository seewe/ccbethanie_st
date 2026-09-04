import React, { useState, useEffect } from "react";
import {
  Users,
  Baby,
  Sparkles,
  HeartHandshake,
  Globe,
  Church,
  Calendar,
  Mail,
} from "lucide-react";
import { apiService } from "../services/api.js";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function MinistriesPage() {
  const { t, language } = useLanguage();
  const [ministries, setMinistries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await apiService.getMinistries();
      setMinistries(data);
      setLoading(false);
    }
    load();
  }, []);

  const getIcon = (iconName) => {
    switch (iconName) {
      case "Baby":
        return <Baby className="w-6 h-6 text-[#C9862C]" />;
      case "Users":
        return <Users className="w-6 h-6 text-[#C9862C]" />;
      case "HandHelping":
      case "Sparkles":
        return <Sparkles className="w-6 h-6 text-[#C9862C]" />;
      case "HeartHandshake":
        return <HeartHandshake className="w-6 h-6 text-[#C9862C]" />;
      case "Globe":
        return <Globe className="w-6 h-6 text-[#C9862C]" />;
      default:
        return <Church className="w-6 h-6 text-[#C9862C]" />;
    }
  };

  // Localized override dictionaries for ministries
  const localizedMinistries = {
    "min-culte": {
      name_en: "Choir",
      shortDesc_en:
        "Join our choir to lift the congregation's voice in worship and praise every Sunday.",
      schedule_en: "Every Sunday at 1:00 PM",
      target_en: "The Whole Family",
      description_en:
        "Our choir accompanies the congregation in vibrant moments of worship, blending timeless biblical hymns and contemporary songs, rehearsing weekly to offer a living and prayerful praise.",
    },
    "min-enfants": {
      name_en: "Bethany Kids (Children's Ministry)",
      shortDesc_en:
        "Age-appropriate biblical teaching for children in a safe, joyful, and nurturing environment.",
      schedule_en: "During Sunday Service (1:00 PM)",
      target_en: "Ages 0 to 12 (Nursery, Preschool, Juniors)",
      description_en:
        "A team of passionate educators offers creative Bible lessons, craft workshops, music, and interactive activities to build strong spiritual foundations.",
    },
    "min-jeunesse": {
      name_en: "Teens & Young Adults (Bethany Connect)",
      shortDesc_en:
        "Dynamic gatherings and activities to grow in faith, build friendships, and thrive.",
      schedule_en: "1st & 3rd Friday at 7:00 PM",
      target_en: "Ages 13 to 25",
      description_en:
        "An open, welcoming space for youth and students to tackle real-world challenges through the lens of the Gospel with mentorship and honest dialogue.",
    },
    "min-priere": {
      name_en: "Moms Group",
      shortDesc_en:
        "A space of mutual support, listening, and prayer for the mothers of our community.",
      schedule_en:
        "Every Friday at 7:30 PM & Monday at 6:30 AM (Morning Prayer)",
      target_en: "All mothers",
      description_en:
        "A group of mothers who support one another in prayer, share their experiences of motherhood, and carry together the needs of their families and the church.",
    },
    "min-femmes": {
      name_en: "Women of Faith & Grace",
      shortDesc_en:
        "A circle of fellowship, mutual encouragement, and spiritual empowerment for women of all generations.",
      schedule_en: "2nd Saturday of the month at 10:00 AM",
      target_en: "Women of all ages",
      description_en:
        "Through Bible studies, brunches, retreats, and compassionate community outreach, we encourage each woman to flourish in her calling.",
    },
    "min-hommes": {
      name_en: "Men's Brotherhood Fellowship",
      shortDesc_en:
        "Equipping men to lead with humility, integrity, and faith in their homes and society.",
      schedule_en: "Last Saturday of the month at 8:30 AM",
      target_en: "Men of all ages",
      description_en:
        "Breakfast fellowship, prayer partnerships, practical workshops, and service projects that forge strong brotherhood in Christ.",
    },
  };

  const getMinistryField = (min, field) => {
    if (language === "en" && localizedMinistries[min.id]) {
      const enKey = `${field}_en`;
      if (localizedMinistries[min.id][enKey]) {
        return localizedMinistries[min.id][enKey];
      }
    }
    return min[field];
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#121820] via-[#1E2632] to-[#251A10] text-white py-16 lg:py-20 border-b-4 border-[#C9862C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#F2B852] text-xs font-semibold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              <span>{t("minHeaderBadge")}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              {t("minHeaderTitle")}
            </h1>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              {t("minHeaderDesc")}
            </p>
          </div>
        </div>
      </section>

      {/* Ministries List */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {ministries.map((min, index) => (
              <div
                key={min.id}
                id={min.slug}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 border-t border-gray-100 ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div
                  className={`lg:col-span-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  <div className="rounded-3xl overflow-hidden shadow-lg h-72 sm:h-84 relative">
                    <img
                      src={min.image}
                      alt={getMinistryField(min, "name")}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-gray-900 flex items-center gap-2 shadow">
                      {getIcon(min.icon)}
                      <span>{getMinistryField(min, "target")}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`lg:col-span-6 space-y-4 ${index % 2 === 1 ? "lg:order-1" : ""}`}
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-[#8F4D12] uppercase tracking-wider">
                    <Calendar className="w-4 h-4 text-[#C9862C]" />
                    <span>{getMinistryField(min, "schedule")}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
                    {getMinistryField(min, "name")}
                  </h2>

                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {getMinistryField(min, "description")}
                  </p>

                  <div className="bg-[#FAF4EA] p-4 rounded-xl border border-[#E9D6BA] space-y-1 text-xs">
                    <span className="font-bold text-[#8F4D12] block">
                      {t("minTargetLabel")}
                    </span>
                    <p className="text-gray-700">
                      {getMinistryField(min, "target")} —{" "}
                      {getMinistryField(min, "shortDesc")}
                    </p>
                  </div>

                  <div className="pt-2">
                    <a
                      href={`mailto:info@ccbethanie.ca?subject=${encodeURIComponent(
                        language === "en"
                          ? `Contact Leader - ${getMinistryField(min, "name")}`
                          : `Contact Responsable - ${getMinistryField(min, "name")}`,
                      )}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#C9862C] hover:bg-[#B37220] transition-colors shadow-sm cursor-pointer"
                    >
                      <Mail className="w-4 h-4" />
                      <span>{t("btnWriteLeader")}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
