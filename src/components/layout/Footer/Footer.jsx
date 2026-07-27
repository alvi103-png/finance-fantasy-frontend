import './Footer.scss'
import { Heart } from 'pixelarticons/react';


const Footer = () => {
    return (
        <footer className="footer">
            <span className="footer-title">Finance Fantasy © {new Date().getFullYear()}</span>
            <Heart size={12}/>

            <p className="footer-slogan">Ahorra. Sube. Repite</p>
        </footer>
    )
}

export default Footer