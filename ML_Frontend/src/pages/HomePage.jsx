import React, { useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Activity,
  BarChart3,
  TrendingUp,
  Sliders,
  CheckCircle2,
  Percent,
  CreditCard,
  Briefcase,
  Users,
  DollarSign,
  Cpu,
  Zap,
  BookOpen,
  Award,
  Check,
  ChevronRight
} from 'lucide-react';

const HomePage = ({ onNavigate }) => {
  const [heroCreditScore, setHeroCreditScore] = useState(720);
  const [heroDTI, setHeroDTI] = useState(25);
  const [heroIncome, setHeroIncome] = useState(75000);

  const calculateHeroRisk = () => {
    const csFactor = (850 - heroCreditScore) / 550;
    const dtiFactor = heroDTI / 60;
    const incomeFactor = Math.max(0, 1 - heroIncome / 150000);
    const score = Math.round((csFactor * 45 + dtiFactor * 35 + incomeFactor * 20) * 10) / 10;
    return Math.max(2.1, Math.min(88.5, score));
  };

  const calculatedRisk = calculateHeroRisk();
  const getRiskLabel = (val) => {
    if (val > 60) return { label: 'High Risk', class: 'chip-high' };
    if (val > 30) return { label: 'Moderate Risk', class: 'chip-medium' };
    return { label: 'Low Risk', class: 'chip-low' };
  };

  const riskStatus = getRiskLabel(calculatedRisk);

  return (
    <div className="home-page-container">
      {/* HERO SECTION */}
      <section className="fresh-hero-section glass-card">
        <div className="hero-left-content">
          <div className="hero-pill-badge">
            <Sparkles size={14} className="accent-text" />
            <span>Next-Generation Credit Risk Intelligence</span>
          </div>

          <h1 className="fresh-hero-title">
            Smart Default Risk Intelligence <br />
            <span className="title-highlight">for Modern Lending</span>
          </h1>

          <p className="fresh-hero-subtitle">
            Empowering lenders and credit analysts with real-time probabilistic default risk evaluation powered by calibrated machine learning classification.
          </p>

          <div className="hero-stats-row">
            <div className="stat-box">
              <span className="stat-number">88.67%</span>
              <span className="stat-label">Top Model Accuracy</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-box">
              <span className="stat-number">16</span>
              <span className="stat-label">Evaluated Parameters</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-box">
              <span className="stat-number">5</span>
              <span className="stat-label">Trained ML Models</span>
            </div>
          </div>

          <div className="hero-cta-group">
            <button className="cta-btn primary-cta" onClick={() => onNavigate('predict')}>
              <span>Start Risk Diagnostic</span>
              <ArrowRight size={18} />
            </button>
            <button className="cta-btn secondary-cta" onClick={() => onNavigate('models')}>
              <BarChart3 size={18} />
              <span>Compare 5 ML Models</span>
            </button>
          </div>
        </div>

        {/* Right Side Simulator */}
        <div className="hero-simulator-card">
          <div className="simulator-header">
            <div className="sim-title-group">
              <Activity size={18} className="accent-text" />
              <h3>Instant Risk Simulator</h3>
            </div>
            <span className="sim-badge">Live Interactive</span>
          </div>

          <div className="simulator-body">
            <div className="sim-input-group">
              <div className="sim-label-flex">
                <span>Credit Score</span>
                <span className="sim-val font-bold">{heroCreditScore}</span>
              </div>
              <input
                type="range"
                min="300"
                max="850"
                value={heroCreditScore}
                onChange={(e) => setHeroCreditScore(Number(e.target.value))}
                className="sim-slider"
              />
            </div>

            <div className="sim-input-group">
              <div className="sim-label-flex">
                <span>Debt-to-Income (DTI)</span>
                <span className="sim-val font-bold">{heroDTI}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="60"
                value={heroDTI}
                onChange={(e) => setHeroDTI(Number(e.target.value))}
                className="sim-slider"
              />
            </div>

            <div className="sim-input-group">
              <div className="sim-label-flex">
                <span>Annual Income</span>
                <span className="sim-val font-bold">${heroIncome.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="15000"
                max="200000"
                step="5000"
                value={heroIncome}
                onChange={(e) => setHeroIncome(Number(e.target.value))}
                className="sim-slider"
              />
            </div>

            <div className="simulator-output-box">
              <div className="out-left">
                <span className="out-label">Estimated Default Probability</span>
                <span className="out-val">{calculatedRisk}%</span>
              </div>
              <span className={`risk-chip ${riskStatus.class}`}>{riskStatus.label}</span>
            </div>

            <button className="sim-launch-btn" onClick={() => onNavigate('predict')}>
              <span>Full 16-Variable Prediction Form</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 3 PILLARS SECTION */}
      <section className="pillars-section">
        <div className="section-header-center">
          <div className="section-pill">INTELLIGENCE FRAMEWORK</div>
          <h2 className="section-title">The 3 Pillars of Loan Default Assessment</h2>
          <p className="section-subtitle">
            Our machine learning algorithm analyzes key borrower dimensions to build a complete risk profile.
          </p>
        </div>

        <div className="pillars-grid">
          <div className="pillar-card glass-card">
            <div className="pillar-num-badge">PILLAR 01</div>
            <div className="pillar-icon-circle">
              <CreditCard size={26} />
            </div>
            <h3>Borrower Credit Reliability</h3>
            <p>
              Examines historical credit behavior, credit score index (300-850), and active credit lines to evaluate debt management discipline.
            </p>
            <ul className="pillar-checklist">
              <li><Check size={14} className="accent-text" /> Credit Score Tier Analysis</li>
              <li><Check size={14} className="accent-text" /> Debt-to-Income Obligation</li>
              <li><Check size={14} className="accent-text" /> Credit Line Utilization</li>
            </ul>
          </div>

          <div className="pillar-card glass-card">
            <div className="pillar-num-badge">PILLAR 02</div>
            <div className="pillar-icon-circle">
              <Briefcase size={26} />
            </div>
            <h3>Employment & Income Stability</h3>
            <p>
              Quantifies cash flow capacity by auditing annual gross earnings, current job tenure, and employment contract stability.
            </p>
            <ul className="pillar-checklist">
              <li><Check size={14} className="accent-text" /> Annual Income Capacity</li>
              <li><Check size={14} className="accent-text" /> Employment Tenure (Months)</li>
              <li><Check size={14} className="accent-text" /> Contract Category Evaluation</li>
            </ul>
          </div>

          <div className="pillar-card glass-card">
            <div className="pillar-num-badge">PILLAR 03</div>
            <div className="pillar-icon-circle">
              <ShieldCheck size={26} />
            </div>
            <h3>Loan Structure & Guarantees</h3>
            <p>
              Evaluates specific loan terms including requested principal, interest rate, term length, loan purpose, and co-signer guarantees.
            </p>
            <ul className="pillar-checklist">
              <li><Check size={14} className="accent-text" /> Loan-to-Income Exposure</li>
              <li><Check size={14} className="accent-text" /> Interest Rate Burden (%)</li>
              <li><Check size={14} className="accent-text" /> Co-Signer Risk Mitigation</li>
            </ul>
          </div>
        </div>
      </section>

      {/* MODEL HIGHLIGHTS */}
      <section className="model-highlights-section glass-card">
        <div className="highlights-grid">
          <div className="highlight-left">
            <div className="section-pill">MACHINE LEARNING EVALUATION</div>
            <h2 className="section-title">Comprehensive Model Benchmarking</h2>
            <p className="section-subtitle">
              We trained and evaluated 5 distinct ML classifiers (Logistic Regression, Decision Tree, Random Forest, KNN, and AdaBoost) to select the optimal model.
            </p>
            <button className="cta-btn primary-cta" onClick={() => onNavigate('models')}>
              <span>Explore Model Comparison Table</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="highlight-right-cards">
            <div className="mini-highlight-card">
              <div className="h-icon"><Sliders size={20} /></div>
              <div>
                <h4>Random Forest Classifier</h4>
                <p>Achieves top overall accuracy (88.67%) and highest precision (62.81%).</p>
              </div>
            </div>

            <div className="mini-highlight-card">
              <div className="h-icon"><Award size={20} /></div>
              <div>
                <h4>Logistic Regression Model</h4>
                <p>Production deployment model providing calibrated sigmoid probabilities (88.59% accuracy).</p>
              </div>
            </div>

            <div className="mini-highlight-card">
              <div className="h-icon"><Zap size={20} /></div>
              <div>
                <h4>Decision Tree Analysis</h4>
                <p>Achieves highest default recall (23.08%) for catching high-risk defaulting applicants.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="home-cta-banner glass-card">
        <div className="banner-content">
          <h3 className="banner-title">Ready to Predict Loan Default Risk?</h3>
          <p className="banner-desc">
            Analyze applicant credentials with our 16-variable ML prediction engine.
          </p>
        </div>
        <button className="cta-btn primary-cta" onClick={() => onNavigate('predict')}>
          <span>Assess Risk Now</span>
          <ArrowRight size={18} />
        </button>
      </section>
    </div>
  );
};

export default HomePage;
