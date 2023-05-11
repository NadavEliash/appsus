const { Link } = ReactRouterDOM

import { MailPreview } from "./mail-preview.jsx"
import { mailService } from "../services/mail.service.js"


export function MailList({ mails, onStarred, onLabeled, onRemoveMail }) {



    return (
        <ul className="mail-list">
            {mails.map(mail =>
                <li className="mail-row" key={mail.id}>
                    <button onClick={()=>onStarred(mail)} className="star-button">
                        <img className="empty-star" src="/../../assets/img/star.svg" alt="" />
                        <img className="yellow-star" src="/../../assets/img/star-yellow.svg" alt="" />
                    </button>
                    <button onClick={()=>onLabeled(mail)} className="label-button">
                        <img className="empty-label" src="/../../assets/img/label.svg" alt="" />
                        <img className="yellow-label" src="/../../assets/img/yellow-label.svg" alt="" />
                    </button>

                    <Link className="mail-row" to={`/mail/${mail.id}`} >
                        <MailPreview mail={mail} />
                    </Link>
                    <button className="delete-button" onClick={() => onRemoveMail(mail.id)} >
                        <img src="/../../assets/img/delete.svg" alt="" />
                    </button>
                </li>
            )}
        </ul>
    )
}
