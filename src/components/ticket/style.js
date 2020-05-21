import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Price = styled.span`
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: #2196f3;
  width: 50%;
  text-align: left;
  margin-bottom: 25px;
`;

export const CarrierLogo = styled.div`
  text-align: left;
  width: 30%;
`;

export const Item = styled.li`
  padding: 20px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

export const Segment = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: space-between;
`;

export const Column = styled.li`
  display: flex;
  flex-direction: column;
  width: 30%;
`;

export const ColumnHeader = styled.span`
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  color: #a0b0b9;
  text-align: left;
  text-transform: uppercase;
`;

export const ColumnData = styled.span`
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  color: #4a4a4a;
  margin-bottom: 10px;
  text-align: left;
`;
