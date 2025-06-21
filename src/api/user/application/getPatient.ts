import { fakePatients } from 'api/data/users'
import { logRequest } from 'api/utils/logger'
import { mockAdapter } from '@/api'
import { patientRegex } from 'api/utils/regex'
import { storageService } from 'services/storage.adapter'
import type { FakePatient } from 'api/data/users'

export const getPatient = () =>
  mockAdapter.onGet(patientRegex).reply(config => {
    logRequest(config)
    const id = config.url?.match(patientRegex)?.[1]

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

    const { sessionNotes, healthMetrics, ...patientData } = patient
    return [200, patientData]
  })
