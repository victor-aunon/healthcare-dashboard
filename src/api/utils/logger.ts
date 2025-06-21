import type { AxiosRequestConfig } from 'axios'

export const logRequest = (config: AxiosRequestConfig) => {
  console.debug(
    `${new Date().toISOString()} - ${config.method?.toUpperCase()} ${config.url}`,
  )
}
