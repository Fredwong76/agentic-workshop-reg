# Lab Guide: Securing Your AI Environment

## Overview

In this lab, you will update your project from Session 3 to follow enterprise safety standards. Instead of adding new "features," we will build a **"Safety Shield"** around your cloud resources.

You will:
1.  **Restrict Access**: audit your IAM roles for "Least Privilege."
2.  **Secure your API**: add a simple API Key check to your Lambda Function URL.
3.  **Ensure Durability**: enable S3 Versioning to prevent accidental data loss.
4.  **Practice Privacy**: scrub a dataset of PII (Personally Identifiable Information).
5.  **Set Guardrails**: configure tags and budget alerts.

---

## Part 1: Least Privilege (IAM)

Your AI agent should only have access to what it absolutely needs.

1.  Open the **IAM Console**.
2.  Go to **Roles** and search for the role used by your agent/student profile.
3.  **Check for "Admin"**: If you see `AdministratorAccess`, this is a security risk.
4.  **Exercise**: Identify which of these policies is "Safer":
    *   **Option A**: `s3:*` (Access to all buckets, delete permission included).
    *   **Option B**: `s3:Get*`, `s3:List*` (Read-only access to specific buckets).
5.  **Action**: Ensure your profile is using a role that starts with `workshop-student-`.

---

## Part 2: Securing Your Public URL

In Session 3, we created a Lambda Function URL that is **publicly accessible**. Let's add a basic "Gatekeeper" check.

### Step 2.1: Update your Lambda Code
1.  Navigate to the **Lambda Console** and select your Carpark Finder function.
2.  Update the code to check for a simple "API Key" in the request headers:

```python
import json

def lambda_handler(event, context):
    # THE SAFETY CHECK
    headers = event.get('headers', {})
    api_key = headers.get('x-api-key')
    
    EXPECTED_KEY = "LPS-WORKSHOP-2026"
    
    if api_key != EXPECTED_KEY:
        return {
            'statusCode': 403,
            'body': json.dumps({'error': 'Unauthorized: API Key Missing or Invalid'})
        }

    # ... Your existing carpark logic here ...
    return {
        'statusCode': 200,
        'body': json.dumps({'message': 'Access Granted!'})
    }
```

3.  **Test**: Try to visit your Lambda URL in a browser. You should now see an "Unauthorized" error. This prevents random bots from using your AI.

---

## Part 3: Data Durability (Versioning)

Accidents happen. What if your agent deletes your main config file?

1.  Navigate to **S3** and select your `workshop-carpark-<your-name>` bucket.
2.  Go to the **Properties** tab.
3.  Find **Bucket Versioning** and click **Edit**.
4.  Select **Enable** and click **Save changes**.
5.  **The Test**: Upload a file named `test.txt`. Then, upload a new version of `test.txt` with different content. Notice how you can now view and restore the old version under "Show versions."

---

## Part 4: PII Sanitization (Simple Script)

Before uploading data to the cloud, you should "scrub" it of personal info.

### Step 4.1: The Scrubbing Script
Create a file named `scrub_data.py`:

```python
import re

def scrub_pii(text):
    # Simple regex for Singapore NRIC (Masking)
    nric_pattern = r'[STFGM]\d{7}[A-Z]'
    scrubbed = re.sub(nric_pattern, "[NRIC_MASKED]", text)
    
    # Simple regex for Email
    email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
    scrubbed = re.sub(email_pattern, "[EMAIL_MASKED]", scrubbed)
    
    return scrubbed

# SAMPLE DATA
raw_data = "Customer: Alice, NRIC: S1234567D, Phone: 91234567, Email: alice@example.com"
print("BEFORE:", raw_data)
print("AFTER: ", scrub_pii(raw_data))
```

Run this with `python scrub_data.py` to see the masking in action.

---

## Part 5: Operational Guardrails

1.  **Tagging**: Go to your S3 bucket and add a Tag:
    *   Key: `CostCenter` | Value: `LPS-Workshop`
    *   Key: `Environment` | Value: `Sandbox`
2.  **Budgets**: 
    *   Search for **AWS Budgets** in the console.
    *   Create a "Cost Budget."
    *   Set the amount to **$10**.
    *   Add your email to receive an alert if the forecast exceeds 80%.

---

## Summary Checklist

- [ ] My IAM role is restricted (Basic/Read-Only where possible).
- [ ] My Public URL now requires an `x-api-key`.
- [ ] My S3 bucket has **Versioning Enabled**.
- [ ] I have practiced masking PII via script.
- [ ] I have a **Budget Alert** set for $10.
