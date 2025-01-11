import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Import the BrowserRouter from react-router
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
//write code using  BrowserRouter from react-router-dom
createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
)

