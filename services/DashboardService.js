import { apiGetClient, setTokenApiGet ,setTokenApiPost } from './axios-config'

export default {
  dashboardData(user) {
    setTokenApiGet()
    return apiGetClient.get(`/dashboard_data`)
  },
}
