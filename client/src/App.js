import "./App.css";
import Home from "./components/home/home";
import Footer from "./components/layouts/footer";
import Header from "./components/layouts/header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <div className="App">
        <HelmetProvider>
          <Header />
          <ToastContainer theme="dark" position="bottom-center" />

          <Routes>
            <Route exact path="/" element={<Home />} />
          </Routes>
          <Footer />
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;