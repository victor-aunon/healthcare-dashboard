import { apiService } from 'services/api.adapter'
import { alertService } from 'services/alert.adapter'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import routePaths from 'app/routes/routePaths'

import type { ApiService } from 'application/ports'

export function useDeletePatient() {
  const alert = alertService()
  const api: ApiService = apiService()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return async function deletePatient(patientId: UUID) {
    try {
      const { isConfirmed } = await alert.questionAlert({
        title: 'Are you sure you want to delete this patient?',
        cancelButtonText: 'Cancel',
        focusConfirm: false,
      })
      if (!isConfirmed) return

      await api.deletePatient(patientId)
      await queryClient.invalidateQueries({ queryKey: ['patients'] })
      await alert.successAlert({
        title: 'Patient deleted successfully',
      })
      navigate({ to: routePaths.patients })
    } catch (error) {
      await alert.errorAlert({
        title: (error as Error).message,
      })
    }
  }
}
