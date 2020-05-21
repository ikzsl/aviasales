import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;

  align-items: flex-start;
  margin: 0 auto;
  padding: 0 10px;
  max-width: 730px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const List = styled.ul`
  padding: 0;
  margin: 0;
  text-align: center;
  list-style: none;
`;

export const Loading = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const LoadingInner = styled.div`
  width: 10px;
  height: 10px;
  position: absolute;
  top: 50%;
  border-radius: 50%;
  position: relative;
  animation: loader-2 0.9s 0.35s ease alternate infinite;
  margin: -20px auto 0;

  &:after,
  &:before {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    animation: loader-2 0.9s ease alternate infinite;
  }

  &:before {
    left: -20px;
    animation-delay: 0.2s;
  }

  &:after {
    right: -20px;
    animation-delay: 0.5s;
  }

  @keyframes loader-2 {
    0% {
      box-shadow: 0 15px 0 -15px #ffffff;
    }
    100% {
      box-shadow: 0 15px 0 #ffffff;
    }
  }
`;
