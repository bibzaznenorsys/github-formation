import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const labRoot = resolve(__dirname, '..')
const config = JSON.parse(readFileSync(resolve(labRoot, 'lab.config.json'), 'utf8'))

function renderCurrentStep(step) {
  if (!step) {
    return `<!-- LAB-CURRENT-STEP:START -->
## Lab complete

All steps passed. Great work with GitHub Copilot!
<!-- LAB-CURRENT-STEP:END -->`
  }

  const commands = step.issueText.commands.map((cmd) => `\`${cmd}\``).join('\n')
  const acceptance = step.issueText.acceptance.map((item) => `- ${item}`).join('\n')

  return `<!-- LAB-CURRENT-STEP:START -->
## Current step — ${step.order}/${config.steps.length}: ${step.title}

**Branch:** \`${step.branch}\`

### Copilot hint
${step.issueText.copilotHint}

### Commands
${commands}

### Acceptance criteria
${acceptance}

When \`npm test\` passes locally, commit and push. This issue will update automatically.
<!-- LAB-CURRENT-STEP:END -->`
}

function renderChecklist(completedStepIds) {
  const lines = config.steps.map((step) => {
    const checked = completedStepIds.includes(step.id) ? 'x' : ' '
    return `- [${checked}] Step ${step.order}: ${step.title}`
  })

  return `<!-- LAB-CHECKLIST:START -->
## Progression
${lines.join('\n')}
<!-- LAB-CHECKLIST:END -->`
}

function getCompletedStepsFromResults(results) {
  const fileResults = new Map()

  for (const testResult of results?.testResults ?? []) {
    fileResults.set(testResult.name.split('/').pop(), testResult.status === 'passed')
  }

  const completed = []
  for (const step of config.steps) {
    const filesPass = step.testFiles.every((file) => fileResults.get(file) === true)
    if (filesPass) {
      completed.push(step.id)
    }
  }

  return completed
}

function getNextStep(completedStepIds) {
  return config.steps.find((step) => !completedStepIds.includes(step.id))
}

function upsertBlock(body, markerStart, markerEnd, replacement) {
  const pattern = new RegExp(`${markerStart}[\\s\\S]*?${markerEnd}`)
  if (pattern.test(body)) {
    return body.replace(pattern, replacement)
  }
  return `${body.trim()}\n\n${replacement}`
}

async function githubRequest(path, token, options = {}) {
  const response = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(options.headers ?? {}),
    },
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`GitHub API ${response.status}: ${text}`)
  }

  return response.json()
}

async function findLearnerIssue(token, repo, actor) {
  const query = encodeURIComponent(`repo:${repo} is:issue is:open label:${config.label} author:${actor}`)
  const data = await githubRequest(`/search/issues?q=${query}&sort=created&order=desc&per_page=1`, token)
  return data.items?.[0] ?? null
}

function buildComment(completedStepIds, nextStep, branch, success) {
  if (!success) {
    return `Lab check failed on branch \`${branch}\`.

Fix the failing tests with Copilot, then push again. Your issue stays on the current step.`
  }

  const lastCompleted = config.steps.filter((step) => completedStepIds.includes(step.id)).at(-1)
  if (!nextStep) {
    return `All lab steps are complete on branch \`${branch}\`. Module 2 lab finished.`
  }

  return `Step completed: **${lastCompleted?.title ?? 'Setup'}**

Next step unlocked: **${nextStep.title}**

Checkout \`${nextStep.branch}\`, follow the updated **Current step** section above, then push when tests pass.`
}

async function main() {
  const token = process.env.GITHUB_TOKEN
  const repo = process.env.GITHUB_REPOSITORY
  const actor = process.env.GITHUB_ACTOR
  const branch = process.env.GITHUB_REF_NAME ?? 'unknown'
  const resultsPath = process.env.TEST_RESULTS_PATH ?? resolve(labRoot, 'test-results.json')

  if (!token || !repo || !actor) {
    throw new Error('Missing GITHUB_TOKEN, GITHUB_REPOSITORY, or GITHUB_ACTOR')
  }

  const issue = await findLearnerIssue(token, repo, actor)
  if (!issue) {
    console.log(`No open issue found for ${actor} with label ${config.label}`)
    return
  }

  let results = { testResults: [] }
  try {
    results = JSON.parse(readFileSync(resultsPath, 'utf8'))
  } catch {
    console.log('No test results file found, skipping checklist update')
  }

  const completedStepIds = getCompletedStepsFromResults(results)
  const nextStep = getNextStep(completedStepIds)
  const allPassed = completedStepIds.length === config.steps.length

  const currentBlock = renderCurrentStep(nextStep)
  const checklistBlock = renderChecklist(completedStepIds)

  let body = issue.body ?? ''
  body = upsertBlock(body, '<!-- LAB-CURRENT-STEP:START -->', '<!-- LAB-CURRENT-STEP:END -->', currentBlock)
  body = upsertBlock(body, '<!-- LAB-CHECKLIST:START -->', '<!-- LAB-CHECKLIST:END -->', checklistBlock)

  await githubRequest(`/repos/${repo}/issues/${issue.number}`, token, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ body }),
  })

  const branchStep = config.steps.find((step) => step.branch === branch)
  const stepPassed = branchStep
    ? branchStep.testFiles.every((file) =>
        results.testResults?.some(
          (result) => result.name.split('/').pop() === file && result.status === 'passed',
        ),
      )
    : false

  await githubRequest(`/repos/${repo}/issues/${issue.number}/comments`, token, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      body: buildComment(completedStepIds, nextStep, branch, stepPassed || allPassed),
    }),
  })

  console.log(`Updated issue #${issue.number} for ${actor}. Completed: ${completedStepIds.join(', ')}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
