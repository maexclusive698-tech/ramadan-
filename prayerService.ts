
import { PrayerTimes } from '../types';

export const fetchPrayerTimes = async (city: string): Promise<PrayerTimes> => {
  const date = new Date();
  const dateStr = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  
  try {
    const response = await fetch(`https://api.aladhan.com/v1/timingsByAddress/${dateStr}?address=${city},Bangladesh&method=1&tune=0,0,0,0,0,0,0,0,0`);
    const data = await response.json();
    return data.data.timings;
  } catch (error) {
    console.error("Prayer API Error:", error);
    throw error;
  }
};
