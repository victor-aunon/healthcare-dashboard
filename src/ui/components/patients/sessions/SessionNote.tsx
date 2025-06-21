import type { SessionNote } from 'domain/medical'
import { icons } from 'ui/icons'
import './session-note.css'

export type SessionNoteCardProps = React.ComponentProps<'article'> & {
  note: SessionNote
  setSelectedNote?: React.Dispatch<React.SetStateAction<SessionNote | null>>
  onDelete?: () => void
}

export function SessionNoteCard({
  note,
  onDelete,
  setSelectedNote,
}: SessionNoteCardProps) {
  function formatDate(date: Date) {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
    }).format(date)
  }

  return (
    <article className="session-note">
      <header className="session-note__header">
        {formatDate(new Date(note.date))}
      </header>
      <div className="session-note__content">{note.note}</div>
      <footer className="session-note__footer">
        <button
          className="session-note__button session-note__button--edit"
          onClick={() => {
            if (setSelectedNote) setSelectedNote(note)
          }}
        >
          {icons.edit} Edit
        </button>
        {onDelete && (
          <button
            className="session-note__button session-note__button--delete"
            onClick={onDelete}
          >
            {icons.delete} Delete
          </button>
        )}
      </footer>
    </article>
  )
}
