const { useEffect, useState } = React

import { NoteList } from "../cmps/note-list.jsx"
import { noteService } from "../services/note.service.js"




export function NoteIndex() {


    const [notes, setNotes] = useState([])
    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query().then(setNotes)
    }

    function onRemoveNote(noteID) {
        noteService.remove(noteID).then(() => {
            const updatedNotes = notes.filter(note => note.id !== noteID)
            setNotes(updatedNotes)
        })
    }

    function handleChange({ target }) {
        const field = target.name
        const value = target.value
        setNoteToEdit(prevNote => (
            { ...prevNote, info: { ...prevNote.info, [field]: value } }))
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        noteService.save(noteToEdit)
            .then(() => {
                loadNotes()

            })
    }

    const { info: { title, txt } } = noteToEdit
    return (
        <section>
            <form onSubmit={onSaveNote}>
                <label htmlFor="title">Title:</label>
                <input required onChange={handleChange} value={title} type="text" name="title" id="title" placeholder="Title:"/>

                <label htmlFor="txt">Text here:</label>
                <input required onChange={handleChange} value={txt} type="text" name="txt" id="txt" placeholder="Text here:"/>

                <button>Add Note</button>
            </form>

            <NoteList notes={notes} onRemoveNote={onRemoveNote} />

        </section>
    )
}