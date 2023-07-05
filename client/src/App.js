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
import Login from "./components/user/login";
import Register from "./components/user/register";
import { useEffect } from "react";
import store from "./components/redux/store/store";
import { loadUser } from "./components/redux/actions/userActions";
import Profile from "./components/user/profile";
function App() {
  useEffect(() => {
    store.dispatch(loadUser);
  });
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
              <Route exact path="/user/login" element={<Login />} />
              <Route exact path="/user/register" element={<Register />} />
              <Route exact path="/user/myprofile" element={<Profile />} />
            </Routes>
          </div>

          <Footer />
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;
