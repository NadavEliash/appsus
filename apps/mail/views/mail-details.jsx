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

    function onRemoveMail() {

    }

    if (!mail) return <div>Loading...</div>
    return (
        <main>
            <section className="mail-details">
                <header className="mail-details-header">
                    <button onClick={onBack}>
                    <img src="../../../assets/img/back.svg" alt="" />
                    </button>
                    <button onClick={onRemoveMail}>
                    <img src="../../../assets/img/delete.svg" alt="" />
                    </button>
                </header>
                <h2>{mail.subject}</h2>
                <h3>{mail.from}</h3>
                <p>{mail.massage}</p>
                {/* <button className="reply-btn"><span className="reply-arrow">↪</span>Reply</button> */}
            </section>
        </main>
    )
}