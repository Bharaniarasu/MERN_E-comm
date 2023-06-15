import "./App.css";
import Home from "./components/home/home";
import Footer from "./components/layouts/footer";
import Header from "./components/layouts/header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import Product from "./components/product/product";
import SearchProduct from "./components/product/searchProduct";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
function App() {
  return (
    <Router>
      <div className="App">
        <HelmetProvider>
          <Header />
          <ToastContainer theme="dark" position="bottom-center" />
          <div className="container container-fluid">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/product/:id" element={<Product />} />
              <Route exact path="/search/:query" element={<SearchProduct />} />
            </Routes>
          </div>

          <Footer />
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;
