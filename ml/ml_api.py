from flask import Flask, request, jsonify
import pickle
import pandas as pd
import mysql.connector
from flask_cors import CORS
import os
import requests
from flask import request, jsonify
from dotenv import load_dotenv
import os

# OCR + Policy Analysis
from policy_analysis import extract_pdf_text, extract_image_text, analyze_policy

app = Flask(__name__)
CORS(app)

load_dotenv()

OPENROUTER_KEY = os.getenv("OPENROUTER_KEY")
# -----------------------------
# Load dataset and train model
# -----------------------------
# ✅ Load trained model
try:
    model = pickle.load(open("loan_model.pkl", "rb"))
    print("Model loaded")
except Exception as e:
    print("MODEL ERROR:", e)
    model = None
# (Optional: set accuracy manually or keep previous)
accuracy = 0.88
# -----------------------------
# Database connection
# -----------------------------
try:
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="Manohar@123",
        database="loan_ai"
    )
    cursor = db.cursor()
    print("DB Connected")
except Exception as e:
    print("DB ERROR:", e)
    db = None
    cursor = None
# -----------------------------
# Insurance Policy Analyzer API
# -----------------------------
@app.route("/analyze", methods=["POST"])
def analyze():

    file = request.files["file"]

    filename = file.filename

    os.makedirs("uploads", exist_ok=True)

    file_path = os.path.join("uploads", filename)

    file.save(file_path)

    if filename.endswith(".pdf"):
        text = extract_pdf_text(file_path)
    else:
        text = extract_image_text(file_path)

    result = analyze_policy(text)

    return jsonify({
        "analysis": result
    })
    
#analytics

@app.route("/analytics", methods=["GET"])
def analytics():
    try:
        cursor.execute("SELECT COUNT(*) FROM loan_predictions")
        total = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*) FROM loan_predictions WHERE risk='High'")
        high = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*) FROM loan_predictions WHERE risk='Low'")
        low = cursor.fetchone()[0]

        return jsonify({
            "total": total,
            "high": high,
            "low": low,
            "medium": 0
        })

    except Exception as e:
        print("ANALYTICS ERROR:", e)
        return jsonify({
            "total": 0,
            "high": 0,
            "low": 0,
            "medium": 0
        })
# -----------------------------
# Loan Prediction API
# -----------------------------
@app.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    print("DATA RECEIVED:", data)

    # ✅ handle all formats + convert to int
    income = int(data.get("income") or data.get("Income"))

    credit_score = int(
        data.get("credit_score") or
        data.get("creditscore") or
        data.get("creditScore")
    )

    loan_amount = int(
        data.get("loan_amount") or
        data.get("loanamount") or
        data.get("loanAmount")
    )

    employment = data.get("employment", "Unknown")

    # ✅ EMI
    emi = loan_amount / 120

    # ML prediction
    prediction = model.predict([[income, credit_score, loan_amount, emi]])[0]
    proba = model.predict_proba([[income, credit_score, loan_amount, emi]])

    if len(proba[0]) > 1:
        probability = proba[0][1]
    else:
        probability = proba[0][0]

    # -----------------------------
    # ✅ FINAL DECISION LOGIC
    # -----------------------------

    # Rule 1: EMI check (STRICT)
    if emi > income * 0.4:
        decision = "Rejected"
        risk = "High"

    # Rule 2: Loan too large
    elif loan_amount > income * 20:
        decision = "Rejected"
        risk = "High"

    # Rule 3: ML decision
    else:
        decision = "Approved" if prediction == 1 else "Rejected"
        risk = "Low" if probability >= 0.5 else "High"

    # -----------------------------
    # Save to DB
    # -----------------------------
    cursor.execute(
        """
        INSERT INTO loan_predictions
        (income, credit_score, loan_amount, employment, risk, decision)
        VALUES (%s,%s,%s,%s,%s,%s)
        """,
        (income, credit_score, loan_amount, employment, risk, decision)
    )

    db.commit()
    loan_id = cursor.lastrowid

    # -----------------------------
    # Explainable AI
    # -----------------------------
    reasons = []
    suggestions = []

    if credit_score < 650:
        reasons.append("Credit score is below the recommended threshold (650).")
        suggestions.append("Improve your credit score above 650.")

    if loan_amount > income * 5:
        reasons.append("Requested loan amount is high compared to income.")
        suggestions.append("Consider reducing the loan amount.")

    if income < 30000:
        reasons.append("Income level may be insufficient for the requested loan.")
        suggestions.append("Provide additional income proof or increase income.")

    return jsonify({
        "loan_id": loan_id,
        "decision": decision,
        "risk": risk,
        "probability": round(probability * 100, 2),
        "model_accuracy": round(accuracy * 100, 2),
        "reasons": reasons,
        "suggestions": suggestions
    })
# -----------------------------
# AI Decision Appeal System
# -----------------------------
@app.route("/appeal", methods=["POST"])
def appeal():

    data = request.json

    loan_id = data.get("loan_id")
    reason = data.get("reason")

    if not loan_id or not reason:
        return jsonify({"error": "loan_id and reason required"}), 400

    cursor.execute(
        "INSERT INTO loan_appeals (loan_id, reason) VALUES (%s,%s)",
        (loan_id, reason)
    )

    db.commit()

    return jsonify({
        "message": "Appeal submitted successfully"
    })

# -----------------------------
# AI Loan Assistant Chatbot
# -----------------------------
@app.route("/chatbot", methods=["POST"])
def chatbot():

    try:

        data = request.get_json()

        message = data.get("message", "")
        language = data.get("language", "en")

        url = "https://openrouter.ai/api/v1/chat/completions"

        headers = {
            "Authorization": f"Bearer {OPENROUTER_KEY}",
            "Content-Type": "application/json"
        }

        payload = {
            "model": "openai/gpt-3.5-turbo",
            "messages": [
                {"role": "system", "content": "You are a banking loan assistant."},
                {"role": "user", "content": message}
            ]
        }

        res = requests.post(url, headers=headers, json=payload)

        response = res.json()

        print(response)  # DEBUG

        reply = response.get("choices", [{}])[0].get("message", {}).get("content", "AI did not return a response.")

        return jsonify({
            "reply": reply
        })

    except Exception as e:

        print("CHATBOT ERROR:", e)

        return jsonify({
            "reply": "AI service error"
        })

# -----------------------------
# Run Flask Server
# -----------------------------
if __name__ == "__main__":
        port = int(os.environ.get("PORT", 5001))
        app.run(host="0.0.0.0", port=port)