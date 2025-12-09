import React, { use, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AuthMiddleware({ children }) {
    const navigate = useNavigate();
    const [isValid, setIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function validateToken() {
            const token = localStorage.getItem('token');
            console.log('Token from localStorage:', token);
            if (!token) {
                navigate('/login');
                return;
            }
            try {
                const response = await axios.post('http://localhost:4000/api/auth/validate-token', {
                    token
                });
                console.log('Token validation response:', response.data);
                console.log('Token validation response:', response.data.isValid.role);

                const role = response.data.isValid.role;
                if (window.location.pathname.startsWith('/admin') && role !== 'admin') {
                    navigate('/login');
                } else if (window.location.pathname.startsWith('/driver') && role !== 'driver') {
                    navigate('/login');
                } else {
                    setIsValid(true);
                }
            } catch (error) {
                console.error('Token validation error:', error);
                navigate('/login');
            } finally {
                setIsLoading(false);
            }
        };
        validateToken()
    }, []);

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (isValid) {
        return <>{children}</>;
    }
    return null;
}
