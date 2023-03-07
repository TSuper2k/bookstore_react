import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(props) {
    const { countCartItems, handleLogout } = props;
    const isLoggedIn = localStorage.getItem('access_token') !== null;

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
                    {countCartItems ? (
                        <button className="badge">{countCartItems}</button>
                    ) : (
                        ''
                    )}
                </a>{' '}
                {isLoggedIn ? (
                    <>
                        <button onClick={handleLogout}>Log Out</button>
                    </>
                ) : (
                    <Link to="/"><button>Log in</button></Link>
                )}
            </div>
        </header>
    );
}
