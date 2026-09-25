import React from 'react';

const RiskMeter = ({ percentage = 0, riskLevel = 'LOW RISK' }) => {
  const clamped = Math.max(0, Math.min(100, percentage));

  let statusClass = 'meter-low';
  if (clamped > 60) {
    statusClass = 'meter-high';
  } else if (clamped > 30) {
    statusClass = 'meter-medium';
  }

  return (
    <div className="risk-meter-container">
      <div className="risk-meter-header">
        <span className="risk-meter-title">Risk Scale Meter</span>
        <span className={`risk-meter-value ${statusClass}`}>{clamped.toFixed(1)}%</span>
      </div>

      <div className="risk-meter-bar-track">
        <div className="zone zone-low" style={{ width: '30%' }}></div>
        <div className="zone zone-medium" style={{ width: '30%' }}></div>
        <div className="zone zone-high" style={{ width: '40%' }}></div>

        <div
          className={`risk-meter-pin ${statusClass}`}
          style={{ left: `${clamped}%` }}
        >
          <div className="pin-head"></div>
          <div className="pin-tail"></div>
        </div>
      </div>

      <div className="risk-meter-labels">
        <span className="label-low">Low (0-30%)</span>
        <span className="label-medium">Medium (31-60%)</span>
        <span className="label-high">High (61-100%)</span>
      </div>
    </div>
  );
};

export default RiskMeter;
