// import Cookies from 'js-cookie'
import defaultSettings from '@/settings'

const { platform } = defaultSettings

var TokenKey = ''
if (platform === 'DOXTV') {
  TokenKey = 'blockchain-cms-doxtv'
} else if (platform === '酷豆网') {
  TokenKey = 'blockchain-cms-kudou'
} else if (platform === '优奇视频') {
  TokenKey = 'blockchain-cms-youqi'
} else if (platform === '快秀短视频') {
  TokenKey = 'blockchain-cms-kuaixiu'
} else {
  TokenKey = 'blockchain-cms-doxtv'
}
// export function getToken() {
//   return Cookies.get(TokenKey)
// }

// export function setToken(token) {
//   return Cookies.set(TokenKey, token)
// }

// export function removeToken() {
//   return Cookies.remove(TokenKey)
// }

export function getToken() {
  return window.localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return window.localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return window.localStorage.removeItem(TokenKey)
}
