import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import './App.css';

import Home from './containers/Home';

function App() {
    return (
      <div className="App">
        <Router>
          <Route exact path="/" component={Home} />
        </Router>
      </div>
  );
}
export default App;