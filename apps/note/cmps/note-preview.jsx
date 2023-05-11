const { useEffect, useState } = React

import { NoteEdit } from './note-edit.jsx'

export function NotePreview({ note }) {

    const [isEditable, setIsEditable] = useState(false)

    function onEditable(){
        setIsEditable(true)
    }

    


    return (
        <article className="note-preview">
            <h3>{note.info.title} </h3>
            <p>{note.info.txt}</p>
            <button onClick={onEditable}>Edit</button>
            {isEditable && <NoteEdit  note={note}  />}
            
        </article>
    )
}
