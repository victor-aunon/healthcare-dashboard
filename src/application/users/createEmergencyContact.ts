import { useMutation, useQueryClient } from '@tanstack/react-query'
import { alertService } from '@/services/alert.adapter'
import { apiService } from '@/services/api.adapter'

import type { ApiService } from 'application/ports'

export function useCreateEmergencyContact() {
  const alert = alertService()
  const api: ApiService = apiService()
  const queryClient = useQueryClient()

  type CreatePatientEmergencyContactParams = {
    patientId: UUID
    payload: Parameters<ApiService['createPatientEmergencyContact']>[1]
  }

  return useMutation({
    mutationFn: ({ patientId, payload }: CreatePatientEmergencyContactParams) =>
      api.createPatientEmergencyContact(patientId, payload),
    onSuccess: () => {
      alert.successAlert({
        title: 'Emergency contact created successfully',
      })
    },
    onError: error => {
      alert.errorAlert({
        title: (error as Error).message,
      })
    },
    onSettled: (_, __, { patientId }) => {
      queryClient.invalidateQueries({
        queryKey: ['patients', 'one', patientId],
      })
    },
  })
}
