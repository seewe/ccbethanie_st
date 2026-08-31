import React, { useState, useRef } from 'react';
import { X, Play, Pause, Volume2, BookOpen, User, Calendar, Share2, Check, Download, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function SermonPlayerModal({ sermon, isOpen, onClose }) {
  const { t, language } = useLanguage();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);
  const audioRef = useRef(null);

  if (!isOpen || !sermon) return null;

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlayingAudio) {
        audioRef.current.pause();
        setIsPlayingAudio(false);
      } else {
        audioRef.current.play();
        setIsPlayingAudio(true);
      }
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border border-gray-100 flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="bg-[#121820] text-white px-6 py-4 flex items-center justify-between border-b border-gray-800">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#F2B852]">
              {sermon.series || t('sermonDefaultSeries')}
            </span>
            <h3 className="text-lg sm:text-xl font-bold font-serif text-white truncate max-w-lg">
              {sermon.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1.5 rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Player Container */}
        <div className="bg-black relative aspect-video w-full flex items-center justify-center overflow-hidden">
          {sermon.videoUrl && sermon.videoUrl.includes('youtube') ? (
            <iframe
              src={sermon.videoUrl}
              title={sermon.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="relative w-full h-full">
              <img 
                src={sermon.thumbnail || "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?auto=format&fit=crop&w=1200&q=80"} 
                alt={sermon.title}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 p-4 text-center">
                <button
                  onClick={toggleAudio}
                  className="w-16 h-16 rounded-full bg-[#C9862C] hover:bg-[#B37220] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 mb-3 cursor-pointer"
                >
                  {isPlayingAudio ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                </button>
                <span className="text-white font-medium text-sm">
                  {isPlayingAudio ? t('sermonAudioPlaying') : t('sermonListenAudio')}
                </span>
                <span className="text-gray-300 text-xs mt-1">{t('sermonDurationLabel')} {sermon.duration || "40 min"}</span>
              </div>
            </div>
          )}
        </div>

        {/* Hidden Audio element for streaming */}
        {sermon.audioUrl && (
          <audio 
            ref={audioRef} 
            src={sermon.audioUrl} 
            onEnded={() => setIsPlayingAudio(false)} 
          />
        )}

        {/* Details & Notes */}
        <div className="p-6 overflow-y-auto space-y-4 text-gray-800">
          
          {/* Metadata bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100 text-xs text-gray-600">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 font-semibold text-[#8F4D12]">
                <User className="w-4 h-4 text-[#C9862C]" />
                <span>{sermon.speaker} ({sermon.role || t('sermonSpeakerRole')})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>{sermon.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? t('btnCopied') : t('btnShare')}</span>
              </button>
            </div>
          </div>

          {/* Scripture Passage Badge */}
          {sermon.scripture && (
            <div className="bg-[#FAF4EA] p-3.5 rounded-xl border border-[#E8CFA8] flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-[#C9862C] shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8F4D12]">
                  {t('sermonScriptureLabel')}
                </span>
                <p className="text-sm font-serif font-bold text-gray-900 mt-0.5">
                  {sermon.scripture}
                </p>
              </div>
            </div>
          )}

          {/* Sermon Summary */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
              {t('sermonSummaryLabel')}
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              {sermon.description}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
