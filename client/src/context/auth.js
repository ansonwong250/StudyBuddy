import { createSlice } from '@reduxjs/toolkit'

export const auth = createSlice({
  name: 'auth',
  initialState: {
    name: null,
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload
    },
  },
})

export const { setName } = auth.actions

export const name = (state) => state.auth.name

export default auth.reducer