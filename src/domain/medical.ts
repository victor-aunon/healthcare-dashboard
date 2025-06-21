export type Diagnosis = {
  id: UUID
  name: string
  description?: string
}

export type Medication = {
  name: string
  dosage: string
  frequency: string
  description?: string
  startDate?: DateTimeString
  endDate?: DateTimeString
  patientId: UUID
}

export type BloodPressure = {
  systolic: number
  diastolic: number
  date: DateTimeString
  patientId: UUID
}

export type HeartRate = {
  bpm: number
  date: DateTimeString
  patientId?: UUID
}

export type Glucose = {
  mgdl: number
  date: DateTimeString
  patientId: UUID
}

export type DailySteps = {
  steps: number
  date: DateTimeString
  patientId: UUID
}

export type SessionNote = {
  id: UUID
  note: string
  therapistId: UUID
  patientId: UUID
  date: DateTimeString
  updatedAt?: DateTimeString
}

export type PatientMedicalData = {
  patientId: UUID
  diagnoses: Diagnosis[]
  activeMedications: Medication[] | null
  activity: 'low' | 'medium' | 'high' | null
}
