import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const init = () => {
  const container = document.getElementById('root');

  if (!container) {
    console.error("Target container 'root' not found in index.html. Ensure your HTML has <div id='root'></div>");
    return;
  }

  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Failed to render React app:", error);
  }
};

// Ensure DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}