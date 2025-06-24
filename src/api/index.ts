import { env } from 'app/config/env'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {
  getPatient,
  getPatients,
  createPatient,
  updatePatient,
  deletePatient,
  updateEmergencyContact,
  createEmergencyContact,
  deleteEmergencyContact,
} from 'api/user/application'
import {
  createSessionNote,
  updateSessionNote,
  getPatientSessionNotes,
  deleteSessionNote,
} from 'api/session-notes/application'
import {
  getPatientBloodPressure,
  getPatientDailySteps,
  getPatientGlucose,
  getPatientHeartRate,
} from 'api/health-metrics/application'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

type HTTClientMethodMap = {
  GET: (url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse>
  POST: (
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ) => Promise<AxiosResponse>
  PUT: (
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ) => Promise<AxiosResponse>
  DELETE: (url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse>
  PATCH: (
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ) => Promise<AxiosResponse>
}

const axiosClient = axios.create({
  baseURL: env.VITE_BASE_URL,
})

const httpClientMethodMap: HTTClientMethodMap = {
  GET: axiosClient.get,
  POST: axiosClient.post,
  PUT: axiosClient.put,
  DELETE: axiosClient.delete,
  PATCH: axiosClient.patch,
} as const

function httpClient<R = any, M extends keyof HTTClientMethodMap = 'GET'>({
  method = 'GET' as M,
}: { method?: M } = {}): (
  ...args: Parameters<HTTClientMethodMap[M]>
) => Promise<AxiosResponse<R>> {
  const fn = httpClientMethodMap[method] as (
    ...args: Parameters<HTTClientMethodMap[M]>
  ) => Promise<AxiosResponse<R>>

  return (...args: Parameters<HTTClientMethodMap[M]>) => fn(...args)
}

export const mockAdapter = new MockAdapter(axiosClient, {
  delayResponse: Math.random() * 300 + 300,
}) // Between 300ms and 600ms

// Users
getPatients()
getPatient()
createPatient()
updatePatient()
deletePatient()
createEmergencyContact()
updateEmergencyContact()
deleteEmergencyContact()

// Session Notes
createSessionNote()
updateSessionNote()
getPatientSessionNotes()
deleteSessionNote()

// Health Metrics
getPatientBloodPressure()
getPatientDailySteps()
getPatientGlucose()
getPatientHeartRate()

export default httpClient
