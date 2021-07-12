import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import {
  fetchConversation,
  markDelivered,
  fetchChannels
} from '../thunks/conversationThunk'

const conversationReducer = createSlice({
  name: 'conversation',
  initialState: {
    loading: false,
    data: {},
    channels: [],
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

    builder.addCase(fetchChannels.fulfilled, (state: any, action: any) => {
      state.loading = false
      state.channels = action.payload
    })
    builder.addCase(fetchChannels.pending, (state: any) => {
      state.loading = true
    })
    builder.addCase(fetchChannels.rejected, (state: any) => {
      state.loading = false
    })
  }
})

export const { resetConversation } = conversationReducer.actions

export const selectConversation = (state: RootState) => state.conversation

export default conversationReducer.reducer
