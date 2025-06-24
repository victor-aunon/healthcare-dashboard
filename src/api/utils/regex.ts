import { endpoints } from 'api/endpoints'

const uuidPattern =
  '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}'

export const patientRegex = new RegExp(
  `${endpoints.listPatients.route}/(${uuidPattern})$`,
)

export const emergencyContactRegex = new RegExp(
  `${endpoints.listPatients.route}/(${uuidPattern})/emergency-contacts$`,
)

export const patientSessionNotesRegex = new RegExp(
  `${endpoints.listPatients.route}/(${uuidPattern})/session-notes$`,
)

export const patientUniqueSessionNoteRegex = new RegExp(
  `${endpoints.listPatients.route}/(${uuidPattern})/session-notes/(${uuidPattern})$`,
)

export const patientBloodPressureRegex = new RegExp(
  `${endpoints.listPatients.route}/(${uuidPattern})/health-metrics/blood-pressure$`,
)

export const patientStepsRegex = new RegExp(
  `${endpoints.listPatients.route}/(${uuidPattern})/health-metrics/steps$`,
)

export const patientGlucoseRegex = new RegExp(
  `${endpoints.listPatients.route}/(${uuidPattern})/health-metrics/glucose$`,
)

export const patientHeartRateRegex = new RegExp(
  `${endpoints.listPatients.route}/(${uuidPattern})/health-metrics/heart-rate$`,
)
