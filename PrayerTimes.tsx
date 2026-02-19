
import React, { useState, useEffect } from 'react';
import { fetchPrayerTimes } from '../services/prayerService';
import { BANGLADESH_DISTRICTS } from '../constants';
import { PrayerTimes as PrayerTimesType } from '../types';
import { MapPin, Bell, Search, Info } from 'lucide-react';
import AdBanner from '../components/AdBanner';

const PrayerTimes: React.FC = () => {
  const [district, setDistrict] = useState("Dhaka");
  const [times, setTimes] = useState<PrayerTimesType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchPrayerTimes(district);
        setTimes(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [district]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Prayer Times</h1>
          <p className="text-slate-500">Check precise Salah, Iftar & Sehri times for your location.</p>
        </div>
        
        <div className="flex items-center space-x-2 bg-white p-2 rounded-2xl shadow-sm border border-emerald-100">
          <MapPin size={18} className="text-emerald-500 ml-2" />
          <select 
            className="bg-transparent border-none focus:ring-0 text-sm font-bold py-1 pr-8"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          >
            {BANGLADESH_DISTRICTS.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-100 h-96 rounded-3xl animate-pulse"></div>
          <div className="bg-slate-100 h-96 rounded-3xl animate-pulse"></div>
        </div>
      ) : (
        <>
          {/* Main Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-emerald-700 rounded-3xl p-8 text-white relative overflow-hidden flex flex-col justify-center min-h-[300px]">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2 text-emerald-200 uppercase text-xs font-bold tracking-widest">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  Up Next: Asr Prayer
                </div>
                <div className="text-6xl font-bold mb-4">{times?.Asr}</div>
                <p className="text-emerald-100/80 mb-8 max-w-sm">"Success is only by the help of Allah. Maintain your prayers and your standing before Him."</p>
                <button className="bg-white text-emerald-700 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-emerald-50 transition-colors">
                  <Bell size={18} /> Notify Me
                </button>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-emerald-600/30 to-transparent pointer-events-none"></div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-emerald-100 flex flex-col items-center justify-center space-y-4">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                <Info size={32} />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg mb-1">Time Alert</h3>
                <p className="text-slate-500 text-sm">Prayer times are calculated based on local sunrise and sunset timings for {district}.</p>
              </div>
            </div>
          </div>

          {/* Ad Slot */}
          <AdBanner id="PRAYER_TIMES_AD_KEY" format="banner" />

          {/* List View */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-emerald-100">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {[
                { label: 'Fajr', time: times?.Fajr, sub: 'Sehri Ends' },
                { label: 'Sunrise', time: times?.Sunrise, sub: 'Ishrak' },
                { label: 'Dhuhr', time: times?.Dhuhr, sub: 'Midday' },
                { label: 'Asr', time: times?.Asr, sub: 'Afternoon' },
                { label: 'Maghrib', time: times?.Maghrib, sub: 'Iftar' },
                { label: 'Isha', time: times?.Isha, sub: 'Night' },
                { label: 'Tahajjud', time: '02:30', sub: 'Last 1/3' },
              ].map((p, i) => (
                <div key={i} className="flex flex-col items-center p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 hover:border-emerald-300 transition-all cursor-pointer">
                  <span className="text-xs font-bold text-emerald-700 uppercase mb-2">{p.label}</span>
                  <span className="text-xl font-black text-slate-800 mb-1">{p.time}</span>
                  <span className="text-[10px] text-slate-400 font-medium">{p.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PrayerTimes;
