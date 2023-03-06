import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
    }

    return (
        <header className="block row center">
            <div>
                <a href="#/">
                    <h1>Book Store</h1>
                </a>
            </div>
            <div>
                <a href="#/cart">
                    Cart{' '}
                    {props.countCartItems ? (
                        <button className="badge">{props.countCartItems}</button>
                    ) : (
                        ''
                    )}
                </a>{' '}
                {isLoggedIn ? (
                    <>
                        <a href="#" onClick={handleLogout}>Logout</a>
                        <a href="#/cart">
                            Cart{' '}
                            {props.countCartItems ? (
                                <button className="badge">{props.countCartItems}</button>
                            ) : (
                                ''
                            )}
                        </a>
                    </>
                ) : (
                    <Link to="/"> SignIn</Link>
                )}
            </div>
        </header>
    );
}
