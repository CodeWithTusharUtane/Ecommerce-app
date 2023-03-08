import { createSlice } from '@reduxjs/toolkit'

const initialState = {
     filteredProduct : []
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action){
        console.log(action.payload)
    }
  }
});

export const {FILTER_BY_SEARCH} = filterSlice.actions

export const selectFilterProduct = (state) => state.filter.filteredProduct

export default filterSlice.reducer