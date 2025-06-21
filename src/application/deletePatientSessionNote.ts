import { apiService } from 'services/api.adapter'
import { alertService } from 'services/alert.adapter'
import { useQueryClient } from '@tanstack/react-query'

import type { ApiService } from 'application/ports'

export function useDeletePatientSessionNote() {
  const alert = alertService()
  const api: ApiService = apiService()
  const queryClient = useQueryClient()

  async function deleteSessionNote(patientId: UUID, noteId: UUID) {
    try {
      const { isConfirmed } = await alert.questionAlert({
        title: 'Are you sure you want to delete this note?',
        cancelButtonText: 'Cancel',
        focusConfirm: false,
      })
      if (!isConfirmed) return

      await api.deletePatientSessionNote(patientId, noteId)
      await queryClient.invalidateQueries({
        queryKey: ['sessionNotes', patientId],
      })
      await alert.successAlert({
        title: 'Session note deleted successfully',
      })
    } catch (error) {
      await alert.errorAlert({
        title: (error as Error).message,
      })
    }
  }

  return { deleteSessionNote }
}
