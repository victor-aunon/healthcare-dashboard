import { type Patient, Roles } from 'domain/users'
import { UserCard, type UserCardProps } from './Card.user'
import { icons } from 'ui/icons'
import './card-patient.css'

type PatientCardProps = Omit<
  UserCardProps,
  'role' | 'user' | 'relationship'
> & {
  patient: Patient
}

export function PatientCard({
  patient,
  onEdit,
  onDelete,
  isModalOpen,
  setIsModalOpen,
}: PatientCardProps) {
  return (
    <UserCard
      user={patient}
      role={Roles.PATIENT}
      onEdit={onEdit}
      onDelete={onDelete}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
    >
      <div className="user__card__patient__info">
        <div className="user__card__patient__info__item">
          <p className="user__card__patient__info__item__label">Sex</p>
          <p className="user__card__patient__info__item__value">
            {icons[patient.sex]} {patient.sex}
          </p>
        </div>
        <div className="user__card__patient__info__item">
          <p className="user__card__patient__info__item__label">Weight</p>
          <p className="user__card__patient__info__item__value">
            {icons.weight} {patient.weight} kg
          </p>
        </div>
        <div className="user__card__patient__info__item">
          <p className="user__card__patient__info__item__label">Height</p>
          <p className="user__card__patient__info__item__value">
            {icons.height} {patient.height} cm
          </p>
        </div>
      </div>
    </UserCard>
  )
}
