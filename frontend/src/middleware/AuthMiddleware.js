import React, { use, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AuthMiddleware({children}) {
    const navigate = useNavigate();
    const [isValid, setIsValid] = useState(false);
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
                console.log('children:', children);
                setIsValid(true);
                console.log('Content set to children:', children);
            } catch (error) {
                console.error('Token validation error:', error);
                navigate('/login');
            }
        };
        validateToken()
    }, []);
    if(!isValid){
        return null;
    }
    return (
        <>{children}</>
    )
}
