import { useCreatePatientSessionNote } from 'application/createPatientSessionNote'
import type { SessionNote } from 'domain/medical'
import { useState } from 'react'
import { Dialog } from 'ui/components/dialog'
import { EditNoteModal } from 'ui/components/patients/modals/EditNote'
import { icons } from 'ui/icons'

export function SessionNoteCreationModal({ patientId }: { patientId: UUID }) {
  const { createSessionNote } = useCreatePatientSessionNote()

  const [isOpen, setIsOpen] = useState(false)

  const handleCreateSessionNote = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault()
    setIsOpen(false)

    const data = new FormData(e.currentTarget)
    const payload: Omit<SessionNote, 'id'> = {
      note: data.get('note') as string,
      date: data.get('date') as string,
      // TODO: Add therapist
      therapistId: crypto.randomUUID(),
      patientId,
    }

    await createSessionNote(patientId, payload)
  }

  return (
    <Dialog open={isOpen}>
      <button
        className="create-session-note__button"
        onClick={() => setIsOpen(true)}
      >
        {icons.addSessionNote} Create note
      </button>
      <EditNoteModal
        title="Create note"
        description="Create a new note"
        handleSubmit={handleCreateSessionNote}
        closeModal={() => setIsOpen(false)}
      />
    </Dialog>
  )
}
