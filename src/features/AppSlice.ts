
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserType {
  _id: string
  name: string
  email: string
  isSeller: string
  image: string
}


const initialState = {
  state: {
    isFetching: false,
  },
  user: {
    name: "Clash",
    isAuthenticated: false,
    LoggedIn: false
  },
  payload: {}
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
    },
    User: (state, action: PayloadAction<UserType>) => {
      const user = action.payload
      console.log("USER :", user)
      state.payload = action.payload
    }
  }
});

export const {
  setIsFetching,
  isLoggedIn,
  LogoutUser,
  User
} = userSlice.actions;


export default userSlice.reducer;