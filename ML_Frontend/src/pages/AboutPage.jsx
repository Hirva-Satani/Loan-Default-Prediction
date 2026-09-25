import React from 'react';
import {
  Sliders,
  HelpCircle,
  Cpu,
  CheckCircle,
  FileCode,
  Layers,
  Database
} from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="about-page-container">
      <section className="about-hero-section text-center">
        <div className="section-pill">MACHINE LEARNING ARCHITECTURE</div>
        <h1 className="hero-main-title">About LoanGuard AI System</h1>
        <p className="hero-description">
          A supervised machine learning application trained on financial loan datasets to predict credit default probability using Logistic Regression.
        </p>
      </section>

      <section className="about-specs-grid">
        <div className="specs-card glass-card">
          <div className="card-top-icon">
            <Cpu size={24} className="accent-text" />
            <h3>Logistic Regression Model</h3>
          </div>
          <p>
            Logistic Regression models the log-odds of binary outcomes. It uses the sigmoid function to map linear combinations of feature values into calibrated default probabilities between 0% and 100%.
          </p>

          <div className="specs-list">
            <div className="spec-item">
              <span className="spec-label">Algorithm</span>
              <span className="spec-val font-bold">Logistic Regression</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Max Iterations</span>
              <span className="spec-val font-bold">max_iter = 1000</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Target Binary Variable</span>
              <span className="spec-val font-bold">Default (0 = No, 1 = Yes)</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Feature Vector Size</span>
              <span className="spec-val font-bold">16 Preprocessed Features</span>
            </div>
          </div>
        </div>

        <div className="specs-card glass-card">
          <div className="card-top-icon">
            <Sliders size={24} className="accent-text" />
            <h3>Data Preprocessing Pipeline</h3>
          </div>
          <p>
            Raw financial dataset records are transformed prior to model training to guarantee mathematical convergence and prevent feature scale dominance.
          </p>

          <div className="pipeline-steps">
            <div className="p-step">
              <span className="p-num">1</span>
              <div>
                <strong>Duplicate Removal</strong>
                <p>Cleans duplicate applicant rows from raw dataset.</p>
              </div>
            </div>

            <div className="p-step">
              <span className="p-num">2</span>
              <div>
                <strong>Label Encoding</strong>
                <p>Encodes categorical columns (Education, Employment, Marital Status, Purpose) into integer matrices.</p>
              </div>
            </div>

            <div className="p-step">
              <span className="p-num">3</span>
              <div>
                <strong>Min-Max Scaling</strong>
                <p>Scales numerical features (Income, Credit Score, DTI) to standardized [0, 1] range.</p>
              </div>
            </div>

            <div className="p-step">
              <span className="p-num">4</span>
              <div>
                <strong>Identifier Exclusion</strong>
                <p>Removes LoanID column to ensure predictions rely strictly on risk metrics.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section glass-card">
        <h2 className="section-title text-center mb-4">Frequently Asked Questions</h2>

        <div className="faq-grid">
          <div className="faq-item">
            <h4><HelpCircle size={16} className="accent-text" /> Where is the python training script stored?</h4>
            <p>
              The complete ML training script is stored in <code>ml/loan_default_prediction.py</code> containing data preprocessing, EDA plots, Linear Regression, Logistic Regression, Decision Tree, Random Forest, KNN, and AdaBoost.
            </p>
          </div>

          <div className="faq-item">
            <h4><HelpCircle size={16} className="accent-text" /> How is LoanID handled?</h4>
            <p>
              LoanID is an arbitrary identifier string. Passing identifiers into supervised models causes overfitting or zero predictive value. It is excluded prior to preprocessing.
            </p>
          </div>

          <div className="faq-item">
            <h4><HelpCircle size={16} className="accent-text" /> Can this frontend connect to a Python Flask / FastAPI backend?</h4>
            <p>
              Yes! The frontend API layer in <code>src/api/predictApi.js</code> is cleanly isolated so you can replace the mock payload with an HTTP <code>POST</code> request to your deployed Python model server.
            </p>
          </div>

          <div className="faq-item">
            <h4><HelpCircle size={16} className="accent-text" /> How are risk categories determined?</h4>
            <p>
              The predicted probability is mapped into 3 standard financial risk tiers: Low Risk (0%–30%), Moderate Risk (31%–60%), and High Risk (61%–100%).
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
