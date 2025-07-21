import { apiService } from 'services/api.adapter'
import { alertService } from 'services/alert.adapter'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import routePaths from 'app/routes/routePaths'

import type { ApiService } from 'application/ports'

export function useDeletePatient() {
  const alert = alertService()
  const api: ApiService = apiService()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (patientId: UUID) => {
      const { isConfirmed } = await alert.questionAlert({
        title: 'Are you sure you want to delete this patient?',
        cancelButtonText: 'Cancel',
        focusConfirm: false,
      })
      if (!isConfirmed) return

      await api.deletePatient(patientId)
      navigate({ to: routePaths.patients })
    },
    onSuccess: () => {
      alert.successAlert({
        title: 'Patient deleted successfully',
      })
    },
    onError: error => {
      alert.errorAlert({
        title: (error as Error).message,
      })
    },
    onSettled: (data, error, { patientId }) => {
      queryClient.invalidateQueries({ queryKey: ['patients', 'all'] })
      queryClient.invalidateQueries({
        queryKey: ['patients', 'one', patientId],
      })
    },
  })
}
