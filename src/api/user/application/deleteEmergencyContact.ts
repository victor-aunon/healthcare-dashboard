import { emergencyContactRegex, patientRegex } from 'api/utils/regex'
import { fakePatients } from 'api/data/users'
import { logRequest } from 'api/utils/logger'
import { mockAdapter } from '@/api'
import { storageService } from 'services/storage.adapter'
import type { FakePatient } from 'api/data/users'

export const deleteEmergencyContact = () =>
  mockAdapter.onDelete(emergencyContactRegex).reply(config => {
    logRequest(config)
    const id = config.url?.match(patientRegex)?.[1]

    let _fakePatients: FakePatient[] = fakePatients

    const fakePatientsStored = storageService().get<FakePatient[]>('patients')
    if (fakePatientsStored) {
      _fakePatients = fakePatientsStored
    }

    if (!_fakePatients.find(patient => patient.id === id)) {
      return [404, { message: 'Patient not found' }]
    }

    const newFakePatients = _fakePatients.map(patient =>
      patient.id === id ? { ...patient, emergencyContact: null } : patient,
    )
    storageService().set('patients', newFakePatients)

    return [200, { message: 'Emergency contact deleted' }]
  })
