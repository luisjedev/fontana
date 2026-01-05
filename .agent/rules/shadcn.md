---
trigger: always_on
---

https://context7.com/websites/ui_shadcn/llms.txt?tokens=10000

### Quick Registry Configuration Setup

Source: https://ui.shadcn.com/docs/registry/namespace

Minimal configuration example for setting up two namespaced registries (v0 and acme) in components.json. This provides a foundation for multi-source resource installation.

```json
{
  "registries": {
    "@v0": "https://v0.dev/chat/b/{name}",
    "@acme": "https://registry.acme.com/resources/{name}.json"
  }
}
```

--------------------------------

### Install Switch Component via CLI

Source: https://ui.shadcn.com/docs/components/switch

Installs the Switch component and its dependencies using the shadcn CLI tool. This is the recommended installation method for quick setup in shadcn projects.

```bash
npx shadcn@latest add switch
```

--------------------------------

### Serve shadcn Registry with Next.js Development Server

Source: https://ui.shadcn.com/docs/registry/getting-started

This command starts the Next.js development server, which will serve your shadcn registry files if your project is configured with Next.js. The registry items will be accessible via specific URLs under `/r/` after the build process.

```bash
npm run dev
```

--------------------------------

### Install Radix UI Select dependency manually with npm

Source: https://ui.shadcn.com/docs/components/select

For manual Shadcn UI Select setup, use this `npm` command to install the foundational `@radix-ui/react-select` package. This step is crucial before copying the component source code.

```bash
npm install @radix-ui/react-select
```

--------------------------------

### Install Shadcn UI Progress Component

Source: https://ui.shadcn.com/docs/components/progress

This section provides two methods for installing the Shadcn UI `Progress` component. The CLI method uses `npx shadcn@latest add progress` for quick setup, while the manual method involves installing the core `@radix-ui/react-progress` dependency via `npm`. Both approaches integrate the progress bar functionality into your project.

```bash
npx shadcn@latest add progress
```

```bash
npm install @radix-ui/react-progress
```

--------------------------------


### Install shadcn CLI via npm

Source: https://ui.shadcn.com/docs/registry/getting-started

This command installs the latest version of the shadcn command-line interface (CLI) globally or as a dev dependency in your project. The CLI is essential for building and managing shadcn component registries and components.

```bash
npm install shadcn@latest
```

### Install Shadcn UI Label component

Source: https://ui.shadcn.com/docs/components/label

This section provides instructions for installing the Shadcn UI Label component using both the command-line interface (CLI) and a manual approach. The CLI command offers a quick setup, while manual installation involves adding the core Radix UI dependency and copying the component source.

```bash
npx shadcn@latest add label
```

```bash
npm install @radix-ui/react-label
```

### Initialize TanStack Start Project with shadcn/ui and Tailwind

Source: https://ui.shadcn.com/docs/installation/tanstack

This command initializes a new TanStack Start project, automatically configuring it with Tailwind CSS and the necessary integrations for shadcn/ui components. It sets up the foundational structure for a web application using these technologies, streamlining the setup process.

```bash
npm create @tanstack/start@latest --tailwind --add-ons shadcn
```

### Create New Laravel Project with React

Source: https://ui.shadcn.com/docs/installation/laravel

Initialize a new Laravel project with Inertia and React using the Laravel installer. This command creates a fresh Laravel application with React pre-configured for use with Inertia.js.

```bash
laravel new my-app --react
```

--------------------------------

### Install Input OTP Dependency with npm (Bash)

Source: https://ui.shadcn.com/docs/components/input-otp

Instructs on how to manually install the core `input-otp` dependency using npm. This is a prerequisite for manual setup before copying the component source code into your project.

```bash
npm install input-otp
```

--------------------------------

### Install shadcn components from various sources

Source: https://ui.shadcn.com/docs/registry/namespace

Demonstrates how to install shadcn components using the 'add' command. This includes installing from a specific registry, installing multiple resources, installing directly from a URL, and installing from a local file path.

```bash
npx shadcn@latest add @v0/dashboard
```

```bash
npx shadcn@latest add @acme/button @lib/utils @ai/prompt
```

```bash
npx shadcn@latest add https://registry.example.com/button.json
```

```bash
npx shadcn@latest add ./local-registry/button.json
```

--------------------------------

### Example Interactive Prompts for `shadcn@latest init` Command

Source: https://ui.shadcn.com/docs/changelog

This text snippet illustrates the questions asked when running the `npx shadcn@latest init` command, guiding the user through configuring their `components.json` file. It covers choices for styling, color, CSS location, CSS variables, Tailwind config, import aliases, and React Server Components.

```txt
Which style would you like to use? › Default
Which color would you like to use as base color? › Slate
Where is your global CSS file? › › app/globals.css
Do you want to use CSS variables for colors? › no / yes
Where is your tailwind.config.js located? › tailwind.config.js
Configure the import alias for components: › @/components
Configure the import alias for utils: › @/lib/utils
Are you using React Server Components? › no / yes
```

--------------------------------

### Define Universal Registry Item for Multi-File Template (shadcn/ui)

Source: https://ui.shadcn.com/docs/registry/examples

This JSON configuration defines a shadcn/ui registry item named 'my-custom-start-template' that installs multiple files. It includes two files, each with an explicit target path, demonstrating how to create a universal starter template that can be installed without framework detection or components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "my-custom-start-template",
  "type": "registry:item",
  "dependencies": ["better-auth"],
  "files": [
    {
      "path": "/path/to/file-01.json",
      "type": "registry:file",
      "target": "~/file-01.json",
      "content": "..."
    },
    {
      "path": "/path/to/file-02.vue",
      "type": "registry:file",
      "target": "~/pages/file-02.vue",
      "content": "..."
    }
  ]
}
```

--------------------------------

### Install Form Component via Shadcn CLI

Source: https://ui.shadcn.com/docs/components/form

This command provides the recommended method for installing the Shadcn UI form component using its command-line interface. Executing this command automates the addition of the form component and its dependencies to your project, simplifying the setup process.

```bash
npx shadcn@latest add form
```

--------------------------------

### Multiple Registry Setup with Mixed Authentication

Source: https://ui.shadcn.com/docs/components-json

Complete example showing how to configure multiple registries with different authentication methods and parameters. Demonstrates public registries, private registries with bearer tokens, and team registries with versioning and environment variables.

```json
{
  "registries": {
    "@shadcn": "https://ui.shadcn.com/r/{name}.json",
    "@company-ui": {
      "url": "https://registry.company.com/ui/{name}.json",
      "headers": {
        "Authorization": "Bearer ${COMPANY_TOKEN}"
      }
    },
    "@team": {
      "url": "https://team.company.com/{name}.json",
      "params": {
        "team": "frontend",
        "version": "${REGISTRY_VERSION}"
      }
    }
  }
}
```

--------------------------------

### Install Project Dependencies using npm

Source: https://ui.shadcn.com/docs/installation/manual

This bash command installs a set of essential npm packages for the project. These dependencies include utilities for styling (`class-variance-authority`, `clsx`, `tailwind-merge`), icon library (`lucide-react`), and animation effects (`tw-animate-css`).

```bash
npm install class-variance-authority clsx tailwind-merge lucide-react tw-animate-css
```

--------------------------------

### Install Alert component using Shadcn CLI (Bash)

Source: https://ui.shadcn.com/docs/components/alert

Provides the command-line interface command to add the 'Alert' component to a project using the 'shadcn' CLI tool. This simplifies the setup process by automating component file creation and dependencies.

```bash
npx shadcn@latest add alert
```

--------------------------------

### Add Component Definition to shadcn registry.json

Source: https://ui.shadcn.com/docs/registry/getting-started

This JSON snippet shows how to register a component, like `hello-world`, within the `registry.json` file. It includes metadata such as name, type, title, description, and defines the component's file path and type, ensuring it conforms to the registry item schema.

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "acme",
  "homepage": "https://acme.com",
  "items": [
    {
      "name": "hello-world",
      "type": "registry:block",
      "title": "Hello World",
      "description": "A simple hello world component.",
      "files": [
        {
          "path": "registry/new-york/hello-world/hello-world.tsx",
          "type": "registry:component"
        }
      ]
    }
  ]
}
```

--------------------------------

### Install Dependencies with pnpm

Source: https://ui.shadcn.com/docs/blocks

Installs project dependencies using pnpm package manager. Required before starting development on the block.

```bash
pnpm install
```

--------------------------------

### Install Context Menu component using Shadcn CLI (Bash)

Source: https://ui.shadcn.com/docs/components/context-menu

This `npx` command leverages the Shadcn UI command-line interface to quickly add the `context-menu` component to your project. It automates the process of copying component files and installing necessary dependencies, streamlining setup.

```bash
npx shadcn@latest add context-menu
```

--------------------------------

### Install Kbd component via CLI

Source: https://ui.shadcn.com/docs/components/kbd

Install the Kbd component using the shadcn/ui CLI tool. This command downloads and sets up the component in your project's components directory.

```bash
npx shadcn@latest add kbd
```

--------------------------------

### Install Shadcn UI Separator via CLI

Source: https://ui.shadcn.com/docs/components/separator

This command installs the Shadcn UI Separator component using the Shadcn CLI. It adds the necessary component files to your project setup. Ensure you have the Shadcn CLI installed globally.

```bash
npx shadcn@latest add separator
```

--------------------------------

### View Registry Item Before Installation

Source: https://ui.shadcn.com/docs/changelog

Preview a component from a registry before installing it. This command displays the component code, configuration, and all dependencies, allowing users to verify the component matches their requirements.

```bash
npx shadcn view @acme/auth-system
```

--------------------------------

### Create Remix Project with create-remix

Source: https://ui.shadcn.com/docs/installation/remix

Initialize a new Remix project using the create-remix command-line tool. This sets up the basic Remix application structure and dependencies.

```bash
npx create-remix@latest my-app
```

--------------------------------

### Install Shadcn UI Accordion via CLI in Bash

Source: https://ui.shadcn.com/docs/components/accordion

This Bash command installs the Shadcn UI Accordion component into your project using the `npx shadcn` command-line interface. It s