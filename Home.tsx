
import React, { useState, useEffect, useContext } from 'react';
import { getIslamicMotivation, getRamadanTip } from '../services/geminiService';
import { fetchPrayerTimes } from '../services/prayerService';
import { PrayerTimes } from '../types';
import { Sun, Moon, MapPin, ChevronRight, CheckCircle2 } from 'lucide-react';
import AdBanner from '../components/AdBanner';
import { LanguageContext } from '../App';
import { TRANSLATIONS } from '../constants';

const Home: React.FC = () => {
  const { lang } = useContext(LanguageContext);
  const t = TRANSLATIONS[lang];
  const [motivation, setMotivation] = useState("...");
  const [tip, setTip] = useState("...");
  const [times, setTimes] = useState<PrayerTimes | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const [m, tipData, p] = await Promise.all([
        getIslamicMotivation(),
        getRamadanTip(),
        fetchPrayerTimes("Dhaka")
      ]);
      setMotivation(m);
      setTip(tipData);
      setTimes(p);
      setLoading(false);
    };
    init();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      <div className="relative overflow-hidden bg-emerald-700 rounded-3xl p-8 lg:p-12 text-white">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 font-islamic">{t.ramadanKareem}</h1>
          <p className="text-emerald-100 text-lg mb-8 italic">"{motivation}"</p>
          
          <div className="flex flex-wrap gap-4">
            <div className="bg-emerald-600/50 backdrop-blur-sm border border-emerald-500 p-4 rounded-2xl flex items-center space-x-4">
              <Sun size={24} />
              <div>
                <p className="text-xs uppercase opacity-70">{t.sehriEnds}</p>
                <p className="text-xl font-bold">{loading ? "--:--" : times?.Fajr}</p>
              </div>
            </div>
            <div className="bg-emerald-600/50 backdrop-blur-sm border border-emerald-500 p-4 rounded-2xl flex items-center space-x-4">
              <Moon size={24} />
              <div>
                <p className="text-xs uppercase opacity-70">{t.iftarTime}</p>
                <p className="text-xl font-bold">{loading ? "--:--" : times?.Maghrib}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdBanner id="728x90_HOME_AD" format="banner" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-50">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">{t.dailyPrayers}</h3>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Dhaka</span>
          </div>
          <div className="space-y-4">
            {loading ? (
              <div className="h-32 bg-slate-100 animate-pulse rounded-xl" />
            ) : (
              Object.entries(times || {}).filter(([k]) => ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].includes(k)).map(([key, time]) => (
                <div key={key} className="flex justify-between items-center p-3 hover:bg-emerald-50 rounded-xl">
                  <span className="font-medium text-slate-600">{key}</span>
                  <span className="font-bold text-emerald-700">{time}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-50">
          <h3 className="font-bold text-lg mb-6">Today's Progress</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 border border-slate-100 rounded-xl">
              <CheckCircle2 size={18} className="text-emerald-500" />
              <span className="text-sm font-medium">Salah Checklist</span>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 rounded-3xl p-6 border border-amber-100">
          <h3 className="font-bold text-lg text-amber-800 mb-4 flex items-center gap-2">💡 Ramadan Tip</h3>
          <p className="text-amber-900/80 leading-relaxed">{tip}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
