import { useMutation, useQueryClient } from '@tanstack/react-query'
import { alertService } from 'services/alert.adapter'
import { apiService } from 'services/api.adapter'

import type { ApiService } from 'application/ports'

export function useUpdatePatient() {
  const alert = alertService()
  const api: ApiService = apiService()
  const queryClient = useQueryClient()

  type UpdatePatientParams = {
    patientId: UUID
    payload: Parameters<ApiService['updatePatient']>[1]
  }

  return useMutation({
    mutationFn: async ({ patientId, payload }: UpdatePatientParams) => {
      const { isConfirmed } = await alert.questionAlert({
        title: 'Are you sure you want to update this patient?',
        cancelButtonText: 'Cancel',
        focusConfirm: true,
      })
      if (!isConfirmed) return

      api.updatePatient(patientId, payload)
    },
    onSuccess: () => {
      alert.successAlert({
        title: 'Patient updated successfully',
      })
    },
    onError: error => {
      alert.errorAlert({
        title: (error as Error).message,
      })
    },
    onSettled: (_, __, { patientId }) => {
      queryClient.invalidateQueries({ queryKey: ['patients'] })
      queryClient.invalidateQueries({
        queryKey: ['patients', 'one', patientId],
      })
    },
  })
}
