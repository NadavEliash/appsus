

export function NoteImage({ note }) {
    return (
        <section>
            <h3>{note.info.title} </h3>
            <div className="note-image">
           <img src={note.info.url} alt="someImage" />
            </div>
        </section>
    )
}
