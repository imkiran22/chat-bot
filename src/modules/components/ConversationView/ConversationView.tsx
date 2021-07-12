import React, { useContext } from 'react'
import { useUser } from '../../../hooks'
import { Button } from '../../../shared/components/Button/Button'
import { ChatContext } from '../Chat/ChatContext'
import { Input, List, RatingComponent } from './ConversationHelper'
import styles from './ConversationView.module.css'

const WIDGET_MESSAGE_EVENT = 'client-widget-message'

const InputField = [
  {
    disabled: true,
    key: 'firstName',
    text: 'First Name',
    type: 'plain',
    value: ''
  },
  {
    disabled: true,
    key: 'lastName',
    text: 'Last Name',
    type: 'plain',
    value: ''
  },
  {
    disabled: true,
    key: 'email',
    text: 'Email',
    type: 'email',
    value: ''
  }
]

const ButtonField = [
  {
    name: null,
    text: 'Button 1',
    time: null,
    type: 'text'
  },
  {
    name: null,
    text: 'Button 2',
    time: null,
    type: 'text'
  }
]

export const ConversationView: React.FC<{
  data: Record<string, any>
  pusherInstance: any
  currentSequence: { number: number }
}> = ({
  data = { prevMessages: [], messages: [] },
  pusherInstance,
  currentSequence
}) => {
  const { user } = useUser()
  const [messages, setMessages] = React.useState(data.prevMessages || [])
  const [sequence, setSequence] = React.useState(currentSequence.number)
  const { setView } = useContext(ChatContext)

  React.useEffect(() => {
    setSequence(currentSequence.number)
  }, [currentSequence])

  let inputData = { ...InputField[sequence] }

  const sendToPusher = (ev: { [key: string]: any }, feedback = {}) => {
    if (pusherInstance?.channel?.trigger) {
      let triggered = pusherInstance
        .channel(user.channelId)
        .trigger(WIDGET_MESSAGE_EVENT, {
          channelName: user.channelId,
          feedback,
          message: {
            type: ev.type,
            lastMessageTimeStamp: Date.now()
          },
          display: {
            channelId: user.channelId,
            name: 'InsentBot',
            time: Date.now(),
            input: {
              disabled: true,
              key: ev.type,
              text: ev.text,
              type: ev.type,
              value: ev.value
            }
          },
          senderId: user.user?.id
        })
      console.info('SENT MESSAGE TO PUSHER', triggered)
    }
    const message = {
      label: ev.text,
      text: ev.value,
      type: ev.type
    }
    setMessages(messages.concat([message]))
    setSequence(sequence + 1)
  }

  const onButtonClick = (data: any) => {
    sendToPusher(data)
  }

  const ratingOnClick = (ev: number) => {
    const feedback = {
      message: '',
      submitted: true,
      value: ev
    }
    sendToPusher({ text: `You gave ${ev} stars !!!` }, feedback)
    setView('LIST')
  }

  return (
    <div
      className={styles.conversationWrapper}
      data-testid={'conversationView'}
    >
      <List messages={messages} />

      {sequence >= 0 && sequence <= 2 && (
        <Input
          {...{
            type: inputData.type,
            keyProp: inputData.key,
            name: inputData.text,
            text: inputData.text,
            onKeyDown: sendToPusher
          }}
        />
      )}

      {sequence === 3 && (
        <div className={styles.buttonField}>
          {ButtonField.map((button, index) => (
            <Button
              key={index}
              theme={'primary'}
              text={button.text}
              onClick={() => onButtonClick(button)}
            />
          ))}
        </div>
      )}

      {sequence === 4 && <RatingComponent onClick={ratingOnClick} />}
    </div>
  )
}
