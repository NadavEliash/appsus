import { mailService } from "../services/mail.service.js"

export function ComposeMail({ onSaveDraft, onSendMail, onCloseCompose }) {

    let newMail = mailService.getEmptyMail('myEmail')

    function handleChange({ target }) {
        const field = target.name
        const value = target.value

        newMail[field] = value
    }


    return (
        <section className="new-massage">
            <header className="new-massage-header">
                <h3>New Massage</h3>
                <button onClick={onCloseCompose}>X</button>
            </header>
            <h4>From: myEmail@gmail.com</h4>
            <form className="new-massage-form" action="">
                <label className="mail-to" htmlFor="mailTo">To:
                    <input onChange={handleChange} type="text" name="mailTo" id="mailTo" />
                </label>

                <label htmlFor="subject"></label>
                <input className="subject" onChange={handleChange} type="text" placeholder="Subject" name="subject" id="subject" />

                <textarea onChange={handleChange} className="massage-input" name="massage" cols="40" rows="25"></textarea>
            </form>
            <footer className="new-massage-footer">
                <button onClick={() => onSendMail(newMail)}>
                    <img src="assets/img/send.svg" alt="" />
                </button>
                <button onClick={() => onSaveDraft(newMail)}>
                    <img src="assets/img/save.svg" alt="" />
                </button>
            </footer>
        </section>
    )
}

