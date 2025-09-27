import styled from 'styled-components';

export const ConfigSection = styled.div`
  background: rgba(17, 34, 64, 0.5);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(100, 255, 218, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

export const SectionTitle = styled.h4`
  color: #64ffda;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 2px solid rgba(100, 255, 218, 0.3);
  padding-bottom: 0.5rem;
`;

export const ControlGroup = styled.div`
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const Label = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #e6f1ff;
  margin-bottom: 0.8rem;
  font-weight: 500;
  font-size: 1rem;
`;

export const ValueDisplay = styled.span`
  color: #64ffda;
  font-weight: 600;
  background: rgba(100, 255, 218, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  min-width: 80px;
  text-align: center;
  border: 1px solid rgba(100, 255, 218, 0.2);
`;

export const Slider = styled.input`
  width: 100%;
  margin-bottom: 0.8rem;
  background: linear-gradient(90deg, #64ffda 0%, #1a6fc4 100%);
  border-radius: 8px;
  height: 8px;
  outline: none;
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #64ffda;
    cursor: pointer;
    border: 2px solid #0a192f;
    box-shadow: 0 2px 6px rgba(100, 255, 218, 0.4);
    transition: all 0.2s ease;
    
    &:hover {
      transform: scale(1.1);
      background: #1a6fc4;
    }
  }
  
  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #64ffda;
    cursor: pointer;
    border: 2px solid #0a192f;
    box-shadow: 0 2px 6px rgba(100, 255, 218, 0.4);
  }
`;

export const NumberInput = styled.input`
  width: 100%;
  padding: 0.7rem;
  background: rgba(10, 25, 47, 0.8);
  border: 2px solid rgba(100, 255, 218, 0.3);
  border-radius: 8px;
  color: #e6f1ff;
  text-align: center;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #64ffda;
    box-shadow: 0 0 10px rgba(100, 255, 218, 0.3);
  }
  
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.7rem;
  background: rgba(10, 25, 47, 0.8);
  border: 2px solid rgba(100, 255, 218, 0.3);
  border-radius: 8px;
  color: #e6f1ff;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #64ffda;
    box-shadow: 0 0 10px rgba(100, 255, 218, 0.3);
  }
  
  option {
    background: #0a192f;
    color: #e6f1ff;
    padding: 0.5rem;
  }
`;

export const PresetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin-top: 0.5rem;

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const PresetButton = styled.button<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.7rem 0.5rem;
  background: ${props => props.$active 
    ? 'linear-gradient(135deg, #64ffda 0%, #1a6fc4 100%)' 
    : 'rgba(17, 34, 64, 0.7)'};
  color: ${props => props.$active ? '#0a192f' : '#e6f1ff'};
  border: 2px solid ${props => props.$active ? '#64ffda' : 'transparent'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: ${props => props.$active ? '600' : '500'};
  font-size: 0.9rem;
  min-height: 60px;
  
  &:hover {
    transform: translateY(-2px);
    background: ${props => props.$active 
      ? 'linear-gradient(135deg, #64ffda 0%, #1a6fc4 100%)' 
      : 'rgba(100, 255, 218, 0.2)'};
    border-color: #64ffda;
  }
  
  span:first-child {
    font-size: 1.4rem;
    margin-bottom: 0.2rem;
  }
  
  span:last-child {
    font-size: 0.8rem;
    opacity: 0.9;
  }
`;

export const WindDirection = styled.div<{ $direction: number }>`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, rgba(100, 255, 218, 0.1) 0%, rgba(26, 111, 196, 0.1) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin: 0.5rem auto;
  transform: rotate(${props => props.$direction}deg);
  transition: transform 0.5s ease;
  border: 2px solid rgba(100, 255, 218, 0.3);
  color: #64ffda;
`;

export const WindSpeedIndicator = styled.div<{ $speed: number }>`
  font-size: 2.5rem;
  text-align: center;
  margin: 0.5rem 0;
  filter: ${props => `blur(${Math.max(0, 1 - props.$speed / 30)}px)`};
  transition: all 0.3s ease;
`;