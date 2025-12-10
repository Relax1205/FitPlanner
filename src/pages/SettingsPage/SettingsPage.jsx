// src/pages/SettingsPage/SettingsPage.jsx
import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './SettingsPage.css';

const SettingsPage = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('ru');
  const [weekStart, setWeekStart] = useState('monday');
  
  // Load saved settings from localStorage
  useEffect(() => {
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications !== null) {
      setNotifications(JSON.parse(savedNotifications));
    }
    
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
    
    const savedWeekStart = localStorage.getItem('weekStart');
    if (savedWeekStart) {
      setWeekStart(savedWeekStart);
    }
  }, []);
  
  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('notifications', notifications);
    localStorage.setItem('language', language);
    localStorage.setItem('weekStart', weekStart);
  }, [notifications, language, weekStart]);
  
  const handleReset = () => {
    if (window.confirm('Вы уверены, что хотите сбросить все настройки до значений по умолчанию?')) {
      localStorage.removeItem('notifications');
      localStorage.removeItem('language');
      localStorage.removeItem('weekStart');
      localStorage.removeItem('theme');
      
      setNotifications(true);
      setLanguage('ru');
      setWeekStart('monday');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  };

  return (
    <div className="settings-page">
      <h1 className="settings-page__title">Настройки</h1>
      
      <div className="settings-page__section">
        <h2 className="settings-page__section-title">Внешний вид</h2>
        <div className="settings-page__setting-item">
          <label className="settings-page__setting-label">Тёмная тема</label>
          <div className="settings-page__toggle-container">
            <input
              type="checkbox"
              id="darkMode"
              checked={darkMode}
              onChange={toggleTheme}
              className="settings-page__toggle-input"
            />
            <label htmlFor="darkMode" className="settings-page__toggle-switch"></label>
          </div>
        </div>
      </div>
      
      <div className="settings-page__section">
        <h2 className="settings-page__section-title">Уведомления</h2>
        <div className="settings-page__setting-item">
          <label className="settings-page__setting-label">
            Показывать уведомления о предстоящих тренировках
          </label>
          <div className="settings-page__toggle-container">
            <input
              type="checkbox"
              id="notifications"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="settings-page__toggle-input"
            />
            <label htmlFor="notifications" className="settings-page__toggle-switch"></label>
          </div>
        </div>
      </div>
      
      <div className="settings-page__section">
        <h2 className="settings-page__section-title">Язык и регион</h2>
        <div className="settings-page__setting-item">
          <label htmlFor="language" className="settings-page__setting-label">
            Язык интерфейса
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="settings-page__select"
          >
            <option value="ru">Русский</option>
            <option value="en">English</option>
          </select>
        </div>
        
        <div className="settings-page__setting-item">
          <label htmlFor="weekStart" className="settings-page__setting-label">
            Первый день недели
          </label>
          <select
            id="weekStart"
            value={weekStart}
            onChange={(e) => setWeekStart(e.target.value)}
            className="settings-page__select"
          >
            <option value="monday">Понедельник</option>
            <option value="sunday">Воскресенье</option>
          </select>
        </div>
      </div>
      
      <div className="settings-page__section settings-page__section--danger">
        <h2 className="settings-page__section-title">Опасная зона</h2>
        <button 
          className="settings-page__reset-button"
          onClick={handleReset}
        >
          Сбросить все настройки
        </button>
        <p className="settings-page__reset-warning">
          Это действие удалит все ваши настройки и предпочтения. Тренировки сохранятся.
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;