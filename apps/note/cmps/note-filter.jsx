import { noteService } from "../services/note.service.js"

const { useState, useEffect } = React

export function NoteFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        const value = target.value
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, info: { ...prevFilterBy.info, [field]: value } }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
        console.log(filterByToEdit)
    }

    const { info: { title, txt } } = filterByToEdit
    return (
        <section className="note-filter">

            <form className="note-search-box" onSubmit={onSubmitFilter}>
                <img src="assets/img/magnifying-glass.svg" alt="" />
                <input value={txt} onChange={handleChange} type="text" name="txt" id="txt" placeholder="Search:" />
            </form>

        </section>
    )
}