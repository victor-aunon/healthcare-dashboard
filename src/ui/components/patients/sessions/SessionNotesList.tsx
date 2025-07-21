import { useParams } from '@tanstack/react-router'
import routePaths from 'app/routes/routePaths'
import {
  useGetPatientSessionNotes,
  useDeletePatientSessionNote,
  useUpdatePatientSessionNote,
} from 'application/session-notes'
import type { SessionNote } from 'domain/medical'
import { useState } from 'react'
import { Dialog } from 'ui/components/dialog'
import { EditNoteModal } from 'ui/components/patients/modals/EditNote'
import { SessionNoteCreationModal } from 'ui/components/patients/modals/SessionNoteCreation'
import './session-notes-list.css'
import { SessionNoteCard } from './SessionNote'
import { SessionNoteSkeleton } from './SessionNote.skeleton'

export function SessionNotesList() {
  const { patientId } = useParams({ from: routePaths.patient })
  const { data: notes, isLoading } = useGetPatientSessionNotes(
    patientId as UUID,
  )
  const { mutate: deleteSessionNote } = useDeletePatientSessionNote()
  const { mutate: updateSessionNote } = useUpdatePatientSessionNote()

  const [selectedNote, setSelectedNote] = useState<SessionNote | null>(null)

  const handleUpdateSession = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const noteId = selectedNote?.id
    const patientId = selectedNote?.patientId
    setSelectedNote(null)

    const data = new FormData(e.currentTarget)
    const payload: Partial<SessionNote> = {
      note: data.get('note') as string,
      date: data.get('date') as string,
      updatedAt: new Date().toISOString(),
    }

    updateSessionNote({
      patientId: patientId as UUID,
      noteId: noteId as UUID,
      payload,
    })
  }

  if (isLoading) {
    return (
      <SessionNotesWrapper patientId={patientId as UUID}>
        <ul className="session-notes-list">
          {Array.from({ length: 2 }).map((_, i) => (
            <SessionNoteSkeleton key={`session-note-skeleton-${i}`} />
          ))}
        </ul>
      </SessionNotesWrapper>
    )
  }

  if (notes?.length === 0) {
    return (
      <SessionNotesWrapper patientId={patientId as UUID}>
        <p>There are no notes</p>
      </SessionNotesWrapper>
    )
  }

  return (
    <SessionNotesWrapper patientId={patientId as UUID}>
      <ul className="session-notes-list">
        {notes?.map(note => (
          <li key={note.id}>
            <SessionNoteCard
              key={note.id}
              note={note}
              onDelete={() =>
                deleteSessionNote({
                  patientId: note.patientId,
                  noteId: note.id,
                })
              }
              setSelectedNote={setSelectedNote}
            />
          </li>
        ))}
      </ul>
      <Dialog open={!!selectedNote}>
        {selectedNote && (
          <EditNoteModal
            key={selectedNote.id}
            title="Edit note"
            description="Edit the note"
            note={selectedNote}
            handleSubmit={handleUpdateSession}
            closeModal={() => {
              setSelectedNote(null)
            }}
          />
        )}
      </Dialog>
    </SessionNotesWrapper>
  )
}

type SessionNotesWrapperProps = {
  patientId: UUID
  children: React.ReactNode
}

function SessionNotesWrapper({
  patientId,
  children,
}: SessionNotesWrapperProps) {
  return (
    <section className="session-notes-list__container">
      <header className="session-notes-list__header">
        <h3 className="session-notes-list__header__title">Latest sessions</h3>
        <SessionNoteCreationModal patientId={patientId as UUID} />
      </header>
      {children}
    </section>
  )
}
