---
name: deploy
description: Process for deploy app to PROD
agent: agent
model: GPT-5.3-Codex (copilot)
tools: [vscode, execute, read, agent, edit, search, web, 'github/*', github.vscode-pull-request-github/issue_fetch, github.vscode-pull-request-github/suggest-fix, github.vscode-pull-request-github/searchSyntax, github.vscode-pull-request-github/doSearch, github.vscode-pull-request-github/renderIssues, github.vscode-pull-request-github/activePullRequest, github.vscode-pull-request-github/openPullRequest, todo]
---
1. Review if there are local changed not commited, throw message to commit or stash them before deploy and stop the process
2. Check if there are open PRs to main branch, if there are any, throw message to review and merge them before deploy and stop the process
3. Create PR from develop to main
4. if no issues and merge blocks, merge PR
5. Run `npx convex deploy -y` to deploy convex changes to production