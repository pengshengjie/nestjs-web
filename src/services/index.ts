import axios from 'axios'

export const request = axios.create({ baseURL: 'http://localhost:3000/api' });

request.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${window.localStorage.getItem('token')}`

  return config
}, (error) => {
  return Promise.reject(error)
})

request.interceptors.response.use(function (response) {
  if(response.status >= 200 && response.status < 300) {
    return response.data
  }
  return response;
}, function (error) {
  return Promise.reject(error);
});