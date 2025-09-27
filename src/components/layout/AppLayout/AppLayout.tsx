import React from 'react';
import styled from 'styled-components';
import { Header } from '../Header';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  padding-top: 90px;

  @media (max-width: 768px) {
    padding: 1rem;
    padding-top: 80px;
  }
`;


interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {

  return (
    <LayoutContainer>
      <Header />
      
      
      
      <MainContent>
        {children}
      </MainContent>
    </LayoutContainer>
  );
};