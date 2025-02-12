import React, { useState } from 'react';
import { Bell, Search } from 'lucide-react';
import './header.css';
import gal_logo from '../../assets/gal_logo.png';

const Header = ({ pendingRequests }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <header className="unique-navbar-container">
            <div className="unique-navbar-header">
                <img src={gal_logo} className='unique-navbar-logo' />
                <span className="unique-navbar-title">Galvinus Admin Portal</span>
            </div>

            <div className="unique-navbar-right">
                <div className="unique-search-container">
                    <Search className="unique-navbar-search-icon" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="unique-navbar-search-input"
                    />
                </div>

                <div className="unique-navbar-icons">
                    <button className="unique-navbar-notifications">
                        <Bell className="unique-navbar-bell-icon" />
                        {pendingRequests > 0 && (
                            <span className="unique-notification-badge">{pendingRequests}</span>
                        )}
                    </button>
                    <div className="unique-navbar-profile" onClick={toggleDropdown}>
                        <img
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="Admin"
                            className="unique-navbar-profile-pic"
                        />
                    </div>
                    {showDropdown && (
                        <div className="unique-profile-dropdown">
                            <p className="unique-profile-dropdown-item">Subham Roy</p>
                            <p className="unique-profile-dropdown-item unique-profile-role-item">HR Administrator</p>
                            <p className="unique-profile-dropdown-item unique-profile-email-item">subham.roy@galvinus.com</p>
                            <hr />
                            <p className="unique-profile-dropdown-item">Reset Password</p>
                            <p className="unique-profile-dropdown-item">Logout</p>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
