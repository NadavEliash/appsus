export function ComposeMail({onRemoveMail, onSendMail, mailId}) {
    
    return (
        <section className="new-massage">
            <h3>New Massage</h3>
            <h3>From Israel Israeli</h3>
            <form className="new-massage-form" action="">
                <label htmlFor=""></label>
                <input type="text" placeholder="To:"/>
                <label htmlFor=""></label>
                <input type="text" placeholder="Subject" />
                <textarea className="massage-input" name="massage" cols="40" rows="25"></textarea>
            </form>
            <footer>
                <button>Send</button>
                <button>Discard</button>
            </footer>
        </section>
    )
}

// onClick={onSendMail(mailId)}
// onClick={onRemoveMail(mailId)}