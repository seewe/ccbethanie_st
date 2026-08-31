import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, MapPin, Tag, User, 
  ArrowRight, CheckCircle2, Search, Sparkles 
} from 'lucide-react';
import { apiService } from '../services/api.js';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function EventsPage({ onOpenVisitModal }) {
  const { t, language } = useLanguage();
  const [events, setEvents] = useState([]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await apiService.getEvents();
      setEvents(data);
      setLoading(false);
    }
    load();
  }, []);

  const categories = [
    { key: 'all', label: t('eventsCatAll') },
    { key: 'Culte', label: t('eventsCatWorship') },
    { key: 'Enseignement', label: t('eventsCatTeaching') },
    { key: 'Prière', label: t('eventsCatPrayer') },
    { key: 'Jeunesse', label: t('eventsCatYouth') },
    { key: 'Communautaire', label: t('eventsCatCommunity') }
  ];

  const localizedEvents = {
    "event-1": {
      title_en: "Sunday Celebration Service",
      month_en: "MAY",
      date_en: "Sunday, May 25, 2025 at 10:00 AM",
      category_en: "Worship",
      location_en: "Main Sanctuary & Livestream",
      description_en: "Contemporary praise, living biblical teaching, and Bethany Kids program for children ages 0 to 12.",
      speaker_en: "Pastor Jean Dupont"
    },
    "event-2": {
      title_en: "Bible Study: The Parables of the Kingdom",
      month_en: "MAY",
      date_en: "Wednesday, May 28, 2025 at 7:00 PM",
      category_en: "Teaching",
      location_en: "Multipurpose Hall & Zoom",
      description_en: "Interactive verse-by-verse study exploring the profound teachings of Jesus and practical application in daily life.",
      speaker_en: "Pastor Françoise Martin"
    },
    "event-3": {
      title_en: "Prayer & Intercession Night",
      month_en: "MAY",
      date_en: "Saturday, May 31, 2025 at 7:30 PM",
      category_en: "Prayer",
      location_en: "Prayer Chapel",
      description_en: "A dedicated time to seek God's presence, intercede for families, the sick, and our city of Montreal.",
      speaker_en: "Intercession Team"
    },
    "event-4": {
      title_en: "Bethany Connect Youth Night",
      month_en: "JUN",
      date_en: "Friday, June 7, 2025 at 7:00 PM",
      category_en: "Youth",
      location_en: "Youth Lounge",
      description_en: "Games, acoustic worship, inspiring message, and pizza for ages 13 to 25. Bring your friends!",
      speaker_en: "Michel Kabasele"
    },
    "event-5": {
      title_en: "Community Fellowship Brunch & Welcome Newcomers",
      month_en: "JUN",
      date_en: "Sunday, June 16, 2025 at 12:30 PM",
      category_en: "Community",
      location_en: "Bethany Main Fellowship Hall",
      description_en: "Warm fraternal meal following the service to connect and extend a heartfelt welcome to all newcomers.",
      speaker_en: "Hospitality Committee"
    }
  };

  const getEventField = (ev, field) => {
    if (language === 'en' && localizedEvents[ev.id]) {
      const enKey = `${field}_en`;
      if (localizedEvents[ev.id][enKey]) {
        return localizedEvents[ev.id][enKey];
      }
    }
    return ev[field];
  };

  const filteredEvents = events.filter(e => {
    if (filterCategory === 'all') return true;
    return e.category?.toLowerCase() === filterCategory.toLowerCase();
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#121820] via-[#1E2632] to-[#251A10] text-white py-16 lg:py-20 border-b-4 border-[#C9862C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#F2B852] text-xs font-semibold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>{t('eventsHeaderBadge')}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              {t('eventsHeaderTitle')}
            </h1>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              {t('eventsHeaderDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="py-6 bg-[#FDFBF7] border-b border-[#F0E5D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider mr-2">
              {t('eventsCatLabel')}
            </span>
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setFilterCategory(cat.key)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  filterCategory === cat.key
                    ? 'bg-[#C9862C] text-white shadow-sm'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredEvents.map((ev) => (
              <div 
                key={ev.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col sm:flex-row"
              >
                {/* Image */}
                <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden bg-gray-100 shrink-0">
                  <img 
                    src={ev.image || "https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=800&q=80"}
                    alt={getEventField(ev, 'title')}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  {/* Floating Date Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md rounded-xl p-2.5 text-center shadow border border-amber-200">
                    <span className="text-xl font-black text-[#8F4D12] block leading-none">{ev.day || '25'}</span>
                    <span className="text-[10px] font-bold text-[#C9862C] uppercase">{getEventField(ev, 'month') || 'MAI'}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-[#8F4D12] border border-[#E8D4B8] inline-block">
                      {getEventField(ev, 'category') || 'Événement'}
                    </span>

                    <h3 className="text-lg font-serif font-bold text-gray-900 leading-tight">
                      {getEventField(ev, 'title')}
                    </h3>

                    <div className="space-y-1 text-xs text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#C9862C]" />
                        <span>{getEventField(ev, 'date')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#C9862C]" />
                        <span>{getEventField(ev, 'location')}</span>
                      </div>
                      {ev.speaker && (
                        <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-[#C9862C]" />
                          <span>{t('eventSpeakerLabel')} {getEventField(ev, 'speaker')}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed pt-1">
                      {getEventField(ev, 'description')}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                    <button
                      onClick={onOpenVisitModal}
                      className="px-4 py-2 bg-[#FAF4EA] hover:bg-[#F3E5CD] text-[#8F4D12] font-bold text-xs rounded-lg transition-colors border border-[#E8D4B8] cursor-pointer"
                    >
                      {t('btnRegister')}
                    </button>
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
