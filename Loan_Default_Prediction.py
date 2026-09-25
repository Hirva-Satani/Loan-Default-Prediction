#!/usr/bin/env python
# coding: utf-8

# # Loan Default Prediction Using Machine Learning

# #### Objective
# #### To predict whether a loan applicant is likely to default on a loan based on various financial and demographic factors.

# In[1]:


import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns


# In[2]:


df=pd.read_csv("Loan_default.csv")


# In[3]:


df


# In[4]:


df.head()


# In[5]:


df.tail()


# In[6]:


df.shape


# In[7]:


df.columns


# In[8]:


df.info()


# In[9]:


df.describe()


# In[10]:


df.dtypes


# ## Data Cleaning

# In[11]:


#numerical columns
print("Numericals Columns:")
print(df.select_dtypes(include=np.number).columns.tolist())


# In[12]:


#categorical columns
print("Categorical Columns:")
print(df.select_dtypes(include='object').columns.tolist())


# In[13]:


#columns have missing values and how many.
df.isnull().sum() 


# In[14]:


#duplicate values
df.duplicated().sum()


# In[15]:


df.drop_duplicates(inplace=True)


# ## EDA(Exploratory Data Analysis)
# #### EDA helps understand patterns and relationships in the Data

# In[16]:


df['Default'].value_counts()


# In[17]:


sns.countplot(x='Default',data=df)
plt.title("Loan Default Distribution")
plt.show()


# In[18]:


sns.boxplot(x="Default",y="CreditScore",data=df)
plt.title("Credit Score V/S Loan Default")
plt.show()


# In[19]:


plt.figure(figsize=(8,5))
sns.histplot(df['LoanAmount'],bins=20,kde=True)
plt.title("Loan Amount Distribution")
plt.show()


# In[20]:


default_rate=df.groupby('Age')['Default'].mean()

plt.figure(figsize=(10,5))
plt.plot(default_rate.index,default_rate.values)
plt.title("Default Rate by Age")
plt.xlabel("Age")
plt.ylabel("Default Rate")
plt.grid(True)
plt.show()


# ## Observation
- The Loan Default Prediction dataset contains 255,347 records and 18 attributes.
- The dataset includes both numerical and categorical features relevant to loan prediction.
- No missing values were found during data cleaning, indicating good data quality.
- Duplicate records and data types were checked to ensure consistency and reliability.
- Important numerical features include Income, LoanAmount, CreditScore, InterestRate, and DTIRatio.
- EDA was performed using histograms, count plots, box plots, and line charts.
- The analysis helped understand data distribution and relationships between different features.
- The target variable Default indicates whether a borrower has defaulted on a loan, making it a binary classification problem.
- The dataset is clean, well-structured, and suitable for machine learning model development.
# # (TASK-2) 
# ## Pre-Processing

# In[21]:


df.columns = [
    'LoanID',
    'Age',
    'Income',
    'LoanAmount',
    'CreditScore',
    'MonthsEmployed',
    'NumCreditLines',
    'InterestRate',
    'LoanTerm',
    'DTIRatio',
    'Education',
    'EmploymentType',
    'MaritalStatus',
    'HasMortgage',
    'HasDependents',
    'LoanPurpose',
    'HasCoSigner',
    'Default'
]


# In[22]:


df.columns


# #### Outlier Detection (IQR Method)

# In[23]:


# Income
Q1=df['Income'].quantile(0.25)
Q3=df['Income'].quantile(0.75)

IQR=Q3-Q1

lower=Q1-1.5*IQR
upper=Q1+1.5*IQR

outliers=df[(df['Income']<lower) | (df['Income']>upper)]
print("Number of Outliers:",len(outliers))


# In[24]:


sns.boxplot(x=df['Income'])
plt.show()


# In[25]:


# Loan Amount
Q1=df['LoanAmount'].quantile(0.25)
Q3=df['LoanAmount'].quantile(0.75)

IQR=Q3-Q1

lower=Q1-1.5*IQR
UPPER=Q1+1.5*IQR


outliers=df[(df['LoanAmount']<lower) | (df['LoanAmount']>UPPER)]
print("Number of Ouliers:",len(outliers))


# In[26]:


sns.boxplot(x=df['LoanAmount'])
plt.show()


# #### Numerical Data Visualization

# In[27]:


plt.figure(figsize=(8,5))
sns.histplot(df['Income'],bins=30,kde=True)

plt.title("Distribution of Income")
plt.xlabel("Income")
plt.show()


# In[28]:


# plt.scatter(df['income'],df['loanamount'])
# plt.xlabel("Income")
# plt.ylabel("Loan Amount")
# plt.show()
#This gives an overlapping Scatterplot as dataset is very large

plt.figure(figsize=(8,5))
plt.hexbin(df['Income'], df['LoanAmount'], gridsize=30)
plt.colorbar(label='Count')
plt.xlabel("Income")
plt.ylabel("Loan Amount")
plt.title("Income vs Loan Amount")
plt.show()


# #### Categorical Data Visualization

# In[29]:


df['Education'].value_counts().plot(kind='bar')
plt.show()
df['Education'].value_counts()


# In[30]:


df['Education'].value_counts().plot(kind='pie', autopct='%1.1f%%')
plt.show()


# In[31]:


sns.countplot(x='EmploymentType', data=df)
plt.xticks(rotation=45)
plt.show()

df['EmploymentType'].value_counts()


# #### Encoding Categorical Column

# In[32]:


#dataset contains text values and so ML algo cannot understand text directly they only work with numbers
from sklearn.preprocessing import LabelEncoder

encoders = {}

cat_cols = df.select_dtypes(include='object').columns

for col in cat_cols:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    encoders[col] = le

df.head()


# In[33]:


# Numerical columns such as Age, Income, LoanAmount, CreditScore, and InterestRate have different ranges.
# Therefore, Min-Max Scaling was applied to normalize all numerical attributes between 0 and 1.
from sklearn.preprocessing import MinMaxScaler

scaler = MinMaxScaler()

num_cols = [
    'Age',
    'Income',
    'LoanAmount',
    'CreditScore',
    'MonthsEmployed',
    'NumCreditLines',
    'InterestRate',
    'LoanTerm',
    'DTIRatio'
]

df[num_cols] = scaler.fit_transform(df[num_cols])

df.head()


# ## Observation
- Dataset structure, data types, and column names were verified.
- No missing values were found in the dataset.
- Duplicate records were checked and handled.
- Numerical and categorical features were identified successfully.
- Outliers were analyzed using the IQR method and box plots.
- Numerical and categorical variables were visualized using appropriate graphs.
- Categorical features were encoded into numerical format using Label Encoding.
- Numerical features were normalized using MinMax Scaling.
- The dataset is now fully preprocessed and ready for machine learning model training.
# # (TASK-3)
# ## PART-A
# ## Linear Regression using Sklearn

# In[34]:


from sklearn.model_selection import train_test_split
from sklearn.linear_model import  LinearRegression
from sklearn.metrics import mean_squared_error, r2_score, accuracy_score


# In[35]:


X = df[['Age',
        'Income',
        'CreditScore',
        'MonthsEmployed',
        'InterestRate',
        'LoanTerm',
        'DTIRatio']]
y=df['LoanAmount']


# In[36]:


X_train,X_test,y_train,y_test = train_test_split(X,y,test_size=0.2,random_state=42)


# In[37]:


X_train


# In[38]:


y_test


# In[39]:


# TRAIN MODEL
model = LinearRegression()

model.fit(X_train,y_train)


# In[40]:


print('Intercept (c):')
print(model.intercept_)

print("\nSlope:")
for feature, coef in zip(X.columns, model.coef_):
    print(f"{feature}: {coef}")


# In[41]:


# PREDICTIONS
y_pred = model.predict(X_test)
print(y_pred[:10])


# In[42]:


from sklearn.metrics import  mean_squared_error,r2_score


# In[43]:


mse = mean_squared_error(y_test,y_pred)
r2 = r2_score(y_test,y_pred)

print("MSE =",mse)
print("R2 Score =",r2)


# ## PART-B

# ## Gradient Descent From Scratch

# In[44]:


import numpy as np
import matplotlib.pyplot as plt


X = X_train.values
y = y_train.values.reshape(-1,1)


m, n = X.shape


weights = np.zeros((n,1))
bias = 0

learning_rate = 0.01
epochs = 1000

loss_history = []

for epoch in range(epochs):


    y_pred = np.dot(X, weights) + bias
    error = y_pred - y

    cost = (1/(2*m))*np.sum(error**2)
    loss_history.append(cost)

    dw = (1/m)*np.dot(X.T,error)
    db = (1/m)*np.sum(error)


    weights = weights - learning_rate*dw
    bias = bias - learning_rate*db

print("Bias:")
print(bias)

print("\nWeights:")
for feature, weight in zip(
        ['Age','Income','CreditScore','MonthsEmployed','InterestRate','LoanTerm','DTIRatio'],
        weights):
    print(feature, weight[0])


# ### PLot Loss Curve

# In[45]:


plt.figure(figsize=(8,5))
plt.plot(loss_history)
plt.xlabel("Epoch")
plt.ylabel("Loss")
plt.title("Gradient Descent Loss Curve")
plt.grid(True)
plt.show()


# In[46]:


print("Sklearn")
print("Intercept:", model.intercept_)
print("Coefficients:", model.coef_)

print("\nGradient Descent")
print("Bias:", bias)
print("Weights:", weights.flatten())


# ## Observation

# The coefficients obtained from the Gradient Descent implementation are expected to be close to those obtained using Scikit-learn's LinearRegression. Small differences may occur because Gradient Descent is an iterative optimization algorithm whose accuracy depends on the learning rate, number of epochs, and feature scaling. If the learning rate is too small or the number of epochs is insufficient, the parameters may not fully converge to the optimal values.

# ## Logistic Regression using Sklearn

# In[47]:


from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report


# In[48]:


X=df.drop(columns=['LoanID','Default'])
y=df['Default']


# In[49]:


X_train, X_test, y_train, y_test=train_test_split(X,y,test_size=0.2,random_state=42)


# In[50]:


#TRAIN Model
model=LogisticRegression(max_iter=1000)

model.fit(X_train,y_train)


# In[51]:


#Prediction
y_pred=model.predict(X_test)


# #### Accuracy

# In[52]:


accuracy=accuracy_score(y_test,y_pred)

print("Accuracy: ",accuracy)
print("Accuracy(%): ",accuracy*100)


# #### Confusion Matrix

# In[53]:


print("\nConfusion Matrix")
print(confusion_matrix(y_test,y_pred))


# In[54]:


import seaborn as sns
import matplotlib.pyplot as plt

sns.heatmap(confusion_matrix(y_test, y_pred),annot=True, fmt='d', cmap='Blues')

plt.xlabel("Predicted")
plt.ylabel("Actual")
plt.title("Confusion Matrix-Logistic Regression")

plt.show()


# #### Classification Report

# In[55]:


print("\nClassification Report")
print(classification_report(y_test,y_pred))


# #### Coefficients

# In[56]:


print("\nIntercept")
print(model.intercept_)


# In[57]:


print("\nFeature Coefficients")
for feature, coef in zip(X.columns, model.coef_[0]):
    print(feature,":",coef)


# # TASK-4

# ## Decision Tree
It is a supervised machine-learning algorithm that makes predictions by asking a sequence of questions about the input features.
# In[58]:


from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report


# In[59]:


X = df.drop(columns=['LoanID','Default'])
y = df['Default']


# In[60]:


X_train,X_test,y_train,y_test = train_test_split(X,y,test_size=0.2,random_state=42)


# In[61]:


dt_model=DecisionTreeClassifier(random_state=42)
#DecisionTreeClassifier() creates a classifier specifically for categorical/classification targets

dt_model.fit(X_train,y_train)


# In[62]:


y_pred_dt=dt_model.predict(X_test)


# In[63]:


result_dt=pd.DataFrame({
    'Actual':y_test.values,
    'Predicted':y_pred_dt
})

print(result_dt.head(10))


# In[64]:


print(pd.Series(y_pred_dt).value_counts())


# #### Accuracy

# In[65]:


accuracy_dt=accuracy_score(y_test,y_pred_dt)

print("Decision Tree Accuracy:",accuracy_dt)
print("Decision Tree Accuracy (%):",accuracy_dt*100)


# #### Confusion Matrix

# In[66]:


cm_dt = confusion_matrix(y_test,y_pred_dt)

print("Confusion Matrix:")
print(cm_dt)


# In[67]:


import seaborn as sns
import matplotlib.pyplot as plt

plt.figure(figsize=(6,4))

sns.heatmap(
    cm_dt,
    annot=True,
    fmt='d',
    cmap='Greens',
    xticklabels=['No Default','Default'],
    yticklabels=['No Default','Default']
)

plt.xlabel("Predicted")
plt.ylabel("Actual")
plt.title("Confusion Matrix - Decision Tree")

plt.show()


# #### Classification Report

# In[68]:


print("\nClassification Report")
print(classification_report(y_test,y_pred_dt))


# #### Decision Tree Visualization

# In[69]:


from sklearn.tree import plot_tree


# In[70]:


plt.figure(figsize=(20,10))

plot_tree(
    dt_model,
    feature_names=X.columns,
    class_names=['No Default','Default'],
    filled=True,
    rounded=True,
    max_depth=3 ##displays only first 3 levels
)

plt.title("Decision Tree - Loan Default Prediction")
plt.show()


# #### Feature Importance

# In[71]:


feature_importance = pd.DataFrame({
    'Feature': X.columns,
    'Importance': dt_model.feature_importances_
})

feature_importance = feature_importance.sort_values(
    by='Importance',
    ascending=False
)

print(feature_importance)


# In[72]:


plt.figure(figsize=(10,6))

plt.barh(
    feature_importance['Feature'],
    feature_importance['Importance']
)

plt.xlabel("Importance")
plt.ylabel("Feature")
plt.title("Feature Importance - Decision Tree")

plt.gca().invert_yaxis()

plt.show()


# ### Logistic Regression V/S Decision Tree

# In[73]:


from sklearn.metrics import accuracy_score,precision_score,recall_score,f1_score


# In[74]:


lr_accuracy = accuracy_score(y_test,y_pred)
lr_precision = precision_score(y_test,y_pred)
lr_recall = recall_score(y_test,y_pred)
lr_f1 = f1_score(y_test,y_pred)

print("Logistic Regression")
print("Accuracy :",lr_accuracy)
print("Precision:",lr_precision)
print("Recall   :",lr_recall)
print("F1 Score :",lr_f1)


# In[75]:


dt_accuracy = accuracy_score(y_test,y_pred_dt)
dt_precision = precision_score(y_test,y_pred_dt)
dt_recall = recall_score(y_test,y_pred_dt)
dt_f1 = f1_score(y_test,y_pred_dt)

print("Decision Tree")
print("Accuracy :",dt_accuracy)
print("Precision:",dt_precision)
print("Recall   :",dt_recall)
print("F1 Score :",dt_f1)


# In[76]:


comparison = pd.DataFrame({
    'Metric':['Accuracy','Precision','Recall','F1 Score'],
    'Logistic Regression':[lr_accuracy,lr_precision,lr_recall,lr_f1],
    'Decision Tree':[dt_accuracy,dt_precision,dt_recall,dt_f1]
})

print(comparison)


# ## Random Forest Classifier
It creates many Decision Trees instead of using only one tree.
# In[77]:


from sklearn.ensemble import RandomForestClassifier


# In[78]:


rf_model=RandomForestClassifier(n_estimators=100, random_state=42)


# In[79]:


rf_model.fit(X_train,y_train)


# In[80]:


y_pred_rf = rf_model.predict(X_test)


# In[81]:


result_rf = pd.DataFrame({
    'Actual':y_test.values,
    'Predicted':y_pred_rf
})

print(result_rf.head(10))


# #### Accuracy

# In[82]:


from sklearn.metrics import accuracy_score

rf_accuracy = accuracy_score(y_test,y_pred_rf)

print("Random Forest Accuracy:",rf_accuracy)
print("Random Forest Accuracy (%):",rf_accuracy*100)


# In[83]:


from sklearn.metrics import precision_score,recall_score,f1_score

rf_precision = precision_score(y_test,y_pred_rf)
rf_recall = recall_score(y_test,y_pred_rf)
rf_f1 = f1_score(y_test,y_pred_rf)

print("Random Forest")
print("Precision:",rf_precision)
print("Recall:",rf_recall)
print("F1 Score:",rf_f1)


# In[84]:


from sklearn.metrics import classification_report

print("Random Forest Classification Report")
print(classification_report(y_test,y_pred_rf))


# In[85]:


from sklearn.metrics import confusion_matrix

cm_rf = confusion_matrix(y_test,y_pred_rf)

print("Random Forest Confusion Matrix:")
print(cm_rf)


# In[86]:


import seaborn as sns
import matplotlib.pyplot as plt

plt.figure(figsize=(6,5))

sns.heatmap(
    cm_rf,
    annot=True,
    fmt='d',
    cmap='Reds'
)

plt.xlabel("Predicted")
plt.ylabel("Actual")
plt.title("Random Forest Confusion Matrix")

plt.show()


# #### Compare all 3 Models
comparison = pd.DataFrame({
    'Metric':['Accuracy','Precision','Recall','F1 Score'],
    
    'Logistic Regression':[
        lr_accuracy,
        lr_precision,
        lr_recall,
        lr_f1
    ],
    
    'Decision Tree':[
        dt_accuracy,
        dt_precision,
        dt_recall,
        dt_f1
    ],
    
    'Random Forest':[
        rf_accuracy,
        rf_precision,
        rf_recall,
        rf_f1
    ]
})

print(comparison)
# ### Observation
From the comparison, Random Forest gives the highest accuracy (88.67%) and precision (62.81%), making it the best model based on these two metrics. Logistic Regression also performs similarly with an accuracy of 88.59%. However, Decision Tree has the highest recall (23.08%) and F1 Score (21.27%), indicating that it is better at identifying actual loan defaults. The very low recall values of Logistic Regression and Random Forest show that these models miss a large number of default cases. Therefore, for a loan default prediction system, recall and F1 Score are important along with accuracy, and further model improvement may be required.
# ## KNN (K-Nearest Neighbors)
It is a supervised machine learning classification algorithm that predicts the class of a new data point by looking at the classes of its nearest neighboring data points.
# In[87]:


from sklearn.neighbors import KNeighborsClassifier


# In[88]:


knn_model=KNeighborsClassifier(n_neighbors=5)


# In[89]:


knn_model.fit(X_train,y_train)


# In[107]:


y_pred_knn=knn_model.predict(X_test)


# In[91]:


result_knn = pd.DataFrame({
    'Actual':y_test.values,
    'Predicted':y_pred_knn
})

print(result_knn.head(10))


# In[92]:


print("Actual:")
print(y_test.value_counts())

print("Predicted:")
print(pd.Series(y_pred_knn).value_counts())


# #### Accuracy

# In[93]:


knn_accuracy = accuracy_score(y_test,y_pred_knn)

print("Accuracy:",knn_accuracy)
print("Accuracy (%):",knn_accuracy*100)


# In[94]:


from sklearn.metrics import precision_score,recall_score,f1_score

knn_precision = precision_score(y_test,y_pred_knn,zero_division=0)
knn_recall = recall_score(y_test,y_pred_knn,zero_division=0)
knn_f1 = f1_score(y_test,y_pred_knn,zero_division=0)

print("Precision:",knn_precision)
print("Recall:",knn_recall)
print("F1 Score:",knn_f1)


# In[95]:


comparison = pd.DataFrame({
    'Metric':['Accuracy','Precision','Recall','F1 Score'],
    
    'Logistic Regression':[
        lr_accuracy,
        lr_precision,
        lr_recall,
        lr_f1
    ],
    
    'Decision Tree':[
        dt_accuracy,
        dt_precision,
        dt_recall,
        dt_f1
    ],
    
    'Random Forest':[
        rf_accuracy,
        rf_precision,
        rf_recall,
        rf_f1
    ],
    
    'KNN':[
        knn_accuracy,
        knn_precision,
        knn_recall,
        knn_f1
    ]
})

print(comparison)


# ## AdaBoosting
It is an ensemble learning algorithm that combines multiple weak learners, usually small decision trees, to create a stronger classifier.
# In[96]:


from sklearn.ensemble import AdaBoostClassifier


# In[97]:


ada_model=AdaBoostClassifier(n_estimators=100,random_state=42)


# In[98]:


ada_model.fit(X_train,y_train)


# In[99]:


y_pred_ada=ada_model.predict(X_test)


# In[100]:


result_ada=pd.DataFrame({
    'Actual':y_test.values,
    'Predicted':y_pred_ada
})

print(result_ada.head(10))


# #### Accuracy

# In[101]:


from sklearn.metrics import accuracy_score

ada_accuracy=accuracy_score(y_test,y_pred_ada)

print("AdaBoost Accuracy =",ada_accuracy)
print("AdaBoost Accuracy (%) =",ada_accuracy*100)


# #### Classification Report

# In[102]:


from sklearn.metrics import precision_score,recall_score,f1_score

ada_precision=precision_score(y_test,y_pred_ada,zero_division=0)
ada_recall=recall_score(y_test,y_pred_ada,zero_division=0)
ada_f1=f1_score(y_test,y_pred_ada,zero_division=0)

print("AdaBoost Precision =",ada_precision)
print("AdaBoost Recall =",ada_recall)
print("AdaBoost F1 Score =",ada_f1)


# #### Confusion Matrix

# In[103]:


from sklearn.metrics import confusion_matrix

cm_ada=confusion_matrix(y_test,y_pred_ada)

print("AdaBoost Confusion Matrix:")
print(cm_ada)


# In[104]:


import seaborn as sns
import matplotlib.pyplot as plt

plt.figure(figsize=(6,5))

sns.heatmap(
    cm_ada,
    annot=True,
    fmt='d',
    cmap="Purples"
)

plt.xlabel("Predicted")
plt.ylabel("Actual")
plt.title("AdaBoost Confusion Matrix")

plt.show()


# ### Final Comparison

# In[105]:


import pandas as pd

comparison = pd.DataFrame({
    'Sr. No.': [1, 2, 3, 4, 5],
    'Machine Learning Model': [
        'Logistic Regression',
        'Decision Tree',
        'Random Forest',
        'K-Nearest Neighbors',
        'AdaBoost'
    ],
    'Accuracy (%)': [
        lr_accuracy * 100,
        dt_accuracy * 100,
        rf_accuracy * 100,
        knn_accuracy * 100,
        ada_accuracy * 100
    ],
    'Precision (%)': [
        lr_precision * 100,
        dt_precision * 100,
        rf_precision * 100,
        knn_precision * 100,
        ada_precision * 100
    ],
    'Recall (%)': [
        lr_recall * 100,
        dt_recall * 100,
        rf_recall * 100,
        knn_recall * 100,
        ada_recall * 100
    ],
    'F1 Score (%)': [
        lr_f1 * 100,
        dt_f1 * 100,
        rf_f1 * 100,
        knn_f1 * 100,
        ada_f1 * 100
    ]
})

comparison.style \
    .format({
        'Accuracy (%)': '{:.2f}',
        'Precision (%)': '{:.2f}',
        'Recall (%)': '{:.2f}',
        'F1 Score (%)': '{:.2f}'
    }) \
    .set_properties(**{
        'text-align': 'center',
        'border': '1px solid black'
    }) \
    .set_table_styles([
        {
            'selector': 'th',
            'props': [
                ('background-color', '#D9EAF7'),
                ('color', 'black'),
                ('font-weight', 'bold'),
                ('text-align', 'center'),
                ('border', '1px solid black')
            ]
        },
        {
            'selector': 'td',
            'props': [
                ('border', '1px solid black'),
                ('text-align', 'center')
            ]
        },
        {
            'selector': 'table',
            'props': [
                ('border-collapse', 'collapse'),
                ('width', '100%')
            ]
        }
    ])


# ## Final Project Conclusion
The Loan Default Prediction system was developed using multiple machine learning classification algorithms. Logistic Regression, Decision Tree, Random Forest, KNN and AdaBoost were trained and evaluated using accuracy, precision, recall and F1 score. The comparison helps identify the model that provides suitable performance for predicting loan default cases. The final trained model can then be integrated with a FastAPI backend for real-time prediction.
# In[106]:


# Save model for FastAPI

import joblib

final_model = rf_model

model_data = {
    "model": final_model,
    "encoders": encoders,
    "scaler": scaler,
    "num_cols": num_cols,
    "features": X.columns.tolist()
}

joblib.dump(model_data, "loan_default_model.pkl")

print("Final model saved successfully!")


# In[ ]:




