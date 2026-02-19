
import React from 'react';
import { INITIAL_CAMPAIGNS } from '../constants';
import { Heart, Target, TrendingUp, ShieldCheck } from 'lucide-react';

const Donation: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <Heart size={14} className="fill-emerald-700" /> Multiplied Rewards
        </div>
        <h1 className="text-4xl font-black text-slate-800">Support Communities in Need</h1>
        <p className="text-slate-500 text-lg">Your small contribution can provide a healthy meal or clean water for a family in Bangladesh this Ramadan.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {INITIAL_CAMPAIGNS.map(campaign => {
          const progress = Math.round(((campaign?.collected || 0) / (campaign?.goal || 1)) * 100);
          return (
            <div key={campaign.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-emerald-50 group hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-500 flex flex-col">
              <div className="h-56 relative overflow-hidden">
                <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl text-[10px] font-black uppercase text-emerald-700 shadow-sm">
                  Ongoing
                </div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-slate-800 mb-3">{campaign.title}</h3>
                <p className="text-slate-500 text-sm line-clamp-2 mb-8">{campaign.description}</p>
                
                <div className="mt-auto space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-end text-sm">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Raised</span>
                        <span className="font-black text-emerald-600">৳ {(campaign?.collected || 0).toLocaleString()}</span>
                      </div>
                      <div className="flex flex-col text-right">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Goal</span>
                        <span className="font-bold text-slate-700">৳ {(campaign?.goal || 0).toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="h-3 bg-emerald-50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-1000" 
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-right font-black text-emerald-700">{progress}% Funded</div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-4">
                    <button className="bg-pink-600 text-white py-3 rounded-2xl font-black text-xs hover:bg-pink-700 transition-all flex items-center justify-center gap-2">
                      <span className="text-sm">b</span> bKash
                    </button>
                    <button className="bg-orange-500 text-white py-3 rounded-2xl font-black text-xs hover:bg-orange-600 transition-all flex items-center justify-center gap-2">
                      Nagad
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust Section */}
      <div className="bg-emerald-50 rounded-[3rem] p-12 grid grid-cols-1 md:grid-cols-3 gap-8 border border-emerald-100">
        {[
          { icon: ShieldCheck, title: 'Verified Charities', desc: 'All campaigns are thoroughly vetted by our board.' },
          { icon: Target, title: 'Direct Impact', desc: '98% of your donation goes directly to the field operations.' },
          { icon: TrendingUp, title: 'Live Progress', desc: 'Watch real-time updates as communities thrive.' }
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100">
              <item.icon size={32} />
            </div>
            <h4 className="font-bold text-lg">{item.title}</h4>
            <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Donation;
