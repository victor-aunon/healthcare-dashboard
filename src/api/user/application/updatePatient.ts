import { fakePatients } from 'api/data/users'
import { logRequest } from 'api/utils/logger'
import { mockAdapter } from '@/api'
import { patientRegex } from 'api/utils/regex'
import { storageService } from 'services/storage.adapter'
import type { ApiService } from 'application/ports'
import type { FakePatient } from 'api/data/users'

export const updatePatient = () =>
  mockAdapter.onPatch(patientRegex).reply(config => {
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

    const payload = JSON.parse(config.data) as Parameters<
      ApiService['updatePatient']
    >[1]

    patient = {
      ...patient,
      ...payload,
      medicalData: {
        ...patient.medicalData,
        diagnoses: (payload.medicalData?.diagnoses || []).map(diagnosis => ({
          ...diagnosis,
          id: crypto.randomUUID(),
        })),
      },
    }
    const newFakePatients = fakePatients.map(fakePatient =>
      fakePatient.id === id ? patient : fakePatient,
    )
    storageService().set('patients', newFakePatients)

    const { medicalData, sessionNotes, healthMetrics, ...patientData } = patient
    return [200, patientData]
  })
