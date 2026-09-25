import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoanInfoPage from './pages/LoanInfoPage';
import PredictionPage from './pages/PredictionPage';
import ModelsComparisonPage from './pages/ModelsComparisonPage';
import AboutPage from './pages/AboutPage';
import { predictRisk } from './api/predictApi';
import './App.css';

const INITIAL_FORM_STATE = {
  Age: '',
  Income: '',
  LoanAmount: '',
  CreditScore: '',
  MonthsEmployed: '',
  NumCreditLines: '',
  InterestRate: '',
  LoanTerm: '',
  DTIRatio: '',
  Education: '',
  EmploymentType: '',
  MaritalStatus: '',
  HasMortgage: '',
  HasDependents: '',
  LoanPurpose: '',
  HasCoSigner: ''
};

const PRESETS = {
  low: {
    Age: 42,
    Income: 125000,
    LoanAmount: 18000,
    CreditScore: 790,
    MonthsEmployed: 72,
    NumCreditLines: 4,
    InterestRate: 4.5,
    LoanTerm: 36,
    DTIRatio: 0.18,
    Education: "Master's",
    EmploymentType: "Full-time",
    MaritalStatus: "Married",
    HasMortgage: "Yes",
    HasDependents: "Yes",
    LoanPurpose: "Home",
    HasCoSigner: "Yes"
  },
  medium: {
    Age: 31,
    Income: 55000,
    LoanAmount: 22000,
    CreditScore: 640,
    MonthsEmployed: 24,
    NumCreditLines: 3,
    InterestRate: 38.2,
    LoanTerm: 48,
    DTIRatio: 0.38,
    Education: "Bachelor's",
    EmploymentType: "Full-time",
    MaritalStatus: "Single",
    HasMortgage: "No",
    HasDependents: "No",
    LoanPurpose: "Auto",
    HasCoSigner: "No"
  },
  high: {
    Age: 22,
    Income: 18000,
    LoanAmount: 1200000,
    CreditScore: 480,
    MonthsEmployed: 2,
    NumCreditLines: 8,
    InterestRate: 22.5,
    LoanTerm: 60,
    DTIRatio: 0.85,
    Education: "High School",
    EmploymentType: "Unemployed",
    MaritalStatus: "Single",
    HasMortgage: "No",
    HasDependents: "Yes",
    LoanPurpose: "Other",
    HasCoSigner: "No"
  }
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [themeMode, setThemeMode] = useState('light');
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleLoadPreset = (type) => {
    if (PRESETS[type]) {
      setFormData(PRESETS[type]);
      setErrors({});
      setPredictionResult(null);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.Age && formData.Age !== 0) {
      newErrors.Age = 'Age is required.';
    } else {
      const ageVal = Number(formData.Age);
      if (isNaN(ageVal) || ageVal < 18 || ageVal > 100) {
        newErrors.Age = 'Age must be between 18 and 100.';
      }
    }

    if (!formData.Income && formData.Income !== 0) {
      newErrors.Income = 'Annual income is required.';
    } else if (Number(formData.Income) < 0) {
      newErrors.Income = 'Income cannot be negative.';
    }

    if (!formData.LoanAmount && formData.LoanAmount !== 0) {
      newErrors.LoanAmount = 'Loan amount is required.';
    } else if (Number(formData.LoanAmount) < 0) {
      newErrors.LoanAmount = 'Loan Amount cannot be negative.';
    }

    if (!formData.CreditScore && formData.CreditScore !== 0) {
      newErrors.CreditScore = 'Credit score is required.';
    } else {
      const csVal = Number(formData.CreditScore);
      if (isNaN(csVal) || csVal < 300 || csVal > 850) {
        newErrors.CreditScore = 'Credit Score must be between 300 and 850.';
      }
    }

    if (!formData.MonthsEmployed && formData.MonthsEmployed !== 0) {
      newErrors.MonthsEmployed = 'Months employed is required.';
    } else if (Number(formData.MonthsEmployed) < 0) {
      newErrors.MonthsEmployed = 'Months Employed cannot be negative.';
    }

    if (!formData.NumCreditLines && formData.NumCreditLines !== 0) {
      newErrors.NumCreditLines = 'Number of credit lines is required.';
    } else if (Number(formData.NumCreditLines) < 0) {
      newErrors.NumCreditLines = 'Cannot be negative.';
    }

    if (!formData.InterestRate && formData.InterestRate !== 0) {
      newErrors.InterestRate = 'Interest rate is required.';
    } else if (Number(formData.InterestRate) < 0) {
      newErrors.InterestRate = 'Interest Rate cannot be negative.';
    }

    if (!formData.LoanTerm && formData.LoanTerm !== 0) {
      newErrors.LoanTerm = 'Loan term is required.';
    } else if (Number(formData.LoanTerm) <= 0) {
      newErrors.LoanTerm = 'Loan Term must be greater than 0.';
    }

    if (!formData.DTIRatio && formData.DTIRatio !== 0) {
      newErrors.DTIRatio = 'DTI ratio is required.';
    } else if (Number(formData.DTIRatio) < 0) {
      newErrors.DTIRatio = 'DTI Ratio cannot be negative.';
    }

    if (!formData.Education) newErrors.Education = 'Please select Education level.';
    if (!formData.EmploymentType) newErrors.EmploymentType = 'Please select Employment Type.';
    if (!formData.MaritalStatus) newErrors.MaritalStatus = 'Please select Marital Status.';
    if (!formData.HasMortgage) newErrors.HasMortgage = 'Please select Mortgage status.';
    if (!formData.HasDependents) newErrors.HasDependents = 'Please select Dependents status.';
    if (!formData.LoanPurpose) newErrors.LoanPurpose = 'Please select Loan Purpose.';
    if (!formData.HasCoSigner) newErrors.HasCoSigner = 'Please select Co-Signer status.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setLoading(true);
    setPredictionResult(null);

    try {
      const res = await predictRisk(formData);
      setPredictionResult(res);

      if (window.innerWidth < 1024) {
        const resultElement = document.querySelector('.prediction-card-wrapper');
        if (resultElement) {
          resultElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } catch (err) {
      console.error('Prediction error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_STATE);
    setErrors({});
    setPredictionResult(null);
    setLoading(false);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      <div className="ambient-bg">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="app-layout">
        <Header
          activeTab={activeTab}
          onTabChange={handleTabChange}
          themeMode={themeMode}
          onToggleTheme={toggleTheme}
        />

        <main className="main-content-view">
          {activeTab === 'home' && <HomePage onNavigate={handleTabChange} />}
          {activeTab === 'info' && <LoanInfoPage onNavigate={handleTabChange} />}
          {activeTab === 'predict' && (
            <PredictionPage
              formData={formData}
              onChange={handleChange}
              onSubmit={handleSubmit}
              onReset={handleReset}
              onLoadPreset={handleLoadPreset}
              errors={errors}
              loading={loading}
              predictionResult={predictionResult}
            />
          )}
          {activeTab === 'models' && <ModelsComparisonPage onNavigate={handleTabChange} />}
          {activeTab === 'about' && <AboutPage />}
        </main>

        <footer className="app-footer">
          <p>© 2026 LoanGuard AI • Supervised Machine Learning Logistic Regression System</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
