import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { ApiService } from 'application/ports'
import { alertService } from 'services/alert.adapter'
import { apiService } from 'services/api.adapter'

export function useCreatePatientSessionNote() {
  const alert = alertService()
  const api: ApiService = apiService()
  const queryClient = useQueryClient()

  type CreatePatientSessionNoteParams = {
    patientId: UUID
    payload: Parameters<ApiService['createPatientSessionNote']>[1]
  }

  return useMutation({
    mutationFn: ({ patientId, payload }: CreatePatientSessionNoteParams) =>
      api.createPatientSessionNote(patientId, payload),
    onSuccess: () => {
      alert.successAlert({
        title: 'Session note created successfully',
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
