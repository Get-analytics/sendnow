import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add Inter font
const interFont = document.createElement("link");
interFont.rel = "stylesheet";
interFont.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";
document.head.appendChild(interFont);

// Add SF Pro Display font
const sfProFont = document.createElement("link");
sfProFont.rel = "stylesheet";
sfProFont.href = "https://fonts.cdnfonts.com/css/sf-pro-display";
document.head.appendChild(sfProFont);

// Add title
const title = document.createElement("title");
title.textContent = "SendNow - Share Smarter, Track Better";
document.head.appendChild(title);

createRoot(document.getElementById("root")!).render(<App />);
