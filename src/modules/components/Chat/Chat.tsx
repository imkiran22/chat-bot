import React, { useEffect, Fragment, useState } from 'react'
import styles from './Chat.module.css'
import { usePusher, useUser, useConversation } from '../../../hooks'
import { ConversationView } from '../ConversationView/ConversationView'
import { Button } from '../../../shared/components/Button/Button'

const Chat: React.FC<{
  className: string
  showWidget: boolean
  children: React.ReactNode
}> = ({ className, showWidget, children }) => {
  const { pusherInstance, connectUserToChannelId, establishPusherConnection } =
    usePusher()
  const { user: userData, updateHeaders } = useUser()
  const {
    conversation = {},
    fetchConversationFromAPI,
    reset
  } = useConversation()
  const [sequence, setSequence] = useState({ number: 0 })

  const callback = (eventName: string, data: any) => {
    console.log(
      `bind global: The event ${eventName} was triggered with data ${JSON.stringify(
        data
      )}`
    )
  }

  useEffect(() => {
    if (showWidget) {
      fetchConversationFromAPI(userData.channelId)
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
      {conversation.loading ? (
        <span className={styles.loading}>Loading...</span>
      ) : (
        <Fragment>
          <ConversationView
            currentSequence={sequence}
            data={conversation.data}
            pusherInstance={pusherInstance}
          />
          <Button
            className={styles.reset}
            theme='primary'
            text={'Restart Conversation'}
            onClick={restartConversation}
          ></Button>
        </Fragment>
      )}
    </div>
  )
}

export default Chat
