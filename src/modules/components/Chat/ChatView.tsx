import React, { Fragment, useEffect } from 'react'
import styles from './Chat.module.css'
import { ConversationView } from '../ConversationView/ConversationView'
import { Button } from '../../../shared/components/Button/Button'
import { useConversation } from '../../../hooks'

export const ChatView: React.FC<{
  channel: any
  sequence: any
  pusherInstance: any
  restartConversation: () => void
}> = ({ channel, sequence, pusherInstance, restartConversation }) => {
  const { conversation = {}, fetchConversationFromAPI } = useConversation()

  useEffect(() => {
    fetchConversationFromAPI(channel.id)
  }, [channel])

  return conversation.loading ? (
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
  )
}

export default ChatView
