import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import ListingDisplay from './pages/ListingDisplay';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/listing" element={<ListingDisplay />} />
    </Routes>
  );
}

export default App;
