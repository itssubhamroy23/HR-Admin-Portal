import React, { useState, useEffect } from 'react';
import './NotificationPage.css';

const NotificationPage = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [notification, setNotification] = useState({
        title: '',
        message: '',
        priority: 'NORMAL'
    });
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');

    // Fetch employees (mock data for now)
    useEffect(() => {
        // In a real implementation, you would fetch from your API
        const mockEmployees = [
            { id: 1, name: 'John Doe', department: 'Engineering', email: 'john@example.com' },
            { id: 2, name: 'Jane Smith', department: 'HR', email: 'jane@example.com' },
            { id: 3, name: 'Robert Johnson', department: 'Finance', email: 'robert@example.com' },
            { id: 4, name: 'Sarah Williams', department: 'Marketing', email: 'sarah@example.com' },
            { id: 5, name: 'Michael Brown', department: 'Operations', email: 'michael@example.com' },
            { id: 6, name: 'Emily Davis', department: 'Engineering', email: 'emily@example.com' },
            { id: 7, name: 'Daniel Wilson', department: 'Sales', email: 'daniel@example.com' },
            { id: 8, name: 'Olivia Moore', department: 'Customer Support', email: 'olivia@example.com' },
        ];
        setEmployees(mockEmployees);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNotification({ ...notification, [name]: value });
    };

    const handleSelectAll = () => {
        if (selectedEmployees.length === employees.length) {
            setSelectedEmployees([]);
        } else {
            setSelectedEmployees(employees.map(emp => emp.id));
        }
    };

    const handleEmployeeSelect = (empId) => {
        if (selectedEmployees.includes(empId)) {
            setSelectedEmployees(selectedEmployees.filter(id => id !== empId));
        } else {
            setSelectedEmployees([...selectedEmployees, empId]);
        }
    };

    const handleFilterByDepartment = (dept) => {
        if (dept === 'All') {
            return employees;
        }
        return employees.filter(emp => emp.department === dept);
    };

    const sendNotification = async () => {
        if (selectedEmployees.length === 0) {
            setError('Please select at least one employee');
            return;
        }

        if (!notification.title.trim() || !notification.message.trim()) {
            setError('Title and message are required');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            // This would be your actual API call
            // const response = await createNotification(
            //   selectedEmployees,
            //   'ANNOUNCEMENT',
            //   notification.title,
            //   notification.message,
            //   notification.priority
            // );

            // Mock successful response
            setTimeout(() => {
                setIsLoading(false);
                setSuccessMessage('Notification sent successfully!');

                // Reset form
                setNotification({
                    title: '',
                    message: '',
                    priority: 'NORMAL'
                });
                setSelectedEmployees([]);

                // Clear success message after 3 seconds
                setTimeout(() => setSuccessMessage(''), 3000);
            }, 1000);
        } catch (err) {
            setIsLoading(false);
            setError('Failed to send notification. Please try again.');
            console.error(err);
        }
    };

    const uniqueDepartments = ['All', ...new Set(employees.map(emp => emp.department))];
    const [selectedDepartment, setSelectedDepartment] = useState('All');
    const filteredEmployees = handleFilterByDepartment(selectedDepartment);

    return (
        <div className="notification-page">
            <div className="notification-header">
                <h1>Send Notifications</h1>
                <p>Compose and send notifications to employees</p>
            </div>

            <div className="notification-container">
                <div className="notification-form-section">
                    <h2>Notification Details</h2>
                    <div className="notification-form">
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={notification.title}
                                onChange={handleInputChange}
                                placeholder="Enter notification title"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={notification.message}
                                onChange={handleInputChange}
                                placeholder="Enter your message here"
                                rows="5"
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="priority">Priority</label>
                            <select
                                id="priority"
                                name="priority"
                                value={notification.priority}
                                onChange={handleInputChange}
                            >
                                <option value="LOW">Low</option>
                                <option value="NORMAL">Normal</option>
                                <option value="HIGH">High</option>
                                <option value="URGENT">Urgent</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="recipients-section">
                    <div className="recipients-header">
                        <h2>Select Recipients</h2>
                        <div className="filter-controls">
                            <div className="department-filter">
                                <label htmlFor="department">Department:</label>
                                <select
                                    id="department"
                                    value={selectedDepartment}
                                    onChange={(e) => setSelectedDepartment(e.target.value)}
                                >
                                    {uniqueDepartments.map(dept => (
                                        <option key={dept} value={dept}>{dept}</option>
                                    ))}
                                </select>
                            </div>
                            <button
                                className="select-all-btn"
                                onClick={handleSelectAll}
                            >
                                {selectedEmployees.length === employees.length ? 'Deselect All' : 'Select All'}
                            </button>
                        </div>
                    </div>

                    <div className="employees-list">
                        {filteredEmployees.map(employee => (
                            <div
                                key={employee.id}
                                className={`employee-item ${selectedEmployees.includes(employee.id) ? 'selected' : ''}`}
                                onClick={() => handleEmployeeSelect(employee.id)}
                            >
                                <div className="checkbox">
                                    <input
                                        type="checkbox"
                                        checked={selectedEmployees.includes(employee.id)}
                                        onChange={() => { }}
                                    />
                                </div>
                                <div className="employee-info">
                                    <div className="employee-name">{employee.name}</div>
                                    <div className="employee-detail">{employee.department} • {employee.email}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="notification-actions">
                <div className="selected-count">
                    Selected: <span>{selectedEmployees.length}</span> employees
                </div>
                <button
                    className={`send-btn ${isLoading ? 'loading' : ''}`}
                    onClick={sendNotification}
                    disabled={isLoading}
                >
                    {isLoading ? 'Sending...' : 'Send Notification'}
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
        </div>
    );
};

export default NotificationPage;