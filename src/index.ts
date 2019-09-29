import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import xhr from './xhr';
import { buildURL } from './helpers/url'
import { transformRequest, transformResponse} from './helpers/data'
import { processHeaders } from './helpers/header'
function axios(config: AxiosRequestConfig): AxiosPromise {
    processConfig(config)
    return xhr(config).then(res =>{
        return transformResponseData(res)
    })
}

function processConfig(config: AxiosRequestConfig): void {
    //url转化
    config.url = transformURL(config)
    config.headers = transformHeaders(config)
    config.data = transformRequestData(config)
}
function transformURL(config: AxiosRequestConfig): string {
    const {url, params} = config
    return buildURL(url, params)
}

function transformHeaders(config: AxiosRequestConfig): any {
    const { headers = {}, data } = config
    return processHeaders(headers, data)
}

function transformRequestData(config: AxiosRequestConfig): any {
    return transformRequest(config.data)
}

function transformResponseData(res: AxiosPromise): AxiosResponse {
    res.data = transformResponse(res.data)
    return res
}
export default axios