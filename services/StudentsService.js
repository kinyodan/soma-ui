import { apiGetClient, apiPostClient } from './axios-config'

export default {
  listStudents() {
    return apiGetClient.get(`/students`)
  },

  addStudent() {
    return apiPostClient.post(`/student_applications`)
  },
  getStudent(uuid) {
    return apiGetClient.get(`/students/${uuid}`)
  },
}
