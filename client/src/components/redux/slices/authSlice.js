import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "authentication",
  initialState: { loading: false, isAuthenticated: false },
  reducers: {
    loginRequest: (state, action) => {
      return { ...state, loading: true };
    },
    loginSuccess: (state, action) => {
      console.log(action.payload.user);
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },
    loginFailed: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearError: (state, action) => {
      return {
        ...state,
        error: null,
      };
    },
    registerRequest: (state, action) => {
      return { ...state, loading: true };
    },
    registerSuccess: (state, action) => {
      // console.log(action.payload);
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },
    registerFailed: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    loadUserRequest: (state, action) => {
      return { ...state, isAuthenticated: false, loading: true };
    },
    loadUserSuccess: (state, action) => {
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },
    loadUserFailed: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    logoutSuccess: (state, action) => {
      return {
        loading: false,
        isAuthenticated: false,
      };
    },
    logoutFailed: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
    updateProfileRequest: (state, action) => {
      return { ...state, loading: true, isUpdate: false };
    },
    updateProfileSuccess: (state, action) => {
      // console.log(action.payload);
      return {
        loading: false,
        isAuthenticated: true,
        isUpdate: true,
        user: action.payload.user,
      };
    },
    updateProfileFailed: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
});

const { actions, reducer } = AuthSlice;
export const {
  loginRequest,
  loginSuccess,
  loginFailed,
  clearError,
  registerRequest,
  registerSuccess,
  registerFailed,
  loadUserFailed,
  loadUserRequest,
  loadUserSuccess,
  logoutSuccess,
  logoutFailed,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailed,
} = actions;
export default reducer;
