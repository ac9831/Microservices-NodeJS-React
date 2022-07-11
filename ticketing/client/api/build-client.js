import axios from 'axios'

export default ({ req }) => {
  if (typeof window === 'undefined') {

    return axios.create({
      baseURL: 'http://ingress-nginx.ingress-nginx.svc.cluster.local',
      header: req.headers
    })
  } else {

    return axios.create({
      baseUrl: '/'
    })
  }
}