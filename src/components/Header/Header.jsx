// src/components/Header/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import './Header.css';

const Header = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/" className="header__logo-link">FitPlanner</Link>
      </div>
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item">
            <Link to="/" className="header__nav-link">Главная</Link>
          </li>
          <li className="header__nav-item">
            <Link to="/planner" className="header__nav-link">Планировщик</Link>
          </li>
          <li className="header__nav-item">
            <Link to="/progress" className="header__nav-link">Прогресс</Link>
          </li>
          <li className="header__nav-item">
            <Link to="/settings" className="header__nav-link">Настройки</Link>
          </li>
        </ul>
      </nav>
      <div className="header__theme-toggle">
        <button 
          className="header__theme-button" 
          onClick={toggleTheme} 
          aria-label="Переключить тему"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
};

export default Header;