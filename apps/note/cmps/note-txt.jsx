



export function NoteTxt({ note }) {
    return (
        <section>
            <h3>{note.info.title} </h3>
            <p>{note.info.txt}</p>
        </section>
    )
}

