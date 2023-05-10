const { useEffect, useState } = React
const { Link, useSearchParams } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { MailSideBar } from "../cmps/mail-side-bar.jsx"
import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailList } from "../cmps/mail-list.jsx"
import { ComposeMail } from "../cmps/compose-mail.jsx"
import { utilService } from "../../../services/util.service.js"



export function MailIndex() {

    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter(searchParams))
    const [isCompose, setIsCompose] = useState(false)
    const [mails, setMails] = useState([])

    useEffect(() => {
        loadMails()
        setSearchParams(filterBy)
    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy).then(setMails)
    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                const updatedMails = mails.filter(mail => mail.id !== mailId)
                setMails(updatedMails)
            })
        setIsCompose(false)
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }

    function onSendMail(mailId) {
        // onRemoveMail={onRemoveMail} onSendMail={onSendMail} mailId={utilService.makeId()}
    }



    return (
        <main className="mail-main-layout">
            <MailSideBar setIsCompose={setIsCompose} />
            <section className="main-mail">
                <MailFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                <MailList mails={mails} onRemoveMail={onRemoveMail} />
                {isCompose && <ComposeMail />}
            </section>
        </main>)
}