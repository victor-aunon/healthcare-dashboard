import httpClient from '@/api'
import { endpoints } from 'api/endpoints'
import type { Patient } from 'domain/users'
import type { ApiService } from 'application/ports'

export function apiService(): ApiService {
  async function getPatients(): ReturnType<ApiService['getPatients']> {
    const { method, route } = endpoints.listPatients
    const { data } = await httpClient({ method })(route)
    return data
  }

  async function getPatient(
    patientId: UUID,
  ): ReturnType<ApiService['getPatient']> {
    const { method, route } = endpoints.getPatient
    const { data } = await httpClient({ method })(route(patientId))
    return data
  }

  async function createPatient(
    payload: Parameters<ApiService['createPatient']>[0],
  ): ReturnType<ApiService['createPatient']> {
    const { method, route } = endpoints.createPatient
    const { data } = await httpClient({ method })(route, payload)
    return data
  }

  async function getPatientSteps(
    patientId: UUID,
  ): ReturnType<ApiService['getPatientSteps']> {
    const { method, route } = endpoints.getPatientSteps
    const { data } = await httpClient({ method })(route(patientId))
    return data
  }

  async function getPatientHeartRate(
    patientId: UUID,
  ): ReturnType<ApiService['getPatientHeartRate']> {
    const { method, route } = endpoints.getPatientHeartRate
    const { data } = await httpClient({ method })(route(patientId))
    return data
  }

  async function getPatientBloodPressure(
    patientId: UUID,
  ): ReturnType<ApiService['getPatientBloodPressure']> {
    const { method, route } = endpoints.getPatientBloodPressure
    const { data } = await httpClient({ method })(route(patientId))
    return data
  }

  async function getPatientGlucose(
    patientId: UUID,
  ): ReturnType<ApiService['getPatientGlucose']> {
    const { method, route } = endpoints.getPatientGlucose
    const { data } = await httpClient({ method })(route(patientId))
    return data
  }

  async function updatePatient(
    patientId: UUID,
    payload: Parameters<ApiService['updatePatient']>[1],
  ): ReturnType<ApiService['updatePatient']> {
    try {
      const { method, route } = endpoints.updatePatient
      const { data } = await httpClient({ method })(route(patientId), payload)
      return data
    } catch (error) {
      throw new Error('Failed to update patient')
    }
  }

  async function deletePatient(
    patientId: UUID,
  ): ReturnType<ApiService['deletePatient']> {
    try {
      const { method, route } = endpoints.deletePatient
      await httpClient({ method })(route(patientId))
    } catch (error) {
      throw new Error('Failed to delete patient')
    }
  }

  async function updatePatientEmergencyContact(
    patientId: UUID,
    payload: Partial<Patient['emergencyContact']>,
  ): ReturnType<ApiService['updatePatientEmergencyContact']> {
    try {
      const { method, route } = endpoints.updatePatientEmergencyContact
      const { data } = await httpClient({ method })(route(patientId), payload)
      return data
    } catch (error) {
      throw new Error('Failed to update emergency contact')
    }
  }

  async function deletePatientEmergencyContact(
    patientId: UUID,
  ): ReturnType<ApiService['deletePatientEmergencyContact']> {
    try {
      const { method, route } = endpoints.deletePatientEmergencyContact
      await httpClient({ method })(route(patientId))
    } catch (error) {
      throw new Error('Failed to delete emergency contact')
    }
  }

  async function getPatientSessionNotes(
    patientId: UUID,
  ): ReturnType<ApiService['getPatientSessionNotes']> {
    try {
      const { method, route } = endpoints.getPatientSessionNotes
      const { data } = await httpClient({ method })(route(patientId))
      return data
    } catch (error) {
      throw new Error('Failed to get patient session notes')
    }
  }

  async function createPatientSessionNote(
    patientId: UUID,
    payload: Parameters<ApiService['createPatientSessionNote']>[1],
  ): ReturnType<ApiService['createPatientSessionNote']> {
    try {
      const { method, route } = endpoints.createPatientSessionNote
      const { data } = await httpClient({ method })(route(patientId), payload)
      return data
    } catch (error) {
      throw new Error('Failed to create patient session note')
    }
  }

  async function updatePatientSessionNote(
    patientId: UUID,
    noteId: UUID,
    payload: Parameters<ApiService['updatePatientSessionNote']>[2],
  ): ReturnType<ApiService['updatePatientSessionNote']> {
    try {
      const { method, route } = endpoints.updatePatientSessionNote
      const { data } = await httpClient({ method })(
        route(patientId, noteId),
        payload,
      )
      return data
    } catch (error) {
      throw new Error('Failed to update patient session note')
    }
  }

  async function deletePatientSessionNote(
    patientId: UUID,
    noteId: UUID,
  ): ReturnType<ApiService['deletePatientSessionNote']> {
    try {
      const { method, route } = endpoints.deletePatientSessionNote
      await httpClient({ method })(route(patientId, noteId))
    } catch (error) {
      throw new Error('Failed to delete patient session note')
    }
  }

  return {
    getPatients,
    getPatient,
    createPatient,
    updatePatient,
    deletePatient,
    updatePatientEmergencyContact,
    deletePatientEmergencyContact,
    getPatientSteps,
    getPatientHeartRate,
    getPatientBloodPressure,
    getPatientGlucose,
    getPatientSessionNotes,
    createPatientSessionNote,
    updatePatientSessionNote,
    deletePatientSessionNote,
  }
}
