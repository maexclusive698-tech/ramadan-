
import React, { useState, useEffect } from 'react';
import { Heart, RotateCcw, Plus, BookOpen, Volume2 } from 'lucide-react';

const DUAS = [
  {
    title: 'Dua for Fasting (Niyyah)',
    arabic: 'نَوَيْتُ اَنْ اَصُوْمَ غَدًا مِّنْ شَهْرِ رَمَضَانَ الْمُبَارَكِ فَرْضًا لَكَ يَا اللهُ تَعَالَى',
    bengali: 'আমি আল্লাহর সন্তুষ্টির জন্য আগামীকালের রমজানের ফরয রোজা রাখার নিয়ত করছি।',
    transliteration: 'Nawaitu an asuma ghadan min shahri ramadanal mubarak fardhal laka ya Allahu ta’ala.'
  },
  {
    title: 'Dua for Breaking Fast (Iftar)',
    arabic: 'اَللَّهُمَّ لَكَ صُمْتُ وَعَلَى رِزْقِكَ اَفْطَرْتُ',
    bengali: 'হে আল্লাহ! আমি তোমার জন্যই রোজা রেখেছি এবং তোমার দেয়া রিজিক দিয়েই ইফতার করছি।',
    transliteration: 'Allahumma laka sumtu wa ala rizqika aftartu.'
  },
  {
    title: 'Taraweeh Dua',
    arabic: 'سُبْحانَ ذِي الْمُلْكِ وَالْمَلَكُوتِ، سُبْحانَ ذِي الْعِزَّةِ وَالْعَظَمَةِ وَالْهَيْبَةِ وَالْقُدْرَةِ وَالْكِبْرِيَاءِ وَالْجَبَرُوتِ',
    bengali: 'পবিত্র সেই সত্তা যিনি রাজত্ব ও মালকুয়াতের অধিকারী। পবিত্র সেই সত্তা যিনি ইজ্জত, মহিমা, ভয়, ক্ষমতা ও গাম্ভীর্যের অধিকারী।',
    transliteration: 'Subhana zil mulki wal malakuti...'
  }
];

const DuaDhikr: React.FC = () => {
  const [count, setCount] = useState(0);
  const [activeDua, setActiveDua] = useState(0);

  useEffect(() => {
    const savedCount = localStorage.getItem('tasbih_count');
    if (savedCount) setCount(parseInt(savedCount));
  }, []);

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    localStorage.setItem('tasbih_count', newCount.toString());
    
    // Simple haptic feedback simulation
    if (window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
  };

  const resetCount = () => {
    if (window.confirm('Reset counter to zero?')) {
      setCount(0);
      localStorage.setItem('tasbih_count', '0');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Dua & Dhikr</h1>
          <p className="text-slate-500 font-medium">Keep your heart moist with the remembrance of Allah.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Digital Tasbih */}
        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-emerald-100 flex flex-col items-center justify-center space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-sm font-black uppercase tracking-widest text-emerald-600">Digital Tasbih</h3>
            <p className="text-slate-400 text-xs">Tap anywhere on the counter to increase</p>
          </div>

          <button 
            onClick={handleIncrement}
            className="w-64 h-64 bg-emerald-50 rounded-full border-8 border-white shadow-2xl shadow-emerald-200 flex flex-col items-center justify-center relative active:scale-95 transition-all group overflow-hidden"
          >
            <div className="absolute inset-0 bg-emerald-600 opacity-0 group-active:opacity-10 transition-opacity"></div>
            <span className="text-6xl font-black text-emerald-700">{count}</span>
            <Plus className="text-emerald-300 mt-2" size={32} />
          </button>

          <div className="flex gap-4">
            <button 
              onClick={resetCount}
              className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-colors"
            >
              <RotateCcw size={24} />
            </button>
            <button className="flex-1 px-8 py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all">
              Save Session
            </button>
          </div>
        </div>

        {/* Ramadan Duas */}
        <div className="space-y-6">
          <div className="bg-emerald-700 rounded-[3rem] p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <BookOpen size={24} /> Essential Ramadan Duas
              </h3>
              <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                {DUAS.map((dua, i) => (
                  <button 
                    key={i}
                    onClick={() => setActiveDua(i)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      activeDua === i ? 'bg-white text-emerald-700' : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    Dua {i + 1}
                  </button>
                ))}
              </div>
              
              <div className="space-y-6">
                <p className="text-3xl font-islamic text-right leading-relaxed" dir="rtl">
                  {DUAS[activeDua].arabic}
                </p>
                <div className="h-px bg-white/20 w-full"></div>
                <div>
                  <p className="text-sm font-bold text-emerald-200 mb-2 uppercase tracking-tighter">Translation</p>
                  <p className="text-lg font-medium leading-relaxed italic">
                    "{DUAS[activeDua].bengali}"
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-20 -right-20 p-4 opacity-5">
              <Heart size={300} fill="currentColor" />
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-emerald-50">
            <h4 className="font-bold text-slate-800 mb-4">Dhikr Benefits</h4>
            <ul className="space-y-3">
              {[
                'Expels Satan and weakens him.',
                'Pleasant to the Most Merciful.',
                'Removes the worries and anxieties of the heart.',
                'Illuminates the heart and the face.'
              ].map((benefit, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-500">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0"></div>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DuaDhikr;
