import pandas as pd
import random

data = []

for i in range(250):

    income = random.randint(25000, 120000)
    credit_score = random.randint(550, 820)
    loan_amount = random.randint(100000, 600000)

    # simple approval rule
    if credit_score > 700 and income > 50000:
        decision = 1
    else:
        decision = 0

    data.append([income, credit_score, loan_amount, decision])

df = pd.DataFrame(data, columns=[
    "Income",
    "CreditScore",
    "LoanAmount",
    "Decision"
])

df.to_csv("loan_dataset.csv", index=False)

print("Dataset created with 250 records")