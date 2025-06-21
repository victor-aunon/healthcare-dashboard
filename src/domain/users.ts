import type { PatientMedicalData } from 'domain/medical'

export type User = {
  id: UUID
  name: string
  surname: string
  age: number
  email: Email | null
  phone: string | null
  photo: string | null
}

export enum Roles {
  PATIENT = 'PATIENT',
  THERAPIST = 'THERAPIST',
  EMERGENCY_CONTACT = 'EMERGENCY_CONTACT',
}

export type EmergencyContact = User & {
  role: Roles.EMERGENCY_CONTACT
  relationship: string
}

export type Patient = User & {
  role: Roles.PATIENT
  sex: 'male' | 'female'
  weight: WeightInKg
  height: HeightInCm
  emergencyContact: EmergencyContact | null
  medicalData: Pick<PatientMedicalData, 'diagnoses'>
}

export type Therapist = User & {
  role: Roles.THERAPIST
}
