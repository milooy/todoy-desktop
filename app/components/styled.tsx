import styled from 'styled-components';

export const Today = styled.div`
  font-size: 15px;
  font-weight: lighter;
  color: white;
  background: #76757ac9;
  font-weight: 100;
  padding: 3px 12px;
  font-size: 12px;
`;

export const Button = styled.button`
  background: ${({ isActive, type }: { isActive: boolean; type: string }) => {
    if (isActive) {
      if (type === 'REMOVE') {
        return '#ff5757';
      }
      if (type === 'LATER') {
        return '#6de246';
      }
      return '#ffca08';
    }
    return 'inherit';
  }};
  font-weight: bold;
  border: none;
  height: 26px;
  border-radius: 5px;
  font-weight: bold;
  border: none;
`;
