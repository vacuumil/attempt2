import { useState, useEffect } from 'react';

export const useIntersectionObserver = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const options = {
      threshold: 0.5,
      rootMargin: '-100px 0px -50% 0px'
    };

    sectionIds.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (!element) {
        console.warn(`Элемент с ID "${sectionId}" не найден`);
        return;
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(sectionId);
          }
        });
      }, options);

      observer.observe(element);
      observers.push(observer);
    });

    // Очистка при размонтировании компонента
    return () => {
      observers.forEach(observer => {
        observer.disconnect();
      });
    };
  }, [sectionIds]); // Зависимость от переданных ID

  return activeSection;
};