import type { SessionNote } from 'domain/medical'
import { useState } from 'react'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'ui/components/dialog'
import { Label, Textarea, DatePicker } from 'ui/components/form'
import './edit-data-user.css'

type EditNoteModalProps = {
  title: string
  note?: SessionNote
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  closeModal: () => void
  description?: string
  children?: React.ReactNode
}

export function EditNoteModal({
  title,
  note,
  handleSubmit,
  closeModal,
  description,
}: EditNoteModalProps) {
  const [date, setDate] = useState(
    note?.date ? new Date(note.date) : new Date(),
  )

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
      </DialogHeader>
      <form onSubmit={handleSubmit} className="edit-data__form">
        <div className="edit-data__form__item">
          <Label htmlFor="date">Date</Label>
          <DatePicker date={date} setDate={setDate} id="date" />
        </div>
        <div className="edit-data__form__item">
          <Label htmlFor="note">Note</Label>
          <Textarea
            id="note"
            name="note"
            required
            placeholder="Type your note"
            defaultValue={note?.note || ''}
          />
        </div>
        <input type="hidden" name="date" value={date.toISOString()} />
        <DialogFooter className="edit-data__form__footer">
          <button
            type="reset"
            className="edit-data__form__button edit-data__form__button--reset"
            onClick={closeModal}
          >
            Close
          </button>
          <button
            type="submit"
            className="edit-data__form__button edit-data__form__button--submit"
          >
            Save
          </button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
