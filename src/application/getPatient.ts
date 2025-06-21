import { apiService } from 'services/api.adapter'
import { useSuspenseQuery } from '@tanstack/react-query'

import type { ApiService } from 'application/ports'

export function useGetPatient(patientId: UUID) {
  const api: ApiService = apiService()

  return useSuspenseQuery({
    queryKey: ['patient', patientId],
    queryFn: () => api.getPatient(patientId),
  })
}
