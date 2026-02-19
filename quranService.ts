
import { Surah, Ayah } from '../types';

const BASE_URL = 'https://api.alquran.cloud/v1';

export const fetchSurahList = async (): Promise<Surah[]> => {
  try {
    const response = await fetch(`${BASE_URL}/surah`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Quran API Error (List):", error);
    return [];
  }
};

export const fetchSurahDetail = async (number: number): Promise<Surah | null> => {
  try {
    // Fetch Arabic (Uthmani) and Bengali translations in one call
    const response = await fetch(`${BASE_URL}/surah/${number}/editions/quran-uthmani,bn.bengali`);
    const data = await response.json();
    
    const arabicEdition = data.data[0];
    const bengaliEdition = data.data[1];

    const ayahs: Ayah[] = arabicEdition.ayahs.map((ayah: any, index: number) => ({
      ...ayah,
      translation: bengaliEdition.ayahs[index].text
    }));

    return {
      ...arabicEdition,
      ayahs
    };
  } catch (error) {
    console.error("Quran API Error (Detail):", error);
    return null;
  }
};

export const getJuzDetails = (juzNumber: number) => {
  // Static helper since Juz structure is fixed
  return {
    number: juzNumber,
    name: `Juz ${juzNumber}`,
  };
};
