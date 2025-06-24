import { endpoints } from 'api/endpoints'
import { fakePatients } from 'api/data/users'
import { logRequest } from 'api/utils/logger'
import { mockAdapter } from '@/api'
import { Roles } from 'domain/users'
import { storageService } from 'services/storage.adapter'
import type { ApiService } from 'application/ports'
import type { FakePatient } from 'api/data/users'

export const createPatient = () =>
  mockAdapter.onPost(endpoints.listPatients.route).reply(config => {
    logRequest(config)
    const patient = JSON.parse(config.data) as Parameters<
      ApiService['createPatient']
    >[0]
    const fakePatient: FakePatient = {
      ...patient,
      id: crypto.randomUUID(),
      role: Roles.PATIENT,
      healthMetrics: {
        bloodPressure: null,
        dailySteps: null,
        glucose: null,
        heartRate: null,
      },
      medicalData: {
        activity: null,
        diagnoses: patient.medicalData.diagnoses.map(diagnosis => ({
          ...diagnosis,
          id: crypto.randomUUID(),
        })),
        activeMedications: [],
      },
      emergencyContact: null,
      sessionNotes: [],
    }
    fakePatients.unshift(fakePatient)
    storageService().set('patients', fakePatients)

    return [201, patient]
  })
