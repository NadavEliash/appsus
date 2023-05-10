


export function MailSideBar({setIsCompose}) {
    
    
    return (
        <section className="side-bar">
            <ul className="side-ul">
                <li onClick={setIsCompose}>Compose</li>
                <li>Inbox</li>
                <li>Starred</li>
                <li>Important</li>
                <li>Sent</li>
                <li>Drafts</li>
                <li>Labels</li>
            </ul>
        </section>
    )
}