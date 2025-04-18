import { Variants } from "framer-motion";

export const fadeIn = (delay = 0, duration = 0.5): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay,
      duration,
    },
  },
});

export const fadeInUp = (delay = 0, duration = 0.5): Variants => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration,
    },
  },
});

export const fadeInDown = (delay = 0, duration = 0.5): Variants => ({
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration,
    },
  },
});

export const fadeInLeft = (delay = 0, duration = 0.5): Variants => ({
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay,
      duration,
    },
  },
});

export const fadeInRight = (delay = 0, duration = 0.5): Variants => ({
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay,
      duration,
    },
  },
});

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const hoverScale = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.3 },
  },
};

export const hoverLift = {
  hover: {
    y: -5,
    transition: { duration: 0.3 },
  },
};

export const pageTransition = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};
