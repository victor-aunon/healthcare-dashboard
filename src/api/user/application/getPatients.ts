import { endpoints } from 'api/endpoints'
import { fakePatients } from 'api/data/users'
import { logRequest } from 'api/utils/logger'
import { mockAdapter } from '@/api'
import { storageService } from 'services/storage.adapter'
import type { FakePatient } from 'api/data/users'
import type { Patient } from 'domain/users'

export const getPatients = () =>
  mockAdapter.onGet(endpoints.listPatients.route).reply(config => {
    logRequest(config)
    let _fakePatients: FakePatient[] = fakePatients

    const fakePatientsStored = storageService().get<FakePatient[]>('patients')
    if (fakePatientsStored) {
      _fakePatients = fakePatientsStored
    }
    const patients: Patient[] = _fakePatients.map(
      ({ sessionNotes, healthMetrics, ...patient }) => patient,
    )
    return [200, patients]
  })
