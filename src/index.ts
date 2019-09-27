import { AxiosRequestConfig } from './types'
import xhr from './xhr';
import { buildURL } from './helpers/url'
function axios(config: AxiosRequestConfig):void {
    //TODO
    processConfig(config)
    xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
    //url转化
    config.url = transformURL(config)

}

function transformURL(config: AxiosRequestConfig): string {
    const {url, params} = config
    return buildURL(url, params)
}
export default axios