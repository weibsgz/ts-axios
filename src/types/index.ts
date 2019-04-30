export interface AxiosRequestConfig {
    url: string
    method?: Method
    data?: any
    params?: any
}

 // 字符串字面量类型
export type Method = 'get' | 'GET' | 'delete' | 'DELETE' | 'options' | 'OPTIONS'
| 'post' | 'POST' | 'put' | 'PUT' | 'patch' | 'PATCH'