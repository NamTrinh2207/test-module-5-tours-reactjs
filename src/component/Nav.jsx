import {Link} from "react-router-dom";
import React from 'react';
const Nav = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/create">Create Tour</Link>
                </li>
            </ul>
        </nav>
    );
};
export default Nav;
