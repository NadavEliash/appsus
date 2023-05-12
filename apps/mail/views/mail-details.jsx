const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailSideBar } from "../cmps/mail-side-bar.jsx"

export function MailDetails() {
    const [mail, setMail] = useState(null)
    const { mailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [mailId])

    function loadMail() {
        mailService.get(mailId)
            .then(setMail)
            .catch(err => {
                console.log('problem in loading this mail:', err);
                navigate('/mail')
            })
    }

    function onBack() {
        navigate('/mail')
    }

    function goNextMail(mailId) {
        navigate(`/mail/${mailId}`)
    }

    function onRemoveMail() {
        mail.isTrash = true
        mailService.save(mail)
            .then(() => {
                onBrowsingMails(-1)
            })
    }

    function onBrowsingMails(val) {
        mailService.getNextMailId(mailId, val).then(goNextMail)
    }

    if (!mail) return <div>Loading...</div>
    return (
        <section className="mail-details-main">
            <button className="browsing-mails" onClick={() => onBrowsingMails(-1)}>
                <img src="assets/img/left-arrow.svg" alt="" />
            </button>
            <section className="mail-details">
                <header className="mail-details-header">
                    <button onClick={onBack}>
                        <img src="assets/img/back.svg" alt="" />
                    </button>
                    <button onClick={onRemoveMail}>
                        <img src="assets/img/delete.svg" alt="" />
                    </button>
                </header>
                <h2>{mail.subject}</h2>
                <h3>{mail.from}</h3>
                <p>{mail.massage}</p>
                {/* <button className="reply-btn"><span className="reply-arrow">↪</span>Reply</button> */}
            </section>
            <button className="browsing-mails" onClick={() => onBrowsingMails(+1)}>
                <img src="assets/img/right-arrow.svg" alt="" />
            </button>
        </section>
    )
}