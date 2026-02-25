# Workshop Demo: Conversation Artifacts (Real Project Edition)

These artifacts show the actual dialogue between the Architect and Antigravity during the creation of real-world projects. Use these to show how *intent* drives the build.

---

## Artifact 1: "Instant Cloud Demos & Cost Visibility" (Project: antigravity-gcp-poc)
**User:** *"Antigravity, a customer wants a live GCP demo environment for a web app by this afternoon. I need a Cloud Run service deployed in Singapore, and I need to be able to show them the real-time cost impact. Can you configure this and then tell me what our current spend is?"*

**Antigravity:** *"On it. I'll generate the Terraform for a Cloud Run service (`antigravity-demo`) in `asia-southeast1` and set up the IAM permissions for a 'Scale-to-Zero' configuration. This ensures the demo costs almost nothing when idle. I'm also querying the GCP Billing API for `antigravity-poc-v1` now..."*

**Antigravity:** *"Done. The environment is configured and live at your URL. Current MTD spend for this project is exactly **$0.17**, primarily from storage. The Cloud Run compute cost remains near zero due to our efficiency settings. Ready to show the customer?"*

**User:** *"Perfect. This proof of low-cost, high-speed delivery is exactly what will win them over."*

---

## Artifact 2: "Gap Analysis & Interview Ready" (Project: interviews)
**User:** *"Antigravity, I've used your tool to find the top candidates. Now, I have an interview with Eric Ho in 10 minutes. Compare his CV with the Band 7 JD and tell me: what are his strongest matches, where are his biggest gaps, and—most importantly—what 3 difficult interview questions should I ask to test him on those gaps?"*

**Antigravity:** *"Analyzing 'Eric Ho.pdf' against 'band7_jd.txt' now. 

**Strongest Match:** He has deep experience in Azure/AWS migrations, which hits 90% of your technical requirements. 
**Biggest Gap:** The JD requires experience with GovZTA (Government Zero Trust Architecture), which is missing from his resume. 

**Recommended Questions:**
1. 'Explain how you would implement Zero Trust principles in a highly regulated government environment.'
2. 'How do you handle legacy app migration when the customer insists on a lift-and-shift approach vs your recommendation for refactoring?'
3. 'The JD mentions SSO/MFA integration across multi-cloud; walk me through a complex identity federation project you led.'

Ready for the interview?"*

**User:** *"This is perfect. It took 30 seconds to get the strategic depth I'd usually spend an hour researching."*

---

## Artifact 3: "Requirements to Reality" (Project: cloud assessment)
**User:** *"Antigravity, I've analyzed the 'Cloud Assessment SOW'. Now, transform these business requirements into a technical design specification and a detailed task list so we can build the AWS Assessment Toolkit. I want it to follow the pillars defined in the SOW."*

**Antigravity:** *"Analyzing the SOW phases now. Based on your requirements, I’ve architected the following:

**Design Specification:**
- **Architecture:** Modular Python CLI using a 'Pillar-Plug-in' model.
- **Data Layer:** Boto3 discovery for inventory; Athena/S3 for Cost & Usage (CUR) analysis.
- **Output:** Unified JSON for systems and formatted CSV for Sales reports.

**Generated Task List:**
1. [ ] **Core Engine:** Initialize CLI and AWS authentication handlers.
2. [ ] **Security Module:** Implement S3 Public Access & IAM Credential Report scanners.
3. [ ] **Cost Module:** Build EBS 'Orphaned Volume' and CUR Extraction logic.
4. [ ] **Reporting:** Create the automated 'Executive Summary' generator.

I've already prepared the boilerplate for Task 1. Shall we begin?"*

**User:** *"This is the definition of the NWOW. What used to take a week of 'Consultant-to-Developer' meetings just happened in 60 seconds."*

---

## Artifact 4: "Co-Creating the Workshop" (Meta-Experience)
**User:** *"Antigravity, let's fine-tune this workshop. Instead of generic slides, I want to use my actual work (GCP POC, Interviews, SOW Automation). Help me structure the materials so that my 'one-month MVP' story is the hero of the session."*

**Antigravity:** *"Brilliant. I've updated all project artifacts to use your real files and data. I've integrated your live GCP billing ($0.17 spend), your candidate gaps for Eric Ho, and the exact SOW transformation logic. I've also verified the health of your Cloud Run services to ensure the demo is bulletproof. Our collaboration is the demo itself."*

**User:** *"Perfect. This shows the audience that it's not just about me 'sending a prompt'—it's about the interactive partnership and strategic fine-tuning in the Antigravity IDE."*

---

### **How Antigravity Creates Design Specs & Tasks:**
Antigravity doesn't just "summarize"; it **synthesizes**. By reading the SOW, it identifies the **Business Intent** (e.g., "Check S3 Security") and maps it to **Technical Requirements** (e.g., "Call `get_public_access_block` via Boto3").
1. **Contextual Mapping:** It aligns the software architecture (Design Spec) with the project’s specific constraints (e.g., Singapore region, Read-only access).
2. **Decomposition:** It breaks complex requirements into **Atomic Tasks**—small, manageable coding steps that ensure the developer and the AI stay perfectly aligned during the "Month-long MVP" build.
