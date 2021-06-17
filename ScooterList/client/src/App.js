import React, { Fragment } from 'react';
import './App.css';

//components

import ScooterList from './components/ScooterList';

function App() {
  return (
    <Fragment>
      <div className = "container">
      <ScooterList />
      </div>
    </Fragment>
  );
}

export default App;
