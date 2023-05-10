const { Link } = ReactRouterDOM

import { MailRow } from "./mail-row.jsx"
import { mailService } from "../services/mail.service.js"


export function MailList({ mails, onRemoveMail }) {
    console.log(mails)

    return (
        <ul className="mail-list">
            {mails.map(mail =>
                <li className="mail-row" key={mail.id}>
                    <MailRow mail={mail} />
                    <Link to={`/mail/${mail.id}`} >open</Link>
                    <button onClick={() => onRemoveMail(mail.id)} >X</button>
                </li>
            )}
        </ul>
    )
}
