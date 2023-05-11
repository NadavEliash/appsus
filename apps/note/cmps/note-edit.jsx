const { useEffect, useState } = React 
const { useParams, useNavigate } = ReactRouterDOM

import { noteService } from "../services/note.service.js"

export function NoteEdit( {note, onEditable, loadNotes}) {

    const [selectedNote, setNoteToEdit] = useState(note)
    // const navigate = useNavigate()
    // const params = useParams()

    // useEffect(() => {
    //     if (params.noteId) loadNote()
    // }, [])

    // function loadNote() {
    //     noteService.get(params.noteId)
    //         .then(setNoteToEdit)
    //         .catch(err => {
    //             console.log('Had issued in note edit:', err);
    //             navigate('/note')
    //             showErrorMsg('Note not found!')
    //         })
    //     console.log(params.noteId)
    // }




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
    return (
        <section className="edit-modal">
            {/* <h2>Edit Note:</h2> */}
            <form onSubmit={onSaveNote}>
                <label htmlFor="title"></label>
                <input required onChange={handleChange} value={title} type="text" name="title" id="title" placeholder="Title:" />

                <label htmlFor="txt"></label>
                <input required onChange={handleChange} value={txt} type="text" name="txt" id="txt" placeholder="Text here:" />

                <button>Save Note</button>
            </form>
            <button className="close-button" onClick={onEditable}>x</button>
        </section>
    )
}