import axios from 'axios'

  export const setTokenApiGet = function (user) {
    apiGetClient.interceptors.request.use(function (config) {
      config.headers.Authorization = `{token:'${user}'}`
      config.headers.locale = 'en'
      config.headers.country = ''
      return config
    })
  };

  export const setTokenApiPost = function (user){
    apiPostClient.interceptors.request.use(function (config) {
      config.headers.Authorization = `{token:'${user}'}`
      config.headers.locale = 'en'
      config.headers.country = ''
      return config
    })
  }

export const apiPostClient = axios.create({
  baseURL: `${process.env.APIURL}`,
  withCredentials: false, // This is the default
})


export const verifyAuthApiPostClient = axios.create({
  baseURL: `${process.env.APIURL}`,
  withCredentials: false, // This is the default
})

export const apiGetClient = axios.create({
  baseURL: `${process.env.APIURL}`,
  withCredentials: false, // This is the default
  headers: {
    locale: 'en',
  },
})

export const authApiPostClient = axios.create({
  baseURL: `${process.env.APIURL}`,
  withCredentials: false, // This is the default
  headers: {
  }
});

