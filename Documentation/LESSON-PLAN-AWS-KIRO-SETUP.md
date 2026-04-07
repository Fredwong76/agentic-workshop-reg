# Lesson Plan: Connecting to the Cloud with AWS Kiro

## **Workshop Module: Infrastructure & Tooling Setup**
**Objective:** Establish a secure, authenticated connection between the participant's local environment and the AWS Cloud using "AWS Kiro" and the AWS CLI.

---

### **1. Learning Objectives**
By the end of this session, participants will be able to:
- Access the AWS IAM Identity Center (SSO) portal.
- Configure Multi-Factor Authentication (MFA) for their workshop account.
- Configure a named AWS SSO profile on their local machine.
- Integrate "AWS Kiro" with their workshop credentials.
- Verify permissions for EC2, S3, and Lambda.

---

### **2. Prerequisites & Materials**
- **Hardware:** Laptop with Windows/macOS.
- **Software:** 
  - [AWS CLI v2](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) (Download required if not installed).
  - "AWS Kiro" (The primary workshop tool).
  - Authenticator App (Google Authenticator, Microsoft Authenticator, etc.).
- **Account Details:** Provided in the `WORKSHOP-STUDENT-LOGIN-GUIDE.md`.

---

### **3. Lesson Delivery (Step-by-Step)**

#### **Part A: The First Gateway (10-15 Minutes)**
**Step 1: Portal Access**
- Open the browser to: `https://lpstech.awsapps.com/start`
- Enter assigned username (`studentX`) and the one-time password (OTP).
  - *Note: Participants will be prompted for a password change immediately.*

**Step 2: Securing the Account (MFA)**
- Scan the QR code using your chosen Authenticator app.
- Enter the 6-digit verification code to complete the setup.

---

#### **Part B: Local CLI Configuration (15-20 Minutes)**
**Step 3: Verification**
- Open a terminal (PowerShell or Command Prompt).
- Run `aws --version` to ensure the CLI is installed correctly.

**Step 4: The SSO Walkthrough**
- Execute: `aws configure sso`
- Guide participants through the prompts using these EXACT values:
  - **SSO session name:** `workshop`
  - **SSO start URL:** `https://lpstech.awsapps.com/start`
  - **SSO region:** `ap-southeast-1`

**Step 5: Profile Selection**
- Return to the terminal and select:
  - **Account:** `LPS_Managed_Prod (245650696234)`
  - **Role:** `Workshop-Student`
  - **CLI default client Region:** `ap-southeast-1`
  - **CLI profile name:** `workshop-student`

---

#### **Part C: Connecting AWS Kiro (15 Minutes)**
**Step 6: Identity Verification**
- Run the following command to prove you are "who you say you are" in the cloud:
  ```bash
  aws sts get-caller-identity --profile workshop-student
  ```
- **Success Criteria:** The output should show the Account ID `245650696234`.

**Step 7: Powering up Kiro**
- Inform the participants that "AWS Kiro" uses the `--profile workshop-student` flag to interact with AWS.
- Practice one command in Kiro: *"Kiro, list existing S3 buckets in my workshop account."*
- Ensure Kiro is configured to use the `workshop-student` profile.

---

### **4. Permission Boundaries & House Rules**
| Rule Category | Requirement |
| :--- | :--- |
| **Regions** | Everything MUST be in `ap-southeast-1` (Singapore). |
| **EC2 Types** | Use ONLY `t3.micro` or `t3.small`. |
| **Naming** | All IAM roles must start with `workshop-`. |
| **Cleanup** | Resources remaining at the end of the day will be auto-terminated. |

---

### **5. Troubleshooting Common Issues**
- **Expired Token:** Running `aws sso login --profile workshop-student`.
- **MFA Desync:** Ensure mobile device time is set to "Automatic."
- **Kiro Profile:** Ensure Kiro's "AWS MCP Tool" is pointed to the correct profile.

---

### **6. Conclusion & Next Module Preview**
- **Recap:** Everyone should now have a green "authenticated" status.
- **Next Up:** Module 2 — "Your First Instance: Launching EC2 with Natural Language."
