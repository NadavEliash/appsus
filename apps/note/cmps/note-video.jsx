

export function NoteVideo({ note }) {
    return (
        <section>
            <h3>{note.info.title} </h3>
            <div className="note-image">
                <iframe width="80%" height="200px"
                    src={note.info.url}>
                </iframe>
            </div>
        </section>
    )

}