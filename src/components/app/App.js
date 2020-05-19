import React from 'react';
import styled from 'styled-components';
import GlobalStyle from '../../theme/globalStyle';
import logo from './Logo.png';
import Tickets from '../tickets/tickets';


const Header = styled.img`
display: flex;
margin: 40px auto;
`;


const App = () => (
  <>
    <GlobalStyle />

    <Header src={logo} alt="logo" />

    <Tickets />
  </>
);

export default App;
