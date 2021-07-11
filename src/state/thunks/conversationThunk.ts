import { createAsyncThunk } from '@reduxjs/toolkit'
import ConversationApi from '../api/ConversationApi'

export const fetchConversation = createAsyncThunk(
  'user/fetchUser',
  async (channelId: string) => {
    const response = await ConversationApi.fetchConversation(channelId)
    return response.data
  }
)

export const markDelivered = createAsyncThunk(
  'user/conversation/markDelivered',
  async (channelId: string) => {
    const response = await ConversationApi.markDelivered(channelId)
    return response.data
  }
)

export const resetConversation = createAsyncThunk(
  'user/conversation/resetConversation',
  async () => {
    const response = await Promise.resolve({})
    return response
  }
)
