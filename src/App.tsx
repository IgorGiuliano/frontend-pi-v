/* eslint-disable react/prop-types */
import React from 'react';
import {
    BrowserRouter as Router, Routes, Route, Navigate
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './contexts/auth';
import './styles/Global.scss';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

function ProtectedRoute({ children }) {
    const storagedUser = sessionStorage.getItem('@App:cod');
    const storagedToken = sessionStorage.getItem('@App:token');

    if (!storagedToken && !storagedUser) {
        return <Navigate to="/not-found" replace />;
    }

    return children;
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* <Route path="/" element={<Home />} /> */}
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/dashboard"
                        element={(
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        )}
                    />
                    <Route
                        path="/profile"
                        element={(
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        )}
                    />
                    <Route path="/not-found" element={<Home />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
