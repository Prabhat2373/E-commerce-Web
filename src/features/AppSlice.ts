import { createSlice } from '@reduxjs/toolkit';

const initialState = {

  state: {
    isFetching: false,
  },
  user: {
    name: "Clash",
    isAuthenticated: false,
    LoggedIn: false
  },
}


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsFetching: (state) => {
      state.state.isFetching = true;
    },
    isLoggedIn: (state) => {
      state.user.isAuthenticated = true;
      state.user.LoggedIn = true;
    },
    LogoutUser: (state) => {
      state.user.LoggedIn = false
    }
  }
});

export const {
  setIsFetching,
  isLoggedIn,
  LogoutUser
} = userSlice.actions;


export default userSlice.reducer;