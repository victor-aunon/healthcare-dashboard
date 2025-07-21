import { useMutation, useQueryClient } from '@tanstack/react-query'
import { alertService } from 'services/alert.adapter'
import { apiService } from 'services/api.adapter'

import type { ApiService } from 'application/ports'

export function useDeleteEmergencyContact() {
  const alert = alertService()
  const api: ApiService = apiService()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (patientId: UUID) => {
      const { isConfirmed } = await alert.questionAlert({
        title: 'Are you sure you want to delete this contact?',
        cancelButtonText: 'Cancel',
        focusConfirm: false,
      })
      if (!isConfirmed) return

      api.deletePatientEmergencyContact(patientId)
    },
    onSuccess: () => {
      alert.successAlert({
        title: 'Emergency contact deleted successfully',
      })
    },
    onError: error => {
      alert.errorAlert({
        title: (error as Error).message,
      })
    },
    onSettled: (_, __, patientId) => {
      queryClient.invalidateQueries({
        queryKey: ['patients', 'one', patientId],
      })
    },
  })
}
