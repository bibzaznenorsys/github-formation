# Module 2 Lab — Student & Class Onboarding

Build `POST /students` and `POST /classes` with Express, tests, and GitHub Copilot.

---

## Start here

### 1. Fork this repository

Click **Fork** at the top of GitHub.

- Do **not** check “Copy the main branch only” — you need all `feature/module-2/*` branches.

### 2. Enable Issues on your fork (one time)

On **your fork**: **Settings** → **General** → **Features** → check **Issues** → Save.

Also enable **Actions**: **Settings** → **Actions** → **General** → Allow all actions.

### 3. Start exercise

On **your fork**:

1. Click the **Issues** tab
2. Click **New issue**
3. Select **Module 2 Lab - Student Class Onboarding**
4. Click **Create issue**

Direct link (replace `YOUR-USERNAME` with your GitHub login):

```
https://github.com/YOUR-USERNAME/github-formation/issues/new?template=module-2-lab.md
```

Example: `https://github.com/bibzaznenorsys/github-formation/issues/new?template=module-2-lab.md`

Your issue is your **only guide** — follow the **Current step** section after each push.

---

## Clone and work

After creating your issue, clone **your fork**:

```bash
git clone https://github.com/YOUR-USERNAME/github-formation.git
cd github-formation
git checkout feature/module-2/00-intro
cd labs/module-2
npm install
npm test -- tests/step-00-intro.test.js
```

Commit, push, then read the updated issue for step 2.

---

## Commands

```bash
npm test                              # all tests
npm test -- tests/step-00-intro.test.js   # one step only
npm start                             # http://localhost:3002
```

## Trainer note

Run `scripts/bootstrap-branches.sh` from repo root to recreate learner branches.
