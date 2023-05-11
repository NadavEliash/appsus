import { mailService } from "../services/mail.service.js"

export function ComposeMail({ onRemoveMail, onSendMail }) {

    let newMail = mailService.getEmptyMail('myEmail')

    function handleChange({ target }) {
        const field = target.name
        const value = target.value

        newMail[field] = value
    }


    return (
        <section className="new-massage">
            <h3>New Massage</h3>
            <h3>From myEmail@gmail.com</h3>
            <form className="new-massage-form" action="">
                <label htmlFor="mailTo">To</label>
                <input onChange={handleChange} type="text" name="mailTo" id="mailTo" />

                <label htmlFor="subject"></label>
                <input onChange={handleChange} type="text" placeholder="Subject" name="subject" id="subject" />

                <textarea onChange={handleChange} className="massage-input" name="massage" cols="40" rows="25"></textarea>
            </form>
            <footer>
                <button onClick={() => onSendMail(newMail)}>Send</button>
                <button onClick={() => onRemoveMail(newMail.id)}>Discard</button>
            </footer>
        </section>
    )
}

