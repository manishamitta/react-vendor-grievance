import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FirstPage from './components/FirstPage';
import ComplaintDetails from './components/ComplaintDetails';
import './App.css';
import SelectedPoState from './context/Selectedpo/SelectedPoState';
import ComplaintState from './context/Complaint/ComplaintState';
//new changes
function App() {

  return (
    <SelectedPoState>
      <ComplaintState>
        <FirstPage />
      </ComplaintState >
    </SelectedPoState>
  );
}

export default App;
