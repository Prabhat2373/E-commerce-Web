import { createSlice } from '@reduxjs/toolkit';

const initialState = {

  state: {
    isFetching: false,
  },
  user: {
    name: "Clash",
    isAuthenticated: false
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
    }
  }
});

export const {
  setIsFetching,
  isLoggedIn
} = userSlice.actions;


export default userSlice.reducer;