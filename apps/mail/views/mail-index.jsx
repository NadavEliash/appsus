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
    const [sortBy, setSortBy] = useState([])
    const [isCompose, setIsCompose] = useState(false)
    const [mails, setMails] = useState([])


    useEffect(() => {
        loadMails()
        setSearchParams(filterBy)
    }, [filterBy])


    function loadMails() {
        mailService.query(filterBy).then(setMails)
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                const updatedMails = mails.filter(mail => mail.id !== mailId)
                setMails(updatedMails)
            })
        setIsCompose(false)
    }

    function onSendMail(mail) {
        mailService.save(mail).then(() => {
            loadMails()
            setIsCompose(false)
        })
    }

    function onCloseCompose() {
        setIsCompose(false)
    }

    function onStarred(mail) {
        mail.isStarred = !mail.isStarred
        mailService.save(mail).then(() => {
            setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
        })

    }

    function onLabeled(mail) {
        mail.isImportant = !mail.isImportant
        mailService.save(mail).then(() => {
            setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
        })
    }

    function onSideBarFilter(attribute) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, attribute }))
    }

    function onSetSortBy(sort) {
        const sortedMails = mailService.sortMails(mails, sort)
        setSortBy(sort)
    }


    return (
        <main className="mail-main-layout">
            <MailSideBar setIsCompose={setIsCompose} onSideBarFilter={onSideBarFilter} />
            <section className="main-mail">
                <MailFilter filterBy={filterBy} onSetFilter={onSetFilter} onSetSortBy={onSetSortBy} />
                <MailList mails={mails} onRemoveMail={onRemoveMail} onStarred={onStarred} onLabeled={onLabeled} />
                {isCompose && <ComposeMail onRemoveMail={onRemoveMail} onSendMail={onSendMail} onCloseCompose={onCloseCompose} />}
            </section>
        </main>)
}