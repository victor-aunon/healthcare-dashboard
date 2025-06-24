import { fakePatients } from 'api/data/users'
import { logRequest } from 'api/utils/logger'
import { mockAdapter } from '@/api'
import { patientGlucoseRegex } from 'api/utils/regex'
import { storageService } from 'services/storage.adapter'
import type { FakePatient } from 'api/data/users'
import type { Glucose } from '@/domain/medical'

export const getPatientGlucose = () =>
  mockAdapter.onGet(patientGlucoseRegex).reply(config => {
    logRequest(config)
    const id = config.url?.match(patientGlucoseRegex)?.[1]
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

    const glucose: Glucose[] = (patient.healthMetrics.glucose || []).map(g => ({
      ...g,
      patientId: patient.id,
    }))

    return [200, glucose]
  })
