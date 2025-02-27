import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Users,
    Search,
    Download,
    Upload,
    Plus,
    Mail,
    Phone,
    MapPin,
    Calendar
} from 'lucide-react';
import './EmployeeDatabase.css';

const EmployeeDatabase = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        department: '',
        location: '',
        status: ''
    });
    const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);

    const mockEmployees = [
        {
            id: 'GAL0001',
            name: 'Subham Roy',
            email: 'subham@company.com',
            phone: '+91 7670035943',
            department: 'Engineering',
            designation: 'Senior Software Engineer',
            location: 'Silchar',
            joinDate: '2025-01-15',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
            status: 'Active'
        },
        {
            id: 'GAL0002',
            name: 'Salma Shirin',
            email: 'salma.shirin@company.com',
            phone: '+91 8876023245',
            department: 'Marketing',
            designation: 'Marketing Manager',
            location: 'Bengaluru',
            joinDate: '2025-03-01',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
            status: 'On Leave'
        },
        {
            id: 'GAL0003',
            name: 'Bhaskar R',
            email: 'bhaskar.r@company.com',
            phone: '+91 9435176483',
            department: 'Design',
            designation: 'UI/UX Designer',
            location: 'Bengaluru',
            joinDate: '2025-06-15',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
            status: 'Active'
        }
    ];

    const departments = Array.from(new Set(mockEmployees.map(emp => emp.department)));
    const locations = Array.from(new Set(mockEmployees.map(emp => emp.location)));
    const statuses = ['Active', 'On Leave', 'Inactive'];

    const filteredEmployees = mockEmployees.filter(employee => {
        const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilters = (!filters.department || employee.department === filters.department) &&
            (!filters.location || employee.location === filters.location) &&
            (!filters.status || employee.status === filters.status);

        return matchesSearch && matchesFilters;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'status-active';
            case 'On Leave': return 'status-on-leave';
            case 'Inactive': return 'status-inactive';
            default: return 'status-default';
        }
    };

    const handleAddEmployeeClick = () => {
        setShowAddEmployeeModal(true);
    };

    const handleCloseModal = () => {
        setShowAddEmployeeModal(false);
    };

    return (
        <div className="employee-db-container">
            <div className="employee-db-header">
                <div className="employee-db-title">
                    <Users className="employee-db-icon" />
                    <h1>Employee Database</h1>
                </div>
                <div className="employee-db-buttons">
                    <button className="employee-db-btn">
                        <Download className="employee-db-btn-icon" /> Export
                    </button>
                    <button className="employee-db-btn">
                        <Upload className="employee-db-btn-icon" /> Import
                    </button>
                    <button className="employee-db-btn-add" onClick={handleAddEmployeeClick}>
                        <Plus className="employee-db-btn-icon" /> Add Employee
                    </button>
                </div>
            </div>

            {/* Add Employee Modal */}
            {showAddEmployeeModal && (
                <div className="employee-db-modal-overlay">
                    <div className="employee-db-modal">
                        <h2>Add Employee</h2>
                        <form>
                            <h3>Employment Details</h3>
                            <label>Employee ID</label>
                            <input type="text" placeholder="Employee ID" />
                            <label>Job Title</label>
                            <input type="text" placeholder="Job Title" />
                            <label>Line Manager</label>
                            <input type="text" placeholder="Line Manager" />
                            <label>Location</label>
                            <input type="text" placeholder="Location" />
                            <label>Office Email</label>
                            <input type="email" placeholder="Office Email" />
                            <label>Date of Joining</label>
                            <input type="date" />
                            <label>Employment Type</label>
                            <input type="text" placeholder="Employment Type" />
                            <label>UAN</label>
                            <input type="text" placeholder="UAN" />
                            <label>PF Account Number</label>
                            <input type="text" placeholder="PF Account Number" />

                            <h3>Bank Details</h3>
                            <label>Account Holder's Name</label>
                            <input type="text" placeholder="Account Holder's Name" />
                            <label>Bank Name</label>
                            <input type="text" placeholder="Bank Name" />
                            <label>Account Number</label>
                            <input type="text" placeholder="Account Number" />
                            <label>IFSC Code</label>
                            <input type="text" placeholder="IFSC Code" />
                            <label>Account Status</label>
                            <input type="text" placeholder="Account Status" />
                            <label>ESIC Number</label>
                            <input type="text" placeholder="ESIC Number" />

                            <div className="employee-db-modal-buttons">
                                <button type="submit">Save</button>
                                <button type="button" onClick={handleCloseModal}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="employee-db-filters">
                <div className="employee-db-search-container">
                    <Search className="employee-db-search-icon" />
                    <input
                        type="text"
                        placeholder="Search employees..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="employee-db-search"
                    />
                </div>
                <select
                    value={filters.department}
                    onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                    className="employee-db-select"
                >
                    <option value="">All Departments</option>
                    {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                    ))}
                </select>
                <select
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    className="employee-db-select"
                >
                    <option value="">All Locations</option>
                    {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                    ))}
                </select>
            </div>

            <div className="employee-db-table-container">
                <table className="employee-db-table">
                    <thead>
                        <tr>
                            <th>Employee</th>
                            <th>Contact</th>
                            <th>Department</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Join Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map((employee) => (
                            <tr key={employee.id} className="employee-db-row" onClick={() => navigate(`/employees/${employee.id}`)}>
                                <td>
                                    <div className="employee-db-profile">
                                        <img className="employee-db-avatar" src={employee.avatar} alt={employee.name} />
                                        <div>
                                            <div className="employee-db-name">{employee.name}</div>
                                            <div className="employee-db-id">{employee.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="employee-db-contact">
                                        <Mail className="employee-db-contact-icon" /> {employee.email}
                                    </div>
                                    <div className="employee-db-contact">
                                        <Phone className="employee-db-contact-icon" /> {employee.phone}
                                    </div>
                                </td>
                                <td>
                                    <div>{employee.department}</div>
                                    <div className="employee-db-designation">{employee.designation}</div>
                                </td>
                                <td>
                                    <div className="employee-db-location">
                                        <MapPin className="employee-db-contact-icon" /> {employee.location}
                                    </div>
                                </td>
                                <td>
                                    <span className={`employee-db-status ${getStatusColor(employee.status)}`}>
                                        {employee.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="employee-db-join-date">
                                        <Calendar className="employee-db-contact-icon" /> {new Date(employee.joinDate).toLocaleDateString()}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeDatabase;
