---
name: Module 2 Lab - Student Class Onboarding
about: Start the Module 2 hands-on Express lab. Your issue guides you step by step after each push.
title: "[Lab M2] Student/Class onboarding"
labels:
  - module-2-lab
---

## Module 2 Lab

Welcome! **Follow only this issue** — it updates automatically after each successful push.

1. Clone **your fork** and run `cd labs/module-2 && npm install`
2. Complete the **Current step** below
3. Push your branch — GitHub Actions validates tests and unlocks the next step here

---

LAB-CURRENT-STEP-START

## Current step — 1/6: Setup — clone, install, first run

**Branch:** `feature/module-2/00-intro`

### Copilot hint
Explore the project structure. No Copilot coding required yet — just verify the app starts.

### Commands
- `cd labs/module-2`
- `npm install`
- `npm test -- tests/step-00-intro.test.js`

### Acceptance criteria
- Dependencies installed successfully
- Smoke test passes (Express app responds on GET /health)

When tests pass locally, commit and push. This issue will update automatically.

LAB-CURRENT-STEP-END

---

LAB-CHECKLIST-START

## Progression
- [ ] Step 1: Setup — clone, install, first run
- [ ] Step 2: Scaffold Student and Class validation
- [ ] Step 3: Implement POST /students
- [ ] Step 4: Implement POST /classes
- [ ] Step 5: Duplicate handling and unified errors
- [ ] Step 6: Final integration and lab README

LAB-CHECKLIST-END
