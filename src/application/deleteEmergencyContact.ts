import { useQueryClient } from '@tanstack/react-query'
import { alertService } from 'services/alert.adapter'
import { apiService } from 'services/api.adapter'

import type { ApiService } from 'application/ports'

export function useDeleteEmergencyContact() {
  const alert = alertService()
  const api: ApiService = apiService()
  const queryClient = useQueryClient()

  return async function deleteEmergencyContact(patientId: UUID) {
    try {
      const { isConfirmed } = await alert.questionAlert({
        title: 'Are you sure you want to delete this contact?',
        cancelButtonText: 'Cancel',
        focusConfirm: false,
      })
      if (!isConfirmed) return

      await api.deletePatientEmergencyContact(patientId)
      await queryClient.invalidateQueries({ queryKey: ['patients'] })
      await queryClient.refetchQueries({ queryKey: ['patient', patientId] })
      await alert.successAlert({
        title: 'Emergency contact deleted successfully',
      })
    } catch (error) {
      await alert.errorAlert({
        title: (error as Error).message,
      })
    }
  }
}
