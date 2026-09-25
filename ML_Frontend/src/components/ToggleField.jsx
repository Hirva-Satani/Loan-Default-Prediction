import React from 'react';

const ToggleField = ({
  label,
  name,
  value,
  onChange,
  icon: Icon,
  error,
  options = ['Yes', 'No']
}) => {
  return (
    <div className={`input-group ${error ? 'has-error' : ''}`}>
      <div className="label-container">
        <label className="input-label">
          {Icon && <Icon size={16} className="label-icon" />}
          <span>{label}</span>
        </label>
      </div>

      <div className="segmented-control">
        {options.map((option) => {
          const isSelected = value === option;
          return (
            <button
              type="button"
              key={option}
              className={`segment-btn ${isSelected ? 'active' : ''}`}
              onClick={() => onChange({ target: { name, value: option } })}
            >
              <span className={`segment-radio ${isSelected ? 'selected' : ''}`}></span>
              <span>{option}</span>
            </button>
          );
        })}
      </div>

      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default ToggleField;
