// src/pages/HomePage/HomePage.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Добавили useNavigate
import Button from '../../components/Button/Button';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate(); // Хук для навигации

  const handleStartPlanning = () => {
    navigate('/planner', { state: { activeTab: 'list' } }); // Переходим на страницу планировщика с параметром
  };

  const handleMyProgress = () => {
    navigate('/progress'); // Просто переходим на страницу прогресса
  };

  return (
    <div className="home-page">
      <div className="home-page__hero">
        <h1 className="home-page__title">Ваш персональный тренировочный план</h1>
        <p className="home-page__subtitle">
          Планируйте тренировки, отслеживайте прогресс и достигайте целей
        </p>
        <div className="home-page__cta">
          <Button 
            variant="primary" 
            size="large"
            className="home-page__cta-button"
            onClick={handleStartPlanning} // Используем обработчик
          >
            Начать планировать
          </Button>
          <Button 
            variant="secondary" 
            size="large"
            className="home-page__cta-button"
            onClick={handleMyProgress} // Используем обработчик
          >
            Мой прогресс
          </Button>
        </div>
      </div>
      
      <div className="home-page__features">
        <div className="home-page__feature-card">
          <div className="home-page__feature-icon">📅</div>
          <h3 className="home-page__feature-title">Планировщик тренировок</h3>
          <p className="home-page__feature-description">
            Запланируйте тренировки на неделю вперёд с напоминаниями
          </p>
        </div>
        
        <div className="home-page__feature-card">
          <div className="home-page__feature-icon">📊</div>
          <h3 className="home-page__feature-title">Отслеживание прогресса</h3>
          <p className="home-page__feature-description">
            Анализируйте свои достижения и динамику результатов
          </p>
        </div>
        
        <div className="home-page__feature-card">
          <div className="home-page__feature-icon">🏆</div>
          <h3 className="home-page__feature-title">Достижения</h3>
          <p className="home-page__feature-description">
            Получайте награды за выполнение тренировочных планов
          </p>
        </div>
      </div>
      
      <div className="home-page__testimonials">
        <h2 className="home-page__testimonials-title">Что говорят пользователи</h2>
        <div className="home-page__testimonial-grid">
          <div className="home-page__testimonial">
            <p className="home-page__testimonial-text">
              "FitPlanner помог мне систематизировать тренировки и я наконец достиг своей цели!"
            </p>
            <div className="home-page__testimonial-author">— Анна, 28 лет</div>
          </div>
          
          <div className="home-page__testimonial">
            <p className="home-page__testimonial-text">
              "Удобный интерфейс и напоминания делают процесс тренировок более дисциплинированным"
            </p>
            <div className="home-page__testimonial-author">— Михаил, 35 лет</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;