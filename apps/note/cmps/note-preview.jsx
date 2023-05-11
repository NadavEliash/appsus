const { useEffect, useState } = React

import { NoteEdit } from './note-edit.jsx'

export function NotePreview({ note, onRemoveNote, loadNotes}) {

    const [isEditable, setIsEditable] = useState(false)

    function onEditable(){
        if (!isEditable) setIsEditable(true)
        else setIsEditable(false)
    }

    


    return (
        <article className="note-preview">
            <h3>{note.info.title} </h3>
            <p>{note.info.txt}</p>
            <div className="edit-buttons">
            <button onClick={onEditable}>✏️</button>
            <button onClick={() => onRemoveNote(note.id)}>🗑</button>
            </div>
            {isEditable && <NoteEdit  note={note} onEditable={onEditable} loadNotes={loadNotes} />}
            
        </article>
    )
}
