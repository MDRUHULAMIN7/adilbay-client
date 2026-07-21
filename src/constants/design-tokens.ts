export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  drawer: 1040,
  toast: 1060,
  tooltip: 1070,
  header: 1020,
} as const;

export const LAYOUT = {
  headerHeight: 80,       // Desktop header height at top scroll position
  headerCompact: 68,      // Desktop header height when page is scrolled
  mobileHeader: 64,       // Mobile header height
  drawerWidth: 380,       // Mobile drawer navigation width
  containerDefault: 1280, // Default grid width limit (max-w-7xl)
  containerWide: 1400,    // Wide layouts max width
  containerNarrow: 768,   // Narrow reading widths max width
} as const;

export const BREAKPOINTS = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;
