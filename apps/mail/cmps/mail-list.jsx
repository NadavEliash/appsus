const { Link } = ReactRouterDOM

import { MailPreview } from "./mail-preview.jsx"
import { mailService } from "../services/mail.service.js"


export function MailList({ mails, onRemoveMail }) {
    
    return (
        <ul className="mail-list">
            {mails.map(mail =>
                <li className="mail-row" key={mail.id}>
                    <Link className="mail-row" to={`/mail/${mail.id}`} >
                        <MailPreview mail={mail} />
                        <button onClick={() => onRemoveMail(mail.id)} >X</button>
                    </Link>
                </li>
            )}
        </ul>
    )
}
