---
trigger: always_on
---

We are going to define the order or logical procedure we must follow during the process of doing the work.

If it is not started, start the application with the command pnpm dev.

First, you need to find information related to the feature or what we want to do, whether in the internal documentation that we have in the project, and also by reading the code, both for the function and for exactly what is happening and what we want.

Subsequently, whenever the task involves third-party libraries or framework-specific code (be it for the framework, backend libraries, styling, or otherwise), you must always use context7 to retrieve the relevant information and ensure you are fully informed on the correct implementation of these tools.

Subsequently, you must develop a step-by-step action plan and submit it for my review. Flag any steps you consider incorrect or those that require further clarification from me. Do not proceed with implementation until the action plan has been explicitly confirmed.

Whenever visual implementations are involved, you must open the application in VS Code browser tooling, navigate to the specific location where the changes were made, and verify that the result visually aligns with either the provided image or the user's specifications. If there are discrepancies between the intended design and the implemented result, iterate with screenshots until the required design is achieved.

Lastly, run the Biome command available in Wordflow for formatting (pnpm biome check --write src). Do a quick review of the implemented code to check for errors. Verify, once you have started the application from the console, that there are no console errors. Finally, give me a report on how it was implemented.

IMPORTANT: 
Always translate user prompts and requests into English before internal processing; this enhances comprehension, improves reasoning, and optimizes token usage. However, all outgoing communication to the user—including chat interactions, action plans, post-implementation reports, and any direct agent-to-user messages—must be conducted in Spanish.
