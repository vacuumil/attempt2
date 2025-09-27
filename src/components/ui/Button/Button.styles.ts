// components/ui/Button/Button.styles.ts
import styled from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  magnetic?: boolean;
}

export const StyledButton = styled.button<ButtonProps>`
  padding: ${props => {
    switch (props.size) {
      case 'small': return '8px 16px';
      case 'large': return '16px 32px';
      default: return '12px 24px';
    }
  }};
  
  background-color: ${props => 
    props.variant === 'secondary' ? '#6c757d' : '#007bff'};
  color: white;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  position: relative;
  overflow: hidden;
  
  /* Магнитный эффект */
  ${props => props.magnetic && `
    &:hover {
      transform: translateY(-1px) scale(1.02);
      box-shadow: 0 8px 25px rgba(0, 123, 255, 0.3);
    }
    
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      transition: width 0.3s ease, height 0.3s ease;
    }
    
    &:hover::before {
      width: 300px;
      height: 300px;
    }
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;