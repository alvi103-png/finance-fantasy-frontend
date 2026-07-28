import './Landing.scss'
import { Link } from "react-router-dom";
import crystal from "../../assets/crystal.png";

const STEPS = [
    { n: 1, color: "#FF6FA5", title: "Crea tu cuenta",           text: "Regístrate y crea tu perfil de aventurera financiera." },
    { n: 2, color: "#8B5CF6", title: "Registra tus movimientos", text: "Suma tus ingresos y gastos en segundos." },
    { n: 3, color: "#FFC24C", title: "Sube de nivel",            text: "Descubre en qué gastas y toma el control de tu aventura." },
];

function Landing() {
    return (
        <div className="landing">
        <section className="landing__hero">
            <img className="landing__gem" src={crystal} alt="Cristal de Finance Fantasy" />
            <h1 className="landing__title">Finance Fantasy</h1>
            <p className="landing__subtitle">
                Domina tu dinero como una gamer. Controla ingresos y gastos mientras subes de nivel tu vida financiera.
            </p>
            <div className="landing__cta">
                <Link className="landing__btn landing__btn--primary" to="/register">Jugar gratis</Link>
                <Link className="landing__btn landing__btn--secondary" to="/login">Ya tengo cuenta</Link>
            </div>
        </section>

        <section className="landing__section">
            <h2 className="landing__section-title">Cómo funciona</h2>
            <div className="landing__steps">
                {STEPS.map(({ n, color, title, text }) => (
                    <article className="landing__step" key={n}>
                        <span
                            className="landing__step-num"
                            style={{ borderColor: color, color: color }}
                        >
                            {n}
                        </span>
                        <div>
                            <h3 className="landing__step-title">{title}</h3>
                            <p className="landing__step-text">{text}</p>
                        </div>
                    </article>
                ))}
            </div>
        </section>

        </div>
    );
}

export default Landing;