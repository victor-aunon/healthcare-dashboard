import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { RouterProvider } from '@tanstack/react-router'
import queryClient, { localStoragePersister } from 'app/queryClient'
import router from 'app/router'

function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: localStoragePersister }}
    >
      <ReactQueryDevtools initialIsOpen />
      <RouterProvider router={router} />
    </PersistQueryClientProvider>
  )
}

export default App
