import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  background-color: #ffffff;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid #dfe5ec;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  width: 50%;
  display: block;
  position: relative;
  padding: 15px 0;
  color: #4a4a4a;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.5px;
  text-align: center;
  text-transform: uppercase;
  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
  }
`;

export const Radio = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  border: 0;
  clip: rect(0 0 0 0);

  &:checked + ${Label} {
    background-color: #2196f3;
    color: #ffffff;
  }
`;
