---
name: deploy
description: Process for deploy app to PROD
agent: agent
model: GPT-5.3-Codex (copilot)
tools: [vscode, execute, read, agent, edit, search, web, 'github/*', github.vscode-pull-request-github/issue_fetch, github.vscode-pull-request-github/suggest-fix, github.vscode-pull-request-github/searchSyntax, github.vscode-pull-request-github/doSearch, github.vscode-pull-request-github/renderIssues, github.vscode-pull-request-github/activePullRequest, github.vscode-pull-request-github/openPullRequest, todo]
---
1.Create PR from develop to main
2.if no issues and merge blocks, merge PR
3.Run `npx convex deploy` and type Y when the cli ask you for confirmation