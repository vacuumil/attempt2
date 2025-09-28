import styled from 'styled-components';

export const ControlsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1rem;
  background: rgba(17, 34, 64, 0.3);
  border-radius: 10px;
`;

export const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-size: 0.9rem;
  color: #8892b0;
`;

export const Input = styled.input`
  background: rgba(100, 255, 218, 0.1);
  border: 1px solid #64ffda;
  border-radius: 5px;
  padding: 0.5rem;
  color: #e6f1ff;
  font-family: 'Share Tech Mono', monospace;
  
  &:focus {
    outline: none;
    border-color: #1a6fc4;
  }
`;

export const Button = styled.button`
  background: linear-gradient(135deg, #64ffda 0%, #1a6fc4 100%);
  color: #0a192f;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(100, 255, 218, 0.3);
  }
`;

export const Select = styled.select`
  background: rgba(100, 255, 218, 0.1);
  border: 1px solid #64ffda;
  border-radius: 5px;
  padding: 0.5rem;
  color: #e6f1ff;
  
  option {
    background: #0a192f;
    color: #e6f1ff;
  }
`;

export const RangeInput = styled.input`
  width: 100%;
  margin-top: 0.5rem;
  background: linear-gradient(to right, #64ffda, #1a6fc4);
  border-radius: 5px;
  height: 4px;
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    background: #64ffda;
    border-radius: 50%;
    cursor: pointer;
  }
`;