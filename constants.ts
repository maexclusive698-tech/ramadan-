
export const BANGLADESH_DISTRICTS = [
  "Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barisal", "Rangpur", "Mymensingh",
  "Gazipur", "Narayanganj", "Comilla", "Brahmanbaria", "Feni", "Noakhali", "Chandpur", "Lakshmipur",
  "Cox's Bazar", "Bandarban", "Rangamati", "Khagrachhari"
];

export const TRANSLATIONS: Record<string, any> = {
  en: {
    home: "Home",
    prayerTimes: "Prayer Times",
    dashboard: "Dashboard",
    quranReader: "Quran Reader",
    khatamPlan: "Khatam Plan",
    duaDhikr: "Dua & Dhikr",
    mealPlanner: "Meal Planner",
    zakat: "Zakat",
    sehriEnds: "Sehri Ends",
    iftarTime: "Iftar Time",
    dailyPrayers: "Daily Prayers",
    ramadanKareem: "Ramadan Kareem",
    supportApp: "Support App"
  },
  bn: {
    home: "হোম",
    prayerTimes: "নামাজের সময়",
    dashboard: "ড্যাশবোর্ড",
    quranReader: "কুরআন মাজীদ",
    khatamPlan: "খতম প্ল্যান",
    duaDhikr: "দুয়া ও জিকির",
    mealPlanner: "খাবার পরিকল্পনা",
    zakat: "যাকাত ক্যালকুলেটর",
    sehriEnds: "সেহরি শেষ",
    iftarTime: "ইফতারের সময়",
    dailyPrayers: "দৈনিক নামাজ",
    ramadanKareem: "রমজান কারীম",
    supportApp: "অ্যাপ সমর্থন করুন"
  },
  hi: {
    home: "Ghar (Home)",
    prayerTimes: "Namaz ka Time",
    dashboard: "Dashboard",
    quranReader: "Quran Padhein",
    khatamPlan: "Khatam Plan",
    duaDhikr: "Dua aur Dhikr",
    mealPlanner: "Khane ka Plan",
    zakat: "Zakat Calculator",
    sehriEnds: "Sehri khatam",
    iftarTime: "Iftar ka waqt",
    dailyPrayers: "Rozana ki Namaz",
    ramadanKareem: "Ramadan Mubarak",
    supportApp: "App ko support karein"
  }
};

export const QURAN_30_DAY_PLAN = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  juz: `Juz ${i + 1}`,
  pages