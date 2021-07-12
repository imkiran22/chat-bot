import React, { useEffect, useState } from 'react'
import styles from './Chat.module.css'
import {
  usePusher,
  useUser,
  useConversation,
  useAppSelector
} from '../../../hooks'
import { ChatView } from './ChatView'
import { ChatList } from './ChatList'
import { selectConversation } from '../../../state/reducers/conversationReducer'

const Chat: React.FC<{
  className: string
  showWidget: boolean
  children: React.ReactNode
}> = ({ className, showWidget, children }) => {
  const {
    pusherInstance,
    connectUserToChannelId,
    establishPusherConnection,
    channels
  } = usePusher()
  const { user: userData, updateHeaders } = useUser()
  const {
    conversation = {},
    fetchConversationFromAPI,
    reset,
    fetchChannelsFromAPI
  } = useConversation()
  const [sequence, setSequence] = useState({ number: 0 })
  const conversationData = useAppSelector(selectConversation)

  const callback = (eventName: string, data: any) => {
    console.log(
      `bind global: The event ${eventName} was triggered with data ${JSON.stringify(
        data
      )}`
    )
  }

  console.log(channels, conversationData.channels)

  useEffect(() => {
    if (showWidget) {
      fetchConversationFromAPI(userData.channelId)
      fetchChannelsFromAPI()
    }
  }, [showWidget])

  useEffect(() => {
    if (Object.keys(userData).length) {
      establishPusherConnection(userData.user)
      updateHeaders(userData.user.id)
    }
  }, [userData])

  useEffect(() => {
    if (pusherInstance) {
      const { channelId } = userData
      const channel = connectUserToChannelId(channelId)
      channel.bind('pusher:subscribe', (data: any) => {
        console.log(data)
      })
      channel.bind_global(callback)
    }
  }, [pusherInstance, userData])

  const restartConversation = React.useCallback(() => {
    setSequence({ number: 0 })
    reset()
  }, [])

  return (
    <div id={'chat-bot'} className={styles.chatBot + ' ' + className}>
      {children}
      {conversationData.channels.length > 0 ? (
        <ChatList channels={conversationData.channels} />
      ) : (
        <ChatView
          {...{ conversation, sequence, pusherInstance, restartConversation }}
        />
      )}
    </div>
  )
}

export default Chat
