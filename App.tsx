
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import PrayerTimes from './pages/PrayerTimes';
import Dashboard from './pages/Dashboard';
import Zakat from './pages/Zakat';
import QuranPlan from './pages/QuranPlan';
import QuranReader from './pages/QuranReader';
import Admin from './pages/Admin';
import DuaDhikr from './pages/DuaDhikr';
import MealPlanner from './pages/MealPlanner';
import AdsterraGlobal from './components/AdsterraGlobal';

// Simple context for language
export const LanguageContext = createContext({
  lang: 'en',
  setLang: (l: string) => {}
});

const App: React.FC = () => {
  const [lang, setLang] = useState(localStorage.getItem('app_lang') || 'en');

  useEffect(() => {
    localStorage.setItem('app_lang', lang);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      <Router>
        {/* Adsterra Global High-Revenue Scripts */}
        <AdsterraGlobal />
        
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/prayer-times" element={<PrayerTimes />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/zakat" element={<Zakat />} />
            <Route path="/quran-plan" element={<QuranPlan />} />
            <Route path="/quran-reader" element={<QuranReader />} />
            <Route path="/dua-dhikr" element={<DuaDhikr />} />
            <Route path="/meal-planner" element={<MealPlanner />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Layout>
      </Router>
    </LanguageContext.Provider>
  );
};

export default App;
