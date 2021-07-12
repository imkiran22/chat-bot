import React from 'react'

export interface ContextType {
  view: string
  setView: Function
}

export const ChatContext = React.createContext<ContextType>({} as ContextType)
