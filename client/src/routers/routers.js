import { Routes, Route } from "react-router-dom";
import Home from "../components/home/home";
import Product from "../components/product/product";
import SearchProduct from "../components/product/searchProduct";
import Login from "../components/user/login";
import Register from "../components/user/register";
import Profile from "../components/user/profile";
import ProtectedRoute from "./protectedRoute";
import UpdateProfile from "../components/user/update";

const Routers = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<Product />} />
        <Route exact path="/search/:query" element={<SearchProduct />} />
        <Route exact path="/user/login" element={<Login />} />
        <Route exact path="/user/register" element={<Register />} />
        <Route
          exact
          path="/user/myprofile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/user/myprofile/update"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default Routers;
