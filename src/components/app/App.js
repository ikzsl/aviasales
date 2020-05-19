import React from 'react';
import GlobalStyle from '../../theme/globalStyle';
import logo from './logo.png';
import Tickets from '../tickets/tickets';

const App = () => (
  <>
    <GlobalStyle />
    <header>
      <img src={logo} alt="logo" />
    </header>
    <Tickets />
  </>
);

export default App;
