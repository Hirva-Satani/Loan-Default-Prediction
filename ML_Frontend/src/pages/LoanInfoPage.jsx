import React, { useState } from 'react';
import {
  BookOpen,
  CreditCard,
  Percent,
  Briefcase,
  Users,
  DollarSign,
  Calendar,
  GraduationCap,
  Heart,
  Home,
  Clock,
  FileText
} from 'lucide-react';

const LoanInfoPage = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const featuresList = [
    {
      name: 'Age',
      category: 'personal',
      icon: Calendar,
      type: 'Numerical (18 - 100)',
      description: 'Applicant age at application. Correlated with earnings history and borrowing stability.',
      impact: 'Moderate Impact'
    },
    {
      name: 'Education',
      category: 'personal',
      icon: GraduationCap,
      type: 'Categorical (High School, Bachelor\'s, Master\'s, PhD)',
      description: 'Highest educational level achieved. Higher education levels correlate with median career earnings.',
      impact: 'High Impact'
    },
    {
      name: 'Employment Type',
      category: 'personal',
      icon: Briefcase,
      type: 'Categorical (Full-time, Part-time, Self-employed, Unemployed)',
      description: 'Employment status. Full-time employment provides stable debt repayment capacity.',
      impact: 'Critical Impact'
    },
    {
      name: 'Marital Status',
      category: 'personal',
      icon: Heart,
      type: 'Categorical (Single, Married, Divorced)',
      description: 'Marital status of applicant. Combined household earnings often lower individual default risk.',
      impact: 'Low Impact'
    },
    {
      name: 'Has Dependents',
      category: 'personal',
      icon: Users,
      type: 'Binary (Yes / No)',
      description: 'Whether applicant supports financial dependents. Increases monthly baseline cost obligations.',
      impact: 'Moderate Impact'
    },
    {
      name: 'Annual Income',
      category: 'financial',
      icon: DollarSign,
      type: 'Numerical ($)',
      description: 'Total annual gross income. Primary metric determining maximum borrowable capacity.',
      impact: 'Critical Impact'
    },
    {
      name: 'Credit Score',
      category: 'financial',
      icon: CreditCard,
      type: 'Numerical (300 - 850)',
      description: 'FICO/Experian credit score rating. Strongest predictor of historical debt repayment discipline.',
      impact: 'Critical Impact'
    },
    {
      name: 'Months Employed',
      category: 'financial',
      icon: Clock,
      type: 'Numerical (Months)',
      description: 'Tenure in current job role. Longer tenure signifies stable income flow.',
      impact: 'High Impact'
    },
    {
      name: 'Number of Credit Lines',
      category: 'financial',
      icon: CreditCard,
      type: 'Numerical (Count)',
      description: 'Active credit lines and loans. Excessive open lines may indicate over-reliance on credit.',
      impact: 'Moderate Impact'
    },
    {
      name: 'Debt-to-Income (DTI) Ratio',
      category: 'financial',
      icon: Percent,
      type: 'Numerical (Decimal 0.0 - 1.0)',
      description: 'Percentage of monthly income allocated to debt payments. High DTI (> 40%) signals financial strain.',
      impact: 'Critical Impact'
    },
    {
      name: 'Has Mortgage',
      category: 'financial',
      icon: Home,
      type: 'Binary (Yes / No)',
      description: 'Indicates active home ownership or mortgage obligations.',
      impact: 'Moderate Impact'
    },
    {
      name: 'Loan Amount',
      category: 'loan',
      icon: DollarSign,
      type: 'Numerical ($)',
      description: 'Requested principal loan amount. High principal relative to income elevates default probability.',
      impact: 'Critical Impact'
    },
    {
      name: 'Interest Rate',
      category: 'loan',
      icon: Percent,
      type: 'Numerical (%)',
      description: 'Annual percentage rate applied to principal. Higher interest rates raise monthly installment burden.',
      impact: 'High Impact'
    },
    {
      name: 'Loan Term',
      category: 'loan',
      icon: Clock,
      type: 'Numerical (Months)',
      description: 'Repayment term (e.g. 12, 36, 60 months). Longer terms increase cumulative default risk exposure.',
      impact: 'High Impact'
    },
    {
      name: 'Loan Purpose',
      category: 'loan',
      icon: FileText,
      type: 'Categorical (Home, Auto, Education, Business, Personal)',
      description: 'Intended use of funds. Asset-backed purposes (Home, Auto) carry lower risk than personal loans.',
      impact: 'Moderate Impact'
    },
    {
      name: 'Has Co-Signer',
      category: 'loan',
      icon: Users,
      type: 'Binary (Yes / No)',
      description: 'Secondary guarantor on loan contract. Drastically lowers default risk for borderline applicants.',
      impact: 'High Mitigating Factor'
    }
  ];

  const filteredFeatures = activeCategory === 'all'
    ? featuresList
    : featuresList.filter((f) => f.category === activeCategory);

  return (
    <div className="loan-info-page">
      <section className="info-hero-section">
        <div className="section-pill">FINANCIAL LITERACY GUIDE</div>
        <h1 className="hero-main-title">Understanding Loan Default Risk Parameters</h1>
        <p className="hero-description">
          Explore the 16 core financial and demographic variables utilized by our machine learning models to evaluate creditworthiness.
        </p>
      </section>

      <section className="benchmarks-table-section">
        <h2 className="section-title">Risk Tier Thresholds</h2>

        <div className="benchmarks-grid">
          <div className="benchmark-card glass-card">
            <div className="card-top-icon">
              <CreditCard size={20} className="accent-text" />
              <h3>Credit Score Brackets</h3>
            </div>
            <div className="benchmark-table">
              <div className="row header-row">
                <span>Range</span>
                <span>Tier</span>
                <span>Risk Level</span>
              </div>
              <div className="row">
                <span>740 - 850</span>
                <span className="font-bold text-success">Super Prime</span>
                <span className="chip chip-low">Low</span>
              </div>
              <div className="row">
                <span>670 - 739</span>
                <span className="font-bold">Prime</span>
                <span className="chip chip-low">Low</span>
              </div>
              <div className="row">
                <span>580 - 669</span>
                <span className="font-bold text-warning">Near Prime</span>
                <span className="chip chip-medium">Moderate</span>
              </div>
              <div className="row">
                <span>300 - 579</span>
                <span className="font-bold text-danger">Subprime</span>
                <span className="chip chip-high">High</span>
              </div>
            </div>
          </div>

          <div className="benchmark-card glass-card">
            <div className="card-top-icon">
              <Percent size={20} className="accent-text" />
              <h3>DTI Ratio Thresholds</h3>
            </div>
            <div className="benchmark-table">
              <div className="row header-row">
                <span>DTI Ratio</span>
                <span>Status</span>
                <span>Lender Assessment</span>
              </div>
              <div className="row">
                <span>&lt; 20%</span>
                <span className="font-bold text-success">Excellent</span>
                <span className="chip chip-low">Optimal</span>
              </div>
              <div className="row">
                <span>20% - 35%</span>
                <span className="font-bold">Good</span>
                <span className="chip chip-low">Manageable</span>
              </div>
              <div className="row">
                <span>36% - 49%</span>
                <span className="font-bold text-warning">Elevated</span>
                <span className="chip chip-medium">Review Required</span>
              </div>
              <div className="row">
                <span>50%+</span>
                <span className="font-bold text-danger">Critical</span>
                <span className="chip chip-high">High Risk</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="catalog-section">
        <div className="catalog-header">
          <div>
            <h2 className="section-title">Complete 16 Feature Dictionary</h2>
            <p className="section-subtitle">Detailed breakdown of input variables fed into the ML models.</p>
          </div>

          <div className="category-filter-pills">
            <button
              className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All Features (16)
            </button>
            <button
              className={`filter-btn ${activeCategory === 'personal' ? 'active' : ''}`}
              onClick={() => setActiveCategory('personal')}
            >
              Personal & Demographics
            </button>
            <button
              className={`filter-btn ${activeCategory === 'financial' ? 'active' : ''}`}
              onClick={() => setActiveCategory('financial')}
            >
              Financial Profile
            </button>
            <button
              className={`filter-btn ${activeCategory === 'loan' ? 'active' : ''}`}
              onClick={() => setActiveCategory('loan')}
            >
              Loan Terms
            </button>
          </div>
        </div>

        <div className="features-grid">
          {filteredFeatures.map((feat, idx) => {
            const FeatureIcon = feat.icon;
            return (
              <div key={idx} className="feature-dictionary-card glass-card">
                <div className="card-header-flex">
                  <div className="feat-icon-box">
                    <FeatureIcon size={18} />
                  </div>
                  <div>
                    <h4 className="feat-name">{feat.name}</h4>
                    <span className="feat-type">{feat.type}</span>
                  </div>
                </div>
                <p className="feat-desc">{feat.description}</p>
                <div className="feat-footer">
                  <span className="impact-tag">{feat.impact}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="info-cta-banner glass-card">
        <h3>Ready to test your loan metrics?</h3>
        <p>Input applicant metrics into our real-time ML prediction engine.</p>
        <button className="cta-btn primary-cta" onClick={() => onNavigate('predict')}>
          <span>Go to Prediction Form</span>
        </button>
      </section>
    </div>
  );
};

export default LoanInfoPage;
