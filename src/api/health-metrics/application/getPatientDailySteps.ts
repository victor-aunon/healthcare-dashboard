import { fakePatients } from 'api/data/users'
import { logRequest } from 'api/utils/logger'
import { mockAdapter } from '@/api'
import { patientStepsRegex } from 'api/utils/regex'
import { storageService } from 'services/storage.adapter'
import type { FakePatient } from 'api/data/users'
import type { DailySteps } from '@/domain/medical'

export const getPatientDailySteps = () =>
  mockAdapter.onGet(patientStepsRegex).reply(config => {
    logRequest(config)
    const id = config.url?.match(patientStepsRegex)?.[1]
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

    const dailySteps: DailySteps[] = (
      patient.healthMetrics.dailySteps || []
    ).map(ds => ({
      ...ds,
      patientId: patient.id,
    }))

    return [200, dailySteps]
  })
