import { apiService } from 'services/api.adapter'
import { useSuspenseQuery } from '@tanstack/react-query'

import type { ApiService } from 'application/ports'

export function useGetPatients() {
  const api: ApiService = apiService()

  return useSuspenseQuery({
    queryKey: ['patients'],
    queryFn: api.getPatients,
  })
}
