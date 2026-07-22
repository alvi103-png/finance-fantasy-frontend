import { useState } from "react";
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

function App() {
   const[view, setView] = useState("login");

   return view === "login"
       ? <Login onSwitch={() => setView("register")} />
       : <Register onSwitch={() => setView("register")} />;
}

export default App;