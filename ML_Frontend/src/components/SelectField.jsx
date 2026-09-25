import React from 'react';
import { ChevronDown } from 'lucide-react';

const SelectField = ({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Select option',
  icon: Icon,
  error
}) => {
  return (
    <div className={`input-group ${error ? 'has-error' : ''}`}>
      <div className="label-container">
        <label htmlFor={name} className="input-label">
          {Icon && <Icon size={16} className="label-icon" />}
          <span>{label}</span>
        </label>
      </div>

      <div className="select-wrapper">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="custom-select"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value || opt} value={opt.value || opt}>
              {opt.label || opt}
            </option>
          ))}
        </select>
        <ChevronDown size={18} className="select-arrow" />
      </div>

      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default SelectField;
