export function NotePreview({ note }) {
    return (
        <article className="note-preview">
            <h2>Title: {note.info.title} </h2>
            <h4>{note.info.txt}</h4>

        </article>
    )
}
