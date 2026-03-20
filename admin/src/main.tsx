import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Toaster } from "react-hot-toast";
import "./index.css"; 

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
    <Toaster position="bottom-center" />
  </BrowserRouter>
)
