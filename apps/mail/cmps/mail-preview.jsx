export function MailPreview({mail}) {
    return (
        <article className="mail-title">
            <h2 className="from">{mail.from}</h2>
            <div className="mail-content">
            <h3 className="subject">{mail.subject}</h3>
            <p className="msg">{mail.massage}</p>
            </div>
            <p className="date">{mail.date}</p>
        </article>
    )
}