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
                mails = mails.filter(mail => regExp.test(mail.title || mail.msg))
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

function getEmptyMail(from = '', to = '', subject = '', msg = '', date = '01/01/2000') {
    return {
        id: '',
        from,
        to,
        subject,
        msg,
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
        mails.push(_createMail('Netflix.com', 'mymail', 'Hi John', 'Check out our new series!', '03/05/2023'))
        mails.push(_createMail('Google.com', 'mymail', 'Password expired', 'Please upsate your password', '07/05/2023'))
        mails.push(_createMail('Maccabi Online', 'mymail', 'New massage from you\'r doctor', 'You have a new appointment', '28/04/2023'))
        mails.push(_createMail('Hello JS', 'mymail', 'Hi john!', 'Come join us and learn code!', '09/05/2023'))
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(from, to, subject, msg, date) {
    const mail = getEmptyMail(from, to, subject, msg, date)
    mail.id = utilService.makeId()
    return mail
}