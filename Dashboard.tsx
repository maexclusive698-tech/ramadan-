
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Flame, Star, Book, CheckCircle2, Bookmark, Play } from 'lucide-react';
import AdBanner from '../components/AdBanner';

const data = [
  { name: 'Mon', completion: 80 },
  { name: 'Tue', completion: 95 },
  { name: 'Wed', completion: 70 },
  { name: 'Thu', completion: 90 },
  { name: 'Fri', completion: 100 },
  { name: 'Sat', completion: 85 },
  { name: 'Sun', completion: 60 },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [salah, setSalah] = useState({
    fajr: true, dhuhr: true, asr: false, maghrib: false, isha: false
  });
  const [completedJuzCount, setCompletedJuzCount] = useState(0);
  const [lastBookmark, setLastBookmark] = useState<any>(null);

  useEffect(() => {
    const juz = localStorage.getItem('quran_juz_progress');
    if (juz) setCompletedJuzCount(JSON.parse(juz).length);
    
    const bookmarks = localStorage.getItem('quran_bookmarks');
    if (bookmarks) {
      const bList = JSON.parse(bookmarks);
      if (bList.length > 0) setLastBookmark(bList[0]);
    }
  }, []);

  const toggleSalah = (name: keyof typeof salah) => {
    setSalah(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const quranProgress = Math.round((completedJuzCount / 30) * 100);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Assalamu Alaikum, Brother!</h1>
          <p className="text-slate-500 font-medium">May Allah accept your good deeds today.</p>
        </div>
        <div className="flex items-center space-x-2 bg-orange-100 px-5 py-2.5 rounded-3xl text-orange-700 shadow-sm border border-orange-200">
          <Flame size={20} className="fill-orange-500 animate-pulse" />
          <span className="font-black text-sm uppercase tracking-wider">12 Day Streak</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Actions / Resume */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-emerald-600 p-6 rounded-[2.5rem] text-white shadow-xl shadow-emerald-900/10 flex items-center justify-between group">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Last Read</p>
                <h4 className="font-bold text-xl">{lastBookmark ? lastBookmark.surahName : 'Start Reading'}</h4>
                <p className="text-xs opacity-80">{lastBookmark ? `Ayah ${lastBookmark.ayahNumber}` : 'Surah Al-Fatihah'}</p>
              </div>
              <button 
                onClick={() => navigate('/quran-reader')}
                className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center hover:bg-white/40 transition-all group-hover:scale-110"
              >
                <Play size={24} fill="currentColor" />
              </button>
            </div>
            <div className="bg-white p-6 rounded-[2.5rem] border border-emerald-100 shadow-sm flex items-center justify-between group">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Quran Khatam</p>
                <h4 className="font-black text-xl text-emerald-600">{completedJuzCount} Juz Done</h4>
                <div className="w-24 h-1.5 bg-emerald-50 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${quranProgress}%` }} />
                </div>
              </div>
              <button 
                onClick={() => navigate('/quran-plan')}
                className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 hover:bg-emerald-100 transition-all group-hover:scale-110"
              >
                <Star size={24} fill="currentColor" />
              </button>
            </div>
          </div>

          {/* Salah Checklist */}
          <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-emerald-100">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-800">Daily Salah Tracker</h3>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Today</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {Object.entries(salah).map(([name, done]) => (
                <button 
                  key={name}
                  onClick={() => toggleSalah(name as any)}
                  className={`flex flex-col items-center justify-center p-6 rounded-[2rem] border-2 transition-all duration-300 group ${
                    done 
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-xl shadow-emerald-100' 
                    : 'bg-white border-emerald-50 text-slate-300 hover:border-emerald-200 hover:text-emerald-400'
                  }`}
                >
                  <span className={`text-[10px] font-black uppercase mb-3 ${done ? 'opacity-60' : ''}`}>{name}</span>
                  <div className={`p-2 rounded-2xl ${done ? 'bg-white/20' : 'bg-slate-50 group-hover:bg-emerald-50'}`}>
                    <CheckCircle2 size={28} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Analytics Chart */}
          <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-emerald-100">
            <h3 className="text-xl font-black text-slate-800 mb-8">Spiritual Consistency</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}}
                  />
                  <Bar dataKey="completion" radius={[12, 12, 0, 0]} barSize={45}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.completion >= 80 ? '#059669' : '#10b981'} fillOpacity={0.8} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Quick Bookmarks */}
          <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-emerald-100">
            <h4 className="font-black text-slate-800 mb-6 flex items-center gap-3">
              <Bookmark size={20} className="text-emerald-500" /> Bookmarks
            </h4>
            <div className="space-y-4">
              {lastBookmark ? (
                <div 
                  onClick={() => navigate('/quran-reader')}
                  className="p-5 bg-emerald-50 rounded-3xl border border-emerald-100 cursor-pointer hover:bg-emerald-100 transition-all group"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-bold text-slate-800">{lastBookmark.surahName}</p>
                      <p className="text-xs text-slate-500">Ayah {lastBookmark.ayahNumber}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                      <Play size={12} fill="currentColor" />
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-400 text-center py-4">No bookmarks yet</p>
              )}
            </div>
          </div>

          {/* Ad Slot in Dashboard Sidebar */}
          <AdBanner id="DASHBOARD_SIDEBAR_AD" format="native" />

          <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-emerald-100">
            <h4 className="font-black text-slate-800 mb-8">Ramadan Milestones</h4>
            <div className="space-y-6">
              {[
                { title: 'First Fast', date: 'March 11', completed: true },
                { title: 'Finish 1st Quran Juz', date: 'March 12', completed: completedJuzCount >= 1 },
                { title: 'Tahajjud Regularity', date: 'Ongoing', completed: false },
                { title: 'Zakat Fulfilled', date: 'March 25', completed: false },
              ].map((m, i) => (
                <div key={i} className="flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${m.completed ? 'bg-emerald-100 text-emerald-600 shadow-md shadow-emerald-200' : 'bg-slate-50 text-slate-200'}`}>
                    <Star size={18} fill={m.completed ? 'currentColor' : 'none'} />
                  </div>
                  <div>
                    <p className={`text-sm font-black ${m.completed ? 'text-slate-800' : 'text-slate-300'}`}>{m.title}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{m.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
