import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserData from './UserData';
import ShowData from './ShowData';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UserData />} />
          <Route path="/data" element={<ShowData />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
