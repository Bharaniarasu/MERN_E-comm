import axios from "axios";
import {
  clearError,
  loadUserFailed,
  loadUserRequest,
  loadUserSuccess,
  loginFailed,
  loginRequest,
  loginSuccess,
  logoutFailed,
  logoutSuccess,
  registerFailed,
  registerRequest,
  registerSuccess,
  updateProfileFailed,
  updateProfileRequest,
  updateProfileSuccess,
} from "../slices/authSlice";
//Login action controller
export const login = (email, password) => async (dispatch) => {
  let uri = "/api/v1/login";
  try {
    dispatch(loginRequest());
    const { data } = await axios.post(uri, { email, password });
    console.log(data);
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFailed(error.response.data.message));
  }
};
//To hide unwanted error warning
export const clearAuthError = (dispatch) => {
  dispatch(clearError());
};
//Register new User controller
export const register = (userData) => async (dispatch) => {
  console.log(userData);
  let uri = "/api/v1/register";
  try {
    dispatch(registerRequest());
    //To accept  avatar images
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post(uri, userData, config);
    // console.log(data);
    dispatch(registerSuccess(data));
  } catch (error) {
    dispatch(registerFailed(error.response.data.message));
  }
};

//Load Logged in user Data
export const loadUser = async (dispatch) => {
  let uri = "/api/v1/myprofile";
  try {
    dispatch(loadUserRequest());

    const { data } = await axios.get(uri, {
      withCredntials: true,
      credentials: "include",
    });
    // console.log(data);
    dispatch(loadUserSuccess(data));
  } catch (error) {
    dispatch(loadUserFailed(error.response.data.message));
  }
};

//log out Action Controller
export const logout = async (dispatch) => {
  let uri = "/api/v1/logout";
  try {
    await axios.post(uri);
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFailed(error.response.data.message));
  }
};

//Update  User controller
export const updateProfile = (userData) => async (dispatch) => {
  console.log(userData);
  let uri = "/api/v1/register";
  try {
    dispatch(updateProfileRequest());
    //To accept  avatar images
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.put(uri, userData, config);
    // console.log(data);
    dispatch(updateProfileSuccess(data));
  } catch (error) {
    dispatch(updateProfileFailed(error.response.data.message));
  }
};
