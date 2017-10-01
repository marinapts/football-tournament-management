import React from 'react';
import { Link } from 'react-router';

import './navbar.scss';

class Navbar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <Link to="/" className="brand-logo">Football Tournament Management</Link>
                    </div>
                </nav>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Navbar;