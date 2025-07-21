import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '@/app/routes/__root'
import routePaths from 'app/routes/routePaths'
import { PatientPage } from 'ui/pages/PatientPage'

export const patientRoute = createRoute({
  path: routePaths.patient,
  getParentRoute: () => rootRoute,
  component: PatientPage,
})
