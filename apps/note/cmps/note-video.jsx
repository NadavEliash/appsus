

export function NoteVideo({ note }) {
    return (
        <section>
            <h3>{note.info.title} </h3>
            <div className="note-image">
                <iframe width="75%" height="200px"
                    src={note.info.url}>
                </iframe>
            </div>
        </section>
    )

}