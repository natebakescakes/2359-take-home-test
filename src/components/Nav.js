import React from 'react';
import {
    NavLink,
    HashRouter,
} from 'react-router-dom';
 
const Nav = () => {
    return (
        <div>
            <h2>Gallereasy</h2>
            
            <HashRouter>
                <ul className="header">
                    <li><NavLink to="/search">Search</NavLink></li>
                    <li><NavLink to="/favourites">Favourites</NavLink></li>
                </ul>
            </HashRouter>
        </div>
    );
}

export default Nav;