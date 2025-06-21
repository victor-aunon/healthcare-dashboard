import './patient_layout.css'
import { HomeLayout, type HomeLayoutProps } from 'ui/layouts/HomeLayout'

export function PatientLayout({
  children,
  navbarTitle,
  navbarIconName,
}: HomeLayoutProps) {
  return (
    <HomeLayout navbarTitle={navbarTitle} navbarIconName={navbarIconName}>
      <section className="layout__container">{children}</section>
    </HomeLayout>
  )
}
