
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserType {
  user: any;
  avatar: Avatar
  role: string
  _id: string
  name: string
  email: string
  password: string
  createdAt: string
  __v: number
  resetPasswordExpire: string
  resetPasswordToken: string
}

export interface Avatar {
  public_id: string
  url: string
}

const initialState = {
  state: {
    isFetching: false,
  },
  user: {
    name: "",
    isAuthenticated: false,
    LoggedIn: false
  },
  payload: {}
}


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    isLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.user.LoggedIn = action.payload
    },
    LogoutUser: (state) => {
      state.user.LoggedIn = false
      state.payload = []
    },
    User: (state, action: PayloadAction<UserType>) => {
      const user = action.payload
      state.payload = user
    }
  }
});

export const {
  isLoggedIn,
  LogoutUser,
  User
} = userSlice.actions;


export default userSlice.reducer;