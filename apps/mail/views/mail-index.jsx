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

    function onMarkAsRead(mail) {
        mail.isRead = !mail.isRead
        mailService.save(mail)
            .then(() => {
                loadMails()
            })
    }

    function onRemoveMail(deletedMail) {
        if (deletedMail.isTrash) {
            mailService.remove(deletedMail.id)
                .then(() => {
                    const updatedMails = mails.filter(mail => mail.id !== deletedMail.id)
                    setMails(updatedMails)
                })
        } else {
            deletedMail.isTrash = true
            mailService.save(deletedMail)
                .then(() => {
                    const updatedMails = mails.filter(mail => mail.id !== deletedMail.id)
                    setMails(updatedMails)
                })
        }
        setIsCompose(false)
    }

    function onArchiveMail(archivedMail) {
        archivedMail.isArchived = true
        mailService.save(archivedMail)
            .then(() => {
                const updatedMails = mails.filter(mail => mail.id !== archivedMail.id)
                setMails(updatedMails)
            })
    }

    function onSendMail(mail) {
        mail.isRead = true
        mail.isDraft = false
        mailService.save(mail).then(() => {
            loadMails()
            setIsCompose(false)
        })
    }

    function onSaveDraft(mail) {
        mail.isDraft = true
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
        mailService.sortMails(mails, sort)
        setSortBy(sort)
    }


    return (
        <main className="mail-main-layout">
            <MailSideBar setIsCompose={setIsCompose} onSideBarFilter={onSideBarFilter} />
            <section className="main-mail">
                <MailFilter filterBy={filterBy} onSetFilter={onSetFilter} onSetSortBy={onSetSortBy} />
                <MailList mails={mails} onRemoveMail={onRemoveMail} onStarred={onStarred} onLabeled={onLabeled} onArchiveMail={onArchiveMail} onMarkAsRead={onMarkAsRead} />
                {isCompose && <ComposeMail onSaveDraft={onSaveDraft} onSendMail={onSendMail} onCloseCompose={onCloseCompose} />}
            </section>
        </main>)
}