import { Roles, type Patient } from 'domain/users'
import {
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'ui/components/form'
import { EditDataUserModal, type EditDataUserModalProps } from './EditData.user'

type EditDataPatientModalProps = Omit<
  EditDataUserModalProps,
  'user' | 'role'
> & {
  patient?: Patient
}

export function EditDataPatientModal({
  title,
  handleSubmit,
  patient,
  description,
  closeModal,
  children,
}: EditDataPatientModalProps) {
  return (
    <EditDataUserModal
      title={title}
      user={patient}
      description={description}
      handleSubmit={handleSubmit}
      closeModal={closeModal}
      role={Roles.PATIENT}
    >
      <div className="edit-data__form__item">
        <Label htmlFor="sex">Sex</Label>
        <Select defaultValue={patient?.sex} name="sex" required>
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent className="z-[6000]">
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="edit-data__form__item">
        <Label htmlFor="weight">Weight (kg)</Label>
        <Input
          id="weight"
          name="weight"
          type="number"
          min="0"
          step="0.01"
          placeholder="Type the weight in kg"
          defaultValue={patient?.weight || 0}
        />
      </div>
      <div className="edit-data__form__item">
        <Label htmlFor="height">Height (cm)</Label>
        <Input
          id="height"
          name="height"
          type="number"
          min="0"
          placeholder="Type the height in cm"
          defaultValue={patient?.height || 0}
        />
      </div>
      <div className="edit-data__form__item">
        <Label htmlFor="diagnosis">Diagnosis</Label>
        <Input
          id="diagnosis"
          name="diagnosis"
          type="text"
          placeholder="Diagnosis separated by commas"
          required
          defaultValue={
            patient?.medicalData?.diagnoses
              ?.map(diagnosis => diagnosis.name)
              .join(', ') || ''
          }
        />
      </div>

      {children}
    </EditDataUserModal>
  )
}
