import { useQueryClient } from '@tanstack/react-query'
import type { ApiService } from 'application/ports'
import { alertService } from 'services/alert.adapter'
import { apiService } from 'services/api.adapter'

export function useCreatePatient() {
  const alert = alertService()
  const api: ApiService = apiService()
  const queryClient = useQueryClient()

  async function createPatient(
    payload: Parameters<ApiService['createPatient']>[0],
  ) {
    try {
      await api.createPatient(payload)
      await queryClient.invalidateQueries({ queryKey: ['patients'] })
      await alert.successAlert({
        title: 'Patient created successfully',
      })
    } catch (error) {
      await alert.errorAlert({
        title: (error as Error).message,
      })
    }
  }

  return {
    createPatient,
  }
}
