---
marp: true
theme: default
style: |
  section {
    background: linear-gradient(135deg, #2D3E50 0%, #4A6075 100%);
    color: #ffffff;
    font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    justify-content: start;
    padding: 70px;
  }
  h1 {
    color: #ffd700;
    font-size: 50px;
    margin-bottom: 30px;
    border-bottom: 4px solid #ffd700;
    display: inline-block;
  }
  h2 {
    color: #ffd700;
    font-size: 32px;
    margin-top: 40px;
  }
  .card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
    border-radius: 12px;
    padding: 30px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
  b { color: #ffd700; }
  ul li { margin-bottom: 12px; list-style-type: '🛡️ '; }
  header { color: rgba(255, 255, 255, 0.5); font-size: 14px; position: absolute; top: 30px; right: 70px; }
  footer { color: rgba(255, 255, 255, 0.5); font-size: 14px; position: absolute; bottom: 30px; left: 70px; }
---

<!-- header: Session 4: Responsible AI & Governance -->
<!-- footer: LPS Enterprise AI Guardrails | Foundations Track -->

# Session 4: The Safety Shield
### Building Secure, Durable, and Compliant AI 

<div class="grid">
<div class="card">

## 🔹 Our Focus Today
Transitioning from **Prototypes** to **Professional** AWS environments.

</div>
<div class="card">

## ⚡ 5 Key Foundations
1. **Identity (IAM)**
2. **Exposure (Public URLs)**
3. **Durability (S3)**
4. **Privacy (PII)**
5. **Budget (Costs)**

</div>
</div>

---

# 1. Identity & "Least Privilege"
### Give the Agent exactly what it needs, and no more.

<div class="card">

- **The Risk:** An "Admin" agent can delete everything in the account if compromised.
- **The Fix:** Create specific roles (e.g., `Workshop-Read-Only`).
- **User vs. Agent:** Your personal login is for *building*; the agent's role is for *running*.

</div>

<br>

> "If it doesn't need to delete, don't give it delete permissions."

---

# 2. Public Presence & API Safety
### Being mindful of what we share online.

<div class="card">

- **Public URLs:** Function URLs and S3 websites are "Open Doors."
- **The Risk:** Scraping bots, accidental usage costs, and data leaks.
- **The Fix:** 
  - **API Keys:** Add an `x-api-key` check to your Lambda.
  - **CORS:** Restrict which websites can talk to your API.

</div>

<br>

> **Rule:** Never put secrets (Keys, Passwords) in your public frontend files.

---

# 3. Data Durability & Privacy
### The "Undo" Button and the "Scrubber"

<div class="grid">
<div class="card">

## 🔹 S3 Versioning
Store every version of a file. Stop accidental deletions before they happen.

</div>
<div class="card">

## 🔹 PII Scrubbing
Always "clean" your data. Mask NRICs and Emails before they reach the AI.

</div>
</div>

<br>

- **Residency:** Keep all data in **Singapore** (`ap-southeast-1`).
- **Backups:** One-click recovery with **AWS Backup**.

---

# 4. Operational Guardrails
### Staying Organized and Under Budget

<div class="card">

- **Tagging:** Every resource needs a "Name Plate" (`Owner`, `Project`).
- **Cost Alarms:** Set a **$10 Budget Alert**.
- **No Surprises:** Get an email *before* you overspend.

</div>

<br>

> **Lab Goal:** Update your Session 3 project with these 5 Safety Shields.

---
