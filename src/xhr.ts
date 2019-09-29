import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { parseHeaders } from './helpers/header'
import { resolve } from 'url';
import { createError } from './helpers/error'
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
    return new Promise((resolve, reject) => {
        const {data = null, url, method = 'get', headers, responseType, timeout} = config;

        const request = new XMLHttpRequest();

        if(responseType) {
            request.responseType = responseType
        }

        if(timeout) {
            request.timeout = timeout
        }
        if (request.status === 0) {
            return
          }
        request.open(method.toUpperCase(), url, true);

        request.ontimeout = function handleTimeout() {
            reject(
                // createError(`Timeout of ${config.timeout} ms exceeded`, config, 'ECONNABORTED', request)
                new Error('timeout')
                )
        }

        request.onreadystatechange = function handleLoad () {
            if (request.readyState !==4) {
                return
            }

            const responseHeaders = parseHeaders(request.getAllResponseHeaders())
            const responseData = responseType !== 'text' ? request.response : request.respnseTest
            const response: AxiosResponse = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config,
                request
            }
            resolve(response);
        }

        request.onerror = function handleError() {
            reject(new Error('Network Error'))
        }
        if(headers) {
            Object.keys(headers).forEach((name) => {
                if(data === null && name.LowerCase() === 'content-type'){
                    delete headers[name]
                } else {
                    request.setRequestHeader(name, headers[name])
                }
            })
        }
        request.send(data);

        function handleResponse(response: AxiosResponse): void {
            if (response.status >= 200 && response.status < 300) {
              resolve(response)
            } else {
              reject(
                new Error('wrong status')
              )
            }
          }
    })
}
