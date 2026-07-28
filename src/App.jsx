import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import BottomNav from "./components/layout/BottomNav/BottomNav.jsx";
import "./App.css";


function App() {
    return (
        <>
            <Header />
            <main className="app-main">
                <Outlet />
            </main>
            <Footer />
            <BottomNav />
        </>
    );
}

export default App;