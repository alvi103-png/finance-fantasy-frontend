import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {clearToken, deleteAccount, getProfile} from "../../services/api.js";
import {Logout, User, Trash } from "pixelarticons/react";
import Modal from "../../components/ui/Modal/Modal.jsx";
import "./Profile.scss"


function Profile() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const [confirmLogout, setConfirmLogout] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        getProfile().then(setProfile).catch((err) => setError(err.message));
    }, []);

    const logout = () => {
        clearToken();
        localStorage.removeItem("name");
        navigate("/");
    };

    const handleDelete = async () => {
        try {
            setDeleting(true);
            await deleteAccount();
            clearToken();
            localStorage.removeItem("name");
            navigate("/");
        } catch (err) {
            setError(err.message);
            setDeleting(false);
        }
    };

    return (
        <section className="profile">
            <header className="profile__card">
                <div className="profile__avatar"><User /></div>
                <h1 className="profile__name">{profile?.name ?? "Cargando..."}</h1>
                <p className="profile__email">{profile?.email ?? ""}</p>
            </header>

            {error && <p className="profile__error">{error}</p>}

            <div className="profile__actions">
                <button className="profile__btn profile__btn--logout" onClick={() => setConfirmLogout(true)}>
                    <Logout /> Cerrar sesión
                </button>
                <button className="profile__btn profile__btn--danger" onClick={() => setConfirmDelete(true)}>
                    <Trash /> Eliminar cuenta
                </button>
            </div>

            <Modal isOpen={confirmLogout} onClose={() => setConfirmLogout(false)} title="¿Cerrar sesión?">
                <p className="modal__text">¿Seguro que quieres salir de tu cuenta?</p>
                <div className="modal__actions">
                    <button className="modal__btn--ghost" onClick={() => setConfirmLogout(false)}>Cancelar</button>
                    <button className="modal__btn--danger" onClick={logout}>Salir</button>
                </div>
            </Modal>

            <Modal isOpen={confirmDelete} onClose={() => !deleting && setConfirmDelete(false)} title="¿Eliminar tu cuenta?">
                <p className="modal__text">Se borrarán <strong>tu cuenta y todas tus transacciones</strong> de forma permanente. Esta acción no se puede deshacer.</p>
                <div className="modal__actions">
                    <button className="modal__btn--ghost" onClick={() => setConfirmDelete(false)} disabled={deleting}>
                        Cancelar
                    </button>
                    <button className="modal__btn--danger" onClick={handleDelete} disabled={deleting}>
                        {deleting ? "Eliminando..." : "Sí, eliminar"}
                    </button>
                </div>
            </Modal>
        </section>
    )
}

export default Profile;