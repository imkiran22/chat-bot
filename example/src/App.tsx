import React from 'react'

import { ChatBot } from 'chat-bot'
import 'chat-bot/dist/index.css'

const VERSION = 1

const App = () => {
  return <ChatBot version={VERSION} />
}

export default App
