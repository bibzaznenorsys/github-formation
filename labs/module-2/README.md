# Module 2 Lab — Student & Class Onboarding

Hands-on Express.js lab for **GitHub Copilot Fundamentals (Module 2)**.

Build `POST /students` and `POST /classes` APIs with validation, duplicate handling, and tests — using GitHub Copilot at each step.

## Prerequisites

- Node.js 20+
- Git
- GitHub account with access to this repository
- VS Code + GitHub Copilot extension

## Quick start

```bash
git clone https://github.com/HansLanda14ib/github-formation.git
cd github-formation/labs/module-2
npm install
npm test
```

## Start the exercise

[![Commencer l'exercice](https://img.shields.io/badge/Commencer_l'exercice-0e7490?style=for-the-badge&logo=github)](https://github.com/HansLanda14ib/github-formation/issues/new?template=module-2-lab.yml&labels=module-2-lab)

[![Start exercise](https://img.shields.io/badge/Start_exercise-0e7490?style=for-the-badge&logo=github)](https://github.com/HansLanda14ib/github-formation/issues/new?template=module-2-lab.yml&labels=module-2-lab)

> **Important:** Once your issue is created, follow **only your issue** step by step.  
> After each successful push, GitHub Actions updates your issue with the next step.

## How it works

1. Click **Start exercise** → create your personal GitHub Issue
2. Read the **Current step** section in your issue
3. Checkout the branch indicated in the issue
4. Implement with GitHub Copilot
5. Run `npm test` locally
6. Commit and push → your issue updates automatically

## Lab steps (reference)

| Step | Branch | Goal |
|------|--------|------|
| 1 | `feature/module-2/00-intro` | Setup and smoke test |
| 2 | `feature/module-2/01-schemas` | Student/Class validators |
| 3 | `feature/module-2/02-student-route` | POST /students |
| 4 | `feature/module-2/03-class-route` | POST /classes |
| 5 | `feature/module-2/04-duplicate-errors` | 409 conflicts + error format |
| 6 | `feature/module-2/05-tests-and-docs` | Integration + LAB-NOTES.md |

## Commands

```bash
npm test          # run all step tests
npm run test:watch
npm start         # start server on http://localhost:3002
```

## Trainer note

Run `scripts/bootstrap-branches.sh` from repo root to recreate learner branches from the solution on `main`.
