import "./App.css";
import Footer from "./components/layouts/footer";
import Header from "./components/layouts/header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import { useEffect } from "react";
import store from "./components/redux/store/store";
import { loadUser } from "./components/redux/actions/userActions";
import Routers from "./routers/routers";
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
            <Routers />
          </div>

          <Footer />
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;
