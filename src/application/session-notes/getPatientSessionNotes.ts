import { apiService } from 'services/api.adapter'
import { useQuery } from '@tanstack/react-query'

import type { ApiService } from 'application/ports'

export function useGetPatientSessionNotes(patientId: UUID) {
  const api: ApiService = apiService()

  return useQuery({
    queryKey: ['sessionNotes', 'all', patientId],
    queryFn: () => api.getPatientSessionNotes(patientId),
  })
}
