import { Suspense } from 'react'
import { PatientView } from 'ui/components/patients/PatientView'
import { PatientViewSkeleton } from 'ui/components/patients/PatientView.skeleton'

export function PatientPage() {
  return (
    <Suspense fallback={<PatientViewSkeleton />}>
      <PatientView />
    </Suspense>
  )
}
