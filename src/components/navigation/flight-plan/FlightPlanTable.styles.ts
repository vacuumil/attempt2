import styled from 'styled-components';

export const TableContainer = styled.div`
  margin-top: 2rem;
`;

export const ControlPanel = styled.div`
  background: rgba(26, 111, 196, 0.1);
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  border: 1px solid rgba(26, 111, 196, 0.3);

  label {
    color: #e6f1ff;
    font-weight: 500;
    margin-right: 0.5rem;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: rgba(10, 25, 47, 0.6);
  border-radius: 8px;
  overflow: hidden;
`;

export const TableHeader = styled.th`
  background: rgba(26, 111, 196, 0.3);
  color: #64ffda;
  padding: 1rem;
  text-align: center;
  font-weight: 600;
  border: 1px solid rgba(100, 255, 218, 0.1);
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background: rgba(17, 34, 64, 0.3);
  }

  &:hover {
    background: rgba(26, 111, 196, 0.1);
  }
`;

export const TableCell = styled.td`
  padding: 0.75rem;
  text-align: center;
  border: 1px solid rgba(100, 255, 218, 0.1);
  color: #e6f1ff;
`;

export const SummaryRow = styled(TableRow)`
  background: rgba(100, 255, 218, 0.1) !important;
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #1a6fc4;
  border-radius: 4px;
  color: #e6f1ff;
  text-align: center;

  &:focus {
    outline: none;
    border-color: #64ffda;
  }
`;

export const AddButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #1a6fc4 0%, #64ffda 100%);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(100, 255, 218, 0.3);
  }
`;

export const RemoveButton = styled.button`
  padding: 0.5rem;
  background: rgba(255, 107, 107, 0.2);
  color: #ff6b6b;
  border: 1px solid #ff6b6b;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 107, 107, 0.3);
  }
`;