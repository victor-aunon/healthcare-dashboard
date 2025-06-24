import { fakePatients } from 'api/data/users'
import { logRequest } from 'api/utils/logger'
import { mockAdapter } from '@/api'
import { patientHeartRateRegex } from 'api/utils/regex'
import { storageService } from 'services/storage.adapter'
import type { FakePatient } from 'api/data/users'
import type { HeartRate } from '@/domain/medical'

export const getPatientHeartRate = () =>
  mockAdapter.onGet(patientHeartRateRegex).reply(config => {
    logRequest(config)
    const id = config.url?.match(patientHeartRateRegex)?.[1]
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

    const heartRate: HeartRate[] = (patient.healthMetrics.heartRate || []).map(
      hr => ({
        ...hr,
        patientId: patient.id,
      }),
    )

    return [200, heartRate]
  })
