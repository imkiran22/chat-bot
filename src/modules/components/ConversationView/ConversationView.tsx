import React from 'react'
import { useUser } from '../../../hooks'
import { Button } from '../../../shared/components/Button/Button'
import { Input, List, RatingComponent } from './ConversationHelper'
import styles from './ConversationView.module.css'

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
}> = ({ data = { prevMessages: [], messages: [] }, pusherInstance }) => {
  const { user } = useUser()
  const [messages, setMessages] = React.useState(data.prevMessages || [])
  const [sequence, setSequence] = React.useState(0)

  let inputData = { ...InputField[sequence] }

  const onKeyDown = (ev: { [key: string]: any }, feedback = {}) => {
    let triggered = pusherInstance
      .channel(user.channelId)
      .trigger('client-widget-message', {
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
        senderId: user.user.id
      })
    const message = {
      label: ev.text,
      text: ev.value,
      type: ev.type
    }
    console.info('SENT MESSAGE TO PUSHER', triggered)
    setMessages(messages.concat([message]))
    setSequence(sequence + 1)
  }

  const onButtonClick = (data: any) => {
    onKeyDown(data)
  }

  const ratingOnClick = (ev: number) => {
    const feedback = {
      message: '',
      submitted: true,
      value: ev
    }
    onKeyDown({ text: `You gave ${ev} stars !!!` }, feedback)
  }

  return (
    <div className={styles.conversationWrapper}>
      <List messages={messages} />

      {sequence >= 0 && sequence <= 2 && (
        <Input
          {...{
            type: inputData.type,
            keyProp: inputData.key,
            name: inputData.text,
            text: inputData.text,
            onKeyDown
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
