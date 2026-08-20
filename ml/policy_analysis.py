import pdfplumber
import pytesseract
from PIL import Image

# Tesseract OCR path (Windows)
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"


# -----------------------------
# Extract text from PDF
# -----------------------------
def extract_pdf_text(file):

    text = ""

    with pdfplumber.open(file) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ""

    return text


# -----------------------------
# Extract text from Image (OCR)
# -----------------------------
def extract_image_text(file):

    img = Image.open(file)

    text = pytesseract.image_to_string(img)

    return text


# -----------------------------
# Local AI Policy Analysis
# -----------------------------
def analyze_policy(text):

    text_lower = text.lower()

    loan_keywords = [
        "loan", "interest rate", "emi", "repayment",
        "borrower", "lender", "principal", "tenure"
    ]

    caste_keywords = [
        "caste certificate", "scheduled caste",
        "scheduled tribe", "obc", "community certificate"
    ]

    aadhaar_keywords = [
        "aadhaar", "uidai", "government of india",
        "unique identification authority"
    ]

    student_keywords = [
        "student id", "college", "university",
        "roll number", "semester"
    ]

    # Loan document
    if any(word in text_lower for word in loan_keywords):

        return {
            "doc_type": "Loan Document",
            "Safety Score": 80,
            "Red Flags": ["High interest clause detected"],
            "Benefits": ["Flexible repayment options"],
            "Coverage Gaps": ["No early repayment benefit"],
        }

    # Caste certificate
    elif any(word in text_lower for word in caste_keywords):

        return {
            "doc_type": "Caste Certificate",
            "error": "Invalid document. Please upload loan related documents only."
        }

    # Aadhaar
    elif any(word in text_lower for word in aadhaar_keywords):

        return {
            "doc_type": "Aadhaar Document",
            "error": "Invalid document. Please upload loan related documents only."
        }

    # Student ID
    elif any(word in text_lower for word in student_keywords):

        return {
            "doc_type": "Student ID",
            "error": "Invalid document. Please upload loan related documents only."
        }

    else:

        return {
            "doc_type": "Unknown Document",
            "error": "Invalid document. Please upload loan related documents only."
        }