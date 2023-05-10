export function MailRow({mail}) {
    return (
        <article className="mail-title-msg">
            <h2>{mail.title}</h2>
            <p>{mail.msg}</p>
        </article>
    )
}