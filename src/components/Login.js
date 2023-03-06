import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // Call the login API with email and password
        axios.post('http://127.0.0.1:8081/api/login', {
            email: email,
            password: password
        })
            .then(response => {
                // Save token to local storage
                localStorage.setItem('access_token', response.data.access_token);

                // Handle successful login
                window.location.href = '/index';
            })
            .catch(error => {
                // Handle login error
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Email: </label>
                <input type="email" name="email" className="form-control" placeholder="email"
                    value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label">Password: </label>
                <input type="password" name="password" className="form-control" placeholder="password"
                    value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    );
}

export default LoginForm;
