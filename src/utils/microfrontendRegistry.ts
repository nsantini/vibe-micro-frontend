import { Microfrontend } from '@/types/microfrontend'; // Using @/ alias for src

// In-memory store for registered microfrontends
const microfrontends: Microfrontend[] = [];

/**
 * Registers a new microfrontend.
 * Ensures that a microfrontend with the same id or path is not already registered.
 * @param mfe - The microfrontend configuration object.
 */
export function registerMicrofrontend(mfe: Microfrontend): void {
  if (microfrontends.some(existingMfe => existingMfe.id === mfe.id)) {
    console.warn(`Microfrontend with id "${mfe.id}" is already registered. Skipping.`);
    return;
  }
  if (microfrontends.some(existingMfe => existingMfe.path === mfe.path)) {
    console.warn(`Microfrontend with path "${mfe.path}" is already registered. Skipping.`);
    return;
  }
  microfrontends.push(mfe);
}

/**
 * Retrieves all registered microfrontends.
 * @returns An array of microfrontend configuration objects.
 */
export function getRegisteredMicrofrontends(): Microfrontend[] {
  // Return a copy to prevent external modification of the internal array
  return [...microfrontends];
}

/**
 * Retrieves a specific microfrontend by its path.
 * @param path - The path of the microfrontend to retrieve (e.g., 'home').
 * @returns The microfrontend configuration object if found, otherwise undefined.
 */
export function getMicrofrontendByPath(path: string): Microfrontend | undefined {
  return microfrontends.find(mfe => mfe.path === path);
}

/**
 * Retrieves a specific microfrontend by its ID.
 * @param id - The ID of the microfrontend to retrieve.
 * @returns The microfrontend configuration object if found, otherwise undefined.
 */
export function getMicrofrontendById(id: string): Microfrontend | undefined {
  return microfrontends.find(mfe => mfe.id === id);
}

/**
 * Clears all registered microfrontends.
 * Useful for testing or resetting state if needed.
 */
export function clearMicrofrontendRegistry(): void {
  microfrontends.length = 0;
}
