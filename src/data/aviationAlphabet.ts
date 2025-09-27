// src/data/aviationAlphabet.ts
export interface AviationLetter {
  letter: string;
  word: string;
  pronunciation: string;
}

export const aviationAlphabet: AviationLetter[] = [
  { letter: 'A', word: 'Alfa', pronunciation: 'AL-FAH' },
  { letter: 'B', word: 'Bravo', pronunciation: 'BRAH-VOH' },
  { letter: 'C', word: 'Charlie', pronunciation: 'CHAR-LEE' },
  { letter: 'D', word: 'Delta', pronunciation: 'DELL-TAH' },
  { letter: 'E', word: 'Echo', pronunciation: 'ECK-OH' },
  { letter: 'F', word: 'Foxtrot', pronunciation: 'FOKS-TROT' },
  { letter: 'G', word: 'Golf', pronunciation: 'GOLF' },
  { letter: 'H', word: 'Hotel', pronunciation: 'HOH-TEL' },
  { letter: 'I', word: 'India', pronunciation: 'IN-DEE-AH' },
  { letter: 'J', word: 'Juliett', pronunciation: 'JEW-LEE-ETT' },
  { letter: 'K', word: 'Kilo', pronunciation: 'KEY-LOH' },
  { letter: 'L', word: 'Lima', pronunciation: 'LEE-MAH' },
  { letter: 'M', word: 'Mike', pronunciation: 'MIKE' },
  { letter: 'N', word: 'November', pronunciation: 'NO-VEM-BER' },
  { letter: 'O', word: 'Oscar', pronunciation: 'OSS-CAH' },
  { letter: 'P', word: 'Papa', pronunciation: 'PAH-PAH' },
  { letter: 'Q', word: 'Quebec', pronunciation: 'KEH-BECK' },
  { letter: 'R', word: 'Romeo', pronunciation: 'ROW-ME-OH' },
  { letter: 'S', word: 'Sierra', pronunciation: 'SEE-AIR-RAH' },
  { letter: 'T', word: 'Tango', pronunciation: 'TANG-GO' },
  { letter: 'U', word: 'Uniform', pronunciation: 'YOU-NEE-FORM' },
  { letter: 'V', word: 'Victor', pronunciation: 'VIK-TAH' },
  { letter: 'W', word: 'Whiskey', pronunciation: 'WISS-KEY' },
  { letter: 'X', word: 'X-ray', pronunciation: 'ECKS-RAY' },
  { letter: 'Y', word: 'Yankee', pronunciation: 'YANG-KEY' },
  { letter: 'Z', word: 'Zulu', pronunciation: 'ZOO-LOO' }
];

export const getRandomLetters = (count: number = 4): AviationLetter[] => {
  const shuffled = [...aviationAlphabet].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};