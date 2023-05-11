const { useState, useEffect } = React

export function MailFilter({ filterBy, onSetFilter, onSetSortBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        const value = target.value
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function cancelSearch() {
        handleChange({ target: { name: 'txt', value: '' } })
    }

    const { txt } = filterByToEdit
    return (
        <section className="mail-filter full main-layout">
            <form className="search-box" onSubmit={onSubmitFilter}>
                <label htmlFor="txt"></label>
                <img src="../../../assets/img/magnifying-glass.svg" alt="" />
                <input value={txt} onChange={handleChange} name="txt" id="txt" type="text" placeholder="search emails" />
                <button onClick={cancelSearch}><img src="../../../assets/img/X.svg" alt="" /></button>
            </form>
            <button onClick={() => onSetSortBy('date')}>by Date</button>
            <button onClick={() => onSetSortBy('subject')}>by Subject</button>
        </section>
    )
}