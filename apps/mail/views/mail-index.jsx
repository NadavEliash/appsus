const { useEffect, useState } = React
const { Link, useSearchParams } = ReactRouterDOM

import { MailSideBar } from "../cmps/mail-side-bar.jsx"
import { MailList } from "../cmps/mail-list.jsx"
import { mailService } from "../services/mail.service.js"
import { MailFilter } from "../cmps/mail-filter.jsx"



export function MailIndex() {

    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter(searchParams))
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
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }



    return (
        <main className="main-mail">
            <MailSideBar />
            <section className="filter-list-mail">
                <MailFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                <MailList mails={mails} onRemoveMail={onRemoveMail} />
            </section>
        </main>)
}

