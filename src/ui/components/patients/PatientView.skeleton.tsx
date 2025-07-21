import { UserCardSkeleton } from 'ui/components/patients/userCards'
import { PatientLayout } from 'ui/layouts/PatientLayout'

export function PatientViewSkeleton() {
  return (
    <PatientLayout navbarTitle={'Loading...'} navbarIconName="patient">
      <UserCardSkeleton />
      <UserCardSkeleton />
    </PatientLayout>
  )
}
