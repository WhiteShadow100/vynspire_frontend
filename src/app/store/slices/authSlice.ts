import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";


interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
};


if (typeof window !== "undefined") {
  const savedToken = Cookies.get("token");
  if (savedToken){
    console.log(savedToken)
    initialState.token = JSON.parse(savedToken);
    initialState.isLoggedIn = true;
  }
}


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{token: string}>) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      Cookies.set("token", JSON.stringify(state.token), { expires: 7, path: "/" });
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      Cookies.remove("token");
    },
  },
});


export const { login, logout } = authSlice.actions;
export default authSlice.reducer;