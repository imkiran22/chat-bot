import React, { Fragment } from 'react'
import styles from './Chat.module.css'
import { ConversationView } from '../ConversationView/ConversationView'
import { Button } from '../../../shared/components/Button/Button'

export const ChatView: React.FC<{
  conversation: any
  sequence: any
  pusherInstance: any
  restartConversation: () => void
}> = ({ conversation, sequence, pusherInstance, restartConversation }) => {
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
