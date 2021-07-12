import React, { useEffect } from 'react'
import styles from './styles.module.css'
import Chat from './modules/components/Chat/Chat'
import { Button } from './shared/components/Button/Button'
import { useUser } from './hooks'
import './env'
import { store } from './store'
import { Provider } from 'react-redux'

interface Props {
  version: number
}

const App = ({ version }: Props) => {
  const [showWidget, toggleWidget] = React.useState(false)
  const { user, fetchUserFromAPI } = useUser()

  const onClick = () => {
    toggleWidget(!showWidget)
  }

  useEffect(() => {
    fetchUserFromAPI()
  }, [])

  const closeWidget = React.useCallback(
    (ev: React.MouseEvent<HTMLSpanElement>) => {
      toggleWidget(false)
      ev.stopPropagation()
    },
    []
  )

  return (
    <Provider store={store}>
      <div id={styles.chatBotRoot} data-version={version}>
        <Chat
          showWidget={showWidget}
          className={showWidget ? styles.visible : styles.hidden}
        >
          <span className={styles.close} onClick={closeWidget}>
            <img src='https://img.icons8.com/material-outlined/24/000000/close-window.png' />
          </span>
        </Chat>
        <Button
          className={styles.chatBotButton}
          onClick={onClick}
          text={
            user.popupMessage?.message.replace(/<\/?[^>]+(>|$)/g, '') ||
            'Chat Widget'
          }
        />
      </div>
    </Provider>
  )
}

export const ChatBot = ({ version }: Props) => {
  return (
    <Provider store={store}>
      <App version={version} />
    </Provider>
  )
}
