import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      console.error(error, query)
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, mutation) => {
      console.error(error, mutation)
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
    },
  },
})

export const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
})

export default queryClient
