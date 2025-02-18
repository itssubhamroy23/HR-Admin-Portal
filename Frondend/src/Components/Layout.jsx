import React from 'react'
import Sidebar from './sidebar/Sidebar'
import Header from '../Components/Header/Header'

import { Outlet } from 'react-router-dom'
import './layout.css'

const Layout = () => {
    return (
        <div className="layout-container">
            {/* Sidebar */}
            <Header />
            <div className="content-wrapper">
                <Sidebar />
                <main className="main-content">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Layout
