import SummaryCard from "../../components/finance/SummaryCard/SummaryCard.jsx";

function Dashboard() {
    const name = localStorage.getItem("name");
    const mes = new Date().toLocaleDateString("es-ES", { month: "long"});
    const mesCapitalized = mes.charAt(0).toUpperCase() + mes.slice(1);

    return (
        <div className="dashboard">
            <h1>Hola, {name}</h1>
            <p className="dashboard__balance">Balance de {mesCapitalized}</p>
            import SummaryCard from '../../components/SummaryCard/SummaryCard.jsx'
        </div>
    )
}

export default Dashboard;