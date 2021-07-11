export {}

interface Env {
  REACT_APP_PUSHER_TOKEN: string
  REACT_APP_PUSHER_CLUSTER: string
  REACT_APP_MIXPANEL_KEY: string
  REACT_APP_SESSION_TIME: string
  REACT_APP_TIME_SPENT_COUNT: number
}

declare global {
  interface Window {
    env: Env
    Pusher: any
  }
}

window.env = {
  REACT_APP_PUSHER_TOKEN: '67bb469433cb732caa7a',
  REACT_APP_PUSHER_CLUSTER: 'mt1',
  REACT_APP_MIXPANEL_KEY: '221b0c8bcea182e5d1d769f088dfb85a',
  REACT_APP_SESSION_TIME: '120000',
  REACT_APP_TIME_SPENT_COUNT: 10
}
