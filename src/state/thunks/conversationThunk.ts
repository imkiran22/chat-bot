import { createAsyncThunk } from '@reduxjs/toolkit'
import ConversationApi from '../api/ConversationApi'

export const fetchConversation = createAsyncThunk(
  'conversation/fetchUser',
  async (channelId: string) => {
    const response = await ConversationApi.fetchConversation(channelId)
    return response.data
  }
)

export const markDelivered = createAsyncThunk(
  'conversation/markDelivered',
  async (channelId: string) => {
    const response = await ConversationApi.markDelivered(channelId)
    return response.data
  }
)

export const fetchChannels = createAsyncThunk(
  'conversation/fetchChannels',
  async () => {
    const response = await ConversationApi.fetchChannels()
    return response.data
  }
)
