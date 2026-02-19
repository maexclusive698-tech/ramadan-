
import React, { useState, useEffect, useMemo } from 'react';
import { fetchSurahList, fetchSurahDetail } from '../services/quranService';
import { Surah, Ayah, Bookmark } from '../types';
import { 
  Search, 
  ChevronLeft, 
  Bookmark as BookmarkIcon, 
  Settings, 
  Type, 
  Sun, 
  Moon, 
  BookOpen,
  ArrowRight
} from 'lucide-react';
import AdBanner from '../components/AdBanner';

const QuranReader: React.FC = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [fontSize, setFontSize] = useState(24);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  // Local storage simulation for persistence
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('quran_bookmarks');
    if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
    
    const savedDarkMode = localStorage.getItem('reader_dark_mode');
    if (savedDarkMode) setIsDarkMode(JSON.parse(savedDarkMode));

    const loadSurahs = async () => {
      const list = await fetchSurahList();
      setSurahs(list);
      setLoadingList(false);
    };
    loadSurahs();
  }, []);

  useEffect(() => {
    localStorage.setItem('reader_dark_mode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const filteredSurahs = useMemo(() => {
    return surahs.filter(s => 
      s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.name.includes(searchQuery) ||
      s.number.toString() === searchQuery
    );
  }, [surahs, searchQuery]);

  const handleSelectSurah = async (number: number) => {
    setLoadingDetail(true);
    const detail = await fetchSurahDetail(number);
    setSelectedSurah(detail);
    setLoadingDetail(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleBookmark = (ayah: Ayah) => {
    if (!selectedSurah) return;
    const newBookmark: Bookmark = {
      surahNumber: selectedSurah.number,
      surahName: selectedSurah.englishName,
      ayahNumber: ayah.numberInSurah,
      timestamp: Date.now()
    };
    
    const exists = bookmarks.find(b => b.surahNumber === newBookmark.surahNumber && b.ayahNumber === newBookmark.ayahNumber);
    let updated;
    if (exists) {
      updated = bookmarks.filter(b => !(b.surahNumber === newBookmark.surahNumber && b.ayahNumber === newBookmark.ayahNumber));
    } else {
      updated = [newBookmark, ...bookmarks].slice(0, 10); // Keep last 10
    }
    setBookmarks(updated);
    localStorage.setItem('quran_bookmarks', JSON.stringify(updated));
  };

  if (selectedSurah) {
    return (
      <div className={`min-h-screen -m-4 lg:-m-8 p-4 lg:p-8 transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-emerald-50 text-slate-800'}`}>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header Controls */}
          <div className={`sticky top-20 z-20 flex flex-wrap items-center justify-between gap-4 p-4 rounded-3xl shadow-lg border backdrop-blur-md ${isDarkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-white/90 border-emerald-100'}`}>
            <button 
              onClick={() => setSelectedSurah(null)}
              className="flex items-center gap-2 font-bold text-emerald-600 hover:gap-3 transition-all"
            >
              <ChevronLeft size={20} /> Surah List
            </button>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 px-3 py-1.5 rounded-xl">
                <Type size={16} className="text-slate-400" />
                <input 
                  type="range" min="16" max="48" step="2" 
                  value={fontSize} 
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-24 accent-emerald-600"
                />
              </div>
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-xl transition-colors ${isDarkMode ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-600'}`}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>

          {/* Surah Title */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-black font-islamic text-emerald-600">{selectedSurah.name}</h1>
            <p className="text-xl font-bold uppercase tracking-widest">{selectedSurah.englishName}</p>
            <p className="text-sm opacity-60 italic">{selectedSurah.englishNameTranslation} • {selectedSurah.revelationType} • {selectedSurah.numberOfAyahs} Ayahs</p>
          </div>

          {/* Ayahs */}
          <div className="space-y-12 pb-20">
            {selectedSurah.ayahs?.map((ayah) => {
              const isBookmarked = bookmarks.some(b => b.surahNumber === selectedSurah.number && b.ayahNumber === ayah.numberInSurah);
              return (
                <div key={ayah.number} className={`group relative p-8 rounded-[2.5rem] transition-all border ${isDarkMode ? 'bg-slate-800 border-slate-700 hover:border-emerald-500' : 'bg-white border-emerald-50 hover:shadow-xl hover:shadow-emerald-900/5'}`}>
                  <div className="absolute top-6 left-6 flex items-center gap-3">
                    <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${isDarkMode ? 'bg-slate-700 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}>
                      {ayah.numberInSurah}
                    </span>
                    <button 
                      onClick={() => toggleBookmark(ayah)}
                      className={`p-2 rounded-xl transition-all ${isBookmarked ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-700 text-slate-400 opacity-0 group-hover:opacity-100'}`}
                    >
                      <BookmarkIcon size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  <div className="space-y-8 mt-12">
                    <p 
                      className="text-right leading-[1.8] font-islamic transition-all" 
                      style={{ fontSize: `${fontSize}px` }}
                      dir="rtl"
                    >
                      {ayah.text}
                    </p>
                    <div className={`h-px w-full bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent my-6`} />
                    <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600 font-medium'}`}>
                      {ayah.translation}
                    </p>
                  </div>
                </div>
              );
            })}
            
            {/* Ad at end of surah */}
            <AdBanner id="SURAH_END_AD" format="native" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-800">Al-Quran</h1>
          <p className="text-slate-500">Read, understand, and reflect on the word of Allah.</p>
        </div>

        <div className="relative flex-1 max-md:hidden max-w-md">
          <input 
            type="text" 
            placeholder="Search by name, number or translation..." 
            className="w-full bg-white border-none rounded-2xl py-3 px-12 text-sm shadow-sm focus:ring-2 focus:ring-emerald-500 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-3 text-slate-400" size={18} />
        </div>
      </div>

      {/* Bookmarks Quick Bar */}
      {bookmarks.length > 0 && (
        <div className="bg-emerald-600 p-6 rounded-[2rem] text-white shadow-lg shadow-emerald-900/10">
          <h3 className="font-bold text-sm uppercase tracking-widest opacity-80 mb-4 flex items-center gap-2">
            <BookmarkIcon size={14} fill="currentColor" /> Recent Bookmarks
          </h3>
          <div className="flex flex-wrap gap-3">
            {bookmarks.map((b, i) => (
              <button 
                key={i}
                onClick={() => handleSelectSurah(b.surahNumber)}
                className="bg-white/20 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-xl text-xs font-bold hover:bg-white/30 transition-all flex items-center gap-2"
              >
                {b.surahName} <span className="opacity-60">{b.ayahNumber}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* List Ad Slot */}
      <AdBanner id="QURAN_LIST_TOP_AD" format="banner" />

      {loadingList ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-32 bg-slate-100 animate-pulse rounded-3xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSurahs.map((surah) => (
            <button
              key={surah.number}
              onClick={() => handleSelectSurah(surah.number)}
              className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-50 hover:shadow-xl hover:shadow-emerald-900/5 hover:-translate-y-1 transition-all group flex items-center gap-6"
            >
              <div className="relative flex-shrink-0 w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-700 font-black group-hover:bg-emerald-600 group-hover:text-white transition-all">
                {surah.number}
                <div className="absolute -inset-1 border-2 border-emerald-500/10 rounded-2xl group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-left flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-slate-800">{surah.englishName}</h3>
                  <span className="font-islamic text-emerald-600 text-lg">{surah.name}</span>
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{surah.revelationType} • {surah.numberOfAyahs} Ayahs</p>
              </div>
              <ArrowRight className="text-slate-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" size={18} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuranReader;
