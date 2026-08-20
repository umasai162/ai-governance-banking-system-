import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import pickle

df = pd.read_csv("loan_dataset.csv")

# lowercase
df.columns = df.columns.str.lower()

# rename columns properly
df.rename(columns={
    "creditscore": "credit_score",
    "loanamount": "loan_amount"
}, inplace=True)

# EMI
df["emi"] = df["loan_amount"] / 120

# ✅ FIXED approval logic (IMPORTANT)
df["approved"] = df.apply(
    lambda row: 1 if (row["emi"] <= row["income"] * 0.4 and row["credit_score"] > 650) else 0,
    axis=1
)

# ✅ Check balance (VERY IMPORTANT)
print("Class distribution:")
print(df["approved"].value_counts())

# Features
X = df[["income", "credit_score", "loan_amount", "emi"]]
y = df["approved"]

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y)

# Accuracy
accuracy = model.score(X, y)
print("Accuracy:", round(accuracy * 100, 2))

# Save model
pickle.dump(model, open("loan_model.pkl", "wb"))

print("✅ Model trained")