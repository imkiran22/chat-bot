import Axios from './Utils'

class ApiUser {
  constructor() {}
  async fetchUser() {
    const domain = `insent-recruitment.web.app/`
    const url = `https://insentrecruit.api.insent.ai/getuser?url=${domain}`
    return await Axios.get(url)
  }
}

const UserApi = Object.freeze(new ApiUser())
export default UserApi
