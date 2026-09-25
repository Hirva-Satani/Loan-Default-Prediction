# Loan Default Prediction Using Machine Learning
# Objective: To predict whether a loan applicant is likely to default on a loan based on various financial and demographic factors.

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import LabelEncoder, MinMaxScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn.ensemble import RandomForestClassifier, AdaBoostClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import (
    mean_squared_error, r2_score, accuracy_score, precision_score,
    recall_score, f1_score, confusion_matrix, classification_report
)

def run_pipeline(data_path="Loan_default.csv"):
    # 1. Load Data
    df = pd.read_csv(data_path)
    
    # 2. Data Cleaning
    df.drop_duplicates(inplace=True)
    
    # Column renaming / standardization
    df.columns = [
        'LoanID', 'Age', 'Income', 'LoanAmount', 'CreditScore',
        'MonthsEmployed', 'NumCreditLines', 'InterestRate', 'LoanTerm',
        'DTIRatio', 'Education', 'EmploymentType', 'MaritalStatus',
        'HasMortgage', 'HasDependents', 'LoanPurpose', 'HasCoSigner', 'Default'
    ]

    # 3. Categorical Encoding (Label Encoding)
    le = LabelEncoder()
    cat_cols = ['Education', 'EmploymentType', 'MaritalStatus', 'HasMortgage', 'HasDependents', 'LoanPurpose', 'HasCoSigner']
    for col in cat_cols:
        df[col] = le.fit_transform(df[col])

    # 4. Numerical Scaling (Min-Max Scaling)
    scaler = MinMaxScaler()
    num_cols = ['Age', 'Income', 'LoanAmount', 'CreditScore', 'MonthsEmployed', 'NumCreditLines', 'InterestRate', 'LoanTerm', 'DTIRatio']
    df[num_cols] = scaler.fit_transform(df[num_cols])

    # 5. Features & Target
    X = df.drop(columns=['LoanID', 'Default'])
    y = df['Default']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # 6. Model Training & Evaluation
    # 6.1 Logistic Regression
    lr_model = LogisticRegression(max_iter=1000)
    lr_model.fit(X_train, y_train)
    y_pred_lr = lr_model.predict(X_test)

    lr_acc = accuracy_score(y_test, y_pred_lr)
    lr_prec = precision_score(y_test, y_pred_lr, zero_division=0)
    lr_rec = recall_score(y_test, y_pred_lr, zero_division=0)
    lr_f1 = f1_score(y_test, y_pred_lr, zero_division=0)

    # 6.2 Decision Tree
    dt_model = DecisionTreeClassifier(random_state=42)
    dt_model.fit(X_train, y_train)
    y_pred_dt = dt_model.predict(X_test)

    dt_acc = accuracy_score(y_test, y_pred_dt)
    dt_prec = precision_score(y_test, y_pred_dt, zero_division=0)
    dt_rec = recall_score(y_test, y_pred_dt, zero_division=0)
    dt_f1 = f1_score(y_test, y_pred_dt, zero_division=0)

    # 6.3 Random Forest
    rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
    rf_model.fit(X_train, y_train)
    y_pred_rf = rf_model.predict(X_test)

    rf_acc = accuracy_score(y_test, y_pred_rf)
    rf_prec = precision_score(y_test, y_pred_rf, zero_division=0)
    rf_rec = recall_score(y_test, y_pred_rf, zero_division=0)
    rf_f1 = f1_score(y_test, y_pred_rf, zero_division=0)

    # 6.4 KNN
    knn_model = KNeighborsClassifier(n_neighbors=5)
    knn_model.fit(X_train, y_train)
    y_pred_knn = knn_model.predict(X_test)

    knn_acc = accuracy_score(y_test, y_pred_knn)
    knn_prec = precision_score(y_test, y_pred_knn, zero_division=0)
    knn_rec = recall_score(y_test, y_pred_knn, zero_division=0)
    knn_f1 = f1_score(y_test, y_pred_knn, zero_division=0)

    # 6.5 AdaBoost
    ada_model = AdaBoostClassifier(n_estimators=100, random_state=42)
    ada_model.fit(X_train, y_train)
    y_pred_ada = ada_model.predict(X_test)

    ada_acc = accuracy_score(y_test, y_pred_ada)
    ada_prec = precision_score(y_test, y_pred_ada, zero_division=0)
    ada_rec = recall_score(y_test, y_pred_ada, zero_division=0)
    ada_f1 = f1_score(y_test, y_pred_ada, zero_division=0)

    # Final Comparison Summary
    comparison = pd.DataFrame({
        'Sr. No.': [1, 2, 3, 4, 5],
        'Machine Learning Model': ['Logistic Regression', 'Decision Tree', 'Random Forest', 'K-Nearest Neighbors', 'AdaBoost'],
        'Accuracy (%)': [lr_acc * 100, dt_acc * 100, rf_acc * 100, knn_acc * 100, ada_acc * 100],
        'Precision (%)': [lr_prec * 100, dt_prec * 100, rf_prec * 100, knn_prec * 100, ada_prec * 100],
        'Recall (%)': [lr_rec * 100, dt_rec * 100, rf_rec * 100, knn_rec * 100, ada_rec * 100],
        'F1 Score (%)': [lr_f1 * 100, dt_f1 * 100, rf_f1 * 100, knn_f1 * 100, ada_f1 * 100]
    })

    return comparison

if __name__ == "__main__":
    print("Executing Loan Default Prediction ML Pipeline...")
