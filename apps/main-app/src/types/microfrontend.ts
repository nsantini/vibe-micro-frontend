import React from 'react';

/**
 * Defines the contract for a microfrontend module.
 * Each microfrontend should provide an object that conforms to this interface.
 */
export interface Microfrontend {
  /**
   * A unique identifier for the microfrontend.
   * Used internally and potentially for routing if `path` is not sufficient.
   */
  id: string;

  /**
   * The URL path segment for this microfrontend.
   * For example, 'home', 'products', 'user-profile'.
   * This will be used to construct the route (e.g., /home, /products).
   */
  path: string;

  /**
   * The display name of the microfrontend.
   * Used for navigation links, titles, etc.
   */
  name: string;

  /**
   * The React component to render for this microfrontend.
   * This could be a directly imported component or a lazily loaded one.
   * For lazy loading, this might be `React.LazyExoticComponent<React.ComponentType<any>>`.
   */
  component: React.ComponentType<any> | React.LazyExoticComponent<React.ComponentType<any>>;

  /**
   * Optional: Any additional metadata or configuration specific to the microfrontend.
   * For example, required permissions, feature flags, etc.
   */
  meta?: {
    [key: string]: any;
  };
}
