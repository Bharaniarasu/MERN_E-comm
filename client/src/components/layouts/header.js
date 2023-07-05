import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/images/logo.png";
import Search from "./search";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Image } from "react-bootstrap";
import { logout } from "../redux/actions/userActions";
const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.AuthState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/">
            <img width="50px" src={logo} alt="TNcart_logo" />
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        {isAuthenticated ? (
          <Dropdown className="d-inline">
            <Dropdown.Toggle
              variant="default text-white pr-5"
              id="dropdown-basic"
            >
              <figure className="m-0">
                <Image
                  src={user.avatar ?? "/images/users/default_avatar.png"}
                  // src="/images/users/default_avatar.png"
                  width="50px"
                  className="avatar avatar-nav"
                />
                <span>{user.name}</span>
              </figure>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                className="text-secondary"
                onClick={() => {
                  navigate("user/myprofile");
                }}
              >
                Profile
              </Dropdown.Item>
              <Dropdown.Item
                className="text-danger"
                onClick={() => {
                  dispatch(logout);
                }}
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Link to="/user/login">
            <button className="btn" id="login_btn" disabled={isAuthenticated}>
              Login
            </button>
          </Link>
        )}
        <span id="cart" className="ml-3">
          Cart
        </span>
        <span className="ml-1" id="cart_count">
          2
        </span>
      </div>
    </nav>
  );
};

export default Header;
