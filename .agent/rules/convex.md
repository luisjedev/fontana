---
trigger: always_on
---

### Setup and Run Convex Agent Example

Source: https://context7_llms

CLI commands to clone the Convex agent repository, install dependencies, and run the example project locally. Requires Node.js and npm to be installed.

```bash
git clone https://github.com/get-convex/agent.git
cd agent
npm run setup
npm run example
```

--------------------------------

### Compile and Install Git from Source

Source: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

Download Git tarball, extract it, configure build options, and compile with documentation support. This installs Git to /usr prefix with binaries, documentation in doc/html/info formats. Requires all dependencies to be pre-installed.

```bash
$ tar -zxf git-2.8.0.tar.gz
$ cd git-2.8.0
$ make configure
$ ./configure --prefix=/usr
$ make all doc info
$ sudo make install install-doc install-html install-info
```

--------------------------------

### Initialize and Run Convex Auth Example with npm

Source: https://github.com/get-convex/convex-auth-example

These commands are used to set up and start the Convex Auth example project. First, 'npm install' fetches all necessary project dependencies, and then 'npm run dev' launches the development server, making the example application accessible.

```bash
npm install
npm run dev
```

--------------------------------

### Install Convex and React Query Dependencies

Source: https://docs.convex.dev/quickstart/tanstack-start

Installs the Convex client library, along with several React Query and TanStack Router packages required for integrating Convex with TanStack Start. These packages enable efficient data fetching, caching, and state management within the application.

```bash
npm install convex @convex-dev/react-query @tanstack/react-router-with-query @tanstack/react-query
```

--------------------------------

### Component Development Workflow Setup

Source: https://github.com/get-convex/templates/tree/main/template-component

Provides the npm commands for installing dependencies and starting the development environment. Running npm i performs initial installation and build, while npm run dev starts a file watcher that automatically rebuilds the component, example project frontend, and backend with code generation.

```Bash
npm i
npm run dev
```

--------------------------------

### Initialize TanStack Start Project with Convex

Source: https://docs.convex.dev/quickstart/tanstack-start

Initializes a new TanStack Start project pre-configured with Convex using the Convex CLI. This command streamlines the setup process for new applications, creating a scaffolded project ready for Convex integration.

```bash
npm create convex@latest -- -t tanstack-start
```

--------------------------------

### Install Convex and Dotenv Packages

Source: https://docs.convex.dev/quickstart/nodejs

Installs the Convex client library for interacting with Convex and the dotenv library for managing environment variables.

```bash
npm install convex dotenv
```

--------------------------------

### Install Git Build Tools Debian-based Systems

Source: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

Install the install-info package required for Debian-based distributions (Debian/Ubuntu/Ubuntu-derivatives) when building Git from source with documentation support.

```bash
$ sudo apt-get install install-info
```

--------------------------------

### Run Convex RAG Component Example Project (Shell)

Source: https://context7_llms

This shell script provides the necessary commands to set up and run the RAG component example project from the Convex GitHub repository. It clones the `get-convex/rag` repository, navigates into the project directory, installs dependencies using `npm run setup`, and then executes the example application. This allows users to interactively explore RAG functionalities like content ingestion and context-based text generation.

```bash
git clone https://github.com/get-convex/rag.git
cd rag
npm run setup
npm run example
```

--------------------------------

### Install Clerk TanStack React Start SDK

Source: https://clerk.com/docs/quickstarts/tanstack-start

Install the Clerk TanStack React Start SDK package using npm, pnpm, yarn, or bun. This SDK provides prebuilt components, React hooks, and helpers for user authentication.

```bash
npm install @clerk/tanstack-react-start
```

--------------------------------

### Install and Initialize Datadog React Native SDK

Source: https://www.datadoghq.com/product/error-tracking

This example shows how to install the Datadog SDK for React Native applications and configure it for monitoring. It includes adding the npm package, running `pod install` for iOS, and initializing the `DatadogProvider` with RUM tracking for user interactions, resources, and errors.

```shell
npm install @datadog/mobile-react-native
(cd ios && pod install)
```

```javascript
import { BatchSize, DatadogProvider, DatadogProviderConfiguration, SdkVerbosity, UploadFrequency, } from "@datadog/mobile-react-native";

const config = new DatadogProviderConfiguration(
  "",
  "",
  "30bb1c1b-b33b-4ed3-a5cc-70bd6f859228",
  true, // track user interactions (such as a tap on buttons).
  true, // track XHR Resources
  true // track Errors
)
config.nativeCrashReportEnabled = true
config.resourceTracingSamplingRate = 0; // Wrap the content of your App component by a DatadogProvider component, passing it your configuration:
export default function App() {
  return (
    
  );
}
```

--------------------------------

### Create a New TanStack Start Application

Source: https://docs.convex.dev/quickstart/tanstack-start

Generates a new TanStack Start application from scratch using the official `create-start-app` CLI tool. This is an alternative to the Convex-specific quickstart command, providing a clean slate for development.

```bash
npx create-start-app@latest
```

--------------------------------

### Set up and run Convex Agent example project

Source: https://www.npmjs.com/package/@convex-dev/agent

These commands clone the Convex Agent example repository from GitHub, navigate into its directory, set up project dependencies, and then start the development server. This allows users to experiment with the agent component and understand its functionalities in a live environment.

```bash
git clone https://github.com/get-convex/agent.git
cd agent
npm run setup
npm run dev
```

--------------------------------

### Set Up and Run RAG Example Project via Shell

Source: https://docs.convex.dev/agents/rag

This set of commands provides instructions to clone, set up dependencies, and execute a RAG (Retrieval-Augmented Generation) example project from a GitHub repository. It covers cloning the repository, navigating into its directory, installing necessary packages, and running the example application.

```shell
git clone https://github.com/get-convex/rag.git
cd rag
npm run setup
npm run example
```

--------------------------------

### Install Git Documentation Dependencies Fedora/Debian

Source: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

Install additional dependencies required to generate and install Git documentation in multiple formats (doc, html, info). These packages are optional but needed if you want to build documentation during installation.

```bash
$ sudo dnf install asciidoc xmlto docbook2X
```

```bash
$ sudo apt-get install asciidoc xmlto docbook2x
```

--------------------------------

### Install Convex Library CLI

Source: https://docs.convex.dev/quickstart/remix

Commands to navigate into the created Remix app directory and install the Convex client library. This step is crucial for enabling Convex functionality within the Remix project.

```bash
cd my-remix-app && npm install convex
```

--------------------------------

### GET /tasks

Source: https://docs.convex.dev/quickstart/tanstack-start

Retrieves all tasks stored in the Convex database. This endpoint is used to fetch a list of task items for display.

```APIDOC
## GET /tasks

### Description
Retrieves all tasks currently stored in the Convex database. This endpoint is used to fetch a list of task items for display in the application.

### Method
GET

### Endpoint
/tasks

### Parameters
#### Path Parameters
*(None)*

#### Query Parameters
*(None)*

#### Request Body
*(None)*

### Request Example
*(No request body for GET requests)*

### Response
#### Success Response (200)
- **Array of Objects**: Each object represents a task.
  - **_id** (string) - The unique identifier of the task.
  - **text** (string) - The content or description of the task.

#### Response Example
```json
[
  {
    "_id": "123a4b5c6d7e",
    "text": "Buy groceries"
  },
  {
    "_id": "890f1g2h3i4j",
    "text": "Walk the dog"
  }
]
```
```

--------------------------------

### Check Git Installation

Source: https://docs.convex.dev/tutorial

Verifies if Git is installed on the system. Git is required to clone the example project repository from GitHub.

```shell
git -v
```

--------------------------------

### Install Git Build Tools RPM-based Systems

Source: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

Install the getopt package required for RPM-based distributions (Fedora/RHEL/RHEL-derivatives) when building Git from source. This package is pre-installed on Debian-based distributions.

```bash
$ sudo dnf install getopt
```

--------------------------------

### Install Rust Convex client and dependencies

Source: https://docs.convex.dev/quickstart/rust

Installs the necessary Rust libraries for interacting with Convex, the Tokio asynchronous runtime, and dotenvy for managing environment variables. Also includes the npm installation for the Convex backend.

```bash
npm init -y && npm install convex && cargo add convex tokio dotenvy
```

--------------------------------

### Install Convex Client and Server Libraries

Source: https://docs.convex.dev/quickstart/python

Navigate into your application directory to initialize a new npm project, install the Convex npm package for backend development, and then install the Convex Python client library along with `python-dotenv` within your virtual environment for client-side interaction and environment variable management.

```shell
cd my-app && npm init -y && npm install convex && venv/bin/pip install convex python-dotenv
```

--------------------------------

### Install Git on Fedora using dnf

Source: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

Install Git on Fedora, RHEL, or CentOS distributions using the dnf package manager. This command installs the complete Git toolset including all basic tools required for version control.

```bash
$ sudo dnf install git-all
```

--------------------------------

### Install Convex Client and Server Library

Source: https://docs.convex.dev/quickstart/nextjs

Install the Convex package in the Next.js project directory. This provides the necessary client and server libraries to integrate Convex backend functionality with your Next.js application.

```bash
cd my-app && npm install convex
```

--------------------------------

### View example output from a successful Vitest test run

Source: https://vitest.dev/guide

This is the expected console output after successfully running the Vitest test for the `sum` function. It provides a summary of passed test files and individual tests, along with the start time and total duration of the test execution

```txt
✓ sum.test.js (1)
✓ adds 1 + 2 to equal 3
Test Files 1 passed (1)
Tests 1 passed (1)
Start at 02:15:44
Duration 311ms
```

--------------------------------

### Initialize Convex Client and Query Data (HTML/JavaScript)

Source: https://docs.convex.dev/quickstart/script-tag

Initializes a `ConvexClient` with a provided Convex deployment URL and sets up a real-time update listener for the `tasks:get` query. When data changes, it logs the text of each task to the console.

```html
<!doctype html>
<script src="https