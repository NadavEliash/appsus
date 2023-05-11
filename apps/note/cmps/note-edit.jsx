const { useEffect, useState } = React 
const { useParams, useNavigate } = ReactRouterDOM

import { noteService } from "../services/note.service.js"

export function NoteEdit( {note}) {

    // const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
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




    // function handleChange({ target }) {
    //     const field = target.name
    //     const value = target.value
    //     setNoteToEdit(prevNote => (
    //         { ...prevNote, info: { ...prevNote.info, [field]: value } }))
    // }

    // function onSaveNote(ev) {
    //     ev.preventDefault()
    //     noteService.save(noteToEdit)
    //         .then(() => {
    //             navigate('/note')
    //         })
    // }



    // const { info: { title, txt } } = noteToEdit
    return (
        <section className="edit-modal">
            <h2>Edit Note:</h2>
            <h4>{note.info.title}</h4>
            <h6>{note.info.txt}</h6>
            {/* <form onSubmit={onSaveNote}>
                <label htmlFor="title">Title:</label>
                <input required onChange={handleChange} value={title} type="text" name="title" id="title" placeholder="Title:" />

                <label htmlFor="txt">Text here:</label>
                <input required onChange={handleChange} value={txt} type="text" name="txt" id="txt" placeholder="Text here:" />

                <button>Save Note</button>
            </form> */}
        </section>
    )
}