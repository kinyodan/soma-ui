import { apiGetClient, apiPostClient , setTokenApiGet ,setTokenApiPost } from './axios-config'

export default {
  listStudents(user) {
    setTokenApiGet(user)
    return apiGetClient.get(`/students`)
  },

  addStudent(user) {
    setTokenApiGet(user)
    return apiPostClient.post(`/student_applications`)
  },
  getStudent(uuid,user) {
    setTokenApiPost(user)
    return apiGetClient.get(`/students/${uuid}`)
  },
}
