import React, { useState, useRef, useCallback, useEffect } from 'react';
import './OBSKnob.css';

interface OBSKnobProps {
  course: number;
  onCourseChange: (course: number) => void;
  currentRadial: number | null;
}

export const OBSKnob: React.FC<OBSKnobProps> = ({ course, onCourseChange}) => {
  const [isDragging, setIsDragging] = useState(false);
  const knobRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef(0);
  const startCourseRef = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;

    const deltaY = startYRef.current - e.clientY;
    const sensitivity = 0.5;
    let newCourse = startCourseRef.current + deltaY * sensitivity;

    newCourse = (newCourse % 360 + 360) % 360;
    onCourseChange(Math.round(newCourse));
  }, [isDragging, onCourseChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    startYRef.current = e.clientY;
    startCourseRef.current = course;
  }, [course]);

  // Добавляем и удаляем глобальные обработчики
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleCourseClick = (change: number) => {
    let newCourse = course + change;
    newCourse = (newCourse % 360 + 360) % 360;
    onCourseChange(newCourse);
  };

  const rotation = (course / 360) * 270;

  return (
    <div className="obs-knob">
      <div className="knob-header">
        <span className="knob-label">OBS KNOB</span>
      </div>
      
      <div className="knob-container">
        <div className="knob-controls">
          <button
            className="course-button increase"
            onClick={() => handleCourseClick(1)}
            title="Увеличить курс на 1°"
          >
            +
          </button>
          
          <div
            ref={knobRef}
            className={`knob ${isDragging ? 'dragging' : ''}`}
            onMouseDown={handleMouseDown}
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <div className="knob-mark"></div>
            <div className="knob-center"></div>
          </div>

          <button
            className="course-button decrease"
            onClick={() => handleCourseClick(-1)}
            title="Уменьшить курс на 1°"
          >
            -
          </button>
        </div>

        {/* Отображение установленного курса и текущего радиала */}
        <div className="course-info">
          <div className="course-set">
            <span className="info-label">Установлено:</span>
            <span className="info-value">{course.toString().padStart(3, '0')}°</span>
          </div>
          
        </div>

        <div className="course-buttons">
          <button
            className="preset-button"
            onClick={() => onCourseChange(0)}
            title="Установить курс 0°"
          >
            0°
          </button>
          <button
            className="preset-button"
            onClick={() => onCourseChange(90)}
            title="Установить курс 90°"
          >
            90°
          </button>
          <button
            className="preset-button"
            onClick={() => onCourseChange(180)}
            title="Установить курс 180°"
          >
            180°
          </button>
          <button
            className="preset-button"
            onClick={() => onCourseChange(270)}
            title="Установить курс 270°"
          >
            270°
          </button>
        </div>
      </div>
    </div>
  );
};