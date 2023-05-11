
export function MailSideBar({ setIsCompose, onSideBarFilter }) {


    return (
        <section className="side-bar">
            <ul className="side-ul">
                <li onClick={setIsCompose}>Compose</li>
                <li onClick={() => onSideBarFilter('mailTo')}>Inbox</li>
                <li onClick={() => onSideBarFilter('isStarred')}>Starred</li>
                <li onClick={() => onSideBarFilter('isImportant')}>Important</li>
                <li onClick={() => onSideBarFilter('from')}>Sent</li>
                <li onClick={() => onSideBarFilter('isDraft')}>Drafts</li>
                <li>Labels</li>
            </ul>
        </section>
    )
}