// src/components/flight-simulator/components/Controls/FlightControls.tsx
import React from 'react';
import './Controls.css';

interface FlightControlsProps {
  heading: number;
  onHeadingChange: (heading: number) => void;
  isMoving: boolean;
  onToggleMovement: () => void;
  onStepMove: () => void;
  isContinuousTurn?: boolean;
  turnDirection?: 'left' | 'right' | null;
  onStartContinuousTurn: (direction: 'left' | 'right') => void;
  onStopContinuousTurn: () => void;
}

export const FlightControls: React.FC<FlightControlsProps> = ({
  heading,
  onHeadingChange,
  isMoving,
  onToggleMovement,
  onStepMove,
  turnDirection = null,
  onStartContinuousTurn,
  onStopContinuousTurn
}) => {
  const handleTurnButtonPress = (direction: 'left' | 'right') => {
    onStartContinuousTurn(direction);
  };

  const handleTurnButtonRelease = () => {
    onStopContinuousTurn();
  };

  return (
    <div className="flight-controls">
      <h3>Управление полетом</h3>
      
      <div className="control-group">
        <label>Курс (°):</label>
        <div className="heading-control">
          <input
            type="number"
            min="0"
            max="359"
            value={heading}
            onChange={(e) => onHeadingChange(Number(e.target.value))}
            className="heading-input"
          />
          <div className="heading-buttons">
            <button onClick={() => onHeadingChange((heading - 1 + 360) % 360)}>-1</button>
            <button onClick={() => onHeadingChange((heading + 1) % 360)}>+1</button>
          </div>
        </div>
      </div>

      {/* Кнопки непрерывного поворота */}
      <div className="control-group">
        <label>Непрерывный поворот:</label>
        <div className="continuous-turn-controls">
          <button
            className={`turn-btn left ${turnDirection === 'left' ? 'active' : ''}`}
            onMouseDown={() => handleTurnButtonPress('left')}
            onMouseUp={handleTurnButtonRelease}
            onMouseLeave={handleTurnButtonRelease}
            onTouchStart={() => handleTurnButtonPress('left')}
            onTouchEnd={handleTurnButtonRelease}
          >
            ↶ ЛЕВО
          </button>
          <button
            className={`turn-btn right ${turnDirection === 'right' ? 'active' : ''}`}
            onMouseDown={() => handleTurnButtonPress('right')}
            onMouseUp={handleTurnButtonRelease}
            onMouseLeave={handleTurnButtonRelease}
            onTouchStart={() => handleTurnButtonPress('right')}
            onTouchEnd={handleTurnButtonRelease}
          >
            ПРАВО ↷
          </button>
        </div>
      </div>

      <div className="movement-controls">
        <button 
          onClick={onToggleMovement} 
          className={isMoving ? 'movement-btn active' : 'movement-btn'}
        >
          {isMoving ? (
            <>⏹️ Остановить</>
          ) : (
            <>▶️ Автополет</>
          )}
        </button>
        
        <button onClick={onStepMove} className="movement-btn step">
          ⏩ Шаг (+3 ед.)
        </button>
      </div>

      <div className="heading-presets">
        <label>Быстрый курс:</label>
        <div className="preset-buttons">
          {[0, 90, 180, 270].map(preset => (
            <button
              key={preset}
              onClick={() => onHeadingChange(preset)}
              className="preset-btn"
            >
              {preset}°
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};