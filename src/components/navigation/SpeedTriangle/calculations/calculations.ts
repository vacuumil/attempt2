export const toRad = (deg: number): number => (deg * Math.PI) / 180;
export const toDeg = (rad: number): number => (rad * 180) / Math.PI;

export const meteoToNavDirection = (meteoDirection: number): number => {
  return (meteoDirection + 180) % 360;
};

export const navToMeteoDirection = (navDirection: number): number => {
  return (navDirection + 180) % 360;
};

export const calculateWindCorrectionAngle = (
  tas: number,
  windSpeed: number,
  windDirection: number, // Метеорологическое направление
  trueCourse: number,
  isMeteoWind: boolean = true // По умолчанию используем метеорологическое направление
): number => {
  if (windSpeed === 0) return 0;

  // Если ветер задан в метеорологическом формате, преобразуем в навигационный
  const navWindDirection = isMeteoWind ? meteoToNavDirection(windDirection) : windDirection;
  
  const windAngleRad = toRad(navWindDirection - trueCourse);
  const numerator = windSpeed * Math.sin(windAngleRad);
  const denominator = tas + windSpeed * Math.cos(windAngleRad);
  
  const wcaRad = Math.atan2(numerator, denominator);
  return toDeg(wcaRad);
};

export const calculateGroundspeed = (
  tas: number,
  windSpeed: number,
  windDirection: number,
  trueCourse: number,
  isMeteoWind: boolean = true
): number => {
  if (windSpeed === 0) return tas;

  const navWindDirection = isMeteoWind ? meteoToNavDirection(windDirection) : windDirection;
  const courseRad = toRad(trueCourse);
  const windAngleRad = toRad(navWindDirection);

  const tasX = tas * Math.sin(courseRad);
  const tasY = tas * Math.cos(courseRad);

  const windX = windSpeed * Math.sin(windAngleRad);
  const windY = windSpeed * Math.cos(windAngleRad);

  const gsX = tasX + windX;
  const gsY = tasY + windY;

  return Math.sqrt(gsX * gsX + gsY * gsY);
};

export const calculateTrueHeading = (
  trueCourse: number,
  wca: number
): number => {
  let heading = trueCourse + wca;
  
  // Нормализация угла в диапазон 0-360
  while (heading < 0) heading += 360;
  while (heading >= 360) heading -= 360;
  
  return heading;
};