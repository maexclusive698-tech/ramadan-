
export interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
}

export interface User {
  uid: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
  isAdmin: boolean;
}

export interface IbadahRecord {
  date: string;
  salah: {
    fajr: boolean;
    dhuhr: boolean;
    asr: boolean;
    maghrib: boolean;
    isha: boolean;
  };
  quranPages: number;
  dhikrCount: number;
  fasting: boolean;
}

export interface ZakatRecord {
  id: string;
  date: string;
  total: number;
  breakdown: any;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  goal: number;
  collected: number;
  image: string;
}

export interface QuranPlanDay {
  day: number;
  juz: string;
  pages: string;
  completed: boolean;
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
  translation?: string;
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  ayahs?: Ayah[];
}

export interface Bookmark {
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  timestamp: number;
}

export interface JuzProgress {
  juzNumber: number;
  completed: boolean;
  completedAt?: number;
}
