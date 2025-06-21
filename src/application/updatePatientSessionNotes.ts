import { useQueryClient } from '@tanstack/react-query'
import { alertService } from 'services/alert.adapter'
import { apiService } from 'services/api.adapter'

import type { ApiService } from 'application/ports'

export function useUpdatePatientSessionNotes() {
  const alert = alertService()
  const api: ApiService = apiService()
  const queryClient = useQueryClient()

  async function updateSessionNote(
    patientId: UUID,
    noteId: UUID,
    payload: Parameters<ApiService['updatePatientSessionNote']>[2],
  ) {
    try {
      const { isConfirmed } = await alert.questionAlert({
        title: 'Are you sure you want to update this note?',
        cancelButtonText: 'Cancel',
        focusConfirm: true,
      })
      if (!isConfirmed) return

      await api.updatePatientSessionNote(patientId, noteId, payload)
      await queryClient.invalidateQueries({ queryKey: ['patients'] })
      await queryClient.invalidateQueries({
        queryKey: ['sessionNotes', patientId],
      })
      await alert.successAlert({
        title: 'Session note updated successfully',
      })
    } catch (error) {
      await alert.errorAlert({
        title: (error as Error).message,
      })
    }
  }

  return { updateSessionNote }
}
