import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { fetchUser } from '../thunks/userThunk'

const userReducer = createSlice({
  name: 'user',
  initialState: {} as any,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state: any, action) => {
      state = Object.assign(state, action.payload)
    })
  }
})

// export const { fetchUser } = userReducer.actions

export const selectUser = (state: RootState) => state.user

export default userReducer.reducer
