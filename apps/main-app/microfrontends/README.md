# Adding and Registering Microfrontends

This directory (`apps/main-app/microfrontends/`) is intended to house the implementations of individual microfrontend applications or modules that are part of the `main-app`.

## How to Add a New Microfrontend

Follow these steps to create and integrate a new microfrontend:

### 1. Create Your Microfrontend Component

1.  **Create a new directory** for your microfrontend under `apps/main-app/microfrontends/`. For example, if your microfrontend is named "UserProfile", create `apps/main-app/microfrontends/user-profile/`.
2.  **Implement your React component** within this new directory. This will be the main entry point for your microfrontend. For example, `apps/main-app/microfrontends/user-profile/UserProfilePage.tsx`.
    ```tsx
    // Example: apps/main-app/microfrontends/user-profile/UserProfilePage.tsx
    'use client';

    import React from 'react';
    import Typography from '@mui/material/Typography';

    const UserProfilePage: React.FC = () => {
      return (
        <div>
          <Typography variant="h4">User Profile Microfrontend</Typography>
          {/* ... your component's content ... */}
        </div>
      );
    };

    export default UserProfilePage;
    ```

### 2. Understand the Microfrontend Contract

Your microfrontend will be registered using an object that conforms to the `Microfrontend` interface defined in `apps/main-app/src/types/microfrontend.ts`. Ensure you understand the properties required:

-   `id` (string): A unique identifier (e.g., "user-profile").
-   `path` (string): The URL path segment (e.g., "profile", which will result in `/profile`).
-   `name` (string): A display name for navigation (e.g., "User Profile").
-   `component` (React.LazyExoticComponent): Your lazily-loaded React component.
-   `meta` (optional object): Any additional metadata.

### 3. Register Your Microfrontend

Registration is handled in `apps/main-app/src/lib/microfrontendLoader.ts`.

1.  **Open `apps/main-app/src/lib/microfrontendLoader.ts`**.
2.  **Import your component using `React.lazy`**:
    ```typescript
    // At the top of microfrontendLoader.ts, with other lazy imports
    const UserProfileMFE = React.lazy(() => import('../../microfrontends/user-profile/UserProfilePage'));
    ```
    *Ensure the import path is correct relative to `apps/main-app/src/lib/`.*
3.  **Call `registerMicrofrontend`**:
    ```typescript
    // Within microfrontendLoader.ts, with other registrations
    registerMicrofrontend({
      id: 'user-profile',
      path: 'profile', // This will be accessible at /profile
      name: 'User Profile',
      component: UserProfileMFE,
      meta: {
        // optional metadata
      },
    });
    ```

### 4. Test Your Integration

Once registered, your microfrontend should:
-   Appear in the main navigation bar (if the navigation component is set up to list all registered MFEs).
-   Be routable via its specified path (e.g., navigating to `/profile` should render your `UserProfilePage`).

## Example: Home Page Microfrontend

A "Home Page" microfrontend has already been implemented as an example:
-   **Component**: `apps/main-app/microfrontends/home/HomePage.tsx`
-   **Registration**: See its entry in `apps/main-app/src/lib/microfrontendLoader.ts`.

Refer to this example for a practical demonstration of the steps above.
