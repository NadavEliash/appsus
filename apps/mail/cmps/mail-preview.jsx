export function MailPreview({mail}) {
    return (
        <article className="mail-title">
            <h2 className="from">{mail.from}</h2>
            <h3 className="subject">{mail.subject}</h3>
            <p className="msg">{mail.msg}</p>
            <p className="date">{mail.date}</p>
        </article>
    )
}