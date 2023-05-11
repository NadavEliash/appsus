
import { NotePreview } from "./note-preview.jsx"

export function NoteList({ notes, onRemoveNote, loadNotes }) {




    return (
        <ul className="note-list">
            {notes.map(note =>
                <li key={note.id}>
                    <NotePreview note={note} onRemoveNote={onRemoveNote} loadNotes={loadNotes} />
                </li>
            )}
        </ul>
   )
}
