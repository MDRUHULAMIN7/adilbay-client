/**
 * Centralized Analytics Adapter for Furnixo.
 * Exposes generic tracking callbacks to easily integrate GA4, Mixpanel, or PostHog.
 */
export const analytics = {
  trackNavigation: (itemLabel: string, href: string): void => {
    // Mock handler - print details to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] Navigation Click: ${itemLabel} -> ${href}`);
    }
  },

  trackSearch: (query: string): void => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] Search Executed: "${query}"`);
    }
  },

  trackTheme: (themeMode: string): void => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] Theme Toggled: ${themeMode}`);
    }
  },

  trackCart: (action: 'add' | 'remove' | 'checkout', metadata?: Record<string, any>): void => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] Cart Action: ${action}`, metadata);
    }
  },
};
