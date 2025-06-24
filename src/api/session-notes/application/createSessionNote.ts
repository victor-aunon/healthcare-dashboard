import { fakePatients } from 'api/data/users'
import { logRequest } from 'api/utils/logger'
import { mockAdapter } from '@/api'
import { patientSessionNotesRegex } from 'api/utils/regex'
import { storageService } from 'services/storage.adapter'
import type { ApiService } from 'application/ports'
import type { FakePatient } from 'api/data/users'

export const createSessionNote = () =>
  mockAdapter.onPost(patientSessionNotesRegex).reply(config => {
    logRequest(config)
    const id = config.url?.match(patientSessionNotesRegex)?.[1]
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
      ApiService['createPatientSessionNote']
    >[1]

    const note = { id: crypto.randomUUID(), ...payload }

    patient = {
      ...patient,
      sessionNotes: [...patient.sessionNotes, note],
    }

    const newFakePatients = fakePatients.map(fakePatient =>
      fakePatient.id === id ? patient : fakePatient,
    )
    storageService().set('patients', newFakePatients)

    return [201, note]
  })
