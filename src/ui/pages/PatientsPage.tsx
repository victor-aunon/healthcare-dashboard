import { HomeLayout } from 'ui/layouts/HomeLayout'
import { lazy, Suspense } from 'react'
import { TableSkeleton } from 'ui/components/table'
import { PatientCreationModal } from 'ui/components/patients/modals/PatientCreation'

const PatientsList = lazy(() => import('ui/components/patients/PatientsList'))

export function PatientsPage() {
  return (
    <HomeLayout navbarTitle="Patients" navbarIconName="patients">
      <PatientCreationModal />
      <Suspense fallback={<TableSkeleton rows={11} columns={5} />}>
        <PatientsList />
      </Suspense>
    </HomeLayout>
  )
}
