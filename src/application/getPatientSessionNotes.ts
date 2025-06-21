import { apiService } from 'services/api.adapter'
import { useSuspenseQuery } from '@tanstack/react-query'

import type { ApiService } from 'application/ports'

export function useGetPatientSessionNotes(patientId: UUID) {
  const api: ApiService = apiService()

  return useSuspenseQuery({
    queryKey: ['sessionNotes', patientId],
    queryFn: () => api.getPatientSessionNotes(patientId),
  })
}
