import { createAsyncThunk } from '@reduxjs/toolkit'
import UserApi from '../api/UserApi'

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (/*userId, thunkAPI*/) => {
    const response = await UserApi.fetchUser()
    return response.data
  }
)
