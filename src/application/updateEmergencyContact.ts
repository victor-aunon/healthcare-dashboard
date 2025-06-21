import { useQueryClient } from '@tanstack/react-query'
import { alertService } from 'services/alert.adapter'
import { apiService } from 'services/api.adapter'

import type { ApiService } from 'application/ports'
import type { Patient } from 'domain/users'

export function useUpdateEmergencyContact() {
  const alert = alertService()
  const api: ApiService = apiService()
  const queryClient = useQueryClient()

  return async function updatePatient(
    patientId: UUID,
    payload: Partial<Patient['emergencyContact']>,
  ) {
    try {
      const { isConfirmed } = await alert.questionAlert({
        title: 'Are you sure you want to update this contact?',
        cancelButtonText: 'Cancel',
        focusConfirm: true,
      })
      if (!isConfirmed) return

      await api.updatePatientEmergencyContact(patientId, payload)
      await queryClient.invalidateQueries({ queryKey: ['patients'] })
      await queryClient.invalidateQueries({ queryKey: ['patient', patientId] })
      await alert.successAlert({
        title: 'Contact updated successfully',
      })
    } catch (error) {
      await alert.errorAlert({
        title: (error as Error).message,
      })
    }
  }
}
