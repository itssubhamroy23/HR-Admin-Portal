import React from 'react';
import { format } from 'date-fns';
import {
    LayoutDashboard,
    Users,
    Calendar,
    Cake,
    Bell,
    UserPlus,
    GraduationCap,
    CalendarClock,
    PartyPopper,
    AlertCircle,
    Clock,
    CheckCircle,
    XCircle,
    User
} from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
    // Mock data
    const dashboardStats = {
        totalEmployees: 156,
        employeesOnLeave: 8,
        pendingLeaveRequests: 5,
        upcomingBirthdays: 3
    };

    // Mock notifications data
    const notifications = [
        {
            id: 1,
            type: 'orientation',
            title: 'New Employee Orientation',
            message: 'Sarah Johnson is joining the Engineering team today',
            timestamp: '2024-03-15T09:00:00',
            icon: UserPlus,
            priority: 'high'
        },
        {
            id: 2,
            type: 'training',
            title: 'Training Completion',
            message: 'Mike Chen completed "Advanced React Development" course',
            timestamp: '2024-03-14T16:30:00',
            icon: GraduationCap,
            priority: 'normal'
        },
        {
            id: 3,
            type: 'leave',
            title: 'Leave Request',
            message: 'David Wilson requested annual leave for next week',
            timestamp: '2024-03-14T14:15:00',
            icon: CalendarClock,
            priority: 'normal'
        },
        {
            id: 4,
            type: 'event',
            title: 'Company Event',
            message: 'Annual Team Building Event scheduled for March 25th',
            timestamp: '2024-03-14T11:00:00',
            icon: PartyPopper,
            priority: 'normal'
        },
        {
            id: 5,
            type: 'alert',
            title: 'System Update',
            message: 'HR Portal will be under maintenance on Sunday, 2 AM - 4 AM',
            timestamp: '2024-03-14T10:00:00',
            icon: AlertCircle,
            priority: 'high'
        }
    ];

    // Mock pending leaves data
    const pendingLeaves = [
        {
            id: 'leave1',
            employee: {
                name: 'Michael Brown',
                department: 'Engineering',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
            },
            type: 'Annual Leave',
            startDate: '2024-03-20',
            endDate: '2024-03-25',
            duration: '5 days',
            reason: 'Family vacation',
            requestedOn: '2024-03-14T09:30:00'
        },
        {
            id: 'leave2',
            employee: {
                name: 'Sarah Wilson',
                department: 'Marketing',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
            },
            type: 'Sick Leave',
            startDate: '2024-03-18',
            endDate: '2024-03-19',
            duration: '2 days',
            reason: 'Medical appointment',
            requestedOn: '2024-03-15T11:20:00'
        },
        {
            id: 'leave3',
            employee: {
                name: 'James Lee',
                department: 'Design',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
            },
            type: 'Personal Leave',
            startDate: '2024-03-22',
            endDate: '2024-03-22',
            duration: '1 day',
            reason: 'Personal errands',
            requestedOn: '2024-03-15T14:45:00'
        }
    ];

    const getNotificationColor = (priority) => {
        switch (priority) {
            case 'high':
                return 'dashboard__notification-high';
            default:
                return 'dashboard__notification-normal';
        }
    };

    const getLeaveTypeColor = (type) => {
        switch (type) {
            case 'Annual Leave':
                return 'dashboard__leave-annual';
            case 'Sick Leave':
                return 'dashboard__leave-sick';
            case 'Personal Leave':
                return 'dashboard__leave-personal';
            default:
                return 'dashboard__leave-default';
        }
    };

    return (
        <div className="dashboard__container">
            <div className="dashboard__header">
                <LayoutDashboard className="dashboard__header-icon" />
                <h1 className="dashboard__header-title">Admin Dashboard</h1>
            </div>

            {/* Stats Cards */}
            <div className="dashboard__stats-grid">
                <div className="dashboard__stats-card">
                    <div className="dashboard__stats-card-content">
                        <div>
                            <p className="dashboard__stats-label">Total Employees</p>
                            <p className="dashboard__stats-value">{dashboardStats.totalEmployees}</p>
                        </div>
                        <div className="dashboard__stats-icon-container dashboard__stats-icon-blue">
                            <Users className="dashboard__stats-icon" />
                        </div>
                    </div>
                </div>

                <div className="dashboard__stats-card">
                    <div className="dashboard__stats-card-content">
                        <div>
                            <p className="dashboard__stats-label">On Leave Today</p>
                            <p className="dashboard__stats-value">{dashboardStats.employeesOnLeave}</p>
                        </div>
                        <div className="dashboard__stats-icon-container dashboard__stats-icon-green">
                            <Calendar className="dashboard__stats-icon" />
                        </div>
                    </div>
                </div>

                <div className="dashboard__stats-card">
                    <div className="dashboard__stats-card-content">
                        <div>
                            <p className="dashboard__stats-label">Pending Leaves</p>
                            <p className="dashboard__stats-value">{dashboardStats.pendingLeaveRequests}</p>
                        </div>
                        <div className="dashboard__stats-icon-container dashboard__stats-icon-yellow">
                            <CalendarClock className="dashboard__stats-icon" />
                        </div>
                    </div>
                </div>

                <div className="dashboard__stats-card">
                    <div className="dashboard__stats-card-content">
                        <div>
                            <p className="dashboard__stats-label">Active Employees</p>
                            <p className="dashboard__stats-value">{dashboardStats.upcomingBirthdays}</p>
                        </div>
                        <div className="dashboard__stats-icon-container dashboard__stats-icon-purple">
                            <User className="dashboard__stats-icon" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="dashboard__main-grid">
                {/* Notifications Section */}
                <div className="dashboard__notifications-container">
                    <div className="dashboard__card">
                        <div className="dashboard__section-header">
                            <h2 className="dashboard__section-title">
                                <Bell className="dashboard__section-icon" />
                                Notifications
                            </h2>
                            <span className="dashboard__notification-count">
                                {notifications.length} new notifications
                            </span>
                        </div>
                        <div className="dashboard__notifications-list">
                            {notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`dashboard__notification-item ${getNotificationColor(notification.priority)}`}
                                >
                                    <div className="dashboard__notification-content">
                                        <div className={`dashboard__notification-icon ${notification.priority === 'high' ? 'dashboard__notification-icon-high' : 'dashboard__notification-icon-normal'
                                            }`}>
                                            <notification.icon className="dashboard__icon-small" />
                                        </div>
                                        <div className="dashboard__notification-text">
                                            <h3 className="dashboard__notification-title">
                                                {notification.title}
                                            </h3>
                                            <p className="dashboard__notification-message">
                                                {notification.message}
                                            </p>
                                            <p className="dashboard__notification-timestamp">
                                                {format(new Date(notification.timestamp), 'MMM d, yyyy • h:mm a')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Pending Leaves Section */}
                <div className="dashboard__leaves-container">
                    <div className="dashboard___card">
                        <h2 className="dashboard__section-title">
                            <CalendarClock className="dashboard__section-icon" />
                            Pending Leave Requests
                        </h2>
                        <div className="dashboard__leaves-list">
                            {pendingLeaves.map((leave) => (
                                <div key={leave.id} className="dashboard__leave-item">
                                    <div className="dashboard__leave-content">
                                        <img
                                            src={leave.employee.avatar}
                                            alt={leave.employee.name}
                                            className="dashboard__leave-avatar"
                                        />
                                        <div className="dashboard__leave-details">
                                            <div className="dashboard__leave-header">
                                                <h3 className="dashboard__leave-employee">{leave.employee.name}</h3>
                                                <span className={`dashboard__leave-type ${getLeaveTypeColor(leave.type)}`}>
                                                    {leave.type}
                                                </span>
                                            </div>
                                            <p className="dashboard__leave-department">{leave.employee.department}</p>
                                            <div className="dashboard__leave-dates">
                                                <p className="dashboard__leave-duration">
                                                    <Clock className="dashboard__icon-tiny" />
                                                    {leave.duration}
                                                </p>
                                                <p className="dashboard__leave-period">
                                                    <Calendar className="dashboard__icon-tiny" />
                                                    {format(new Date(leave.startDate), 'MMM d')} - {format(new Date(leave.endDate), 'MMM d, yyyy')}
                                                </p>
                                            </div>
                                            <p className="dashboard__leave-reason">{leave.reason}</p>
                                            <div className="dashboard__leave-footer">
                                                <p className="dashboard__leave-requested">
                                                    Requested {format(new Date(leave.requestedOn), 'MMM d, h:mm a')}
                                                </p>
                                                <div className="dashboard__leave-actions">
                                                    <button className="dashboard__leave-action-approve">
                                                        <CheckCircle className="dashboard__icon-action" />
                                                    </button>
                                                    <button className="dashboard__leave-action-reject">
                                                        <XCircle className="dashboard__icon-action" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;