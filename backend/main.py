from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib


app = FastAPI(
    title="Loan Default Prediction API",
    description="FastAPI backend for Loan Default Prediction",
    version="1.0"
)


# Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"]
)


# Load saved model
BASE_DIR = Path(__file__).resolve().parent
model_data = joblib.load(
    BASE_DIR / "loan_default_model.pkl",
    mmap_mode="r"
)

model = model_data["model"]
encoders = model_data["encoders"]
scaler = model_data["scaler"]
num_cols = model_data["num_cols"]
features = model_data["features"]


class LoanData(BaseModel):
    Age: float
    Income: float
    LoanAmount: float
    CreditScore: float
    MonthsEmployed: float
    NumCreditLines: float
    InterestRate: float
    LoanTerm: float
    DTIRatio: float

    Education: str
    EmploymentType: str
    MaritalStatus: str
    HasMortgage: str
    HasDependents: str
    LoanPurpose: str
    HasCoSigner: str


@app.get("/")
def home():
    return {
        "message": "Loan Default Prediction API is running"
    }


@app.get("/features")
def get_features():

    categories = {}

    for col, encoder in encoders.items():
        if col in features:
            categories[col] = encoder.classes_.tolist()

    return {
        "numerical_features": num_cols,
        "categorical_features": categories
    }


@app.post("/predict")
def predict(data: LoanData):

    input_data = pd.DataFrame([data.model_dump()])


    # Encode categorical values
    for col, encoder in encoders.items():

        if col not in input_data.columns:
            continue

        value = input_data[col].iloc[0]

        if value not in encoder.classes_:
            return {
                "error": f"Invalid value '{value}' for {col}"
            }

        input_data[col] = encoder.transform(
            input_data[col]
        )


    # Apply the same scaling used during training
    input_data[num_cols] = scaler.transform(
        input_data[num_cols]
    )


    # Keep exact feature order
    input_data = input_data[features]


    # Predict
    prediction = model.predict(input_data)[0]
    probability = float(model.predict_proba(input_data)[0][1])
    risk_percentage = round(probability * 100, 1)


    if prediction == 1:
        result = "Default"
    else:
        result = "No Default"


    return {
        "prediction": int(prediction),
        "result": result,
        "riskPercentage": risk_percentage
    }