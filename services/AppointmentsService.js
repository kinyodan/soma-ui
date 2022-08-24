import { apiGetClient } from './axios-config'

export default {
  addAppoitnment(formData) {
    return apiGetClient.post(`/appointments`, formData)
  },

  getAppoitnments(studentId) {
    return apiGetClient.get(`/appointments?id=${studentId}`)
  },
}
