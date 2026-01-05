---
trigger: always_on
---

### Clone and Run Basic Example with gitpick

Source: https://tanstack.com/start/latest/docs/framework/react/quick-start

Clone the TanStack Start Basic example from the router repository and start the development server. Uses gitpick to selectively clone the example directory and install dependencies.

```bash
npx gitpick TanStack/router/tree/main/examples/react/start-basic start-basic
cd start-basic
npm install
npm run dev
```

### Clone and Deploy Custom Example with gitpick

Source: https://tanstack.com/start/latest/docs/framework/react/quick-start

Clone any TanStack Start example by replacing EXAMPLE_SLUG with the desired example identifier, then install dependencies and run the development server. Supports deployment to any environment after cloning.

```bash
npx gitpick TanStack/router/tree/main/examples/react/EXAMPLE_SLUG my-new-project
cd my-new-project
npm install
npm run dev
```

### Clone and Run Any TanStack Start Example Manually

Source: https://tanstack.com/start/latest/docs/framework/solid/quick-start

Provides a generic command sequence to clone any TanStack Start example, install dependencies, and start the development server. Replace `EXAMPLE_SLUG` with the desired example's identifier and `my-new-project` with your project's chosen name.

```bash
npx gitpick TanStack/router/tree/main/examples/solid/EXAMPLE_SLUG my-new-project
cd my-new-project
npm install
npm run dev
```

--------------------------------

### Clone and Run a Basic TanStack Start Example

Source: https://tanstack.com/start/latest/docs/framework/solid/quick-start

Clones the `start-basic` example from the TanStack Router repository, installs its dependencies, and starts a local development server. This allows for quick local testing of a pre-configured TanStack Start project.

```bash
npx gitpick TanStack/router/tree/main/examples/solid/start-basic start-basic
cd start-basic
npm install
npm run dev
```

--------------------------------

### Install Netlify Vite Plugin for TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/solid/guide/hosting

Install the @netlify/vite-plugin-tanstack-start plugin to configure TanStack Start for Netlify deployment with local development emulation.

```bash
npm install --save-dev @netlify/vite-plugin-tanstack-start
# or...
pnpm add --save-dev @netlify/vite-plugin-tanstack-start
```

--------------------------------

### Bun Production Server Example Output

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting

An example of the console output produced when the Bun production server starts, illustrating asset loading details and server readiness.

```txt
📦 Loading static assets from ./dist/client...
   Max preload size: 5.00 MB

📁 Preloaded into memory:
   /assets/index-a1b2c3d4.js           45.23 kB │ gzip:  15.83 kB
   /assets/index-e5f6g7h8.css           12.45 kB │ gzip:   4.36 kB

💾 Served on-demand:
   /assets/vendor-i9j0k1l2.js          245.67 kB │ gzip:  86.98 kB

✅ Preloaded 2 files (57.68 KB) into memory
🚀 Server running at http://localhost:3000
```

--------------------------------

### Install Dependencies and Start Development Server

Source: https://tanstack.com/start/latest/docs/framework/react/tutorial/fetching-external-api

Install project dependencies using pnpm and start the development server. The application will be accessible at localhost:3000.

```bash
pnpm i
pnpm dev
```

--------------------------------

### Initialize TanStack Start Project via CLI

Source: https://tanstack.com/start/latest/docs/framework/solid/quick-start

Quickly set up a new TanStack Start project using either `pnpm` or `npm`. The `--framework solid` option specifies Solid.js, and the CLI will guide you through adding features like Tailwind and ESLint.

```bash
pnpm create @tanstack/start@latest --framework solid
```

```bash
npm create @tanstack/start@latest -- --framework solid
```

--------------------------------

### Create TanStack Start Project with CLI

Source: https://tanstack.com/start/latest/docs/framework/react/quick-start

Initialize a new TanStack Start project using pnpm or npm package managers. The CLI prompts for configuration options including Tailwind, eslint, and other dependencies.

```bash
pnpm create @tanstack/start@latest
```

```bash
npm create @tanstack/start@latest
```

--------------------------------

### Install Core TanStack Start Dependencies with npm

Source: https://tanstack.com/start/latest/docs/framework/solid/build-from-scratch

This command installs the primary runtime dependencies for a TanStack Start application, including `@tanstack/solid-start`, `@tanstack/solid-router`, and `vite`, which are fundamental for the framework's operation and routing capabilities.

```shell
npm i @tanstack/solid-start @tanstack/solid-router vite
```

--------------------------------

### Setup Root Route with Clerk Auth in TanStack React Start

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-clerk-basic

Creates a root route component that integrates Clerk authentication provider, fetches user authentication state on route load via server function, and renders conditional UI components based on authentication status. The component sets up HTML meta tags, stylesheets, and favicon links while providing navigation and user authentication controls.

```typescript
/// <reference types="vite/client" />
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/tanstack-react-start'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { createServerFn } from '@tanstack/react-start'
import { auth } from '@clerk/tanstack-react-start/server'
import * as React from 'react'
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary.js'
import { NotFound } from '~/components/NotFound.js'
import appCss from '~/styles/app.css?url'

const fetchClerkAuth = createServerFn({ method: 'GET' }).handler(async () => {
  const { userId } = await auth()

  return {
    userId,
  }
})

export const Route = createRootRoute({
  beforeLoad: async () => {
    const { userId } = await fetchClerkAuth()

    return {
      userId,
    }
  },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <ClerkProvider>
      <RootDocument>
        <Outlet />
      </RootDocument>
    </ClerkProvider>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              className: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <Link
            to="/posts"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Posts
          </Link>
          <div className="ml-auto">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal" />
            </SignedOut>
          </div>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
```

--------------------------------

### Install Vite and Build Tools

Source: https://tanstack.com/start/latest/docs/framework/react/build-from-scratch

Installs Vite as a development dependency and React packages. Vite serves as the build tool and development server for the TanStack Start project.

```shell
npm i -D vite
npm i react react-dom
npm i -D @vitejs/plugin-react
```

--------------------------------

### OAuth Social Authentication Integration Setup

Source: https://tanstack.com/start/latest/docs/framework/react/guide/authentication

Configures OAuth provider setup for Google and GitHub authentication with client credentials and callback URIs. Implements secure OAuth flow initiation with CSRF protection using state tokens stored in session.

```typescript
// Example with OAuth providers
export const authProviders = {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID!,
    redirectUri: `${process.env.APP_URL}/auth/google/callback`,
  },
  github: {
    clientId: process.env.GITHUB_CLIENT_ID!,
    redirectUri: `${process.env.APP_URL}/auth/github/callback`,
  },
}

export const initiateOAuthFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { provider: 'google' | 'github' }) => data)
  .handler(async ({ data }) => {
    const provider = authProviders[data.provider]
    const state = generateRandomState()

    // Store state in session for CSRF protection
    const session = await useAppSession()
    await session.update({ oauthState: state })

    // Generate OAuth URL
    const authUrl = generateOAuthUrl(provider, state)

    throw redirect({ href: authUrl })
  })
```

--------------------------------

### Install Netlify Vite Plugin for TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting

Install the @netlify/vite-plugin-tanstack-start package using npm, pnpm, yarn, or bun. This plugin configures your build for Netlify deployment and provides Netlify production platform emulation in local development environments.

```bash
npm install --save-dev @netlify/vite-plugin-tanstack-start
# or...
pnpm add --save-dev @netlify/vite-plugin-tanstack-start
# or yarn, bun, etc
```

--------------------------------

### Create Root Route with Supabase Authentication in TanStack Start

Source: https://tanstack.com/start/latest/docs/framework/react/examples/start-supabase-basic

Establishes a root route using TanStack Start's createRootRoute API with Supabase authentication integration. The route fetches the authenticated user on beforeLoad using a server function, handles errors with DefaultCatchBoundary, and renders a responsive layout with navigation. Includes HTML head configuration with SEO metadata and favicon links.

```typescript
/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { createServerFn } from '@tanstack/react-start'
import * as React from 'react'
import { DefaultCatchBoundary } from '../components/DefaultCatchBoundary'
import { NotFound } from '../components/NotFound'
import appCss from '../styles/app.css?url'
import { seo } from '../utils/seo'
import { getSupabaseServerClient } from '../utils/supabase'

const fetchUser = createServerFn({ method: 'GET' }).handler(async () => {
  const supabase = getSupabaseServerClient()
  const { data, error: _error } = await supabase.auth.getUser()

  if (!data.user?.email) {
    return null
  }

  return {
    email: d