// components/navigation/flight-plan/route-builder/RouteBuilder.styles.ts
import styled from 'styled-components';

export const BuilderContainer = styled.div`
  width: 100%;
  max-width: 95vw;
  margin: 0 auto;
  padding: 2rem;
  color: #e6f1ff;

  @media (min-width: 2000px) {
    max-width: 1900px;
  }

  @media (min-width: 1600px) and (max-width: 1999px) {
    max-width: 90vw;
  }

  @media (min-width: 1200px) and (max-width: 1599px) {
    max-width: 92vw;
  }

  @media (max-width: 1199px) {
    max-width: 95vw;
  }

  @media (max-width: 768px) {
    max-width: 98vw;
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    max-width: 100vw;
    padding: 1rem;
  }
`;

export const BuilderHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h2 {
    color: #64ffda;
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #64ffda 0%, #1a6fc4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    color: #8892b0;
    font-size: 1.1rem;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;

    h2 {
      font-size: 1.8rem;
    }

    p {
      font-size: 1rem;
    }
  }
`;

export const BuilderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const MapSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ControlsSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(10, 25, 47, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  color: #64ffda;

  .spinner {
    width: 50px;
    height: 50px;
    border: 3px solid rgba(100, 255, 218, 0.3);
    border-top: 3px solid #64ffda;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  p {
    font-size: 1.1rem;
    color: #e6f1ff;
  }
`;

export const SuccessMessage = styled.div`
  background: linear-gradient(135deg, #64ffda 0%, #1a6fc4 100%);
  color: #0a192f;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 1.5rem;
  animation: slideIn 0.5s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.3rem;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.9;
  }
`;

export const TutorialSteps = styled.div`
  background: rgba(17, 34, 64, 0.6);
  border: 1px solid rgba(26, 111, 196, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;

  h4 {
    color: #64ffda;
    margin: 0 0 1rem 0;
    font-size: 1.1rem;
    text-align: center;
  }
`;

export const StepList = styled.ol`
  margin: 0;
  padding-left: 1.5rem;
  color: #8892b0;

  li {
    margin-bottom: 0.75rem;
    line-height: 1.4;

    &:last-child {
      margin-bottom: 0;
    }

    strong {
      color: #e6f1ff;
    }
  }
`;

export const MobileWarning = styled.div`
  display: none;
  
  @media (max-width: 1024px) {
    display: block;
    background: rgba(255, 215, 0, 0.1);
    border: 1px solid rgba(255, 215, 0, 0.3);
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
    text-align: center;
    color: #ffd700;

    strong {
      display: block;
      margin-bottom: 0.5rem;
    }
  }
`;

export const BuilderFooter = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(100, 255, 218, 0.1);
  text-align: center;
  color: #8892b0;
  font-size: 0.9rem;

  p {
    margin: 0.25rem 0;
  }
`;

export const FeatureHighlight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(100, 255, 218, 0.05);
  border: 1px solid rgba(100, 255, 218, 0.2);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;

  .icon {
    font-size: 1.5rem;
    color: #64ffda;
  }

  .content {
    flex: 1;

    strong {
      color: #64ffda;
      display: block;
      margin-bottom: 0.25rem;
    }

    p {
      margin: 0;
      font-size: 0.8rem;
      color: #8892b0;
    }
  }
`;