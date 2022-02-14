import { createSlice, configureStore } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
  }
})

export const { setToken } = authSlice.actions
export const store = configureStore({
  reducer: authSlice.reducer
})

store.subscribe(() => console.log(store.getState()))