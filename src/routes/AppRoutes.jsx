import { Routes, Route } from 'react-router-dom'
import App from '../App'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx'
import Dashboard from '../pages/Dashboard/Dashboard.jsx'
import ProtectedRoute from "./ProtectedRoute.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<App />}>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={
                    <ProtectedRoute><Dashboard /></ProtectedRoute>
                } />
            </Route>
        </Routes>
    )
}

export default AppRoutes