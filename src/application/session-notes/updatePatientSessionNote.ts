import { useMutation, useQueryClient } from '@tanstack/react-query'
import { alertService } from 'services/alert.adapter'
import { apiService } from 'services/api.adapter'

import type { ApiService } from 'application/ports'

export function useUpdatePatientSessionNote() {
  const alert = alertService()
  const api: ApiService = apiService()
  const queryClient = useQueryClient()

  type UpdatePatientSessionNoteParams = {
    patientId: UUID
    noteId: UUID
    payload: Parameters<ApiService['updatePatientSessionNote']>[2]
  }

  return useMutation({
    mutationFn: async ({
      patientId,
      noteId,
      payload,
    }: UpdatePatientSessionNoteParams): Promise<void> => {
      const { isConfirmed } = await alert.questionAlert({
        title: 'Are you sure you want to update this note?',
        cancelButtonText: 'Cancel',
        focusConfirm: true,
      })
      if (!isConfirmed) {
        throw new Error('Update cancelled')
      }

      await api.updatePatientSessionNote(patientId, noteId, payload)
    },
    onSuccess: () => {
      alert.successAlert({
        title: 'Session note updated successfully',
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
