import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companyName: null,
  linkedin: null,
  employer_id: null,
  full_name: null,
  company_description: null,
};

const empDashSlice = createSlice({
  name: "empDash",
  initialState,
  reducers: {
    setEmployerData: (state, action) => {
      // console.log(action.payload);
      state.companyName = action.payload.data.company_name;
      state.linkedin = action.payload.data.linkedin_url;
      state.employer_id = action.payload.data.employer_id;
      state.full_name = action.payload.data.full_name;
      state.company_description = action.payload.data.company_description;
      // console.log(state.companyName,state.employer_id);
    },
  },
});

export const { setEmployerData } = empDashSlice.actions;
export default empDashSlice.reducer;
