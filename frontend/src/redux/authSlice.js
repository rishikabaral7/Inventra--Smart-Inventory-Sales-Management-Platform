import { createSlice } from "@reduxjs/toolkit";

const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp;
    const now = Math.floor(Date.now() / 1000);
    
    return exp < now;
  } catch {
    return true;
  }
};

const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem("user");

    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    return null;
  }
};

const storedToken = localStorage.getItem("token");
const storedUser = getStoredUser();

if (storedToken && isTokenExpired(storedToken)) {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

const finalToken = localStorage.getItem("token");
const finalUser = getStoredUser();

const initialState = {
  user: finalUser,
  token: finalToken || null,
  isAuthenticated: !!finalToken && !!finalUser,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    login(state, action) {
      const { user, token } = action.payload;

      state.user = user;
      state.token = token;
      state.isAuthenticated = true;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    },

    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },

    updateUser(state, action) {
      state.user = action.payload;

      localStorage.setItem(
        "user",
        JSON.stringify(action.payload)
      );
    },
  },
});

export const {
  login,
  logout,
  updateUser,
} = authSlice.actions;

export default authSlice.reducer;
