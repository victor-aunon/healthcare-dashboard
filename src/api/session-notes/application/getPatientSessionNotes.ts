import { fakePatients } from 'api/data/users'
import { logRequest } from 'api/utils/logger'
import { mockAdapter } from '@/api'
import { patientSessionNotesRegex } from 'api/utils/regex'
import { storageService } from 'services/storage.adapter'
import type { FakePatient } from 'api/data/users'

export const getPatientSessionNotes = () =>
  mockAdapter.onGet(patientSessionNotesRegex).reply(config => {
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

    return [
      200,
      patient.sessionNotes.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    ]
  })
