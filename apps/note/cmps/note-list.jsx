
import { NotePreview } from "./note-preview.jsx"

export function NoteList({ notes, onRemoveNote, loadNotes, onPin, onDuplicate }) {




    return (
        <ul className="note-list">
            {notes.map(note =>
                <li key={note.id}>
                    <NotePreview note={note} onRemoveNote={onRemoveNote} loadNotes={loadNotes} onPin={onPin} onDuplicate={onDuplicate} />
                </li>
            )}
        </ul>
   )
}
