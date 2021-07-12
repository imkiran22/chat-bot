import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { fetchConversation, markDelivered } from '../thunks/conversationThunk'

const conversationReducer = createSlice({
  name: 'conversation',
  initialState: {
    loading: false,
    data: {},
    markDelivered: false
  } as any,
  reducers: {
    resetConversation: (state: any) => {
      state.loading = false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConversation.fulfilled, (state: any, action) => {
      state.data = action.payload
      state.loading = false
    })
    builder.addCase(fetchConversation.pending, (state: any) => {
      state.loading = true
    })
    builder.addCase(fetchConversation.rejected, (state: any) => {
      state.loading = true
      state.data = {}
    })

    builder.addCase(markDelivered.fulfilled, (state: any) => {
      state.markDelivered = true
    })
  }
})

export const { resetConversation } = conversationReducer.actions

export const selectConversation = (state: RootState) => state.conversation

export default conversationReducer.reducer
