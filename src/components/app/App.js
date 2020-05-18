import React from 'react';
import logo from './logo.png';
import './App.scss';
import Tickets from '../tickets/tickets';


const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
    </header>
    <Tickets />


  </div>
);

export default App;
