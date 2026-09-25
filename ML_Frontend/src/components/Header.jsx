import React from 'react';
import { ShieldCheck, Moon, Sun, ArrowRight } from 'lucide-react';

const Header = ({ activeTab, onTabChange, themeMode, onToggleTheme }) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'info', label: 'Loan Information' },
    { id: 'predict', label: 'Prediction' },
    { id: 'models', label: 'Model Comparison' },
    { id: 'about', label: 'About' }
  ];

  return (
    <header className="app-header glass-card">
      {/* Brand Logo */}
      <div className="header-brand" onClick={() => onTabChange('home')} style={{ cursor: 'pointer' }}>
        <div className="brand-logo-badge">
          <ShieldCheck size={22} className="shield-icon" />
        </div>
        <span className="brand-title font-bold">LoanGuard</span>
      </div>

      {/* Center Navigation Tabs */}
      <nav className="header-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-tab-btn ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => onTabChange(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Right Action Controls */}
      <div className="header-actions">
        <button
          className="theme-toggle-btn"
          onClick={onToggleTheme}
          title={`Switch to ${themeMode === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {themeMode === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <button
          className="header-cta-btn"
          onClick={() => onTabChange('predict')}
        >
          <span>Predict Risk</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </header>
  );
};

export default Header;
