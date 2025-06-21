import { useParams } from '@tanstack/react-router'
import routePaths from 'app/routes/routePaths'
import { useDeleteEmergencyContact } from 'application/deleteEmergencyContact'
import { useDeletePatient } from 'application/deletePatient'
import { useGetPatient } from 'application/getPatient'
import { useGetPatientSessionNotes } from 'application/getPatientSessionNotes'
import type { ApiService } from 'application/ports'
import { useUpdateEmergencyContact } from 'application/updateEmergencyContact'
import { useUpdatePatient } from 'application/updatePatient'
import { Roles, type Patient } from 'domain/users'
import { useState } from 'react'
import { SessionNotesList } from 'ui/components/patients/sessions'
import { PatientCard, UserCard } from 'ui/components/patients/userCards'
import { PatientLayout } from 'ui/layouts/PatientLayout'

export function PatientPage() {
  const { patientId } = useParams({ from: routePaths.patient })
  const { data: patient, error } = useGetPatient(patientId as UUID)
  const { data: sessionNotes } = useGetPatientSessionNotes(patientId as UUID)

  const updatePatient = useUpdatePatient()
  const deletePatient = useDeletePatient()
  const updateEmergencyContact = useUpdateEmergencyContact()
  const deleteEmergencyContact = useDeleteEmergencyContact()

  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  const patientName = `${patient?.name} ${patient?.surname || ''}`

  const handleUpdateContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsContactModalOpen(false)

    const data = new FormData(e.currentTarget)
    const payload = {
      name: data.get('name') as string,
      surname: data.get('surname') as string,
      email: data.get('email') as string,
      phone: data.get('phone') as string,
      relationship: data.get('relationship') as string,
      age: Number(data.get('age') as string),
    }
    await updateEmergencyContact(patientId as UUID, payload)
  }

  const handleUpdatePatient = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPatientModalOpen(false)

    const data = new FormData(e.currentTarget)
    const payload: Parameters<ApiService['updatePatient']>[1] = {
      name: data.get('name') as string,
      surname: data.get('surname') as string,
      email: data.get('email') as string,
      phone: data.get('phone') as string,
      age: Number(data.get('age') as string),
      sex: data.get('sex') as Patient['sex'],
      height: Number(data.get('height') as string),
      weight: Number(data.get('weight') as string),
      medicalData: {
        diagnoses: (data.get('diagnosis') as string)
          .split(',')
          .map(diagnosis => ({ name: diagnosis.trim() })),
      },
    }

    await updatePatient(patientId as UUID, payload)
  }

  if (error) {
    return (
      <PatientLayout navbarTitle={patientName} navbarIconName="patient">
        <p>{error.message}</p>
      </PatientLayout>
    )
  }

  return (
    <PatientLayout navbarTitle={patientName} navbarIconName="patient">
      <PatientCard
        patient={patient}
        onEdit={handleUpdatePatient}
        onDelete={() => deletePatient(patientId as UUID)}
        isModalOpen={isPatientModalOpen}
        setIsModalOpen={setIsPatientModalOpen}
      />
      {patient.emergencyContact && (
        <UserCard
          user={patient.emergencyContact}
          role={Roles.EMERGENCY_CONTACT}
          relationship={patient.emergencyContact.relationship}
          onEdit={handleUpdateContact}
          onDelete={() => deleteEmergencyContact(patientId as UUID)}
          isModalOpen={isContactModalOpen}
          setIsModalOpen={setIsContactModalOpen}
        />
      )}
      <SessionNotesList notes={sessionNotes} />
    </PatientLayout>
  )
}
