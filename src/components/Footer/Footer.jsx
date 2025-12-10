// src/components/Footer/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__copyright">
          &copy; {new Date().getFullYear()} FitPlanner. Все права защищены.
        </p>
        <div className="footer__links">
          <a href="/privacy" className="footer__link">Политика конфиденциальности</a>
          <a href="/terms" className="footer__link">Условия использования</a>
          <a href="/contact" className="footer__link">Контакты</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;