import { useState } from "react";
import { loginUser } from "../services/api.js";
import Header from "../components/Header.jsx";
import crystal from '../assets/crystal.png';

function Login({ onSwitch }) {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const data = await loginUser(form);
            localStorage.setItem("token", data.token);
            localStorage.setItem("name", data.name);
            // 👉 luego: redirigir al dashboard
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth">
            <Header />
            <div className="auth__body">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <img className="auth-hero" src={crystal} alt="Cristal Finance Fantasy" />
                    <h1 className="auth-form__title">Finance Fantasy</h1>
                    <p className="auth-form__subtitle">Bienvenida de vuelta, gamer</p>

                    <div className="auth-form__field">
                        <label className="auth-form__label" htmlFor="email">Email</label>
                        <input className="auth-form__input" id="email" type="email" name="email"
                               placeholder="tu@mymoney.app" value={form.email} onChange={handleChange} required />
                    </div>

                    <div className="auth-form__field">
                        <label className="auth-form__label" htmlFor="password">Contraseña</label>
                        <input className="auth-form__input" id="password" type="password" name="password"
                               placeholder="Tu contraseña" value={form.password} onChange={handleChange} required />
                    </div>

                    <button className="auth-form__button" type="submit" disabled={loading}>
                        {loading ? "Entrando..." : "Jugar gratis"}
                    </button>

                    {error && <p className="auth-form__msg auth-form__msg--error">{error}</p>}

                    <p className="auth-form__switch">
                        ¿Nueva aquí? <button type="button" onClick={onSwitch}>Crear cuenta</button>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;