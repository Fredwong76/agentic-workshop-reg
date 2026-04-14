# Workshop Session 4: Responsible AI & Governance

## **Overview**
Building an AI solution is only half the job. The other half is ensuring it is safe, durable, and follows enterprise guardrails. In this session, participants will learn the "Safety First" mindset, moving from open prototypes to secured applications. We focus on identity management, public API safety, and data durability.

---

## **1. Learning Objectives**
*   **Identity Management:** Understand "Least Privilege" and how to create restricted roles for AI agents.
*   **Public Security:** Learn the risks of Public URLs and how to protect APIs from unauthorized access.
*   **Data Safety:** Implement S3 Versioning and backups to prevent accidental data loss.
*   **Data Privacy:** Practice basic PII (Personally Identifiable Information) masking and enforce data residency.
*   **Operations:** Set up tagging and budget alerts to keep projects organized and cost-effective.

---

## **2. Session Schedule (3.5 Hours)**

### **Module 1: Identity & Public Exposure (75 Minutes)**
*   **09:00 - 09:45:** **IAM foundations.** 
    *   Why your agent should NOT be an Admin.
    *   Creating the `Agent-Reader-Only` role.
*   **09:45 - 10:15:** **The "Public URL" Risk.** 
    *   Why Lambda Function URLs and S3 websites are "open doors."
    *   Simple fixes: API Keys and CORS.

### **Module 2: Durability & Privacy (90 Minutes)**
*   **10:15 - 11:00:** **The "Undo" Button.** 
    *   Enabling S3 Versioning for instant recovery.
    *   Setting up an AWS Backup plan (The "Oops" protection).
*   **11:00 - 11:45:** **Cleaning your Data.** 
    *   What is PII? (NRICs, Names, Personal Emails).
    *   Enforcing the "Singapore-Only" data rule.

### **Module 3: Governance & Ops (45 Minutes)**
*   **11:45 - 12:15:** **Tags & Budgets.** 
    *   Labeling resources so we know who spent what.
    *   Setting up a $10/day alarm to stop runaway AI costs.
*   **12:15 - 12:30:** Session Wrap-up & Q&A.

---

## **3. Key Enterprise Guardrails**
Every participant must verify their AWS environment against these 5 checks:
1.  [ ] **Identity:** Is your agent using a restricted IAM role? (No `AdministratorAccess`).
2.  [ ] **Exposure:** Does your Public URL have at least one layer of protection (e.g., AuthType or API Key)?
3.  [ ] **Durability:** Is S3 Versioning enabled on your main data bucket?
4.  [ ] **Privacy:** Have you checked your files for PII before uploading?
5.  [ ] **Residency:** Are all your services running in `ap-southeast-1` (Singapore)?

---

## **4. Required Materials & Dependencies**
*   **AWS Console Access:** LPS-Sandbox Account.
*   **Existing S3 Bucket:** From Session 3.
*   **AWS CLI:** Confirmed working in Session 3.

---

## **5. House Rules & Safety**
*   **Backups:** Always enable versioning before running scripts that modify data.
*   **Sharing:** Never post your AWS Function URLs in public forums or social media.
*   **Cost:** If an agent script gets stuck in a loop, terminate it immediately via the terminal (Ctrl+C).
