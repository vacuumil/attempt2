// src/pages/About/About.styles.ts
import styled from 'styled-components';

export const AboutContainer = styled.div`
  min-height: 100vh;
  background: #0a192f;
  color: #e6f1ff;
  padding-top: 80px;
`;

export const HeroSection = styled.section`
  background: linear-gradient(
    135deg,
    rgba(10, 25, 47, 0.95) 0%,
    rgba(26, 111, 196, 0.1) 100%
  );
  padding: 6rem 2rem;
  text-align: center;
  border-bottom: 1px solid rgba(100, 255, 218, 0.1);
`;

export const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #64ffda 0%, #1a6fc4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: 'Exo 2', sans-serif;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const HeroDescription = styled.p`
  font-size: 1.3rem;
  line-height: 1.7;
  color: #8892b0;
  font-family: 'Exo 2', sans-serif;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const ContentSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

export const Section = styled.section`
  padding: 5rem 0;
  border-bottom: 1px solid rgba(100, 255, 218, 0.05);

  &:last-of-type {
    border-bottom: none;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #64ffda;
  font-family: 'Exo 2', sans-serif;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

export const FeatureCard = styled.div`
  background: rgba(26, 111, 196, 0.1);
  padding: 2.5rem 2rem;
  border-radius: 16px;
  border: 1px solid rgba(26, 111, 196, 0.3);
  text-align: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-5px);
    border-color: #64ffda;
    box-shadow: 0 10px 30px rgba(100, 255, 218, 0.2);
  }
`;

export const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
`;

export const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #e6f1ff;
  font-family: 'Exo 2', sans-serif;
  font-weight: 600;
`;

export const FeatureDescription = styled.p`
  color: #8892b0;
  line-height: 1.6;
  font-family: 'Exo 2', sans-serif;
`;

export const TeamSection = styled(Section)`
  background: rgba(12, 30, 56, 0.3);
  margin: 0 -2rem;
  padding: 5rem 2rem;
`;

export const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

export const TeamMember = styled.div`
  background: rgba(26, 111, 196, 0.1);
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid rgba(26, 111, 196, 0.3);
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: #64ffda;
  }
`;

export const MemberPhoto = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
`;

export const MemberInfo = styled.div`
  text-align: center;
`;

export const MemberName = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  color: #e6f1ff;
  font-family: 'Exo 2', sans-serif;
  font-weight: 600;
`;

export const MemberRole = styled.p`
  color: #64ffda;
  margin-bottom: 1rem;
  font-weight: 500;
  font-family: 'Exo 2', sans-serif;
`;

export const MemberBio = styled.p`
  color: #8892b0;
  line-height: 1.6;
  font-family: 'Exo 2', sans-serif;
`;

export const StatsSection = styled(Section)`
  background: linear-gradient(
    135deg,
    rgba(26, 111, 196, 0.1) 0%,
    rgba(100, 255, 218, 0.05) 100%
  );
  margin: 0 -2rem;
  padding: 5rem 2rem;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

export const StatItem = styled.div`
  text-align: center;
  padding: 2rem;
`;

export const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: #64ffda;
  margin-bottom: 0.5rem;
  font-family: 'Share Tech Mono', monospace;
`;

export const StatLabel = styled.div`
  color: #8892b0;
  font-size: 1.1rem;
  font-family: 'Exo 2', sans-serif;
`;

export const TechStackSection = styled.div`
  margin-top: 3rem;
`;

export const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

export const TechCategory = styled.div`
  background: rgba(26, 111, 196, 0.1);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid rgba(26, 111, 196, 0.3);

  h4 {
    color: #64ffda;
    margin-bottom: 1.5rem;
    font-size: 1.3rem;
    font-family: 'Exo 2', sans-serif;
    font-weight: 600;
    text-align: center;
  }
`;

export const TechList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const TechItem = styled.li`
  color: #e6f1ff;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(100, 255, 218, 0.1);
  font-family: 'Exo 2', sans-serif;

  &:last-child {
    border-bottom: none;
  }

  &:before {
    content: '▹';
    color: #64ffda;
    margin-right: 0.75rem;
  }
`;

export const CtaSection = styled(Section)`
  background: linear-gradient(
    135deg,
    rgba(10, 25, 47, 0.9) 0%,
    rgba(26, 111, 196, 0.2) 100%
  );
  margin: 0 -2rem;
  padding: 5rem 2rem;
  text-align: center;
`;

export const CtaContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

export const CtaButton = styled.button<{ secondary?: boolean }>`
  background: ${props => props.secondary 
    ? 'transparent' 
    : 'linear-gradient(135deg, #1a6fc4 0%, #64ffda 100%)'};
  color: white;
  border: ${props => props.secondary ? '2px solid #64ffda' : 'none'};
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  font-family: 'Exo 2', sans-serif;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(100, 255, 218, 0.3);
  }
`;