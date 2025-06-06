# Microfrontend Foundation Project

This project sets up a foundation for a microfrontend architecture using Next.js and NPM workspaces.

## Project Structure

```
.
├── apps/
│   └── main-app/               # Host Next.js application
│       ├── microfrontends/     # Directory for individual microfrontend applications/packages
│       ├── public/             # Static assets for the main app
│       ├── src/                # Source code for the main Next.js application
│       │   ├── app/            # Next.js App Router
│       │   └── ...             # Other Next.js specific directories and files
│       ├── next.config.mjs     # Next.js configuration
│       ├── package.json        # Package configuration for the main-app
│       └── tsconfig.json       # TypeScript configuration for the main-app
├── package.json                # Root package.json for the NPM monorepo
├── tasks/                      # Project tasks and planning documents
│   └── ...
└── README.md                   # This file
```

## Overview

- **Monorepo Setup**: The project uses NPM workspaces to manage multiple packages. The root `package.json` defines the workspaces.
- **Host Application (`apps/main-app`)**: This is a Next.js application that will serve as the host or shell for the microfrontends. It includes:
    - TypeScript, ESLint, and Tailwind CSS pre-configured.
    - A `src/` directory for its source code.
    - An `apps/main-app/microfrontends/` directory, which is intended to house the individual microfrontend packages/applications.

## Getting Started

(Details to be added as the project progresses, e.g., how to run, build, test)
