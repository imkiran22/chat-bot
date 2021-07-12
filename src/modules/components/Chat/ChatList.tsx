import React from 'react'
import styles from './Chat.module.css'

export const ChatList: React.FC<{ channels: any[] }> = ({ channels = [] }) => {
  return (
    <div className={styles.channelList}>
      {channels.map((channel: any, index: number) => (
        <div className={styles.channelListItem} key={index}>
          <span>{channel?.members[0]?.name}</span>
          <span>{channel?.msg?.text}</span>
        </div>
      ))}
    </div>
  )
}
