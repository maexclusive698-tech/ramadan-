
import React, { useState, useEffect } from 'react';
import { BookOpen, Trophy, ScrollText, Check, Star, Zap } from 'lucide-react';

const QuranPlan: React.FC = () => {
  const [completedJuz, setCompletedJuz] = useState<number[]>([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('quran_juz_progress');
    if (saved) setCompletedJuz(JSON.parse(saved));
    
    const savedStreak = localStorage.getItem('quran_streak');
    if (savedStreak) setStreak(Number(savedStreak));
  }, []);

  const toggleJuz = (juz: number) => {
    const isNowDone = !completedJuz.includes(juz);
    const updated = isNowDone 
      ? [...completedJuz, juz].sort((a, b) => a - b) 
      : completedJuz.filter(j => j !== juz);
    
    setCompletedJuz(updated);
    localStorage.setItem('quran_juz_progress', JSON.stringify(updated));
    
    // Simple streak logic for demo
    if (isNowDone) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      localStorage.setItem('quran_streak', newStreak.toString());
    }
  };

  const progress = Math.round((completedJuz.length / 30) * 100);

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-emerald-700 rounded-[3rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-emerald-900/20">
            <div className="relative z-10">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-2 mb-6">
                <Star size={12} fill="currentColor" /> Ramadan Khatam Tracker
              </div>
              <h2 className="text-3xl font-black mb-4">Your Spiritual Journey</h2>
              <p className="text-emerald-100 text-sm mb-10 opacity-90 leading-relaxed">
                Reading one Juz daily ensures you finish the whole Quran in 30 days. Stay committed!
              </p>
              
              <div className="space-y-3 mb-10">
                <div className="flex justify-between text-xs font-black uppercase tracking-widest opacity-70">
                  <span>Completion Status</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-4 bg-white/10 rounded-full overflow-hidden p-1">
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-1000" 
                    style={{ width: `${progress}%` }} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm p-5 rounded-3xl border border-white/10">
                  <p className="text-[10px] uppercase font-black opacity-60 mb-1">Juz Done</p>
                  <p className="text-3xl font-black">{completedJuz.length}<span className="text-sm font-normal opacity-40">/30</span></p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-5 rounded-3xl border border-white/10">
                  <p className="text-[10px] uppercase font-black opacity-60 mb-1">Streak</p>
                  <p className="text-3xl font-black flex items-center gap-2">
                    {streak} <Zap size={20} className="text-amber-400 fill-amber-400" />
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 p-4 opacity-10">
              <ScrollText size={280} />
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-emerald-50">
            <h3 className="font-bold text-slate-800 mb-8 flex items-center gap-3">
              <Trophy size={24} className="text-amber-500" /> Rewards & Badges
            </h3>
            <div className="space-y-6">
              {[
                { label: 'Beginner', target: 1, desc: 'Finished your first Juz' },
                { label: 'Steadfast', target: 10, desc: 'One third of the way!' },
                { label: 'Devoted', target: 20, desc: 'Almost there, keep going!' },
                { label: 'Hafiz Aspirant', target: 30, desc: 'Khatam Complete!' },
              ].map(m => (
                <div key={m.target} className="flex items-center gap-5 group">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${completedJuz.length >= m.target ? 'bg-emerald-100 text-emerald-600 scale-110 shadow-lg shadow-emerald-200' : 'bg-slate-50 text-slate-200'}`}>
                    <Star size={24} fill={completedJuz.length >= m.target ? 'currentColor' : 'none'} />
                  </div>
                  <div>
                    <p className={`font-bold text-lg ${completedJuz.length >= m.target ? 'text-slate-800' : 'text-slate-400'}`}>{m.label}</p>
                    <p className="text-xs text-slate-400 font-medium">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-emerald-50">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-xl text-slate-800">30 Juz Grid</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Click to mark as done</p>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {Array.from({ length: 30 }, (_, i) => i + 1).map((juz) => {
                const isDone = completedJuz.includes(juz);
                return (
                  <button
                    key={juz}
                    onClick={() => toggleJuz(juz)}
                    className={`relative p-6 rounded-[2rem] border-2 transition-all duration-300 flex flex-col items-center text-center group ${
                      isDone 
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-xl shadow-emerald-200' 
                      : 'bg-white border-slate-100 text-slate-500 hover:border-emerald-300 hover:scale-[1.05]'
                    }`}
                  >
                    <span className="text-[10px] font-black uppercase mb-1 opacity-60">Juz</span>
                    <span className="text-3xl font-black mb-2">{juz}</span>
                    <div className={`h-1.5 w-8 rounded-full ${isDone ? 'bg-white/40' : 'bg-emerald-50'}`} />
                    
                    {isDone && (
                      <div className="absolute -top-3 -right-3 bg-white text-emerald-600 p-2 rounded-2xl shadow-xl border border-emerald-50 animate-bounce">
                        <Check size={16} strokeWidth={4} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuranPlan;
