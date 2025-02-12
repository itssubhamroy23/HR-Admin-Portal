import React, { useState } from 'react';
import './sidebar.css';
import { BarChart3, Calendar, Users, Clock, GraduationCap, Award, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.pathname);
    const [leaveOpen, setLeaveOpen] = useState(location.pathname.startsWith('/leave-management'));
    const [attendanceOpen, setAttendanceOpen] = useState(location.pathname.startsWith('/attendance'));

    const navigation = [
        { name: 'Homepage', icon: BarChart3, path: '/dashboard' },
        {
            name: 'Attendance',
            icon: Clock,
            path: '/attendance',
            subMenu: [
                { name: 'Daily Attendance ', path: '/attendance/daily' },
                { name: 'Attendance Dashboard', path: '/attendance/dashboard' }
            ]
        },
        { name: 'Employee Database', icon: Users, path: '/employee' },
        {
            name: 'Leave Management',
            icon: Calendar,
            path: '/leave-management',
            subMenu: [
                { name: 'Leave Requests', path: '/leave-management/leave-requests' },
                { name: 'Leave History', path: '/leave-management/leave-history' },
                { name: 'Leave Policy', path: '/leave-management/leave-policy' }
            ]
        },
        { name: 'Training and Learning', icon: GraduationCap, path: '/training' },
        { name: 'Certification and Badges', icon: Award, path: '/certification' },
    ];

    return (
        <div className="sidebar-container">
            <nav className="sidebar-nav">
                {navigation.map((item) => (
                    <div key={item.path}>
                        {item.subMenu ? (
                            <>
                                <div
                                    className={`sidebar-item ${activeTab.startsWith(item.path) ? 'active' : ''}`}
                                    onClick={() => {
                                        if (item.name === 'Leave Management') setLeaveOpen(!leaveOpen);
                                        if (item.name === 'Attendance') setAttendanceOpen(!attendanceOpen);
                                    }}
                                >
                                    <item.icon className="sidebar-icon" />
                                    <span className="sidebar-link">{item.name}</span>
                                    <ChevronDown className={`dropdown-icon ${(item.name === 'Leave Management' && leaveOpen) || (item.name === 'Attendance' && attendanceOpen) ? 'open' : ''}`} />
                                </div>
                                {((item.name === 'Leave Management' && leaveOpen) || (item.name === 'Attendance' && attendanceOpen)) && (
                                    <div className="submenu">
                                        {item.subMenu.map((sub) => (
                                            <Link
                                                key={sub.path}
                                                to={sub.path}
                                                className={`submenu-item ${activeTab === sub.path ? 'active' : ''}`}
                                                onClick={() => setActiveTab(sub.path)}
                                            >
                                                {sub.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <Link
                                to={item.path}
                                onClick={() => setActiveTab(item.path)}
                                className={`sidebar-item ${activeTab === item.path ? 'active' : ''}`}
                            >
                                <item.icon className="sidebar-icon" />
                                {item.name}
                            </Link>
                        )}
                    </div>
                ))}
            </nav>

            <footer className="sidebar-footer">
                Designed and developed by <b>Galvinus Pvt Ltd</b>
            </footer>
        </div>
    );
};

export default Sidebar;
