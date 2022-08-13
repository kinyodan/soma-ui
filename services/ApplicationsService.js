import { apiGetClient, apiPostClient } from './axios-config'

export default {
  lisApplications() {
    return apiGetClient.get(`/student_applications`)
  },

  // eslint-disable-next-line camelcase
  lisApplicationsForStudent(student_id) {
    // eslint-disable-next-line camelcase
    console.log('student_applications_list----------')
    return apiGetClient.get(`/student_applications_list`, student_id)
  },

  addApplication(formData) {
    return apiPostClient.post(`/student_applications`, formData)
  },
  getApplication(uuid) {
    return apiGetClient.get(`/student_applications/${uuid}`)
  },
  deleteApplication(formData) {
    return apiGetClient.post(`/soft_destroy`, formData)
  },
}
