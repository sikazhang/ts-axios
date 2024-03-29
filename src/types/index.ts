export type Method = 'get'|'GET'
| 'delete' | 'Delete'
| 'head' | 'HEAD'
| 'options' | 'OPTIONS'
| 'post' | 'POST'
| 'put' | 'PUT'
| 'patch' | 'PATCH' 
export type XMLHttpRequestResponseType = '' |"arraybuffer" | "blob" | "document" | "json" | "text";
export interface AxiosRequestConfig {
    url: string
    method?: string
    data?: any
    params?: any
    headers?:any
    responseType?: XMLHttpRequestResponseType
    timeout?: number
}

export interface AxiosResponse {
    data: any
    status: number
    statusText: string
    headers: any
    config: AxiosRequestConfig
    request: any
}

//
export interface AxiosPromise extends Promise<AxiosResponse> {

}