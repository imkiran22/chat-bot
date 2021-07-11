import axios from 'axios'

class ApiAxios {
  headers: any
  constructor() {
    this.headers = {
      headers: {
        Authorization: 'Bearer V9WxVwHha8pFPNCMz2PK'
      }
    }
  }

  private getHeaders() {
    return { ...this.headers }
  }

  updateHeadersWithUserInfo(userId: string) {
    const headersData = this.getHeaders()
    headersData.headers['userid'] = userId
    this.headers = { ...headersData }
  }

  async get(url: string) {
    return axios.get(url, this.getHeaders())
  }

  async post(url: string, payload: any = {}) {
    return axios.post(url, payload, this.getHeaders())
  }
}

/**
 * A INTERCEPTOR AROUND AXIOS WHERE YOU CAN ADD HEADERS AND OTHERS
 */
const Axios = new ApiAxios()

export default Axios
