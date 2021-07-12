import React, { useState } from 'react'

const BEARER_TOKEN = `Bearer V9WxVwHha8pFPNCMz2PK`
const BASE_URL = `https://insentrecruit.api.insent.ai/`

export const usePusher = () => {
  const [pusherInstance, setPusherInstance] = useState(null as any)
  const [channels, setChannels] = React.useState({} as any)
  /**
   * ESTABLISHES THE PUSHER CONNECTION
   */
  const establishPusherConnection = React.useCallback(
    (user: { [key: string]: any }) => {
      const { REACT_APP_PUSHER_TOKEN, REACT_APP_PUSHER_CLUSTER } = window.env
      const instance = new window.Pusher(REACT_APP_PUSHER_TOKEN, {
        cluster: REACT_APP_PUSHER_CLUSTER,
        authEndpoint:
          BASE_URL + 'pusher/presence/auth/visitor?userid=' + user.id,
        auth: {
          headers: {
            Authorization: BEARER_TOKEN
          }
        }
      })
      setPusherInstance(instance)
      console.info('SUCCESSFULLY ESTABLISHED PUSHER CONNECTION')
    },
    []
  )

  /**
   *
   * @param channelId Connects user with the channels
   */
  const connectUserToChannelId = (channelId: string) => {
    const channel = pusherInstance.subscribe(channelId)
    channels[channelId] = channel
    setChannels({ ...channels })
    console.log(`SUCCESS: CONNECTED TO CHANNEL ${channelId}`)
    return channel
  }

  return {
    pusherInstance,
    establishPusherConnection,
    connectUserToChannelId,
    channels
  }
}
