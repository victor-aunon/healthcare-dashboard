import type {
  PatientMedicalData,
  BloodPressure,
  DailySteps,
  Glucose,
  HeartRate,
  SessionNote,
} from 'domain/medical'
import type { Patient } from 'domain/users'

export type ApiService = {
  getPatients: () => Promise<Patient[]>
  getPatient: (id: UUID) => Promise<Patient>
  createPatient: (
    payload: Omit<
      Patient,
      'id' | 'role' | 'emergencyContact' | 'medicalData'
    > & {
      medicalData: {
        diagnoses: Omit<PatientMedicalData['diagnoses'][number], 'id'>[]
      }
    },
  ) => Promise<Patient>
  updatePatient: (
    id: UUID,
    payload: Partial<
      Omit<Patient, 'id' | 'role' | 'emergencyContact' | 'medicalData'> & {
        medicalData: {
          diagnoses: Omit<PatientMedicalData['diagnoses'][number], 'id'>[]
        }
      }
    >,
  ) => Promise<Patient | null>
  deletePatient: (id: UUID) => Promise<void>
  updatePatientEmergencyContact: (
    id: UUID,
    payload: Partial<Patient['emergencyContact']>,
  ) => Promise<Patient['emergencyContact'] | null>
  deletePatientEmergencyContact: (id: UUID) => Promise<void>
  getPatientSteps: (id: UUID) => Promise<DailySteps[] | null>
  getPatientBloodPressure: (id: UUID) => Promise<BloodPressure[] | null>
  getPatientHeartRate: (id: UUID) => Promise<HeartRate[] | null>
  getPatientGlucose: (id: UUID) => Promise<Glucose[] | null>
  getPatientSessionNotes: (id: UUID) => Promise<SessionNote[]>
  createPatientSessionNote: (
    id: UUID,
    payload: Omit<SessionNote, 'id'>,
  ) => Promise<SessionNote>
  updatePatientSessionNote: (
    patientId: UUID,
    id: UUID,
    payload: Partial<SessionNote>,
  ) => Promise<SessionNote>
  deletePatientSessionNote: (patientId: UUID, id: UUID) => Promise<void>
}

export type StorageService = {
  set: <T>(key: string, value: T) => void
  get: <T>(key: string) => T | null
  remove: (key: string) => void
}

export type AlertService<P = unknown, R = any> = {
  errorAlert: (props: P) => Promise<R>
  infoAlert: (props: P) => Promise<R>
  questionAlert: (props: P) => Promise<R>
  successAlert: (props: P) => Promise<R>
  warningAlert: (props: P) => Promise<R>
}
