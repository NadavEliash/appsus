import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    getNextMailId
}

_createMails()

function query(filterBy = {}) {

    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail.from) || regExp.test(mail.subject) || regExp.test(mail.massage))
            }
            return mails
        })
}


function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getNextMailId(mailId) {
    return storageService.query(MAIL_KEY)
        .then((mails) => {
            let mailIdx = mails.findIndex(mail => mail.id === mailId)
            if (mailIdx === mails.length - 1) mailIdx = -1
            return mails[mailIdx + 1].id
        })
}

function getEmptyMail(from = '', mailTo = '', subject = '', massage = '', date = getCurrentTime()) {
    return {
        id: '',
        from,
        mailTo,
        subject,
        massage,
        date,
        isPinned: false,
        isDraft: false,
        isRead: false,
        isStarred: false,
        isImportant: false,
        isArchived: false
    }
}

function getDefaultFilter(searchParams = { get: () => { } }) {
    return {
        txt: searchParams.get('txt') || ''
    }
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        mails.push(_createMail('Discord', 'mymail', 'Baba mentioned you in Playground AI', 'You have 4 new massages!', '10/5/2023'))
        mails.push(_createMail('Hello JS', 'mymail', 'Hi john!', 'Come join us and learn code!', '9/5/2023'))
        mails.push(_createMail('Google.com', 'mymail', 'Password expired', 'Please upsate your password', '7/5/2023'))
        mails.push(_createMail('Netflix.com', 'mymail', 'Reminder: your free month ends on Saturday', 'We hope you’re liking Netflix as much as we like having you as a member. Please stay and enjoy even more great TV shows and movies with us, too.', '3/5/2023'))
        mails.push(_createMail('Discount', 'mymail', 'You received money', 'Hello mr John. Please check out your account, it seems that you get a lot of money', '1/5/2023'))
        mails.push(_createMail('Hello JS', 'mymail', 'Hi john!', 'Come join us and learn code!', '29/4/2023'))
        mails.push(_createMail('Maccabi Online', 'mymail', 'New massage from you\'re doctor', 'You have a new appointment', '28/4/2023'))
        mails.push(_createMail('Airbnb', 'mymail', 'Write a review for Tom', 'You just checked out of Tom\'s place. Take a few minutes to rate your stay and let your host know how they did.', '22/4/2023'))
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(from, to, subject, msg, date) {
    const mail = getEmptyMail(from, to, subject, msg, date)
    mail.id = utilService.makeId()
    return mail
}

function getCurrentTime() {
    const today = new Date
    const year = today.getFullYear()
    let month = today.getMonth() + 1
    let day = today.getDate()

    return (
        day + '/' + month + '/' + year
    )
}