import React from 'react'
import { useAppDispatch, useAppSelector } from '.'
import { fetchConversation } from '../state/thunks/conversationThunk'
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

  return { reset, fetchConversationFromAPI, conversation }
}
