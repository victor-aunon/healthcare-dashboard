import { fakePatients, type FakePatient } from 'api/data/users'
import { endpoints } from 'api/endpoints'
import { env } from 'app/config/env'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { ApiService } from 'application/ports'
import { storageService } from 'services/storage.adapter'
import { getPatients } from 'api/user/application/getPatients'

import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type {
  BloodPressure,
  DailySteps,
  Glucose,
  HeartRate,
} from 'domain/medical'
import { Roles, type Patient } from 'domain/users'
import { getPatient } from './user/application/getPatient'
import { createPatient } from './user/application/createPatients'
import { updatePatient } from './user/application/updatePatient'
import { deleteEmergencyContact } from './user/application/deleteEmergencyContact'
import { deletePatient } from './user/application/deletePatient'

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

getPatients()

const getPatientSessionNotesRegex = new RegExp(
  `${endpoints.listPatients.route}/(${uuidPattern})/session-notes`,
)
mockAdapter.onGet(getPatientSessionNotesRegex).reply(config => {
  logRequest(config)
  const id = config.url?.match(getPatientRegex)?.[1]

  let patient: FakePatient | undefined = fakePatients.find(
    patient => patient.id === id,
  )

  const patientsStored = storageService().get<FakePatient[]>('patients')
  if (patientsStored) {
    patient = patientsStored.find(patient => patient.id === id)
  }

  if (!patient) {
    return [404, { message: 'Patient not found' }]
  }

  return [
    200,
    patient.sessionNotes.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    ),
  ]
})

getPatient()

createPatient()

const getPatientHeartRateRegex = new RegExp(
  `${endpoints.listPatients.route}/(${uuidPattern})/health-metrics/heart-rate`,
)
mockAdapter.onGet(getPatientHeartRateRegex).reply(config => {
  logRequest(config)
  const id = config.url?.match(getPatientHeartRateRegex)?.[1]
  const patient: FakePatient | undefined = fakePatients.find(
    patient => patient.id === id,
  )

  if (!patient) {
    return [404, { message: 'Patient not found' }]
  }

  if (!patient.healthMetrics.heartRate) {
    return [200, null] as const
  }

  const now = new Date()
  const heartRate: HeartRate[] = patient.healthMetrics.heartRate.map(
    (heartRate, index) => ({
      ...heartRate,
      patientId: patient.id,
      date: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - index,
      ).toISOString(),
    }),
  )

  return [200, heartRate]
})

const getPatientStepsRegex = new RegExp(
  `${endpoints.listPatients.route}/(${uuidPattern})/health-metrics/steps`,
)
mockAdapter.onGet(getPatientStepsRegex).reply(config => {
  logRequest(config)
  const id = config.url?.match(getPatientStepsRegex)?.[1]
  const patient: FakePatient | undefined = fakePatients.find(
    patient => patient.id === id,
  )

  if (!patient) {
    return [404, { message: 'Patient not found' }]
  }

  if (!patient.healthMetrics.dailySteps) {
    return [200, null] as const
  }

  const now = new Date()
  const dailySteps: DailySteps[] = patient.healthMetrics.dailySteps.map(
    (steps, index) => ({
      ...steps,
      patientId: patient.id,
      date: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - index,
      ).toISOString(),
    }),
  )

  return [200, dailySteps]
})

const getPatientGlucoseRegex = new RegExp(
  `${endpoints.listPatients.route}/(${uuidPattern})/health-metrics/glucose`,
)
mockAdapter.onGet(getPatientGlucoseRegex).reply(config => {
  logRequest(config)
  const id = config.url?.match(getPatientGlucoseRegex)?.[1]
  const patient: FakePatient | undefined = fakePatients.find(
    patient => patient.id === id,
  )

  if (!patient) {
    return [404, { message: 'Patient not found' }]
  }

  if (!patient.healthMetrics.glucose) {
    return [200, null] as const
  }

  const now = new Date()
  const glucose: Glucose[] = patient.healthMetrics.glucose.map(
    (glucose, index) => ({
      ...glucose,
      patientId: patient.id,
      date: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - index,
      ).toISOString(),
    }),
  )

  return [200, glucose]
})

const getPatientBloodPressureRegex = new RegExp(
  `${endpoints.listPatients.route}/(${uuidPattern})/health-metrics/blood-pressure`,
)
mockAdapter.onGet(getPatientBloodPressureRegex).reply(config => {
  logRequest(config)
  const id = config.url?.match(getPatientBloodPressureRegex)?.[1]
  const patient: FakePatient | undefined = fakePatients.find(
    patient => patient.id === id,
  )

  if (!patient) {
    return [404, { message: 'Patient not found' }]
  }

  if (!patient.healthMetrics.bloodPressure) {
    return [200, null] as const
  }

  const now = new Date()
  const bloodPressure: BloodPressure[] =
    patient.healthMetrics.bloodPressure.map((bloodPressure, index) => ({
      ...bloodPressure,
      patientId: patient.id,
      date: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - index,
      ).toISOString(),
    }))

  return [200, bloodPressure]
})

const getPatientEmergencyContactRegex = new RegExp(
  `${endpoints.listPatients.route}/(${uuidPattern})/emergency-contacts`,
)
mockAdapter.onPatch(getPatientEmergencyContactRegex).reply(config => {
  logRequest(config)
  const id = config.url?.match(getPatientRegex)?.[1]
  let patient: FakePatient | undefined = fakePatients.find(
    patient => patient.id === id,
  )

  const patientsStored = storageService().get<FakePatient[]>('patients')
  if (patientsStored) {
    patient = patientsStored.find(patient => patient.id === id)
  }

  if (!patient) {
    return [404, { message: 'Patient not found' }]
  }

  if (!patient.emergencyContact) {
    return [404, { message: 'Emergency contact not found' }]
  }

  const payload = JSON.parse(config.data) as Partial<
    Patient['emergencyContact']
  >
  patient = {
    ...patient,
    emergencyContact: {
      ...patient.emergencyContact,
      ...payload,
    },
  }
  const newFakePatients = fakePatients.map(fakePatient =>
    fakePatient.id === id ? patient : fakePatient,
  )
  storageService().set('patients', newFakePatients)

  const { emergencyContact } = patient
  return [200, emergencyContact]
})

mockAdapter.onPost(getPatientSessionNotesRegex).reply(config => {
  logRequest(config)
  const id = config.url?.match(getPatientRegex)?.[1]

  let patient: FakePatient | undefined = fakePatients.find(
    patient => patient.id === id,
  )

  const patientsStored = storageService().get<FakePatient[]>('patients')
  if (patientsStored) {
    patient = patientsStored.find(patient => patient.id === id)
  }

  if (!patient) {
    return [404, { message: 'Patient not found' }]
  }

  const payload = JSON.parse(config.data) as Parameters<
    ApiService['createPatientSessionNote']
  >[1]

  patient = {
    ...patient,
    sessionNotes: [
      ...patient.sessionNotes,
      { ...payload, id: crypto.randomUUID() },
    ],
  }
  const newFakePatients = fakePatients.map(fakePatient =>
    fakePatient.id === id ? patient : fakePatient,
  )
  storageService().set('patients', newFakePatients)

  return [200, payload]
})

const updatePatientSessionNotesRegex = new RegExp(
  `${endpoints.listPatients.route}/(${uuidPattern})/session-notes/(${uuidPattern})`,
)

mockAdapter.onPatch(updatePatientSessionNotesRegex).reply(config => {
  logRequest(config)
  const [_, patientId, noteId] =
    config.url?.match(updatePatientSessionNotesRegex) || []
  let patient: FakePatient | undefined = fakePatients.find(
    patient => patient.id === patientId,
  )

  const patientsStored = storageService().get<FakePatient[]>('patients')
  if (patientsStored) {
    patient = patientsStored.find(patient => patient.id === patientId)
  }

  if (!patient) {
    return [404, { message: 'Patient not found' }]
  }

  const note = patient.sessionNotes.find(note => note.id === noteId)

  if (!note) {
    return [404, { message: 'Note not found' }]
  }

  const payload = JSON.parse(config.data) as Parameters<
    ApiService['updatePatientSessionNote']
  >[2]

  patient = {
    ...patient,
    sessionNotes: patient.sessionNotes.map(sessionNote =>
      sessionNote.id === noteId ? { ...sessionNote, ...payload } : sessionNote,
    ),
  }
  const newFakePatients = fakePatients.map(fakePatient =>
    fakePatient.id === patientId ? patient : fakePatient,
  )
  storageService().set('patients', newFakePatients)

  return [200, { ...note, ...payload }]
})

updatePatient()

deleteEmergencyContact()

mockAdapter.onDelete(updatePatientSessionNotesRegex).reply(config => {
  logRequest(config)

  const [_, patientId, noteId] =
    config.url?.match(updatePatientSessionNotesRegex) || []

  let _fakePatients: FakePatient[] = fakePatients

  const fakePatientsStored = storageService().get<FakePatient[]>('patients')
  if (fakePatientsStored) {
    _fakePatients = fakePatientsStored
  }

  const fakePatient = _fakePatients.find(patient => patient.id === patientId)

  if (!fakePatient) {
    return [404, { message: 'Patient not found' }]
  }

  const note = fakePatient.sessionNotes.find(note => note.id === noteId)

  if (!note) {
    return [404, { message: 'Note not found' }]
  }

  const newFakePatients = _fakePatients.map(patient =>
    patient.id === patientId
      ? {
          ...patient,
          sessionNotes: patient.sessionNotes.filter(
            sessionNote => sessionNote.id !== noteId,
          ),
        }
      : patient,
  )
  storageService().set('patients', newFakePatients)

  return [200, { message: 'Session note deleted' }]
})

deletePatient()

export default httpClient
