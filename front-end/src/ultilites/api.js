import axios from 'axios'
import { setProgress } from 'reducers/loading'
import store from '../stores'
// create default settings axios
const onUploadOrDownload = (progressEvent) => {
  const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length')

  if (totalLength !== null) {
    const numberProgress = Math.round((progressEvent.loaded * 100) / totalLength)
    store.dispatch(setProgress(numberProgress))
  }
}
const instance = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  headers: {
    'Access-Control-Allow-Origin': '*'
  },

  onUploadProgress: onUploadOrDownload,
  onDownloadProgress: onUploadOrDownload

})
// Add a response interceptor
instance.interceptors.request.use(
  function (request) {
    // Do something with response data
    // const url = response.url;
    // if (url !== 'user/sigin' && url !== 'user/signup') {
    //   const token = getItemInStorage();
    //   if (token) {
    //     response.headers = {
    //       ...response.headers,
    //       Authentication: 'Bearer ' + token.token,
    //     };
    //   }
    // }
    return request
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error)
  }
)
// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response?.data?.data
  },
  function (error) {
    const errorData = error.response?.data || error
    console.error(errorData)
    // showError(errorData.message);
    // if (errorData.statusCode === 401 || errorData.statusCode === 403) {
    //   store.dispatch({ type: ActionKey.Unauthorized });
    // }
    // // Do something with response error
    return Promise.reject(errorData)
  }
)

export default instance