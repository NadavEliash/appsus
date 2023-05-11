const { useEffect, useState } = React

import { mailService } from "../services/mail.service.js"

export function MailSideBar({ setIsCompose, onSideBarFilter }) {
    const [unReadCount, setUnReadCount] = useState()

    useEffect(()=> {
        mailService.query()
        .then(mailService.countUnRead)
        .then(setUnReadCount)
    }, [])

    return (
        <section className="side-bar">
            <ul className="side-ul">
                <li onClick={setIsCompose}>Compose</li>
                <li onClick={() => onSideBarFilter('mailTo')}>Inbox {`(${unReadCount})`}</li>
                <li onClick={() => onSideBarFilter('isStarred')}>Starred</li>
                <li onClick={() => onSideBarFilter('isImportant')}>Important</li>
                <li onClick={() => onSideBarFilter('from')}>Sent</li>
                <li onClick={() => onSideBarFilter('isDraft')}>Drafts</li>
                <li>Labels</li>
            </ul>
        </section>
    )
}