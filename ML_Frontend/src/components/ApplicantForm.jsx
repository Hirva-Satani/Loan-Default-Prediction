import React from 'react';
import {
  Calendar,
  DollarSign,
  CreditCard,
  Briefcase,
  Percent,
  Clock,
  Users,
  Home,
  GraduationCap,
  Heart,
  Sparkles,
  RotateCcw,
  User,
  Zap,
  FileText
} from 'lucide-react';

import InputField from './InputField';
import SelectField from './SelectField';
import ToggleField from './ToggleField';

const ApplicantForm = ({
  formData,
  onChange,
  onSubmit,
  onReset,
  onLoadPreset,
  errors = {},
  loading = false
}) => {
  return (
    <div className="form-card glass-card">
      <div className="card-header">
        <div>
          <h2 className="form-card-title">Applicant Information</h2>
          <p className="form-card-subtitle">
            Provide accurate financial and demographic details for a reliable default risk prediction.
          </p>
        </div>

        <div className="preset-buttons">
          <span className="preset-label">
            <Zap size={14} className="accent-icon" /> Demo Profiles:
          </span>
          <button
            type="button"
            className="preset-btn preset-low"
            onClick={() => onLoadPreset('low')}
            title="Load Low Risk Applicant Profile"
          >
            Low Risk
          </button>
          <button
            type="button"
            className="preset-btn preset-medium"
            onClick={() => onLoadPreset('medium')}
            title="Load Moderate Risk Applicant Profile"
          >
            Moderate Risk
          </button>
          <button
            type="button"
            className="preset-btn preset-high"
            onClick={() => onLoadPreset('high')}
            title="Load High Risk Applicant Profile"
          >
            High Risk
          </button>
        </div>
      </div>

      <form onSubmit={onSubmit} noValidate>
        {/* SECTION A */}
        <div className="form-section">
          <div className="section-header">
            <User size={18} className="section-icon" />
            <h3 className="section-title">Section A — Personal Information</h3>
          </div>

          <div className="form-grid">
            <InputField
              label="Age"
              name="Age"
              type="number"
              value={formData.Age}
              onChange={onChange}
              placeholder="Enter applicant age"
              icon={Calendar}
              min={18}
              max={100}
              error={errors.Age}
            />

            <SelectField
              label="Education"
              name="Education"
              value={formData.Education}
              onChange={onChange}
              placeholder="Select Education"
              icon={GraduationCap}
              options={["High School", "Bachelor's", "Master's", "PhD"]}
              error={errors.Education}
            />

            <SelectField
              label="Employment Type"
              name="EmploymentType"
              value={formData.EmploymentType}
              onChange={onChange}
              placeholder="Select Employment Type"
              icon={Briefcase}
              options={["Full-time", "Part-time", "Self-employed", "Unemployed"]}
              error={errors.EmploymentType}
            />

            <SelectField
              label="Marital Status"
              name="MaritalStatus"
              value={formData.MaritalStatus}
              onChange={onChange}
              placeholder="Select Marital Status"
              icon={Heart}
              options={["Single", "Married", "Divorced"]}
              error={errors.MaritalStatus}
            />

            <ToggleField
              label="Has Dependents"
              name="HasDependents"
              value={formData.HasDependents}
              onChange={onChange}
              icon={Users}
              options={["Yes", "No"]}
              error={errors.HasDependents}
            />
          </div>
        </div>

        {/* SECTION B */}
        <div className="form-section">
          <div className="section-header">
            <DollarSign size={18} className="section-icon" />
            <h3 className="section-title">Section B — Financial Information</h3>
          </div>

          <div className="form-grid">
            <InputField
              label="Annual Income"
              name="Income"
              type="number"
              value={formData.Income}
              onChange={onChange}
              placeholder="Enter annual income"
              icon={DollarSign}
              prefix="$"
              min={0}
              error={errors.Income}
            />

            <InputField
              label="Credit Score"
              name="CreditScore"
              type="number"
              value={formData.CreditScore}
              onChange={onChange}
              placeholder="Enter credit score (300-850)"
              icon={CreditCard}
              min={300}
              max={850}
              error={errors.CreditScore}
            />

            <InputField
              label="Months Employed"
              name="MonthsEmployed"
              type="number"
              value={formData.MonthsEmployed}
              onChange={onChange}
              placeholder="Enter months employed"
              icon={Clock}
              suffix="months"
              min={0}
              error={errors.MonthsEmployed}
            />

            <InputField
              label="Number of Credit Lines"
              name="NumCreditLines"
              type="number"
              value={formData.NumCreditLines}
              onChange={onChange}
              placeholder="Enter number of credit lines"
              icon={CreditCard}
              min={0}
              error={errors.NumCreditLines}
            />

            <InputField
              label="Debt-to-Income (DTI) Ratio"
              name="DTIRatio"
              type="number"
              step="0.01"
              value={formData.DTIRatio}
              onChange={onChange}
              placeholder="Enter DTI ratio (e.g. 0.35)"
              icon={Percent}
              min={0}
              max={1}
              helpText="Allow decimal values (0.0 to 1.0)"
              error={errors.DTIRatio}
            />

            <ToggleField
              label="Has Mortgage"
              name="HasMortgage"
              value={formData.HasMortgage}
              onChange={onChange}
              icon={Home}
              options={["Yes", "No"]}
              error={errors.HasMortgage}
            />
          </div>
        </div>

        {/* SECTION C */}
        <div className="form-section">
          <div className="section-header">
            <FileText size={18} className="section-icon" />
            <h3 className="section-title">Section C — Loan Information</h3>
          </div>

          <div className="form-grid">
            <InputField
              label="Loan Amount"
              name="LoanAmount"
              type="number"
              value={formData.LoanAmount}
              onChange={onChange}
              placeholder="Enter requested loan amount"
              icon={DollarSign}
              prefix="$"
              min={0}
              error={errors.LoanAmount}
            />

            <InputField
              label="Interest Rate"
              name="InterestRate"
              type="number"
              step="0.1"
              value={formData.InterestRate}
              onChange={onChange}
              placeholder="Enter interest rate"
              icon={Percent}
              suffix="%"
              min={0}
              error={errors.InterestRate}
            />

            <InputField
              label="Loan Term"
              name="LoanTerm"
              type="number"
              value={formData.LoanTerm}
              onChange={onChange}
              placeholder="Enter loan term"
              icon={Clock}
              suffix="months"
              min={1}
              error={errors.LoanTerm}
            />

            <SelectField
              label="Loan Purpose"
              name="LoanPurpose"
              value={formData.LoanPurpose}
              onChange={onChange}
              placeholder="Select Loan Purpose"
              icon={FileText}
              options={["Home", "Auto", "Education", "Business", "Personal"]}
              error={errors.LoanPurpose}
            />

            <ToggleField
              label="Has Co-Signer"
              name="HasCoSigner"
              value={formData.HasCoSigner}
              onChange={onChange}
              icon={Users}
              options={["Yes", "No"]}
              error={errors.HasCoSigner}
            />
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="form-actions">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary predict-btn"
          >
            {loading ? (
              <>
                <span className="btn-spinner"></span>
                <span>Analyzing Applicant...</span>
              </>
            ) : (
              <>
                <Sparkles size={18} />
                <span>🔮 Predict Default Risk</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onReset}
            disabled={loading}
            className="btn-secondary reset-btn"
          >
            <RotateCcw size={16} />
            <span>↻ Reset Form</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicantForm;
