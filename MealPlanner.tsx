
import React, { useState } from 'react';
import { getHealthyMealPlan } from '../services/geminiService';
// Added missing Sun and Moon icons to fix 'Cannot find name' errors on lines 87 and 97
import { UtensilsCrossed, Sparkles, Zap, Droplets, Apple, Smile, ArrowRight, Info, Sun, Moon } from 'lucide-react';
import AdBanner from '../components/AdBanner';

const MealPlanner: React.FC = () => {
  const [goal, setGoal] = useState('High Energy');
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<any>(null);

  const goals = [
    { id: 'High Energy', icon: Zap, color: 'bg-amber-50 text-amber-600 border-amber-100' },
    { id: 'Max Hydration', icon: Droplets, color: 'bg-blue-50 text-blue-600 border-blue-100' },
    { id: 'Weight Management', icon: Apple, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { id: 'Light & Healthy', icon: Smile, color: 'bg-pink-50 text-pink-600 border-pink-100' }
  ];

  const generatePlan = async () => {
    setLoading(true);
    const result = await getHealthyMealPlan(goal);
    setPlan(result);
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700 pb-20">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <Sparkles size={14} className="fill-emerald-700" /> AI-Powered Nutrition
        </div>
        <h1 className="text-4xl font-black text-slate-800 tracking-tight">Ramadan Meal Planner</h1>
        <p className="text-slate-500 text-lg">Personalized Suhoor & Iftar suggestions for a healthier, more spiritual fast.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Goal Selector */}
        <div className="lg:col-span-1 space-y-6">
          <h3 className="font-bold text-slate-700 px-2 uppercase text-xs tracking-widest">Select Your Goal</h3>
          <div className="grid grid-cols-1 gap-3">
            {goals.map((g) => (
              <button
                key={g.id}
                onClick={() => setGoal(g.id)}
                className={`flex items-center gap-4 p-5 rounded-3xl border-2 transition-all ${
                  goal === g.id 
                  ? 'bg-white border-emerald-600 shadow-lg shadow-emerald-100 ring-4 ring-emerald-50' 
                  : 'bg-white border-slate-100 hover:border-emerald-200 opacity-80'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${g.color}`}>
                  <g.icon size={24} />
                </div>
                <span className="font-bold text-sm text-left leading-tight">{g.id}</span>
              </button>
            ))}
          </div>
          
          <button 
            onClick={generatePlan}
            disabled={loading}
            className="w-full bg-emerald-700 text-white py-5 rounded-[2rem] font-black shadow-xl shadow-emerald-900/20 hover:bg-emerald-800 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Crafting Plan...
              </>
            ) : (
              <>
                <UtensilsCrossed size={20} />
                Generate My Plan
              </>
            )}
          </button>
        </div>

        {/* Plan Result */}
        <div className="lg:col-span-3">
          {plan ? (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-[3rem] border border-emerald-100 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[4rem] -mr-8 -mt-8 transition-all group-hover:scale-110"></div>
                  <div className="relative">
                    <div className="flex items-center gap-2 text-emerald-600 mb-6 uppercase text-[10px] font-black tracking-widest">
                      <Sun size={14} /> Suhoor Recommendation
                    </div>
                    <p className="text-xl font-bold text-slate-800 leading-relaxed mb-4">{plan.suhoor}</p>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-[3rem] border border-emerald-100 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-[4rem] -mr-8 -mt-8 transition-all group-hover:scale-110"></div>
                  <div className="relative">
                    <div className="flex items-center gap-2 text-amber-600 mb-6 uppercase text-[10px] font-black tracking-widest">
                      <Moon size={14} /> Iftar Recommendation
                    </div>
                    <p className="text-xl font-bold text-slate-800 leading-relaxed mb-4">{plan.iftar}</p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 p-8 rounded-[2.5rem] border border-emerald-100 flex items-start gap-6">
                <div className="p-4 bg-white rounded-2xl text-emerald-600 shadow-sm">
                  <Info size={24} />
                </div>
                <div>
                  <h4 className="font-black text-emerald-800 uppercase text-xs tracking-widest mb-2">Nutritional Benefit</h4>
                  <p className="text-emerald-700 leading-relaxed font-medium">{plan.healthBenefit}</p>
                </div>
              </div>

              {/* Sidebar Ad in results */}
              <AdBanner id="YOUR_ADSTERRA_SIDEBAR_KEY" format="native" />
            </div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-white rounded-[3rem] border-2 border-dashed border-emerald-100 text-slate-400 p-12 text-center">
              <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                <UtensilsCrossed size={40} className="text-emerald-200" />
              </div>
              <h3 className="text-xl font-bold text-slate-600 mb-2">Ready to plan your nutrition?</h3>
              <p className="max-w-xs mx-auto">Select a goal from the left and let AI suggest a balanced meal plan for your fast.</p>
              <div className="mt-8">
                <AdBanner id="YOUR_ADSTERRA_PLACEHOLDER_KEY" format="banner" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealPlanner;
