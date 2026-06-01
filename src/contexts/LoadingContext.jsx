// A React context provider that manages a global loading state using a reference counting mechanism.
//  It listens for custom events to increment or decrement the loading count, and provides an `isLoading` boolean along with imperative `start` and `stop` methods to trigger loading state changes from anywhere in the app. 
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

const LoadingContext = createContext(null);

export const LoadingProvider = ({ children }) => {

  const [count, setCount] = useState(0);

  // Increment and decrement helpers wrapped with useCallback to keep stable refs.
  const increment = useCallback(() => setCount((c) => c + 1), []);
  const decrement = useCallback(() => setCount((c) => Math.max(0, c - 1)), []);

  useEffect(() => {
    // Handler listens for CustomEvent('global-loading', { detail: { type: 'start'|'stop' } })
    const handler = (e) => {
      const type = e?.detail?.type;
      if (type === 'start') increment();
      if (type === 'stop') decrement();
    };

    // Register once on mount and cleanup on unmount.
    window.addEventListener('global-loading', handler);
    return () => window.removeEventListener('global-loading', handler);
  }, [increment, decrement]);

  // Imperative helpers that also dispatch the global-loading event so
  // both manual callers and interceptors will behave consistently.
  const start = () => {
    try { window.dispatchEvent(new CustomEvent('global-loading', { detail: { type: 'start' } })); } catch (e) { /* noop in non-browser envs */ }
  };

  const stop = () => {
    try { window.dispatchEvent(new CustomEvent('global-loading', { detail: { type: 'stop' } })); } catch (e) { /* noop in non-browser envs */ }
  };

  // Expose `isLoading` and the imperative methods. Consumers should read `isLoading`.
  return (
    <LoadingContext.Provider value={{ isLoading: count > 0, start, stop }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Hook for easy consumption
export const useLoading = () => {
  const ctx = useContext(LoadingContext);
  if (ctx === null) {
    // Helpful error during development if provider is missing from tree.
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return ctx;
};

export default LoadingContext;
