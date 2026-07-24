import './Footer.scss'

const Footer = () => {
    return (
        <footer className="footer">
            {}
            <span className="footer-title">Finance Fantasy © {new Date().getFullYear()}</span>
            <p className="footer-slogan">Ahorra. Sube. Repite</p>
        </footer>
    )
}

export default Footer