import Axios from './Utils'

class ApiConversation {
  constructor() {}

  async fetchConversation(channelId: string) {
    const url = `https://insentrecruit.api.insent.ai/user/channels/${channelId}`
    return await Axios.get(url)
  }

  async markDelivered(channelId: string) {
    const url = `https://insentrecruit.api.insent.ai/user/channels/${channelId}/delivered`
    return await Axios.post(url, {})
  }
}

const ConversationApi = Object.freeze(new ApiConversation())
export default ConversationApi
