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

    // function onOpenNewNote(){
    //     if (!isOpenNewNote) setIsOpenNewNote(true)
    //     // else setIsOpenNewNote(false)
    // }
    

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

    function onSetFilter(filterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }

    // window.onclick = () => setIsOpenNewNote(false)

    const { info: { title, txt } } = noteToEdit
    return (
        <section>
            <NoteFilter onSetFilter={onSetFilter} filterBy={filterBy} />

            <form className="note-add" onSubmit={onSaveNote}>
                <label htmlFor="title"></label>
                <input required onChange={handleChange} value={title} type="text" name="title" id="title" placeholder="Title:"/>

                
                <label htmlFor="txt"></label>
                <input required onChange={handleChange} value={txt} type="text" name="txt" id="txt" placeholder="Text here:"/>
                
                <button>Add Note</button>
                
            </form>

            <NoteList notes={notes} onRemoveNote={onRemoveNote} loadNotes ={loadNotes} />

        </section>
    )
}
