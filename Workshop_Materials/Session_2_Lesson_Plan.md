# Lesson Plan: Session 2 - Capabilities Deep Dive

## Course Information
*   **Target Audience:** Sales & Presales Teams
*   **Duration:** 60 Minutes
*   **Theme:** From Magic to Mastery - Building End-to-End Workflows
*   **Prerequisites:** Attendance at Session 1 (or familiarity with basic Agentic IDE concepts).

## Learning Objectives
By the end of this session, participants will be able to:
1.  Understand the difference between monolithic and modular architecture in modern application development.
2.  Deconstruct a complex workflow into discrete, promptable components (Frontend, Backend, API).
3.  Observe and replicate the process of using an Agentic IDE to build a web application (Registration Site).
4.  Observe and replicate the process of automating content creation (Markdown to PowerPoint) using both low-code (CLI tools) and full-code (Python) approaches.

## Materials Needed
*   **Instructor Setup:** Antigravity IDE configured, GitHub account, Google Apps Script access.
*   **Participant Materials:** Access to the `Session_2_Materials.md` repository link: `https://github.com/Fredwong76/agentic-workshop-reg/tree/main/Workshop_Materials`
*   **Demo Assets:** 
    *   `Marp_Premium.md` (for the presentation demo)

---

## Session Outline & Timing (60 Minutes)

### 1. Welcome & Recap (5 Minutes)
*   **Action:** Welcome participants, acknowledge the success of the registration process from Session 1.
*   **Talking Points:** Define the goal of today: Moving from spectators to architects. We will look *under the hood* of the registration site they used.

### 2. Teaching Module: Decoding the Magic (10 Minutes)
*   **Objective:** Shift the mindset from "chatting with AI" to "orchestrating services."
*   **Key Concepts:**
    *   **The Monolith vs. Modular (Serverless):** Why we don't ask the AI to build one giant app.
    *   **The 3 Pillars:** Frontend (The "Face"), Backend (The "Brain & Storage"), API (The "Messenger").
    *   **The "Aha" Moment:** Effective prompting requires architectural awareness. Prompt for the pillars separately.

### 3. Live Demo 1: Replicating the Registration Site (20 Minutes)
*   **Objective:** Show the speed of building modular applications with Agentic IDEs.
*   **Step-by-Step execution (Interactive Speedrun):**
    *   **Step 1 (5 mins):** Prompt for the Frontend (`index.html`). Highlight the modern CSS generation.
    *   **Step 2 (5 mins):** Prompt for the Backend (`backend_script.gs`). Highlight the cross-language capability (Apps Script).
    *   **Step 3 (5 mins):** Prompt to wire them together. Show the AI injecting the API call and success state logic.
    *   **Step 4 (5 mins):** Deploy to GitHub Pages via terminal commands generated/run by the IDE.

### 4. Live Demo 2: The Content Automation Pipeline (15 Minutes)
*   **Objective:** Demonstrate workflow automation for daily presales tasks (reporting/presentations).
*   **Scenario:** Converting raw markdown notes into a polished PPTX for a steering committee.
*   **Method 1: The Low-Code Way (Marp CLI)**
    *   Prompt the AI to install and run the Marp CLI tool. Show the quick CSS-based styling. 
*   **Method 2: The Full-Code Way (Python generator)**
    *   Prompt the AI to write a Python script using `python-pptx` for pixel-perfect brand alignment. Emphasize the programmability and scale (e.g., generating 100 decks from a CSV).

### 5. Q&A and Transition to Next Session (10 Minutes)
*   **Action:** Open the floor for questions.
*   **Preview Session 3:** Tease the upcoming "Hands-On Fundamentals" where they will drive the IDE themselves. 
*   **Call to Action:** Encourage them to review the `Session_2_Materials.md` on GitHub and start identifying repetitive tasks in their own week that could be automated via scripts or modular workflows.
