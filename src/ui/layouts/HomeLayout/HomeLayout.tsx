import { useState } from 'react'
import { Sidebar } from 'ui/components/sidebar'
import { Navbar } from 'ui/components/navbar'
import './home_layout.css'
import { icons } from 'ui/icons'

export type HomeLayoutProps = {
  children: React.ReactNode
  navbarTitle: string
  navbarIconName: keyof typeof icons
}

export function HomeLayout({
  navbarIconName,
  navbarTitle,
  children,
}: HomeLayoutProps) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className={`main ${isOpen ? 'main--open' : ''}`}>
        <Navbar title={navbarTitle} iconName={navbarIconName} />
        {children}
      </main>
    </>
  )
}
