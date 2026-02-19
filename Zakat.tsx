
import React, { useState, useMemo } from 'react';
import { GOLD_PRICE_PER_GRAM_BDT, SILVER_PRICE_PER_GRAM_BDT } from '../constants';
import { Calculator, Wallet, Coins, Briefcase, MinusCircle, CheckCircle } from 'lucide-react';
import AdBanner from '../components/AdBanner';

const Zakat: React.FC = () => {
  const [inputs, setInputs] = useState({
    gold: 0,
    silver: 0,
    cash: 0,
    business: 0,
    debts: 0
  });

  const calculation = useMemo(() => {
    const goldVal = (inputs.gold || 0) * (GOLD_PRICE_PER_GRAM_BDT || 0);
    const silverVal = (inputs.silver || 0) * (SILVER_PRICE_PER_GRAM_BDT || 0);
    const assets = goldVal + silverVal + (inputs.cash || 0) + (inputs.business || 0);
    const netAssets = Math.max(0, assets - (inputs.debts || 0));
    const zakatDue = netAssets * 0.025;
    
    return {
      assets,
      netAssets,
      zakatDue
    };
  }, [inputs]);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Zakat Calculator</h1>
          <p className="text-slate-500">Fulfill your obligation with precise calculations.</p>
        </div>
        <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-2xl text-xs font-bold border border-emerald-100">
          Nisab (Silver): ৳ 82,500
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-emerald-100 space-y-6">
          <div className="space-y-4">
            <h3 className="font-bold text-emerald-700 flex items-center gap-2">
              <Coins size={18} /> Personal Assets
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400">Gold (Grams)</label>
                <input 
                  type="number" 
                  className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-500" 
                  placeholder="0.00"
                  onChange={(e) => setInputs(p => ({...p, gold: Number(e.target.value) || 0}))}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400">Silver (Grams)</label>
                <input 
                  type="number" 
                  className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-500" 
                  placeholder="0.00"
                  onChange={(e) => setInputs(p => ({...p, silver: Number(e.target.value) || 0}))}
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400">Cash in Bank & Hand (BDT)</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-slate-400">৳</span>
                <input 
                  type="number" 
                  className="w-full bg-slate-50 border-none rounded-xl p-3 pl-8 text-sm focus:ring-2 focus:ring-emerald-500" 
                  placeholder="0.00"
                  onChange={(e) => setInputs(p => ({...p, cash: Number(e.target.value) || 0}))}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-emerald-700 flex items-center gap-2">
              <Briefcase size={18} /> Business & Debts
            </h3>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400">Business Assets (Stock/Value)</label>
              <input 
                type="number" 
                className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-500" 
                placeholder="0.00"
                onChange={(e) => setInputs(p => ({...p, business: Number(e.target.value) || 0}))}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 text-red-400">Deductible Debts / Liabilities</label>
              <input 
                type="number" 
                className="w-full bg-red-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-red-500" 
                placeholder="0.00"
                onChange={(e) => setInputs(p => ({...p, debts: Number(e.target.value) || 0}))}
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="bg-emerald-700 p-8 rounded-3xl text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg font-bold opacity-80 mb-2">Total Zakat Due</h3>
              <div className="text-5xl font-black mb-4 tracking-tight">৳ {(calculation?.zakatDue || 0).toLocaleString()}</div>
              <p className="text-emerald-100 text-sm mb-8 leading-relaxed italic">
                "Take from their wealth a charity by which you purify them and cause them increase." (At-Tawbah 9:103)
              </p>
              <button className="bg-white text-emerald-700 w-full py-4 rounded-2xl font-black hover:bg-emerald-50 transition-all shadow-xl shadow-emerald-900/20">
                Proceed to Pay Zakat
              </button>
            </div>
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Calculator size={140} />
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-emerald-100">
            <h4 className="font-bold text-slate-800 mb-6">Breakdown</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 flex items-center gap-2"><Wallet size={14} /> Total Gross Assets</span>
                <span className="font-bold">৳ {(calculation?.assets || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-red-400 flex items-center gap-2"><MinusCircle size={14} /> Total Debts</span>
                <span className="font-bold text-red-500">- ৳ {(inputs?.debts || 0).toLocaleString()}</span>
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-slate-800 font-bold flex items-center gap-2"><CheckCircle size={16} className="text-emerald-500" /> Net Assets</span>
                <span className="font-black text-emerald-600 text-lg">৳ {(calculation?.netAssets || 0).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Ad Slot */}
          <AdBanner id="ZAKAT_PAGE_AD_KEY" format="native" />
        </div>
      </div>
    </div>
  );
};

export default Zakat;
