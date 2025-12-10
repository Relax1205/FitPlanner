// src/components/Tabs/Tabs.jsx
import React from 'react';
import './Tabs.css';

export const Tabs = ({ activeTab, onTabChange, children }) => {
  return (
    <div className="tabs">
      <div className="tabs__header">
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return (
              <button
                key={child.props.id}
                className={`tabs__tab-button ${activeTab === child.props.id ? 'tabs__tab-button--active' : ''}`}
                onClick={() => onTabChange(child.props.id)}
              >
                {child.props.label}
              </button>
            );
          }
          return null;
        })}
      </div>
      <div className="tabs__content">
        {React.Children.map(children, child => {
          if (React.isValidElement(child) && child.props.id === activeTab) {
            return (
              <div className="tabs__panel" key={child.props.id}>
                {child.props.children}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export const Tab = ({ id, label, children }) => null;