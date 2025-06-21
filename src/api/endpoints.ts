type ApiEndPoint<
  M extends 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' = 'GET',
  R extends string | ((...args: any[]) => string) = string,
> = {
  method: M
  route: R
}

export const endpoints = {
  listPatients: {
    method: 'GET',
    route: 'api/v1/patients',
  } as ApiEndPoint,
  getPatient: {
    method: 'GET',
    route: (id: UUID) => `api/v1/patients/${id}`,
  } as ApiEndPoint<'GET', (id: UUID) => string>,
  createPatient: {
    method: 'POST',
    route: 'api/v1/patients',
  } as ApiEndPoint<'POST'>,
  updatePatient: {
    method: 'PATCH',
    route: (id: UUID) => `api/v1/patients/${id}`,
  } as ApiEndPoint<'PATCH', (id: UUID) => string>,
  updatePatientEmergencyContact: {
    method: 'PATCH',
    route: (id: UUID) => `api/v1/patients/${id}/emergency-contacts`,
  } as ApiEndPoint<'PATCH', (id: UUID) => string>,
  deletePatient: {
    method: 'DELETE',
    route: (id: UUID) => `api/v1/patients/${id}`,
  } as ApiEndPoint<'DELETE', (id: UUID) => string>,
  deletePatientEmergencyContact: {
    method: 'DELETE',
    route: (id: UUID) => `api/v1/patients/${id}/emergency-contacts`,
  } as ApiEndPoint<'DELETE', (id: UUID) => string>,
  getPatientSteps: {
    method: 'GET',
    route: (id: UUID) => `api/v1/patients/${id}/health-metrics/steps`,
  } as ApiEndPoint<'GET', (id: UUID) => string>,
  getPatientHeartRate: {
    method: 'GET',
    route: (id: UUID) => `api/v1/patients/${id}/healt-metrics/heart-rate`,
  } as ApiEndPoint<'GET', (id: UUID) => string>,
  getPatientGlucose: {
    method: 'GET',
    route: (id: UUID) => `api/v1/patients/${id}/health-metrics/glucose`,
  } as ApiEndPoint<'GET', (id: UUID) => string>,
  getPatientBloodPressure: {
    method: 'GET',
    route: (id: UUID) => `api/v1/patients/${id}/health-metrics/blood-pressure`,
  } as ApiEndPoint<'GET', (id: UUID) => string>,
  getPatientSessionNotes: {
    method: 'GET',
    route: (id: UUID) => `api/v1/patients/${id}/session-notes`,
  } as ApiEndPoint<'GET', (id: UUID) => string>,
  createPatientSessionNote: {
    method: 'POST',
    route: (id: UUID) => `api/v1/patients/${id}/session-notes`,
  } as ApiEndPoint<'POST', (id: UUID) => string>,
  updatePatientSessionNote: {
    method: 'PATCH',
    route: (id: UUID, noteId: UUID) =>
      `api/v1/patients/${id}/session-notes/${noteId}`,
  } as ApiEndPoint<'PATCH', (id: UUID, noteId: UUID) => string>,
  deletePatientSessionNote: {
    method: 'DELETE',
    route: (id: UUID, noteId: UUID) =>
      `api/v1/patients/${id}/session-notes/${noteId}`,
  } as ApiEndPoint<'DELETE', (id: UUID, noteId: UUID) => string>,
}
