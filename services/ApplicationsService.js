import { apiGetClient, apiPostClient , setTokenApiGet ,setTokenApiPost} from './axios-config'

export default {
  lisApplications(user) {
    apiGetClient.interceptors.request.use(function (config) {
      config.headers.Authorization = `{token:'${user}'}`
      config.headers.locale = 'en'
      config.headers.country = ''
      return config
    })
   return apiGetClient.get(`/student_applications`)
  },

  // eslint-disable-next-line camelcase
  lisApplicationsForStudent(student_id,user) {
    apiGetClient.interceptors.request.use(function (config) {
      config.headers.Authorization = `{token:'${user}'}`
      config.headers.locale = 'en'
      config.headers.country = ''
      return config
    })
    return apiGetClient.get(`/student_applications_list`, student_id)
  },

  addApplication(formData,user) {
    setTokenApiPost(user)
    return apiPostClient.post(`/student_applications`, formData)
  },

  getApplication(uuid,user) {
    apiGetClient.interceptors.request.use(function (config) {
      config.headers.Authorization = `{token:'${user}'}`
      config.headers.locale = 'en'
      config.headers.country = ''
      return config
    })
    return apiGetClient.get(`/student_applications/${uuid}`)
  },

  deleteApplication(formData,user) {
    setTokenApiPost(user)
    return apiGetClient.post(`/soft_destroy`, formData)
  },
}
