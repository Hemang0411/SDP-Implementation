import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 
  isAuthenticated: false,
  employerAuth : false,
  dashboardData: null,
  logAuth : false,
  emailAuth:false,
  verifyAuth:false,
  userName: null,
  companyName: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {

      if(action.payload.res === "sucessfull_candidate")
        { 
        state.isAuthenticated = true;
        state.logAuth = true;
        state.userName = action.payload.name;
      }
      else if(action.payload.res === "successful_employer")
      {
        state.employerAuth = true;
        state.logAuth = true;
        state.companyName = action.payload.name;
      }
    },
    setDashboardData: (state, action) => {
      state.dashboardData = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.dashboardData = null;
      state.employerAuth = false;
      state.logAuth = false;
      state.userName = null;
      state.companyName = null;
      state.verifyAuth = false; 
      state.emailAuth = false;
    },
    emailauthentication: (state, action) => {
      if(action.payload === "email_verified"){
        state.emailAuth = true;
      }
    },
    verifyauthentication : (state, action) => {
      if(action.payload === "Verification successful"){
        state.verifyAuth = true;
      }
    },
  }
});

export const { loginSuccess, setDashboardData, logout,emailauthentication, verifyauthentication } = authSlice.actions;
export default authSlice.reducer;
