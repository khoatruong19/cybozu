import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/globals.css";
import { BrowserRouter } from "react-router-dom";
import AppProviders from "./providers/index.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AppProviders>
      <App />
      <ToastContainer position="top-center" />
    </AppProviders>
  </BrowserRouter>
);
