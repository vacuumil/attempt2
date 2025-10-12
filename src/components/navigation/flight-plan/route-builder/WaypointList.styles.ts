// components/navigation/flight-plan/route-builder/WaypointList.styles.ts
import styled from 'styled-components';

export const ListContainer = styled.div`
  background: rgba(17, 34, 64, 0.6);
  border: 1px solid rgba(26, 111, 196, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(100, 255, 218, 0.2);

  h3 {
    color: #64ffda;
    margin: 0;
    font-size: 1.3rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
    align-items: flex-start;
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  width: 300px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  background: rgba(10, 25, 47, 0.8);
  border: 1px solid #1a6fc4;
  border-radius: 6px;
  color: #e6f1ff;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: #64ffda;
    box-shadow: 0 0 0 2px rgba(100, 255, 218, 0.2);
  }

  &::placeholder {
    color: #8892b0;
  }
`;

export const SearchIcon = styled.span`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #8892b0;
`;

export const WaypointsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const WaypointCard = styled.div<{ selected: boolean }>`
  background: ${props => props.selected 
    ? 'linear-gradient(135deg, #64ffda 0%, #1a6fc4 100%)' 
    : 'rgba(10, 25, 47, 0.6)'};
  border: 1px solid ${props => props.selected 
    ? 'rgba(100, 255, 218, 0.3)' 
    : 'rgba(26, 111, 196, 0.3)'};
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    border-color: #64ffda;
    box-shadow: 0 5px 15px rgba(100, 255, 218, 0.1);
  }
`;

export const WaypointHeader = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;

  .icon {
    font-size: 1.5rem;
    margin-right: 0.5rem;
  }

  .code {
    font-weight: bold;
    color: ${props => props.selected ? '#0a192f' : '#64ffda'};
    font-size: 1.1rem;
  }

  .type {
    background: ${props => props.selected 
      ? 'rgba(10, 25, 47, 0.2)' 
      : 'rgba(100, 255, 218, 0.1)'};
    color: ${props => props.selected ? '#0a192f' : '#64ffda'};
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    font-size: 0.7rem;
    font-weight: bold;
  }
`;

export const WaypointName = styled.div<{ selected: boolean }>`
  font-weight: 500;
  color: ${props => props.selected ? '#0a192f' : '#e6f1ff'};
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

export const WaypointInfo = styled.div<{ selected: boolean }>`
  font-size: 0.8rem;
  color: ${props => props.selected ? 'rgba(10, 25, 47, 0.8)' : '#8892b0'};
  margin-bottom: 0.25rem;

  strong {
    color: ${props => props.selected ? '#0a192f' : '#e6f1ff'};
  }
`;

export const SelectedWaypoints = styled.div`
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(100, 255, 218, 0.2);
`;

export const SelectedHeader = styled.h4`
  color: #64ffda;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

export const SelectedList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const SelectedItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(100, 255, 218, 0.05);
  border: 1px solid rgba(100, 255, 218, 0.2);
  border-radius: 6px;
  padding: 0.75rem 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(100, 255, 218, 0.1);
  }
`;

export const SelectedItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  .index {
    background: #64ffda;
    color: #0a192f;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: bold;
  }

  .details {
    .name {
      color: #e6f1ff;
      font-weight: 500;
      font-size: 0.9rem;
    }

    .code {
      color: #8892b0;
      font-size: 0.8rem;
    }
  }
`;

export const RemoveButton = styled.button`
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid #ff6b6b;
  color: #ff6b6b;
  border-radius: 4px;
  padding: 0.4rem 0.6rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.8rem;

  &:hover {
    background: rgba(255, 107, 107, 0.2);
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #8892b0;

  .icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }

  p {
    margin: 0.5rem 0;
  }
`;

export const DragHandle = styled.div`
  cursor: grab;
  color: #8892b0;
  padding: 0.25rem;
  margin-right: 0.5rem;

  &:active {
    cursor: grabbing;
  }

  &:hover {
    color: #64ffda;
  }
`;