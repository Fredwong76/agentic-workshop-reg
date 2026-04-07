# Workshop Session 3: Cloud Mastery & Agentic Applications

## **Overview**
This session transitions from local agentic workflows to cloud-integrated applications. Participants will establish a secure connection to the AWS cloud, configure their local CLI for authentication, and deploy a real-time serverless application using Amazon S3 and a shared Lambda backend.

---

## **1. Learning Objectives**
*   **Identity & Access:** Master AWS IAM Identity Center (SSO) and Multi-Factor Authentication.
*   **Tooling Setup:** Configure the AWS CLI v2 with named profiles for multi-account workflows.
*   **Cloud Hosting:** Deploy and configure a static website on Amazon S3.
*   **Integration:** Connect a frontend application to a secure AWS Lambda backend via Function URLs.
*   **Agentic Interaction:** Use "AWS Kiro" to query cloud resources using natural language.

---

## **2. Session Schedule (3.5 Hours)**

### **Module 1: Secure Cloud Connectivity (60 Minutes)**
*   **09:00 - 09:15:** Portal Access & Password Resets (`https://lpstech.awsapps.com/start`).
*   **09:15 - 09:30:** MFA Enrollment (Google/Microsoft Authenticator).
*   **09:30 - 10:00:** Local CLI Configuration:
    *   Command: `aws configure sso`.
    *   Target: `LPS_Managed_Prod` (Account 245650696234).
    *   Verification: `aws sts get-caller-identity --profile workshop-student`.

### **Module 2: The Singapore Carpark Finder Lab (90 Minutes)**
*   **10:00 - 10:20:** S3 Bucket Creation & Policy Management.
*   **10:20 - 10:50:** Frontend Development (`index.html`, `style.css`, `app.js`).
*   **10:50 - 11:15:** Integrating the Lambda URL Backend.
*   **11:15 - 11:30:** Deployment & Live Testing (Singapore Postal Codes).

### **Module 3: Agentic Cloud Operations (60 Minutes)**
*   **11:30 - 12:00:** Introduction to AWS Kiro.
    *   Connecting Kiro to the `workshop-student` profile.
    *   Executing natural language commands: *"Kiro, check my S3 bucket for public access."*
*   **12:00 - 12:30:** Cleanup & Graduation.
    *   Reviewing "House Rules" (Regions: ap-southeast-1 only).
    *   Auto-termination warning for non-compliant resources.

---

## **3. Required Materials & Dependencies**
> [!IMPORTANT]
> Ensure all participants have these ready BEFORE the session starts.

### **Hardware & Software**
*   **AWS CLI v2:** Must be installed. [Download Link](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).
*   **Code Editor:** VS Code (Recommended) or Notepad++.
*   **Web Browser:** Chrome or Edge (latest versions).
*   **Authenticator:** Mobile device with Google/Microsoft Authenticator.

### **Account Access**
*   **SSO Username/Password:** Issued to each student (Format: `studentX`).
*   **AWS Region:** `ap-southeast-1` (Singapore) — **MANDATORY**.

### **Backend Resources**
*   **Lambda Endpoint:** `https://hwmxq5o73asklggjupi6vohbhq0itsap.lambda-url.ap-southeast-1.on.aws/`
*   **Account ID (S3 Lab):** 942226532280 (Sandbox).

---

## **4. Missing Dependencies Analysis**
Based on the current materials, we are missing:
1.  **CSS & JavaScript Snippets:** The `Session_3_student-lab-guide.md` is currently missing the functional code for `style.css` and `app.js`. This is critical for the success of Part 2.
2.  **Kiro Installation Guide:** While mentioned, there is no direct instruction on where participants should download/access "AWS Kiro".
3.  **Cross-Account Clarification:** The setup guide uses Account `245650696234` while the lab guide uses Account `942226532280`. We must clarify if students will have access to both or if one account ID should be corrected.

---

## **5. House Rules & Safety**
*   **Regions:** Use ONLY `ap-southeast-1`.
*   **Instances:** `t3.micro` or `t3.small` ONLY.
*   **Naming:** All IAM roles/resources must start with `workshop-`.
*   **Cost:** No GPU-based instances or Cross-Region data transfers.
