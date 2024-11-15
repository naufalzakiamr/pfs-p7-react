// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Custom CSS styles
import App from './App'; // Main App component
import reportWebVitals from './reportWebVitals'; // Performance measurement
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS for styling

// Create the root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component within React.StrictMode to help identify potential problems
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Call reportWebVitals to measure performance, if desired
reportWebVitals();
