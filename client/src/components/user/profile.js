import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.AuthState);
  return (
    <div className="container container-fluid">
      <h2 className="mt-5 ml-5">My Profile</h2>
      <div className="row justify-content-around mt-5 user-info">
        <div className="col-12 col-md-3">
          <figure className="avatar avatar-profile">
            <img
              className="rounded-circle img-fluid"
              src={user.avatar ?? "/images/users/default_avatar.png"}
              alt=""
            />
          </figure>
          <a
            href="#"
            id="edit_profile"
            className="btn btn-primary btn-block my-5"
          >
            Edit Profile
          </a>
        </div>

        <div className="col-12 col-md-5">
          <h4>Full Name</h4>
          <p>{user.name}</p>

          <h4>Email Address</h4>
          <p>{user.email}</p>
          <h4>Joined at</h4>
          <p>{user.createdAt.substring(0, 10)}</p>

          <a href="#" className="btn btn-danger btn-block mt-5">
            My Orders
          </a>

          <a href="#" className="btn btn-primary btn-block mt-3">
            Change Password
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
