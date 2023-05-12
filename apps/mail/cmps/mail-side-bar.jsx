const { useEffect, useState } = React

import { mailService } from "../services/mail.service.js"

export function MailSideBar({ setIsCompose, onSideBarFilter }) {
    const [unReadCount, setUnReadCount] = useState('...')
    const [isShown, setIsShown] = useState(false)


    useEffect(() => {
        mailService.query()
            .then(mailService.countUnRead)
            .then(setUnReadCount)
    }, [])

    
    function toggleBar() {
        isShown ? setIsShown(false) : setIsShown(true)
    }
    
    return (
        <section className="side-bar-container">
            <button onClick={toggleBar} className={`hamburger ${isShown}`}><img src="assets/img/hamburger.svg" alt="" /></button>
            <div className={`side-bar ${isShown}`}>
                <img onClick={toggleBar} src="assets/img/X.svg" alt="" />
                <ul onClick={toggleBar} className="side-ul">
                    <li onClick={setIsCompose}>Compose</li>
                    <li onClick={() => onSideBarFilter('mailTo')}>Inbox {`(${unReadCount})`}</li>
                    <li onClick={() => onSideBarFilter('isStarred')}>Starred</li>
                    <li onClick={() => onSideBarFilter('isImportant')}>Important</li>
                    <li onClick={() => onSideBarFilter('from')}>Sent</li>
                    <li onClick={() => onSideBarFilter('isDraft')}>Drafts</li>
                    <li onClick={() => onSideBarFilter('isArchived')}>Archive</li>
                    <li onClick={() => onSideBarFilter('isTrash')}>Trash</li>
                </ul>
            </div>
        </section>
    )
}