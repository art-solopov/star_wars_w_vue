import axios from 'axios'

function serParams (params) {
  params = params || {}
  let keys = Object.keys(params).sort()
  return keys.reduce((acc, val) => { return acc + `${val}=${params[val]}` }, '')
}

export function fetchCachedData (url, params) {
  const normUrl = new URL(url)
  const urlPath = normUrl.pathname || ''
  const lsKey = `swvue$fetch_data$${normUrl.host}_` +
        `${urlPath}_${serParams(params)}`
  const lsItem = global.localStorage.getItem(lsKey)

  if (lsItem) {
    return new Promise((resolve, reject) => { resolve(JSON.parse(lsItem)) })
  } else {
    return axios.get(url, {params}).then(res => {
      const { data } = res
      global.localStorage.setItem(lsKey, JSON.stringify(data))
      return data
    })
  }
}
