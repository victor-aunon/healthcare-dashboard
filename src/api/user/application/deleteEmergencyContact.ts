import { emergencyContactRegex } from 'api/utils/regex'
import { fakePatients } from 'api/data/users'
import { logRequest } from 'api/utils/logger'
import { mockAdapter } from '@/api'
import { storageService } from 'services/storage.adapter'
import type { FakePatient } from 'api/data/users'

export const deleteEmergencyContact = () =>
  mockAdapter.onDelete(emergencyContactRegex).reply(config => {
    logRequest(config)
    const id = config.url?.match(emergencyContactRegex)?.[1]
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
      return [
        400,
        { message: 'This patient does not have an emergency contact' },
      ]
    }

    const newFakePatients = fakePatients.map(patient =>
      patient.id === id ? { ...patient, emergencyContact: null } : patient,
    )
    storageService().set('patients', newFakePatients)

    return [204, { message: 'Emergency contact deleted' }]
  })
