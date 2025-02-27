// import React, { useState } from 'react';
// import './AttendanceDashboard.css';

// const AttendanceDashboard = () => {
//     const [filters, setFilters] = useState({
//         location: '',
//         department: '',
//         name: '',
//         startDate: '',
//         endDate: ''
//     });

//     const [employees, setEmployees] = useState([
//         // Mock Data - replace with actual employee data
//         { id: 'GAL0001', name: 'Subham Roy', jobTitle: 'Engineer', phoneNumber: '7670035943', date: '2025-02-07', location: 'Silchar', department: 'Marketing', present: 20, absent: 2, halfDay: 1, paidLeave: 5, unpaidLeave: 0, overtime: 3, lateComing: 1 },
//         { id: 'GAL0002', name: 'Bhaskar R', jobTitle: 'Engineer', phoneNumber: '9987856626', date: '2025-02-08', location: 'Bengaluru', department: 'Engineering', present: 18, absent: 4, halfDay: 0, paidLeave: 3, unpaidLeave: 1, overtime: 2, lateComing: 2 },
//         { id: 'GAL0003', name: 'Salma Shirin', jobTitle: 'Sales', phoneNumber: '9954156767', date: '2025-04-27', location: 'Bengaluru', department: 'Marketing', present: 18, absent: 4, halfDay: 0, paidLeave: 3, unpaidLeave: 1, overtime: 2, lateComing: 2 },
//         { id: 'GAL0004', name: 'Swarnadeep Deb', jobTitle: 'Engineer', phoneNumber: '234-567-8901', date: '2025-02-07', location: 'Silchar', department: 'Design', present: 18, absent: 4, halfDay: 0, paidLeave: 3, unpaidLeave: 1, overtime: 2, lateComing: 2 },
//     ]);

//     const locations = ['Bengaluru', 'Silchar', 'Remote'];
//     const departments = ['Engineering', 'Design', 'Sales', 'Marketing'];

//     const handleFilterChange = (e) => {
//         const { name, value } = e.target;
//         setFilters({ ...filters, [name]: value });
//     };

//     const handleDateRangeChange = (e) => {
//         const { name, value } = e.target;
//         setFilters({ ...filters, [name]: value });
//     };

//     const filteredEmployees = employees.filter(emp => {
//         return (
//             (!filters.location || emp.location === filters.location) &&
//             (!filters.department || emp.department === filters.department) &&
//             (!filters.name || emp.name.toLowerCase().includes(filters.name.toLowerCase())) &&
//             (!filters.startDate || new Date(emp.date) >= new Date(filters.startDate)) &&
//             (!filters.endDate || new Date(emp.date) <= new Date(filters.endDate))
//         );
//     });

//     return (
//         <div className="attendance-dashboard-container">
//             <div className="attendance-dashboard-header">
//                 <h2>Attendance Dashboard</h2>
//                 <p className="attendance-dashboard-subtitle">Monitor and track daily attendance insights effortlessly</p>
//             </div>


//             <div className="attendance-dashboard-filters">
//                 {/* Row 1: Select Location and Department */}
//                 <div className="filter-group filter-row">
//                     <label>Location</label>
//                     <select name="location" onChange={handleFilterChange} value={filters.location}>
//                         <option value="">All Locations</option>
//                         {locations.map(location => <option key={location} value={location}>{location}</option>)}
//                     </select>
//                 </div>

//                 <div className="filter-group filter-row">
//                     <label>Department</label>
//                     <select name="department" onChange={handleFilterChange} value={filters.department}>
//                         <option value="">All Departments</option>
//                         {departments.map(department => <option key={department} value={department}>{department}</option>)}
//                     </select>
//                 </div>
//             </div>

//             <div className="attendance-dashboard-filters">
//                 <div className="filter-group filter-row">
//                     <label>Employee Name</label>
//                     <input type="text" name="name" value={filters.name} onChange={handleFilterChange} placeholder="Search by Name" />
//                 </div>

//                 <div className="filter-group filter-row">
//                     <label>Start Date</label>
//                     <input type="date" name="startDate" value={filters.startDate} onChange={handleDateRangeChange} />
//                 </div>

//                 <div className="filter-group filter-row">
//                     <label>End Date</label>
//                     <input type="date" name="endDate" value={filters.endDate} onChange={handleDateRangeChange} />
//                 </div>
//             </div>

//             <div className="download-report-container">
//                 <button className="download-report-button">Download Report</button>
//             </div>

//             <table className="attendance-dashboard-table">
//                 <thead>
//                     <tr>
//                         <th>Employee Name</th>
//                         <th>Employee ID</th>
//                         <th>Job Title</th>
//                         <th>Phone Number</th>
//                         <th>Date</th>
//                         <th>Location</th>
//                         <th>Department</th>
//                         <th>Present</th>
//                         <th>Absent</th>
//                         <th>Half Days</th>
//                         <th>Paid Leave</th>
//                         <th>Unpaid Leave</th>
//                         <th>Overtime</th>
//                         <th>Late Coming</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredEmployees.map(employee => (
//                         <tr key={employee.id}>
//                             <td>{employee.name}</td>
//                             <td>{employee.id}</td>
//                             <td>{employee.jobTitle}</td>
//                             <td>{employee.phoneNumber}</td>
//                             <td>{employee.date}</td>
//                             <td>{employee.location}</td>
//                             <td>{employee.department}</td>
//                             <td>{employee.present}</td>
//                             <td>{employee.absent}</td>
//                             <td>{employee.halfDay}</td>
//                             <td>{employee.paidLeave}</td>
//                             <td>{employee.unpaidLeave}</td>
//                             <td>{employee.overtime}</td>
//                             <td>{employee.lateComing}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default AttendanceDashboard;



import React, { useState } from 'react';
import {
    Calendar,
    Clock,
    User,
    Timer,
    UserCheck,
    UserX,
    UserMinus,
    Wallet,
    WalletCards,
    Clock4,
    CalendarDays,
    List,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import './AttendanceDashboard.css';

function StatCard({ icon, title, value, subtitle, color }) {
    return (
        <div className={`att-stat-card ${color}`}>
            <div className="att-stat-card-content">
                <div>
                    <p className="att-stat-title">{title}</p>
                    <p className="att-stat-value">{value}</p>
                    <p className="att-stat-subtitle">{subtitle}</p>
                </div>
                <div className="att-stat-icon">{icon}</div>
            </div>
        </div>
    );
}

export default function AttendanceDashboard() {
    const [viewType, setViewType] = useState('calendar');
    const [selectedMonth, setSelectedMonth] = useState(new Date());

    const employeeData = {
        id: 'EMP001',
        name: 'Subham Roy',
        jobTitle: 'Senior Software Engineer',
    };

    const monthlyStats = {
        workingDays: 22,
        presentDays: 18,
        absentDays: 1,
        halfDays: 2,
        paidLeaves: 1,
        unpaidLeaves: 0,
        overtimeHours: 12.5,
        lateDays: 3,
        earlyLeavings: 2,
    };

    const generateCalendarDays = () => {
        const year = selectedMonth.getFullYear();
        const month = selectedMonth.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const days = [];

        // Add empty days for the start of the month
        for (let i = 0; i < firstDay.getDay(); i++) {
            days.push(null);
        }

        // Generate days for the month
        for (let date = 1; date <= lastDay.getDate(); date++) {
            const dayOfWeek = new Date(year, month, date).getDay();

            if (dayOfWeek === 0 || dayOfWeek === 6) {
                days.push({ date, status: 'weekend' });
                continue;
            }

            // Randomly assign status for demonstration
            const random = Math.random();
            let status = 'present';
            let isLate = false;

            if (random > 0.8) status = 'absent';
            else if (random > 0.7) status = 'half-day';
            else if (random > 0.6) status = 'paid-leave';
            else if (random > 0.5) status = 'unpaid-leave';
            else if (random > 0.3) {
                status = 'present';
                isLate = Math.random() > 0.5;
            }

            days.push({
                date,
                status,
                isLate,
                checkIn: isLate ? '10:45 AM' : '10:00 AM',
                checkOut: '07:00 PM',
            });
        }

        return days;
    };

    const calendarDays = generateCalendarDays();

    const getStatusColor = (status, isLate) => {
        if (isLate) return 'att-status-late';
        switch (status) {
            case 'present':
                return 'att-status-present';
            case 'absent':
                return 'att-status-absent';
            case 'half-day':
                return 'att-status-half-day';
            case 'paid-leave':
                return 'att-status-paid-leave';
            case 'unpaid-leave':
                return 'att-status-unpaid-leave';
            default:
                return 'att-status-default';
        }
    };

    const handlePreviousMonth = () => {
        setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1));
    };

    return (
        <div className="att-container">
            {/* Employee Overview */}
            <div className="att-employee-card">
                <div className="att-employee-content">
                    <div className="att-employee-avatar">
                        <User className="att-avatar-icon" />
                    </div>
                    <div>
                        <h2 className="att-employee-name">{employeeData.name}</h2>
                        <div className="att-employee-details">
                            <p className="att-employee-id">Employee ID: {employeeData.id}</p>
                            <p className="att-employee-title">{employeeData.jobTitle}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Monthly Statistics */}
            <div className="att-stats-grid">
                <StatCard
                    icon={<Calendar className="att-icon att-icon-indigo" />}
                    title="Working Days"
                    value={monthlyStats.workingDays.toString()}
                    subtitle="This month"
                    color="att-bg-indigo"
                />
                <StatCard
                    icon={<UserCheck className="att-icon att-icon-green" />}
                    title="Present Days"
                    value={monthlyStats.presentDays.toString()}
                    subtitle="This month"
                    color="att-bg-green"
                />
                <StatCard
                    icon={<UserX className="att-icon att-icon-red" />}
                    title="Absent Days"
                    value={monthlyStats.absentDays.toString()}
                    subtitle="This month"
                    color="att-bg-red"
                />
                <StatCard
                    icon={<UserMinus className="att-icon att-icon-orange" />}
                    title="Half Days"
                    value={monthlyStats.halfDays.toString()}
                    subtitle="This month"
                    color="att-bg-orange"
                />
            </div>

            <div className="att-stats-grid">
                <StatCard
                    icon={<Wallet className="att-icon att-icon-blue" />}
                    title="Paid Leaves"
                    value={monthlyStats.paidLeaves.toString()}
                    subtitle="This month"
                    color="att-bg-blue"
                />
                <StatCard
                    icon={<WalletCards className="att-icon att-icon-purple" />}
                    title="Unpaid Leaves"
                    value={monthlyStats.unpaidLeaves.toString()}
                    subtitle="This month"
                    color="att-bg-purple"
                />
                <StatCard
                    icon={<Clock4 className="att-icon att-icon-yellow" />}
                    title="Late Comings"
                    value={monthlyStats.lateDays.toString()}
                    subtitle="This month"
                    color="att-bg-yellow"
                />
                <StatCard
                    icon={<Timer className="att-icon att-icon-cyan" />}
                    title="Overtime Hours"
                    value={`${monthlyStats.overtimeHours}h`}
                    subtitle="This month"
                    color="att-bg-cyan"
                />
            </div>

            {/* Calendar/List View */}
            <div className="att-view-container">
                <div className="att-view-header">
                    <div className="att-month-selector">
                        <button
                            onClick={handlePreviousMonth}
                            className="att-nav-button"
                        >
                            <ChevronLeft className="att-nav-icon" />
                        </button>
                        <span className="att-current-month">
                            {selectedMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                        </span>
                        <button
                            onClick={handleNextMonth}
                            className="att-nav-button"
                        >
                            <ChevronRight className="att-nav-icon" />
                        </button>
                    </div>
                    <div className="att-view-toggle">
                        <button
                            onClick={() => setViewType('calendar')}
                            className={`att-toggle-button ${viewType === 'calendar' ? 'att-toggle-active' : ''
                                }`}
                        >
                            <CalendarDays className="att-toggle-icon" />
                            Calendar View
                        </button>
                        <button
                            onClick={() => setViewType('list')}
                            className={`att-toggle-button ${viewType === 'list' ? 'att-toggle-active' : ''
                                }`}
                        >
                            <List className="att-toggle-icon" />
                            List View
                        </button>
                    </div>
                </div>

                {/* Legend */}
                <div className="att-legend">
                    <div className="att-legend-item">
                        <div className="att-legend-dot att-dot-present"></div>
                        <span className="att-legend-text">Present</span>
                    </div>
                    <div className="att-legend-item">
                        <div className="att-legend-dot att-dot-absent"></div>
                        <span className="att-legend-text">Absent</span>
                    </div>
                    <div className="att-legend-item">
                        <div className="att-legend-dot att-dot-half-day"></div>
                        <span className="att-legend-text">Half Day</span>
                    </div>
                    <div className="att-legend-item">
                        <div className="att-legend-dot att-dot-paid-leave"></div>
                        <span className="att-legend-text">Paid Leave</span>
                    </div>
                    <div className="att-legend-item">
                        <div className="att-legend-dot att-dot-unpaid-leave"></div>
                        <span className="att-legend-text">Unpaid Leave</span>
                    </div>
                    <div className="att-legend-item">
                        <div className="att-legend-dot att-dot-late"></div>
                        <span className="att-legend-text">Late</span>
                    </div>
                </div>

                {viewType === 'calendar' ? (
                    <div className="att-calendar-grid">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                            <div
                                key={day}
                                className="att-calendar-header"
                            >
                                {day}
                            </div>
                        ))}
                        {calendarDays.map((day, index) => (
                            <div
                                key={index}
                                className={`att-calendar-cell ${!day ? 'att-calendar-empty' : ''
                                    }`}
                            >
                                {day && (
                                    <>
                                        <div className="att-calendar-cell-header">
                                            <span className="att-calendar-date">
                                                {day.date}
                                            </span>
                                            {day.status !== 'weekend' && (
                                                <span className={`att-calendar-status ${getStatusColor(
                                                    day.status,
                                                    day.isLate
                                                )}`}>
                                                    {day.isLate ? 'Late' : day.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                </span>
                                            )}
                                        </div>
                                        {day.status !== 'weekend' && day.checkIn && (
                                            <div className="att-calendar-time">
                                                <p className="att-time-entry">
                                                    In: {day.checkIn}
                                                </p>
                                                {day.checkOut && (
                                                    <p className="att-time-entry">
                                                        Out: {day.checkOut}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="att-table-container">
                        <table className="att-table">
                            <thead>
                                <tr>
                                    <th className="att-table-header">Date</th>
                                    <th className="att-table-header">Status</th>
                                    <th className="att-table-header">Check In</th>
                                    <th className="att-table-header">Check Out</th>
                                </tr>
                            </thead>
                            <tbody>
                                {calendarDays
                                    .filter((day) => day !== null && day.status !== 'weekend')
                                    .map((day, index) => (
                                        <tr key={index}>
                                            <td className="att-table-cell">
                                                {selectedMonth.toLocaleString('default', { month: 'short' })} {day.date}
                                            </td>
                                            <td className="att-table-cell">
                                                <span className={`att-table-status ${getStatusColor(
                                                    day.status,
                                                    day.isLate
                                                )}`}>
                                                    {day.isLate ? 'Late' : day.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                </span>
                                            </td>
                                            <td className="att-table-cell">
                                                {day.checkIn}
                                            </td>
                                            <td className="att-table-cell">
                                                {day.checkOut}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}