// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from '../src/components/Header/Header.jsx';
import Footer from '../src/components/Footer/Footer.jsx';
import HomePage from '../src/pages/HomePage/HomePage.jsx';
import PlannerPage from '../src/pages/PlannerPage/PlannerPage.jsx';
import ProgressPage from '../src/pages/ProgressPage/ProgressPage.jsx';
import SettingsPage from '../src/pages/SettingsPage/SettingsPage.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="app__main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/planner" element={<PlannerPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;