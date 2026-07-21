export const DURATIONS = {
  hover: 0.15,
  press: 0.1,
  accordion: 0.2,
  modal: 0.25,
  drawer: 0.35,
  page: 0.3,
} as const;

export const EASING = {
  standard: [0.4, 0, 0.2, 1], // ease-in-out
  decelerate: [0.0, 0, 0.2, 1], // ease-out
  accelerate: [0.4, 0, 1, 1], // ease-in
} as const;

export const SPRINGS = {
  normal: { type: "spring" as const, stiffness: 300, damping: 25, mass: 1 },
  bounce: { type: "spring" as const, stiffness: 400, damping: 15, mass: 1 },
  slow: { type: "spring" as const, stiffness: 100, damping: 15, mass: 1 },
} as const;

export const MOTION_PRESETS = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: DURATIONS.hover, ease: EASING.standard },
  },
  scaleUp: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { type: "spring" as const, stiffness: 300, damping: 25 },
  },
  slideInRight: {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "100%" },
    transition: { type: "spring" as const, stiffness: 300, damping: 30 },
  },
  slideInLeft: {
    initial: { x: "-100%" },
    animate: { x: 0 },
    exit: { x: "-100%" },
    transition: { type: "spring" as const, stiffness: 300, damping: 30 },
  },
} as const;
