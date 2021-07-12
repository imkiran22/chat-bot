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
import { ChatContext } from './ChatContext'

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
  const [currentChannel, setCurrentChannel] = useState({ id: '' })
  const { conversation = {}, reset } = useConversation()
  const [sequence, setSequence] = useState({ number: 0 })
  const conversationData = useAppSelector(selectConversation)
  const [view, setView] = useState('LIST')

  const callback = (eventName: string, data: any) => {
    console.log(
      `bind global: The event ${eventName} was triggered with data ${JSON.stringify(
        data
      )}`
    )
  }

  useEffect(() => {
    if (showWidget) {
      console.info('SHOWING WIDGET', showWidget)
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

  const openChannel = React.useCallback(() => {
    const id = Object.keys(channels).pop() || ''
    setView('ADD')
    setCurrentChannel({ id })
  }, [])

  return (
    <div id={'chat-bot'} className={styles.chatBot + ' ' + className}>
      <ChatContext.Provider value={{ view, setView }}>
        {children}
        {view === 'LIST' ? (
          <ChatList
            channels={conversationData.channels}
            openChannel={openChannel}
          />
        ) : (
          <ChatView
            {...{
              channel: currentChannel,
              conversation,
              sequence,
              pusherInstance,
              restartConversation
            }}
          />
        )}
      </ChatContext.Provider>
    </div>
  )
}

export default Chat
