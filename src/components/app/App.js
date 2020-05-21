import React from 'react';
import logo from '../../media/Logo.png';
import Tickets from '../tickets/tickets';

import Header from './style';

const App = () => (
  <>
    <Header src={logo} alt="logo" />
    <Tickets />
  </>
);

export default App;
