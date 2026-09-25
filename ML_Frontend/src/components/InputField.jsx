import React from 'react';

const InputField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  icon: Icon,
  prefix,
  suffix,
  error,
  helpText,
  badgeText,
  min,
  max,
  step,
  readOnly = false
}) => {
  return (
    <div className={`input-group ${error ? 'has-error' : ''}`}>
      <div className="label-container">
        <label htmlFor={name} className="input-label">
          {Icon && <Icon size={16} className="label-icon" />}
          <span>{label}</span>
        </label>
        {badgeText && <span className="input-badge">{badgeText}</span>}
      </div>

      <div className="input-wrapper">
        {prefix && <span className="input-prefix">{prefix}</span>}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          readOnly={readOnly}
          className={`custom-input ${prefix ? 'has-prefix' : ''} ${suffix ? 'has-suffix' : ''}`}
          autoComplete="off"
        />
        {suffix && <span className="input-suffix">{suffix}</span>}
      </div>

      {error ? (
        <span className="error-text">{error}</span>
      ) : helpText ? (
        <span className="help-text">{helpText}</span>
      ) : null}
    </div>
  );
};

export default InputField;
