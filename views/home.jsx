const { NavLink } = ReactRouterDOM

export function Home() {
    return <section className="home">
        <h1>Welcome Appsus!</h1>
        <h2>Handle your words carefully,<br />for words have more power than atom bombs</h2>
        <img src="assets/img/homepage-02.jpg" alt="" />
        <div className="link">
            <NavLink to="/mail"><img className="link-mail" src="assets/img/mail.svg" alt="" /></NavLink>
            <NavLink to="/note"><img className="link-note" src="assets/img/note.svg" alt="" /></NavLink>
        </div>
    </section>
}