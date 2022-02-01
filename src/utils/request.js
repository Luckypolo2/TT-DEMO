import axios from 'axios'

const request = axios.create({
  baseURL: 'http://www.liulongbin.top:8000'
})
export default request
