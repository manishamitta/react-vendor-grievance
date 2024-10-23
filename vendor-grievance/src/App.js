import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FirstPage from './components/FirstPage';
import ComplaintDetails from './components/ComplaintDetails';
import './App.css';
import SelectedPoState from './context/Selectedpo/SelectedPoState';
import ComplaintState from './context/Complaint/ComplaintState';

function App() {

  return (
    <SelectedPoState>
      <ComplaintState>
        <Router>
          <Routes>
            <Route path="/" element={<FirstPage />} />
            <Route path="/complaint/:complaintNo" element={<ComplaintDetails />} />
          </Routes>
        </Router>
        </ComplaintState >
    </SelectedPoState>
  );
}

export default App;
