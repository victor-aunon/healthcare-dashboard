import './card-user.css'
import './card-user-skeleton.css'

export function UserCardSkeleton() {
  return (
    <article className="user__card user__card__skeleton">
      <header className="user__card__header">
        <div className="user__card__header__avatar__skeleton" />
        <div className="user__card__header__info">
          <div className="user__card__header__info__item__skeleton" />
          <div className="user__card__header__info__item__skeleton" />
          <div className="user__card__header__info__item__skeleton" />
        </div>
      </header>

      <div className="user__card__body__skeleton" />
    </article>
  )
}
