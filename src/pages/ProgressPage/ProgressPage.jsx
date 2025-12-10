// src/pages/ProgressPage/ProgressPage.jsx
import React from 'react';
import './ProgressPage.css';

const ProgressPage = () => {
  return (
    <div className="progress-page">
      <div className="progress-page__container">
        <div className="progress-page__icon">🚧</div>
        <h1 className="progress-page__title">Раздел в разработке</h1>
        <p className="progress-page__message">
          Этот функционал будет доступен в ближайшем обновлении
        </p>
        <div className="progress-page__features">
          <h2 className="progress-page__features-title">Планируемые возможности:</h2>
          <ul className="progress-page__features-list">
            <li className="progress-page__features-item">Графики прогресса по разным параметрам</li>
            <li className="progress-page__features-item">Статистика выполненных тренировок</li>
            <li className="progress-page__features-item">Анализ динамики результатов</li>
            <li className="progress-page__features-item">Персональные рекомендации</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;