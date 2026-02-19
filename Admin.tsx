
import React from 'react';
import { Users, Layout, Settings, Activity, Calendar, ShieldCheck } from 'lucide-react';

const Admin: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
          <p className="text-slate-500">Manage app settings and monitor user engagement.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { icon: Users, label: 'Total Users', value: '1,245', color: 'bg-blue-50 text-blue-600' },
          { icon: Activity, label: 'Daily Active', value: '840', color: 'bg-emerald-50 text-emerald-600' },
          { icon: Calendar, label: 'Ramadan Day', value: '14', color: 'bg-amber-50 text-amber-600' },
          { icon: ShieldCheck, label: 'System Status', value: 'Stable', color: 'bg-purple-50 text-purple-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">{stat.label}</p>
              <p className="text-xl font-black text-slate-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <Settings size={20} className="text-slate-400" /> App Configuration
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <div>
                <p className="text-sm font-bold text-slate-700">Bengali Language</p>
                <p className="text-xs text-slate-400">Toggle system-wide translation</p>
              </div>
              <div className="w-12 h-6 bg-emerald-500 rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <div>
                <p className="text-sm font-bold text-slate-700">Prayer Notifications</p>
                <p className="text-xs text-slate-400">Push alerts for global users</p>
              </div>
              <div className="w-12 h-6 bg-slate-200 rounded-full relative">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <Layout size={20} className="text-slate-400" /> Recent User Activity
          </h3>
          <div className="space-y-4">
            {[
              { user: 'Ahmed R.', action: 'Completed Quran Juz 5', time: '2m ago' },
              { user: 'Samia K.', action: 'Calculated Zakat', time: '15m ago' },
              { user: 'Tanvir H.', action: 'Joined Ramadan BD', time: '1h ago' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <div>
                  <p className="text-sm font-bold text-slate-700">{activity.user}</p>
                  <p className="text-xs text-slate-400">{activity.action}</p>
                </div>
                <span className="text-[10px] font-bold text-slate-300">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
