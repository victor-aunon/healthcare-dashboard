import { fakePatients } from 'api/data/users'
import { logRequest } from 'api/utils/logger'
import { mockAdapter } from '@/api'
import { patientRegex } from 'api/utils/regex'
import { storageService } from 'services/storage.adapter'
import type { FakePatient } from 'api/data/users'

export const deletePatient = () =>
  mockAdapter.onDelete(patientRegex).reply(config => {
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

    const newFakePatients = _fakePatients.filter(patient => patient.id !== id)
    storageService().set('patients', newFakePatients)

    return [200, { message: 'Patient deleted' }]
  })
