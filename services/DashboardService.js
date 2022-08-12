import { apiGetClient } from './axios-config'

export default {
  dashboardData() {
    return apiGetClient.get(`/dashboard_data`)
  },
}
