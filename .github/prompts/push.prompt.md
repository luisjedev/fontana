---
name: push
description: Push changes to branch
agent: agent
model: GPT-5.3-Codex (copilot)
tools: [vscode, execute, read, agent, edit, search, web, 'github/*', github.vscode-pull-request-github/issue_fetch, github.vscode-pull-request-github/suggest-fix, github.vscode-pull-request-github/searchSyntax, github.vscode-pull-request-github/doSearch, github.vscode-pull-request-github/renderIssues, github.vscode-pull-request-github/activePullRequest, github.vscode-pull-request-github/openPullRequest, todo]
---
1. Execute "pnpm check" to check and fix any linting or formatting issues in the codebase before pushing.
2. Do a code review of the changes to be pushed, checking for any potential issues or improvements.
3. If any issues are found during the code review, fix them before proceeding to push.
4. Once the code is ready, commit the changes with a clear and descriptive commit message.
5. Push the changes to the appropriate branch in the remote repository.
