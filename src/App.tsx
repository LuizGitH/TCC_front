import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import NotFoundPage from "./pages/NotFoundPage"
import RegisterPasswordPage from "./pages/RegisterPasswordPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />
        <Route path="/registro" element={<RegisterPasswordPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/recuperar-senha" element={<ForgotPasswordPage />}
/>
      </Routes>
    </Router>
  )
}

export default App
