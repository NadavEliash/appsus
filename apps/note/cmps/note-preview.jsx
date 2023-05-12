const { useEffect, useState } = React

import { noteService } from "../services/note.service.js"
import { NoteEdit } from './note-edit.jsx'

export function NotePreview({ note, onRemoveNote, loadNotes, onPin, onDuplicate }) {

    const [isEditable, setIsEditable] = useState(false)
    const [noteColor, setNoteColor] = useState(note.style.backgroundColor)
    const [selectedNote, setNoteToEdit] = useState(note)
    

    function onEditable() {
        if (!isEditable) setIsEditable(true)
        else setIsEditable(false)
    }

    const noteStyle = {
        backgroundColor: note.style.backgroundColor
    }

   
    function onChangeColor(value) {
        note.style.backgroundColor = value
        setNoteToEdit(prevNote => ({ ...prevNote, style: { ...prevNote.style, backgroundColor: value } }))
        noteService.save(note)
    }

    function handleChange({ target }) {
        const field = target.name
        const value = target.value
        setNoteToEdit(prevNote => (
            { ...prevNote, info: { ...prevNote.info, [field]: value } }))
    }

    function onSaveNote(ev) {
        onEditable()
        ev.preventDefault()
        note = selectedNote
        noteService.save(selectedNote)
        .then(() => {
            loadNotes()

        })
    }

    const { info: { title, txt } } = selectedNote
    if (isEditable) return (
        <section style={noteStyle} className="note-preview">
            <form onSubmit={onSaveNote}>
                <label htmlFor="title"></label>
                <input required onChange={handleChange} value={title} type="text" name="title" id="title" placeholder="Title:" />

                <label htmlFor="txt"></label>
                <textarea required onChange={handleChange} value={txt} type="text" name="txt" id="txt" placeholder="Text here:" />

                <button>Save Note</button>
            </form>
            <button className="close-button" onClick={onEditable}>x</button>
        </section>
        
    )
    else return(
    
        <article style={noteStyle} className="note-preview">
            {/* Dynamic Components */}
            <h3>{note.info.title} </h3>
            <p>{note.info.txt}</p>
            <div className="edit-buttons">
                <button style={noteStyle} onClick={() => onPin(note)}>{note.isPinned ? '📍' : '📌'}</button>
                <button style={noteStyle} onClick={() => onDuplicate(note)}>
                <img src="assets/img/duplicate.svg" alt="" />
                </button>
                <button style={noteStyle} onClick={onEditable}>✏️</button>
                <select onChange={(ev) => { onChangeColor(ev.target.value) }}>
                    <option value={note.style.backgroundColor}>🎨</option>
                    <option value="#B4FF9F">Green</option>
                    <option value="#F9FFA4">Yellow</option>
                    <option value="#FFD59E">Orange</option>
                    <option value="#FFA1A1">Red</option>
                </select>
                <button style={noteStyle} onClick={() => onRemoveNote(note.id)}>🗑</button>

            </div>
            {/* {isEditable && <NoteEdit note={note} onEditable={onEditable} loadNotes={loadNotes} />} */}

        </article>
    )
}
