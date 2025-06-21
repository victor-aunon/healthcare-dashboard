import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '@/app/routes/__root'
import routePaths from 'app/routes/routePaths'
import { apiService } from 'services/api.adapter'
import { PatientsPage } from 'ui/pages/PatientsPage'

export const patientsRoute = createRoute({
  path: routePaths.patients,
  getParentRoute: () => rootRoute,
  loader: async ({ context }) => {
    const queryClient = context.queryClient
    const { getPatients } = apiService()
    await queryClient.ensureQueryData({
      queryKey: ['patients'],
      queryFn: getPatients,
    })
  },
  component: PatientsPage,
})
