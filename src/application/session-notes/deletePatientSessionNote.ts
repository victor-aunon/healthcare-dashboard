import { apiService } from 'services/api.adapter'
import { alertService } from 'services/alert.adapter'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { ApiService } from 'application/ports'

export function useDeletePatientSessionNote() {
  const alert = alertService()
  const api: ApiService = apiService()
  const queryClient = useQueryClient()

  type DeletePatientSessionNoteParams = {
    patientId: UUID
    noteId: UUID
  }

  return useMutation({
    mutationFn: async ({
      patientId,
      noteId,
    }: DeletePatientSessionNoteParams): Promise<void> => {
      const { isConfirmed } = await alert.questionAlert({
        title: 'Are you sure you want to delete this note?',
        cancelButtonText: 'Cancel',
        focusConfirm: false,
      })
      if (!isConfirmed) return

      api.deletePatientSessionNote(patientId, noteId)
    },

    onSuccess: () => {
      alert.successAlert({
        title: 'Session note deleted successfully',
      })
    },
    onError: error => {
      alert.errorAlert({
        title: (error as Error).message,
      })
    },
    onSettled: (_, __, { patientId }) => {
      queryClient.invalidateQueries({
        queryKey: ['sessionNotes', 'all', patientId],
      })
    },
  })
}
