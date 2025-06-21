import { useQueryClient } from '@tanstack/react-query'
import type { ApiService } from 'application/ports'
import { alertService } from 'services/alert.adapter'
import { apiService } from 'services/api.adapter'

export function useCreatePatientSessionNote() {
  const alert = alertService()
  const api: ApiService = apiService()
  const queryClient = useQueryClient()

  async function createSessionNote(
    patientId: UUID,
    payload: Parameters<ApiService['createPatientSessionNote']>[1],
  ) {
    try {
      await api.createPatientSessionNote(patientId, payload)
      await queryClient.invalidateQueries({ queryKey: ['patients'] })
      await queryClient.invalidateQueries({
        queryKey: ['sessionNotes', patientId],
      })
      await alert.successAlert({
        title: 'Session note created successfully',
      })
    } catch (error) {
      await alert.errorAlert({
        title: (error as Error).message,
      })
    }
  }

  return {
    createSessionNote,
  }
}
