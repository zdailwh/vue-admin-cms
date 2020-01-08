import request from '@/utils/request'
export function addImportList(params) {
  return request({
    url: '/contentimports',
    method: 'post',
    data: params
  })
}
export function getImportList(params) {
  return request({
    url: '/contentimports',
    method: 'get',
    params
  })
}
export function getContentparseList(params) {
  return request({
    url: '/contentparses',
    method: 'get',
    params
  })
}
export function getContentList(params) {
  return request({
    url: '/contents',
    method: 'get',
    params
  })
}
export function contentProcess(params) {
  return request({
    url: '/contents/' + params.id + '/process',
    method: 'get',
    params
  })
}
export function contentRetry(params) {
  return request({
    url: '/contents/' + params.id + '/retry',
    method: 'get'
  })
}
export function contentBan(params) {
  return request({
    url: '/contents/' + params.id + '/ban',
    method: 'get'
  })
}
export function getContentprocessList(params) {
  return request({
    url: '/contentprocesses',
    method: 'get',
    params
  })
}
export function getRecontentList(params) {
  return request({
    url: '/recontents',
    method: 'get',
    params
  })
}
export function recontentPublish(params) {
  return request({
    url: '/recontents/' + params.id + '/publish',
    method: 'get'
  })
}
export function recontentRetry(params) {
  return request({
    url: '/recontents/' + params.id + '/retry',
    method: 'get'
  })
}
export function getVideoList(params) {
  return request({
    url: '/videos',
    method: 'get',
    params
  })
}
export function videoRetry(params) {
  return request({
    url: '/videos/' + params.id + '/retry',
    method: 'get'
  })
}
export function videoOnline(params) {
  return request({
    url: '/videos/' + params.id + '/online',
    method: 'get'
  })
}
export function videoOffline(params) {
  return request({
    url: '/videos/' + params.id + '/offline',
    method: 'get'
  })
}
export function getProofList(params) {
  return request({
    url: '/proofs',
    method: 'get',
    params
  })
}
