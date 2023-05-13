const { useEffect, useState } = React

import { NoteList } from "../cmps/note-list.jsx"
import { NoteFilter } from "../cmps/note-filter.jsx"
import { noteService } from "../services/note.service.js"




export function NoteIndex() {


    const [notes, setNotes] = useState([])
    // const [isOpenNewNote, setIsOpenNewNote] = useState(false)
    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())

    useEffect(() => {
        loadNotes()

    }, [filterBy])

    function loadNotes() {
        noteService.query(filterBy).then(setNotes)
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

    function onPin(note) {
        note.isPinned = !note.isPinned
        noteService.save(note).then(() => {
            setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
        })
    }

    function onDuplicate(note) {
        note.id = ''
        noteService.save(note).then(() => {
            setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
        })
    }

    function onChangeToNoteImg(ev) {
        ev.preventDefault()
        setNoteToEdit(prevNote => (
            { ...prevNote, type: 'NoteImg' }))
    }

    function onChangeToNoteTxt(ev) {
        ev.preventDefault()
        setNoteToEdit(prevNote => (
            { ...prevNote, type: 'NoteTxt' }))
    }

    function onChangeToNoteVideo(ev) {
        ev.preventDefault()
        setNoteToEdit(prevNote => (
            { ...prevNote, type: 'NoteVideo' }))
    }




    function onSetFilter(filterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }


    const { type, info: { title, txt, url } } = noteToEdit
    return (
        <section>
            <NoteFilter onSetFilter={onSetFilter} filterBy={filterBy} />

            <form className="note-add" onSubmit={onSaveNote}>
                <label htmlFor="title"></label>
                <input required onChange={handleChange} value={title} type="text" name="title" id="title" placeholder="Title:" />


                {type === 'NoteTxt' && <div>
                    <label htmlFor="txt"></label>
                    <input required onChange={handleChange} value={txt} type="text" size="50" name="txt" id="txt" placeholder="Text here:" />
                </div>
                }
                {type === 'NoteImg' && <div>
                    <label htmlFor="txt"></label>
                    <input required onChange={handleChange} value={url} type="url" size="50" name="url" id="url" placeholder="Image Url here:" />
                </div>

                }
                {type === 'NoteVideo' && <div>
                    <label htmlFor="txt"></label>
                    <input required onChange={handleChange} value={url} type="url" size="50" name="url" id="url" placeholder="Video Url here:" />
                </div>

                }

                <div className="note-type-buttons">
                    <button onClick={onChangeToNoteTxt}>🅰️</button>
                    <button onClick={onChangeToNoteImg}>🖼️</button>
                    <button onClick={onChangeToNoteVideo}>▶️</button>
                </div>

                <button>Add Note</button>

            </form>

            <NoteList notes={notes} onRemoveNote={onRemoveNote} loadNotes={loadNotes} onPin={onPin} onDuplicate={onDuplicate} />

        </section>
    )
}
