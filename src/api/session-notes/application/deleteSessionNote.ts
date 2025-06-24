import { fakePatients } from 'api/data/users'
import { logRequest } from 'api/utils/logger'
import { mockAdapter } from '@/api'
import { patientUniqueSessionNoteRegex } from 'api/utils/regex'
import { storageService } from 'services/storage.adapter'
import type { FakePatient } from 'api/data/users'

export const deleteSessionNote = () =>
  mockAdapter.onDelete(patientUniqueSessionNoteRegex).reply(config => {
    logRequest(config)
    const patientId = config.url?.match(patientUniqueSessionNoteRegex)?.[1]
    let patient: FakePatient | undefined = fakePatients.find(
      patient => patient.id === patientId,
    )

    const patientsStored = storageService().get<FakePatient[]>('patients')
    if (patientsStored) {
      patient = patientsStored.find(patient => patient.id === patientId)
    }

    if (!patient) {
      return [404, { message: 'Patient not found' }]
    }

    const noteId = config.url?.match(patientUniqueSessionNoteRegex)?.[2]
    const note = patient.sessionNotes.find(note => note.id === noteId)

    if (!note) {
      return [404, { message: 'Note not found' }]
    }

    patient = {
      ...patient,
      sessionNotes: patient.sessionNotes.filter(note => note.id !== noteId),
    }

    const newFakePatients = fakePatients.map(fakePatient =>
      fakePatient.id === patientId ? patient : fakePatient,
    )
    storageService().set('patients', newFakePatients)

    return [204, { message: 'Session note deleted' }]
  })
