import React from 'react';
import { Activity, ShieldAlert, ShieldCheck, Shield, HelpCircle, Loader2, Sparkles } from 'lucide-react';
import ModelInfo from './ModelInfo';

const PredictionCard = ({ result, loading, error }) => {
  const isDefault = result?.prediction === 1 || result?.result === 'Default';

  const radius = 80;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;

  const percentage = typeof result?.riskPercentage === 'number'
    ? Math.min(Math.max(result.riskPercentage, 0), 100)
    : (isDefault ? 100 : 0);
  const progressOffset = circumference - (percentage / 100) * circumference;

  const getRiskTheme = () => {
    if (isDefault) {
      return {
        badgeClass: 'badge-high',
        textClass: 'text-high',
        strokeColor: '#C62828',
        icon: ShieldAlert,
        title: 'Default Risk Detected',
        desc: 'The applicant is predicted to default on the loan based on the provided information.'
      };
    }
    return {
      badgeClass: 'badge-low',
      textClass: 'text-low',
      strokeColor: '#2E7D32',
      icon: ShieldCheck,
      title: 'No Default Predicted',
      desc: 'The applicant is predicted not to default on the loan based on the provided information.'
    };
  };

  const theme = result ? getRiskTheme() : null;
  const RiskIcon = theme ? theme.icon : Shield;

  return (
    <div className="prediction-card-wrapper glass-card">
      <div className="card-header-accent"></div>

      <div className="card-header">
        <div className="header-title-flex">
          <Activity size={20} className="accent-icon" />
          <h2>Prediction Result</h2>
        </div>
        <span className="live-status-pill">
          {loading ? 'Analyzing...' : result ? 'Analysis Complete' : 'Idle'}
        </span>
      </div>

      <div className="card-body">
        {loading && (
          <div className="prediction-state-loading">
            <div className="loader-ring-wrapper">
              <Loader2 size={54} className="spin-icon accent-icon" />
              <div className="loader-pulse-ring"></div>
            </div>
            <h3>Analyzing Applicant...</h3>
            <p>Processing metrics through Random Forest ML model...</p>
          </div>
        )}

        {!loading && !result && (
          <div className="prediction-state-empty">
            <div className="empty-icon-circle">
              <HelpCircle size={42} className="accent-icon" />
            </div>
            <h3>Ready for Analysis</h3>
            <p>
              Complete the applicant information and click <strong>"Predict Default Risk"</strong>.
            </p>
          </div>
        )}

        {!loading && result && (
          <div className="prediction-state-result">
            <div className="risk-title-label">Loan Default Risk</div>

            <div className="circular-gauge-container">
              <svg width="200" height="200" className="gauge-svg">
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  stroke="rgba(255, 214, 186, 0.4)"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                />
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  stroke={theme.strokeColor}
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={progressOffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="gauge-progress-circle"
                  style={{
                    filter: `drop-shadow(0px 0px 8px ${theme.strokeColor})`,
                    transition: 'stroke-dashoffset 0.8s ease-out'
                  }}
                />
              </svg>
              <div className="gauge-center-content">
                <span className="gauge-percentage-number">
                  {typeof result.riskPercentage === 'number'
                    ? `${result.riskPercentage.toFixed(1)}%`
                    : result.result}
                </span>
                <span className="gauge-subtext">Default Probability</span>
              </div>
            </div>

            <div className={`risk-category-badge ${theme.badgeClass}`}>
              <RiskIcon size={18} />
              <span>{result.result}</span>
            </div>

            <div className="risk-message-box">
              <h4 className="risk-message-title">{theme.title}</h4>
              <p className="risk-message-desc">{theme.desc}</p>
            </div>

            <div className="prediction-summary-box">
              <div className="summary-title">Prediction Summary</div>
              <div className="summary-rows">
                <div className="summary-row">
                  <span className="summary-label">Prediction Result</span>
                  <span className={`summary-val ${theme.textClass} font-bold`}>{result.result}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Prediction Target (0/1)</span>
                  <span className="summary-val font-bold">{result.prediction}</span>
                </div>
                {typeof result.riskPercentage === 'number' && (
                  <div className="summary-row">
                    <span className="summary-label">Default Probability</span>
                    <span className="summary-val font-bold">{result.riskPercentage.toFixed(1)}%</span>
                  </div>
                )}
                <div className="summary-row">
                  <span className="summary-label">Model</span>
                  <span className="summary-val">Random Forest</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Prediction Status</span>
                  <span className="summary-val status-analyzed">
                    <Sparkles size={12} /> Analyzed
                  </span>
                </div>
              </div>
            </div>

            <ModelInfo />
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionCard;
