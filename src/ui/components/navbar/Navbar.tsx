import './navbar.css'
import { icons } from 'ui/icons'
import { Avatar, AvatarFallback, AvatarImage } from 'ui/components/avatar'

type NavbarProps = {
  title: string
  iconName: keyof typeof icons
}

export function Navbar({ title, iconName }: NavbarProps) {
  return (
    <header className="navbar">
      <h3 className="navbar__title">
        <span className="navbar__title__icon">{icons[iconName]}</span>
        {title}{' '}
      </h3>
      <div className="navbar__user">
        <h4 className="navbar__user__name">Dr. Auñón</h4>
        <Avatar className="avatar--secondary navbar__user__avatar">
          <AvatarImage src="/images/avatars/victor.jpg" />
          <AvatarFallback>VA</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
