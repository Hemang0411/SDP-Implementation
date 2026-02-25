import { configureStore } from "@reduxjs/toolkit";
import Auth from "./authSlice";
import Registration from "./registrationSlice";

export const store = configureStore({
  reducer: {
    auth: Auth,
    registration: Registration,
  },
});