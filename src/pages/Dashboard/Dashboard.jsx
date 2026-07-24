
function Dashboard() {
    const name = localStorage.getItem("name");
    const mes = new Date().toLocaleDateString("es-ES", { month: "long"});
    const mesCapitalized = mes.charAt(0).toUpperCase() + mes.slice(1);

    return (
        <div className="dashboard">
            <h1>Hola, {name}</h1>
            <p className="dashboard__balance">Balance de {mesCapitalized}</p>
        </div>
    )
}

export default Dashboard;