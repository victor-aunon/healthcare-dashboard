import { createRouter } from '@tanstack/react-router'
import queryClient from 'app/queryClient'
import { rootRoute } from '@/app/routes/__root'
import { patientsRoute } from 'app/routes/patients.route'
import { patientRoute } from 'app/routes/patient.route'

export type RouterContext = {
  queryClient: typeof queryClient
}

const routeTree = rootRoute.addChildren([patientsRoute, patientRoute])

const router = createRouter({
  routeTree,
  context: { queryClient },
})

export default router
