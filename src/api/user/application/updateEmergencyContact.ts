import { fakePatients } from 'api/data/users'
import { logRequest } from 'api/utils/logger'
import { mockAdapter } from '@/api'
import { emergencyContactRegex } from 'api/utils/regex'
import { storageService } from 'services/storage.adapter'
import type { ApiService } from 'application/ports'
import type { FakePatient } from 'api/data/users'

export const updateEmergencyContact = () =>
  mockAdapter.onPatch(emergencyContactRegex).reply(config => {
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

    const payload = JSON.parse(config.data) as Parameters<
      ApiService['updatePatientEmergencyContact']
    >[1]

    patient = {
      ...patient,
      emergencyContact: { ...patient.emergencyContact, ...payload },
    }
    const newFakePatients = fakePatients.map(fakePatient =>
      fakePatient.id === id ? patient : fakePatient,
    )
    storageService().set('patients', newFakePatients)

    const { emergencyContact } = patient
    return [200, emergencyContact]
  })
