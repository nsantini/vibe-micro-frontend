## Relevant Files

- `apps/main-app/` - Main Next.js application serving as the host for microfrontends.
- `apps/main-app/pages/_app.tsx` - Custom App component for global providers and Material UI setup.
- `apps/main-app/components/Navigation.tsx` - Navigation component listing and linking all registered microfrontends.
- `apps/main-app/microfrontends/home/` - Example "home page" microfrontend implementation.
- `apps/main-app/microfrontends/README.md` - Documentation for adding/registering new microfrontends.
- `apps/main-app/utils/microfrontendRegistry.ts` - Logic for dynamic registration and routing of microfrontends.
- `apps/main-app/components/Navigation.test.tsx` - Unit tests for the navigation component.
- `apps/main-app/utils/microfrontendRegistry.test.ts` - Unit tests for the microfrontend registry logic.

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `Navigation.tsx` and `Navigation.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [x] 1.0 Scaffold Next.js project structure for microfrontends
  - [x] 1.1 Initialize a new Next.js app in `apps/main-app/`
  - [x] 1.2 Set up a monorepo structure (e.g., using Yarn/NPM workspaces or Turborepo)
  - [x] 1.3 Configure TypeScript support
  - [x] 1.4 Set up basic folder structure for microfrontends (e.g., `microfrontends/` directory)
  - [x] 1.5 Add initial README with project structure overview

- [x] 2.0 Integrate Material UI and set up shared UI components
  - [x] 2.1 Install Material UI and peer dependencies
  - [x] 2.2 Configure Material UI theme provider in `_app.tsx`
  - [x] 2.3 Create a shared UI components directory (e.g., `components/`)
  - [x] 2.4 Add a sample shared component using Material UI

- [ ] 3.0 Implement dynamic microfrontend registration and routing system
  - [x] 3.1 Design a standard interface/contract for microfrontends
  - [x] 3.2 Create a registry utility for registering microfrontends
  - [x] 3.3 Implement dynamic routing logic based on the registry
  - [ ] 3.4 Add unit tests for the registry and routing logic

- [ ] 4.0 Create navigation component listing all registered microfrontends
  - [x] 4.1 Design and implement a navigation bar using Material UI
  - [x] 4.2 Dynamically list all registered microfrontends in the navigation
  - [ ] 4.3 Add navigation unit tests

- [x] 5.0 Add example "home page" microfrontend and developer documentation
  - [x] 5.1 Scaffold a simple "home page" microfrontend in `microfrontends/home/`
  - [x] 5.2 Register the home page microfrontend in the registry
  - [x] 5.3 Add documentation (README) for adding/registering new microfrontends
  - [x] 5.4 Reference the home page microfrontend in the documentation as an example
