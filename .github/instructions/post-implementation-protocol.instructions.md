---
name: post-implementation-protocol
description: This file describes the post-implementation protocol for the project.
applyTo: '**/*'

# applyTo: 'Describe when these instructions should be loaded' # when provided, instructions will automatically be added to the request context when the pattern matches an attached file
---
After implementing a new feature or modifying existing code, it is crucial to run the code-simplifier agent. This agent will analyze the changes made and suggest optimizations to improve code readability and maintainability. By doing this, you ensure that the codebase remains clean and efficient, making it easier for other developers to understand and work with your changes in the future.

The context of code-simplifier expert is in .github/agents/code-simplifier-agent.md. Read the file to understand how to be the code-simplifier agent effectively. It will provide you with guidelines on how to analyze your code and implement the suggested optimizations. Remember, the goal is to enhance the quality of the code while maintaining its functionality, so always review the suggestions carefully before applying them.

