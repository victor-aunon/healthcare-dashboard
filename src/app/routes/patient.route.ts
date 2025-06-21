import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '@/app/routes/__root'
import routePaths from 'app/routes/routePaths'
import { apiService } from 'services/api.adapter'
import { PatientPage } from 'ui/pages/PatientPage'

export const patientRoute = createRoute({
  path: routePaths.patient,
  getParentRoute: () => rootRoute,
  loader: async ({ context, params }) => {
    const queryClient = context.queryClient
    const { getPatient, getPatientSessionNotes } = apiService()
    await Promise.all([
      queryClient.ensureQueryData({
        queryKey: ['sessionNotes', params.patientId],
        queryFn: () => getPatientSessionNotes(params.patientId as UUID),
      }),
      queryClient.ensureQueryData({
        queryKey: ['patient', params.patientId],
        queryFn: () => getPatient(params.patientId as UUID),
      }),
    ])
  },
  component: PatientPage,
})
