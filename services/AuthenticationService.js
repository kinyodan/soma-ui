import axios from 'axios'
import {
  apiGetClient,
  authApiPostClient,
  verifyAuthApiPostClient,
} from '~/services/axios-config'

const apiPostClient = axios.create({
  baseURL: `${process.env.APIURL}`,
  withCredentials: false, // This is the default
})

export default {
  login(email, password) {
    console.log(email, password)
    apiPostClient.interceptors.request.use(function (config) {
      config.headers.Authorization = `{email:'${email}',password:'${password}'}`
      config.headers.locale = 'en'
      config.headers.country = ''
      return config
    })

    return apiPostClient.post(`/sessions`)
  },

  verifyUser(user) {
    verifyAuthApiPostClient.interceptors.request.use(function (config) {
      config.headers.Authorization = `{token:'${user.user}'}`
      config.headers.locale = 'en'
      config.headers.country = ''
      return config
    })
    return verifyAuthApiPostClient.post(`/verify_authentication`)
  },

  signUpUser(user) {
    console.log(user)
    apiPostClient.interceptors.request.use(function (config) {
      config.headers.Authorization = `{pass:'${user.password}',confirm:'${user.confirm_pass}'}`
      config.headers.locale = 'en'
      config.headers.country = ''
      return config
    })
    return apiPostClient.post(`/students`,user)
  },

  addApplication() {
    return apiPostClient.post(`/student_applications`)
  },
  getApplication(uuid) {
    return apiGetClient.get(`/student_applications/${uuid}`)
  },
}
