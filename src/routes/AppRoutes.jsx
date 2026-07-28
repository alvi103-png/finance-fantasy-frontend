import { Routes, Route } from 'react-router-dom'
import App from '../App'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx'
import Dashboard from '../pages/Dashboard/Dashboard.jsx'
import ProtectedRoute from "./ProtectedRoute.jsx";
import NewTransaction from '../pages/NewTransaction/NewTransaction.jsx'
import Transactions from '../pages/Transactions/Transactions.jsx'
import Statistics from '../pages/Statistics/Statistics.jsx'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<App />}>
                <Route path="/dashboard" element={
                    <ProtectedRoute><Dashboard /></ProtectedRoute>
                } />
                <Route path="/transactions/:id/edit" element={
                    <ProtectedRoute><NewTransaction /></ProtectedRoute>
                } />
                <Route path="/transactions/" element={
                    <ProtectedRoute><Transactions /></ProtectedRoute>
                } />
                <Route path="/summary" element={
                    <ProtectedRoute><Statistics /></ProtectedRoute>
                } />
            </Route>
        </Routes>
    )
}

export default AppRoutes