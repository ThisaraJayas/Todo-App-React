import axios from 'axios'
import { apiClient } from './ApiClient'

// export function retriveHelloWorldBean(){
//     return axios.get('http://localhost:8080/hello-world-bean')
// }


export const retriveHelloWorldBean = () =>apiClient.get('/hello-world-bean')

export const retriveHelloWordPathVariable = (username,token)=>apiClient.get(`/hello-world/path-variable/${username}`
// ,{ WE HAVE ADDED GLOBALY IN AuthContext.js
//     headers:{
//         Authorization: token
//     }
// }
)


