import styled from 'styled-components';

export const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: linear-gradient(
    135deg,
    #0a192f 0%,
    #0c1e38 50%,
    #0a192f 100%
  );
  overflow: hidden;
`;

export const SubtleGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(26, 111, 196, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(26, 111, 196, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.3;
`;

export const HorizonLine = styled.div`
  position: absolute;
  bottom: 35%;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(100, 255, 218, 0.15) 20%,
    rgba(100, 255, 218, 0.25) 50%,
    rgba(100, 255, 218, 0.15) 80%,
    transparent 100%
  );
`;

export const CornerAccent = styled.div`
  position: absolute;
  top: 20%;
  right: 15%;
  width: 120px;
  height: 120px;
  border: 1px solid rgba(100, 255, 218, 0.1);
  border-radius: 50%;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 60%;
    height: 60%;
    border: 1px solid rgba(100, 255, 218, 0.08);
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
`;