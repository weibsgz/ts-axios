const toString = Object.prototype.toString
// 类型保护 val is Date 这样url.ts使用isDate时候 ts文件才允许使用toISOString
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

// export function isObject (val: any): val is Object {
//   return val !== null && typeof val === 'object'
// }
// 因为 isObject 的判断方式，对于 FormData、ArrayBuffer 这些类型，isObject 判断也为 true，但是这些类型的数据我们是不需要做处理的，而 isPlainObject 的判断方式，只有我们定义的普通 JSON 对象才能满足
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}
