import React, { useEffect, Fragment } from 'react'
import styles from './Chat.module.css'
import { usePusher, useUser, useConversation } from '../../../hooks'
import { ConversationView } from '../ConversationView/ConversationView'
import { Button } from '../../../shared/components/Button/Button'

const Chat: React.FC<{ className: string; showWidget: boolean }> = ({
  className,
  showWidget
}) => {
  const { pusherInstance, connectUserToChannelId, establishPusherConnection } =
    usePusher()
  const { user: userData, updateHeaders } = useUser()
  const {
    conversation = {},
    fetchConversationFromAPI,
    reset
  } = useConversation()

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

  console.log(conversation)

  const restartConversation = React.useCallback(() => reset(), [])

  return (
    <div id={'chat-bot'} className={styles.chatBot + ' ' + className}>
      {conversation.loading ? (
        <span>Loading...</span>
      ) : (
        <Fragment>
          <ConversationView
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
