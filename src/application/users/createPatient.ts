import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { ApiService } from 'application/ports'
import { alertService } from 'services/alert.adapter'
import { apiService } from 'services/api.adapter'

export function useCreatePatient() {
  const alert = alertService()
  const api: ApiService = apiService()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: Parameters<ApiService['createPatient']>[0]) =>
      api.createPatient(payload),
    onSuccess: () => {
      alert.successAlert({
        title: 'Patient created successfully',
      })
    },
    onError: error => {
      alert.errorAlert({
        title: (error as Error).message,
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['patients', 'all'] })
    },
  })
}
