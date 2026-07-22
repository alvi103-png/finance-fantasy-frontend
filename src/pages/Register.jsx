import { useState } from "react";
import { registerUser } from "../services/api.js";
import Header from "../components/Header.jsx";
import crystal from "../assets/crystal.png";

function Register({ onSwitch }) {

    const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (form.password.length < 8) {
            setError("La contraseña debe tener al menos 8 caracteres")
            return;
        }


        if (form.password !== form.confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        setLoading(true);
        try {

            const data = await registerUser({
                name: form.name,
                email: form.email,
                password: form.password,
            });
            localStorage.setItem("token", data.token);
            localStorage.setItem("name", data.name);
            setSuccess(`Bienvenid@, ${data.name}! 🎮`);
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
                    <h1 className="auth-form__title">Nueva Aventurera</h1>
                    <p className="auth-form__subtitle">Crea tu perfil en segundos</p>

                    <div className="auth-form__field">
                        <label className="auth-form__label" htmlFor="name">Nombre</label>
                        <input className="auth-form__input" id="name" type="text" name="name"
                               placeholder="Tu nombre" value={form.name} onChange={handleChange} required />
                    </div>

                    <div className="auth-form__field">
                        <label className="auth-form__label" htmlFor="email">Email</label>
                        <input className="auth-form__input" id="email" type="email" name="email"
                               placeholder="tu@mymoney.app" value={form.email} onChange={handleChange} required />
                    </div>

                    <div className="auth-form__field">
                        <label className="auth-form__label" htmlFor="password">Contraseña</label>
                        <input className="auth-form__input" id="password" type="password" name="password"
                               placeholder="Mínimo 8 caracteres" value={form.password} onChange={handleChange} required minLength={8} />
                    </div>

                    <div className="auth-form__field">
                        <label className="auth-form__label" htmlFor="confirmPassword">Confirmar contraseña</label>
                        <input className="auth-form__input" id="confirmPassword" type="password" name="confirmPassword"
                               placeholder="Repite tu contraseña" value={form.confirmPassword} onChange={handleChange} required />
                    </div>

                    <button className="auth-form__button" type="submit" disabled={loading}>
                        {loading ? "Creando..." : "Crear cuenta"}
                    </button>

                    {error && <p className="auth-form__msg auth-form__msg--error">{error}</p>}
                    {success && <p className="auth-form__msg auth-form__msg--success">{success}</p>}

                    {/* Link para cambiar a login. Es un <button> por accesibilidad. */}
                    <p className="auth-form__switch">
                        ¿Ya tienes cuenta? <button type="button" onClick={onSwitch}>Inicia sesión</button>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;