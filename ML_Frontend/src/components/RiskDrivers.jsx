import React from 'react';
import { AlertCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

const RiskDrivers = ({ drivers = [] }) => {
  if (!drivers || drivers.length === 0) return null;

  return (
    <div className="risk-drivers-container">
      <h4 className="drivers-title">Key Risk Drivers & Factors</h4>
      <div className="drivers-list">
        {drivers.map((driver, idx) => (
          <div key={idx} className={`driver-item ${driver.impact.toLowerCase().replace(' ', '-')}`}>
            <div className="driver-icon">
              {driver.impact.includes('Mitigating') ? (
                <ShieldCheck size={16} className="text-success" />
              ) : driver.impact.includes('Critical') ? (
                <AlertCircle size={16} className="text-danger" />
              ) : (
                <AlertTriangle size={16} className="text-warning" />
              )}
            </div>
            <div className="driver-details">
              <div className="driver-top">
                <span className="driver-name">{driver.name}</span>
                <span className="driver-impact-badge">{driver.impact}</span>
              </div>
              <p className="driver-text">{driver.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskDrivers;
