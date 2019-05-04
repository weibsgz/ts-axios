import { isDate, isPlainObject } from './util'

// 定义encode方法，因为一些特殊符号 转义后还需要被转义回来
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+') // 空格变加号
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function bulidURL(url: string, params?: any): string {
  if (!params) return url
  // 定义一个数组，元素都是string
  const parts: string[] = []
  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val === null || typeof val === 'undefined') {
      return // 这里return 不会跳出函数 会执行下一次循环
    }
    // 每个val可能是一个数组也可能不是，我们定义一个临时数组
    // 如果是数组就直接赋值，并增加一个[]标记，如果不是数组就
    // 强行转化为一个数组，这样可以去遍历他。
    let values: string[]
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })
  // 得到的是字符串对象数组，要拼接到URL后边
  let serializedParams = parts.join('&')
  // 如果有#这种hash值 需要去掉hash后边的部分
  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
