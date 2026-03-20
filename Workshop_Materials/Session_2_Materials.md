# Session 2: Capabilities Deep Dive
**Theme:** From Magic to Mastery - Building End-to-End Workflows

## 1. Teaching Module: Decoding the Magic (The Anatomy of Modern Workflows)
### The Core Concept: Modular Building Blocks
*   **The Old Way (The Monolith):** In the past, if you wanted to build a website that saved data, you had to build everything in one giant, heavy clump. You needed a dedicated server, a complex database like SQL, and backend code running 24/7 just to listen for a form submission. It was slow and expensive.
*   **The NWOW (Modular & Serverless):** Today, we build using loosely connected blocks. The visual part of the website lives in one place, the data lives in another, and they only talk to each other briefly when needed. This is faster down to develop, cheaper to host, and infinitely scalable.

### The 3 Pillars of Our Registration Workflow
*   **Pillar 1: The "Face" (Frontend / GitHub Pages)**
    *   **What it is:** This is the HTML, CSS, and JavaScript. It's strictly the visual design, the glow effects, and the button clicks. It has zero memory.
    *   **Where it lives:** Because it's just visual files, we can host it for free on GitHub Pages. It requires zero server maintenance.
*   **Pillar 2: The "Brain & Storage" (Backend / Google Sheets & Apps Script)**
    *   **What it is:** We need a place to store names and emails permanently. Instead of building a complex database, we use a simple Google Sheet.
    *   **The Magic trick:** A spreadsheet can't listen to a website directly. So, we wrote a tiny script (Google Apps Script) that sits in front of the spreadsheet, acting as a bouncer.
*   **Pillar 3: The "Messenger" (The API)**
    *   **What it is:** API stands for Application Programming Interface. Think of it as a digital messenger on a motorcycle. 
    *   **How it works:** When you click "Secure My Spot," the frontend packages your data into a neat little box (JSON format), hands it to the API messenger, and sends it to the Google Apps Script bouncer.

### Why This Matters for Agentic Prompts (The "Aha!" Moment)
*   **Do not prompt for monoliths.** If you ask an AI, *"Build me a website that saves registrations,"* it will give you hundreds of lines of complex Node.js or Python database code that takes hours to configure.
*   **We must prompt the AI modularly.** 
    *   **Prompt 1:** Focus on the visual Face (HTML/CSS).
    *   **Prompt 2:** Focus on the Brain & Storage (Google Apps Script).
    *   **Prompt 3:** Tell the AI to connect them via an API messenger.

---

## 2. Demo Guide: Replicating the Workshop Registration Site

*(Live Demo Speedrun: Show participants how fast we can build the exact site they used to register.)*

### Step 1: Generating the "Stunning" Frontend
*   **The Prompt:** *"Create a single-page registration site for my 'Agentic IDE Workshop'. I need a form that captures: Full Name, Email, an Attendance Mode radio button (Online vs. Offline), and an optional 'Interests' text area. I want the design to be extremely modern, dark mode, with a 'glassmorphism' aesthetic, glowing purple accents, and floating background particles. Keep it in a single `index.html` file using pure CSS and JS."*
*   **Action Highlights:** Show the AI generating the HTML structure and responsive grid layout, and complex CSS animations without a human designer.

### Step 2: Scaffolding the Serverless Backend (Google Sheets)
*   **The Prompt:** *"I want to save this form data into a Google Sheet automatically without paying for a database. Write a Google Apps Script (`backend_script.gs`) that accepts a POST request from my website and appends a new row with the Timestamp, Name, Email, Mode, and Interests."*
*   **Action Highlights:** Note how the AI can seamlessly switch languages from HTML/CSS to Google Apps Script. 

### Step 3: Wiring it All Together (The Integration)
*   **The Prompt:** *"I have deployed the Google Apps Script and have a Web App URL. Update our `index.html` file to: 1) Intercept the form submission via JavaScript. 2) Show a loading spinner. 3) Send the data to my script URL. 4) Hide the form and display a 'Success! You're In!' screen when finished."*
*   **Action Highlights:** The AI doesn't rewrite the whole file—it just injects the necessary `<script>` logic, the spinner CSS, and success state UI.

### Step 4: Pushing to Production (GitHub Pages)
*   **The Prompt:** *"This looks great locally. I want to host this for free. Walk me through pushing this folder to my GitHub repository and enabling GitHub Pages so it's live."*
*   **Action Highlights:** Demonstrate that the IDE acts as an operational assistant. It can open the terminal, run Git commands, and execute deployment natively.
