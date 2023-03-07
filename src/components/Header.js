import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(props) {
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
                    {props.countCartItems ? (
                        <button className="badge">{props.countCartItems}</button>
                    ) : (
                        ''
                    )}
                </a>{' '}
                {isLoggedIn ? (
                    <>
                        <button onClick={props.handleLogout}>Log Out</button>
                    </>
                ) : (
                    <Link to="/"><button>Log in</button></Link>
                )}
            </div>
        </header>
    );
}
