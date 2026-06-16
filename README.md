# AvaBot - AI Agent Simulation Sandbox

> ⚠️ **This is a UI prototype for demonstration purposes only.**  
> No real AI, no connected APIs, no live agent functionality of any kind.

---

## What Is This?

AvaBot is a **static frontend prototype** that simulates the layout and interaction design of an AI agent configurator. It is built exclusively with **HTML, CSS, and vanilla JavaScript** mo frameworks, no backend, no external services.

The goal is to visualize how an AI agent interface could look and behave across different strategic configurations, using a pre-defined static Q&A bank to simulate responses.

---

## What This Is NOT

- ❌ Not connected to any AI model or API
- ❌ Not a functional chatbot
- ❌ Not a production-ready tool
- ❌ The "agent" does not think, learn, or generate real responses

---

## Layout Overview

### Left Panel - Strategic Design Decisions
Configure the agent's behavior profile using **7 sliders**, each representing a strategic dimension with two opposing poles:

| Cluster | Left Pole | Right Pole |
|---|---|---|
| AI Adoption & Workflow | Speed of automation | Deep end-to-end automation |
| Technology & Infrastructure | High scalability | Infrastructure constraints |
| Human Role & Accountability | Human-led | Autonomous AI consulting |
| Cost Pressure & Viability | Economically scalable AI | Cost-constrained |
| Business Model & Value | Billable hours | Outcome / value-based |
| Geopolitical Fragmentation | Open global AI market | Crisis-driven landscape |
| Governance & Regulation | Safe adoption | Restricted adoption |

You can adjust each slider manually (Level 1–5), or use one of the **4 preset blueprints** at the top of the panel to instantly load a scenario configuration:

- **S1 - Productivity Assistant**: AI augments individuals, humans own all deliverables.
- **S2 - Hybrid Manager**: AI handles sub-projects, humans orchestrate and manage.
- **S3 - Deep Architect**: AI executes end-to-end delivery, small human team oversees trust and ethics.
- **S4 - Autonomous Agent**: Near-complete automation, humans retain only legal and board-level accountability.

---

### Top Right Panel AI Agent Profile, SWOT & Executive Metrics

Based on your slider configuration, three panels update automatically:

**AI Agent Profile**
Shows the agent's name/role, a short description, and three key indicators:
- `AUTO`: Automation level (%)
- `INTEG`: AI Integration level (%)
- `HUMAN`: Human input level (%)

**SWOT Projections**
A 2×2 grid showing the strategic outlook for the active configuration:
- 🟢 **S**: Strength
- 🔴 **W**: Weakness
- 🔵 **O**: Opportunity
- 🟠 **T**: Threat

**Executive Metrics**
Three horizontal bar indicators:
- `Time to Value`: How quickly the model delivers results
- `Governance Complexity`: Oversight and compliance burden
- `Technical Risk Exposure`: Infrastructure and implementation risk

A **Config Score Average** summarizes the overall slider position (1–5).

---

### Bottom Center - Agent Chat

A simulated chat interface where you can type a question and receive a response from the "agent." 

- Responses come from a **static Q&A bank** (~40 entries per scenario, ~160 total).
- Matching is keyword-based, no AI involved.
- A **typing indicator** (animated dots) simulates response delay.
- **Recommended questions** appear as chips below the chat for quick input.
- Use **Clear History** to reset the conversation.

---

## How to Run

No installation needed. Just open `index.html` in any modern browser.

Or visit the live demo on GitHub Pages:  
`https://[your-username].github.io/[your-repo-name]/`

---

