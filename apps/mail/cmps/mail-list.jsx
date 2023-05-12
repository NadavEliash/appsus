const { Link } = ReactRouterDOM

import { MailPreview } from "./mail-preview.jsx"
import { mailService } from "../services/mail.service.js"


export function MailList({ mails, onStarred, onLabeled, onMarkAsRead, onRemoveMail, onArchiveMail }) {

    function onRead(mailId) {
        mailService.get(mailId).then(mail => {
            mail.isRead = true
            return mail
        }).then(mailService.save)
    }


    return (
        <ul className="mail-list">
            {mails.map(mail =>
                <li className={`mail-row ${mail.isRead}`} key={mail.id}>
                    <div className="mail-mark-buttons">
                        <button onClick={() => onStarred(mail)} className="star-button">
                            <img className={`empty-star ${mail.isStarred}`} src="assets/img/star.svg" alt="" />
                            <img className={`yellow-star ${mail.isStarred}`} src="assets/img/star-yellow.svg" alt="" />
                        </button>
                        <button onClick={() => onLabeled(mail)} className="label-button">
                            <img className={`empty-label ${mail.isImportant}`} src="assets/img/label.svg" alt="" />
                            <img className={`yellow-label ${mail.isImportant}`} src="assets/img/yellow-label.svg" alt="" />
                        </button>
                    </div>
                    <Link onClick={() => { onRead(mail.id) }} className={`mail-row ${mail.isRead}`} to={`/mail/${mail.id}`} >
                        <MailPreview mail={mail} />
                    </Link>
                    <button className="markAsRead-button" onClick={() => onMarkAsRead(mail)} >
                        <img className={`read ${mail.isRead}`} src="assets/img/read.svg" alt="" />
                        <img className={`unread ${mail.isRead}`} src="assets/img/unread.svg" alt="" />
                    </button>
                    <button className="delete-button" onClick={() => onRemoveMail(mail)} >
                        <img src="assets/img/delete.svg" alt="" />
                    </button>
                    <button className="archive-button" onClick={() => onArchiveMail(mail)} >
                        <img src="assets/img/archive.svg" alt="" />
                    </button>
                </li>
            )}
        </ul>
    )
}
