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
    channels: [
      {
        msg: {
          time: 1626076874,
          text: 'First Name?'
        },
        members: [
          {
            name: 'InsentBot',
            img: 'https://staging-uploads.insent.ai/insentrecruit/logo-insentrecruit?1622288999194',
            isBot: true
          }
        ],
        cid: 'private-EXlZAmSz5HgQsw1e016260775351201626077535393',
        unread: false
      }
    ],
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
