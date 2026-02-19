
import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Clock, 
  LayoutDashboard, 
  Calculator, 
  BookOpen, 
  Menu,
  X,
  Moon,
  Book,
  UtensilsCrossed,
  Heart,
  Search,
  Languages
} from 'lucide-react';
import { LanguageContext } from '../App';
import { TRANSLATIONS } from '../constants';

interface SidebarItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon: Icon, label, active }) => (
  <Link 
    to={to} 
    className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${
      active 
      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
      : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </Link>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { lang, setLang } = useContext(LanguageContext);
  const location = useLocation();
  const t = TRANSLATIONS[lang];

  const navItems = [
    { to: '/', icon: Home, label: t.home },
    { to: '/prayer-times', icon: Clock, label: t.prayerTimes },
    { to: '/dashboard', icon: LayoutDashboard, label: t.dashboard },
    { to: '/quran-reader', icon: Book, label: t.quranReader },
    { to: '/quran-plan', icon: BookOpen, label: t.khatamPlan },
    { to: '/dua-dhikr', icon: Heart, label: t.duaDhikr },
    { to: '/meal-planner', icon: UtensilsCrossed, label: t.mealPlanner },
    { to: '/zakat', icon: Calculator, label: t.zakat },
  ];

  return (
    <div className="min-h-screen flex bg-emerald-50">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-emerald-100 p-6 space-y-8 sticky top-0 h-screen">
        <div className="flex items-center space-x-2 text-emerald-700">
          <Moon className="fill-emerald-600" size={32} />
          <h1 className="text-xl font-bold tracking-tight text-emerald-800">Ramadan BD</h1>
        </div>
        
        <nav className="flex-1 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <SidebarItem 
              key={item.to} 
              {...item} 
              active={location.pathname === item.to} 
            />
          ))}
        </nav>

        <div className="bg-emerald-600 p-4 rounded-2xl text-white">
          <p className="text-xs font-medium opacity-80 mb-1">Ramadan BD</p>
          <p className="text-sm font-bold mb-3">{t.supportApp}</p>
          <button className="bg-white text-emerald-700 w-full py-2 rounded-lg font-bold text-xs hover:bg-emerald-50 transition-colors">
            Support
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <aside className={`lg:hidden fixed inset-y-0 left-0 w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-2 text-emerald-700">
              <Moon className="fill-emerald-600" size={28} />
              <h1 className="text-lg font-bold">Ramadan BD</h1>
            </div>
            <button onClick={() => setIsSidebarOpen(false)}>
              <X size={24} className="text-slate-500" />
            </button>
          </div>
          <nav className="flex-1 space-y-2 overflow-y-auto">
            {navItems.map((item) => (
              <SidebarItem key={item.to} {...item} active={location.pathname === item.to} />
            ))}
          </nav>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <header className="bg-white border-b border-emerald-100 h-16 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
          <button className="lg:hidden p-2 text-slate-600 rounded-lg" onClick={() => setIsSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          
          <div className="flex-1 px-4 max-w-xl hidden md:block">
            <div className="relative">
              <input type="text" placeholder="Search..." className="w-full bg-slate-100 border-none rounded-full py-2 px-10 text-sm focus:ring-2 focus:ring-emerald-500" />
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Language Toggle Button */}
            <button 
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-100 hover:bg-emerald-100 transition-colors"
            >
              <Languages size={14} />
              <span>{lang === 'en' ? 'বাংলা' : 'English'}</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs">R</div>
          </div>
        </header>

        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
