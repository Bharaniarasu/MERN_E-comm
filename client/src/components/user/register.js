import React, { useEffect, useState } from "react";
// import avatar_img from "../../assets/images/users/default_avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { clearError, registerSuccess } from "../redux/slices/authSlice";
import { clearAuthError, register } from "../redux/actions/userActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/users/default_avatar.png"
  );
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.AuthState
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onChange = (e) => {
    //set avatar image
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      //run when image loaded
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(e.target.files[0]);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
      setAvatar(e.target.value);
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };
  // console.log(userData);
  // console.log(avatar);
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    console.log(formData);

    formData.append("password", userData.password);
    formData.append("avatar", avatar);
    dispatch(register(formData));
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      return;
    }
    if (error) {
      toast(error, {
        type: "error",
        onOpen: () => {
          dispatch(clearAuthError);
        },
      });
    }
  }, [error]);
  return (
    <>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <h1 className="mb-3">Register</h1>

            <div className="form-group">
              <label for="name_field">Name</label>
              <input
                type="name"
                name="name"
                id="name_field"
                className="form-control"
                // value=""
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label for="email_field">Email</label>
              <input
                type="email"
                name="email"
                id="email_field"
                className="form-control"
                // value=""
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label for="password_field">Password</label>
              <input
                type="password"
                name="password"
                id="password_field"
                className="form-control"
                // value=""
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label for="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="avatar"
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    onChange={onChange}
                    className="custom-file-input"
                    id="customFile"
                  />
                  <label className="custom-file-label" for="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading}
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
