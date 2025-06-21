import { endpoints } from 'api/endpoints'

const uuidPattern =
  '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}'

export const emergencyContactRegex = new RegExp(
  `${endpoints.listPatients.route}/(${uuidPattern})/emergency-contacts`,
)

export const patientRegex = new RegExp(
  `${endpoints.listPatients.route}/(${uuidPattern})`,
)
