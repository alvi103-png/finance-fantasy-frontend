import './Footer.scss'
import { Heart } from '@nsmr/pixelart-react';


const Footer = () => {
    return (
        <footer className="footer">
            {}
            <span className="footer-title">Finance Fantasy © {new Date().getFullYear()}</span>
            <Heart size={18}/>

            <p className="footer-slogan">Ahorra. Sube. Repite</p>
        </footer>
    )
}

export default Footer