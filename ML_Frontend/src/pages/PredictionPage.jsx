import React from 'react';
import ApplicantForm from '../components/ApplicantForm';
import PredictionCard from '../components/PredictionCard';

const PredictionPage = ({
  formData,
  onChange,
  onSubmit,
  onReset,
  onLoadPreset,
  errors,
  loading,
  predictionResult
}) => {
  return (
    <div className="prediction-page-container">
      <div className="prediction-page-header text-center">
        <div className="section-pill">LIVE DIAGNOSTIC ENGINE</div>
        <h1 className="hero-main-title">Loan Default Risk Assessment</h1>
        <p className="hero-description">
          Enter applicant financial, demographic, and loan parameters below to calculate default probability via Logistic Regression.
        </p>
      </div>

      <div className="main-grid">
        <div className="grid-left">
          <ApplicantForm
            formData={formData}
            onChange={onChange}
            onSubmit={onSubmit}
            onReset={onReset}
            onLoadPreset={onLoadPreset}
            errors={errors}
            loading={loading}
          />
        </div>

        <div className="grid-right">
          <PredictionCard
            result={predictionResult}
            loading={loading}
            error={errors}
          />
        </div>
      </div>
    </div>
  );
};

export default PredictionPage;
