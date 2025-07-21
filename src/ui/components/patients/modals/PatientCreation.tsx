import { Dialog } from 'ui/components/dialog'
import { useState } from 'react'
import { EditDataPatientModal } from 'ui/components/patients/modals/EditData.patient'
import { useCreatePatient } from 'application/users'
import { icons } from 'ui/icons'
import { ApiService } from 'application/ports'
import type { Patient } from 'domain/users'

export function PatientCreationModal() {
  const { isPending, mutate } = useCreatePatient()

  const [isOpen, setIsOpen] = useState(false)

  const onOpenChange = (open: boolean) => {
    setIsOpen(open)
  }

  const handleCreatePatient = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsOpen(false)

    const data = new FormData(e.currentTarget)
    const payload: Parameters<ApiService['createPatient']>[0] = {
      name: data.get('name') as string,
      surname: data.get('surname') as string,
      email: data.get('email') as string,
      phone: data.get('phone') as string,
      age: Number(data.get('age') as string),
      sex: data.get('sex') as Patient['sex'],
      height: Number(data.get('height') as string),
      weight: Number(data.get('weight') as string),
      photo: null,
      medicalData: {
        diagnoses: (data.get('diagnosis') as string)
          .split(',')
          .map(diagnosis => ({ name: diagnosis.trim() })),
      },
    }

    // await createPatient(payload)
    mutate(payload)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <button
        className="create-patient__button"
        onClick={() => setIsOpen(true)}
        disabled={isPending}
      >
        {icons.addPatient} Create patient
      </button>
      <EditDataPatientModal
        title="Create patient"
        description="Create a new patient"
        handleSubmit={handleCreatePatient}
        isPending={isPending}
        closeModal={() => setIsOpen(false)}
      />
    </Dialog>
  )
}
