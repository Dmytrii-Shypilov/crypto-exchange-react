import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
    // withCredentials: true,
    headers: {
        "Content-Type": "application/json",
      },
})



// axiosInstance.interceptors.request.use(
//   (config)=> {
//     const token = document.cookie.split('; ').find(row => row.startsWith('access_token='))?.split('=')[1]
//     console.log(document.cookie)
//     console.log(`TOKEN ${token}`)
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => Promise.reject(error)
// )

export default axiosInstance