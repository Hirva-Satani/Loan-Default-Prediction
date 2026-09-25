import React from 'react';
import { Database, Binary, Target, BarChart2 } from 'lucide-react';

const ModelInfo = () => {
  return (
    <div className="model-info-card">
      <div className="model-info-header">
        <Database size={18} className="accent-icon" />
        <h3>Model Information</h3>
      </div>

      <div className="model-info-grid">
        <div className="info-item">
          <span className="info-label">
            <Binary size={14} /> Algorithm
          </span>
          <span className="info-value highlight">Logistic Regression</span>
        </div>

        <div className="info-item">
          <span className="info-label">
            <Target size={14} /> Problem Type
          </span>
          <span className="info-value">Binary Classification</span>
        </div>

        <div className="info-item">
          <span className="info-label">
            <Database size={14} /> Target Variable
          </span>
          <span className="info-value">Loan Default (0 / 1)</span>
        </div>

        <div className="info-item">
          <span className="info-label">
            <BarChart2 size={14} /> Output
          </span>
          <span className="info-value">Default Probability %</span>
        </div>
      </div>
    </div>
  );
};

export default ModelInfo;
