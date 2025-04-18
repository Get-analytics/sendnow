import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Polyfill for smooth scrolling for Safari
if (!('scrollBehavior' in document.documentElement.style)) {
  import('scroll-behavior-polyfill').then(() => {
    console.log('Smooth scrolling polyfill loaded');
  });
}

createRoot(document.getElementById("root")!).render(<App />);
