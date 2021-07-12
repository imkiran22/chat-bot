import React from 'react'
import { useAppDispatch, useAppSelector } from '.'
import {
  fetchConversation,
  fetchChannels
} from '../state/thunks/conversationThunk'
import {
  selectConversation,
  resetConversation
} from '../state/reducers/conversationReducer'

export const useConversation = () => {
  const dispatch = useAppDispatch()
  const conversation = useAppSelector(selectConversation)

  const fetchConversationFromAPI = React.useCallback((channelId: string) => {
    dispatch(fetchConversation(channelId))
  }, [])

  const reset: any = React.useCallback(() => {
    return dispatch(resetConversation())
  }, [])

  const fetchChannelsFromAPI: any = React.useCallback(() => {
    return dispatch(fetchChannels())
  }, [])

  return { reset, fetchConversationFromAPI, conversation, fetchChannelsFromAPI }
}
