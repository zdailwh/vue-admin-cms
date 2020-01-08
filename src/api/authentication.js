import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/authentications',
    method: 'post',
    data,
    baseURL: process.env.NODE_ENV === 'production' ? '/api/kx/v1' : '/dev-api/table'
  })
}

export function logout() {
  return request({
    url: '/authentications',
    method: 'delete',
    baseURL: process.env.NODE_ENV === 'production' ? '/api/kx/v1' : '/dev-api/table'
  })
}
