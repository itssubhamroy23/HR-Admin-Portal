import React, { useState } from 'react';
import {
    Shield,
    Users,
    Clock,
    Calendar,
    GraduationCap,
    Award,
    Settings,
    Check,
    X,
    Info,
    Search,
    UserCog,
    Save
} from 'lucide-react';
import './RoleManagement.css';

const RolePermissions = () => {
    const [selectedRole, setSelectedRole] = useState('Director');
    const [showPermissionInfo, setShowPermissionInfo] = useState(null);
    const [showAssignRole, setShowAssignRole] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingPermissions, setEditingPermissions] = useState(false);
    const [tempPermissions, setTempPermissions] = useState([]);

    // Mock employees data
    const employees = [
        {
            id: 'EMP001',
            name: 'John Doe',
            email: 'john.doe@company.com',
            department: 'Engineering',
            role: 'Employee',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
        },
        {
            id: 'EMP002',
            name: 'Sarah Wilson',
            email: 'sarah.wilson@company.com',
            department: 'Marketing',
            role: 'Line Manager',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
        },
        {
            id: 'EMP003',
            name: 'Michael Chen',
            email: 'michael.chen@company.com',
            department: 'Design',
            role: 'Employee',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
        }
    ];

    // Mock permissions data
    const permissions = [
        {
            id: 'emp_view',
            name: 'View Employees',
            description: 'View employee profiles and basic information',
            module: 'employees',
            actions: ['view']
        },
        {
            id: 'emp_manage',
            name: 'Manage Employees',
            description: 'Create, edit, and delete employee profiles',
            module: 'employees',
            actions: ['create', 'edit', 'delete']
        },
        {
            id: 'att_view',
            name: 'View Attendance',
            description: 'View attendance records and reports',
            module: 'attendance',
            actions: ['view']
        },
        {
            id: 'att_manage',
            name: 'Manage Attendance',
            description: 'Modify attendance records and manage time entries',
            module: 'attendance',
            actions: ['edit', 'approve']
        },
        {
            id: 'leave_view',
            name: 'View Leave Requests',
            description: 'View leave applications and balances',
            module: 'leave',
            actions: ['view']
        },
        {
            id: 'leave_manage',
            name: 'Manage Leave Requests',
            description: 'Approve or reject leave requests',
            module: 'leave',
            actions: ['approve']
        },
        {
            id: 'training_view',
            name: 'View Training Programs',
            description: 'View training courses and materials',
            module: 'training',
            actions: ['view']
        },
        {
            id: 'training_manage',
            name: 'Manage Training Programs',
            description: 'Create and manage training programs',
            module: 'training',
            actions: ['create', 'edit', 'delete']
        },
        {
            id: 'cert_view',
            name: 'View Certifications',
            description: 'View certification records',
            module: 'certifications',
            actions: ['view']
        },
        {
            id: 'cert_manage',
            name: 'Manage Certifications',
            description: 'Issue and manage certifications',
            module: 'certifications',
            actions: ['create', 'edit', 'delete']
        },
        {
            id: 'role_view',
            name: 'View Roles',
            description: 'View role assignments and permissions',
            module: 'roles',
            actions: ['view']
        },
        {
            id: 'role_manage',
            name: 'Manage Roles',
            description: 'Modify role permissions and assignments',
            module: 'roles',
            actions: ['edit']
        }
    ];

    // Mock role permissions data
    const rolePermissions = {
        Director: {
            role: 'Director',
            permissions: permissions.map(p => p.id) // All permissions
        },
        'HR Manager': {
            role: 'HR Manager',
            permissions: [
                'emp_view', 'emp_manage',
                'att_view', 'att_manage',
                'leave_view', 'leave_manage',
                'training_view', 'training_manage',
                'cert_view', 'cert_manage',
                'role_view'
            ]
        },
        'Line Manager': {
            role: 'Line Manager',
            permissions: [
                'emp_view',
                'att_view',
                'leave_view', 'leave_manage',
                'training_view',
                'cert_view'
            ]
        },
        Employee: {
            role: 'Employee',
            permissions: [
                'emp_view',
                'att_view',
                'leave_view',
                'training_view',
                'cert_view'
            ]
        }
    };

    const modules = [
        { id: 'employees', name: 'Employees', icon: Users },
        { id: 'attendance', name: 'Attendance', icon: Clock },
        { id: 'leave', name: 'Leave Management', icon: Calendar },
        { id: 'training', name: 'Training', icon: GraduationCap },
        { id: 'certifications', name: 'Certifications', icon: Award },
        { id: 'roles', name: 'Roles & Permissions', icon: Settings }
    ];

    const hasPermission = (permissionId) => {
        if (editingPermissions) {
            return tempPermissions.includes(permissionId);
        }
        return rolePermissions[selectedRole].permissions.includes(permissionId);
    };

    const getModulePermissions = (moduleId) => {
        return permissions.filter(p => p.module === moduleId);
    };

    const handleEditPermissions = () => {
        setEditingPermissions(true);
        setTempPermissions([...rolePermissions[selectedRole].permissions]);
    };

    const handleSavePermissions = () => {
        // In a real application, this would make an API call to update permissions
        rolePermissions[selectedRole].permissions = [...tempPermissions];
        setEditingPermissions(false);
    };

    const togglePermission = (permissionId) => {
        if (tempPermissions.includes(permissionId)) {
            setTempPermissions(tempPermissions.filter(id => id !== permissionId));
        } else {
            setTempPermissions([...tempPermissions, permissionId]);
        }
    };

    const handleUpdateEmployeeRole = (employeeId, newRole) => {
        // In a real application, this would make an API call to update the employee's role
        console.log(`Updating employee ${employeeId} to role ${newRole}`);
    };

    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const PermissionInfo = ({ permission }) => (
        <div className="rolemgmt-permission-info">
            <h4 className="rolemgmt-permission-info-title">{permission.name}</h4>
            <p className="rolemgmt-permission-info-desc">{permission.description}</p>
            <div className="rolemgmt-permission-actions-container">
                <p className="rolemgmt-permission-actions-title">Allowed Actions:</p>
                <div className="rolemgmt-permission-actions-list">
                    {permission.actions.map(action => (
                        <span
                            key={action}
                            className="rolemgmt-permission-action-tag"
                        >
                            {action}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );

    const AssignRoleModal = () => (
        <div className="rolemgmt-modal-overlay">
            <div className="rolemgmt-modal-container">
                <div className="rolemgmt-modal-header">
                    <h3 className="rolemgmt-modal-title">Assign Roles to Employees</h3>
                    <button
                        onClick={() => setShowAssignRole(false)}
                        className="rolemgmt-modal-close-btn"
                    >
                        ×
                    </button>
                </div>

                <div className="rolemgmt-search-container">
                    <div className="rolemgmt-search-input-wrapper">
                        <Search className="rolemgmt-search-icon" />
                        <input
                            type="text"
                            placeholder="Search employees..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="rolemgmt-search-input"
                        />
                    </div>
                </div>

                <div className="rolemgmt-employee-list">
                    {filteredEmployees.map((employee) => (
                        <div
                            key={employee.id}
                            className="rolemgmt-employee-item"
                        >
                            <div className="rolemgmt-employee-info">
                                <img
                                    src={employee.avatar}
                                    alt={employee.name}
                                    className="rolemgmt-employee-avatar"
                                />
                                <div>
                                    <h4 className="rolemgmt-employee-name">{employee.name}</h4>
                                    <p className="rolemgmt-employee-department">{employee.department}</p>
                                </div>
                            </div>
                            <div className="rolemgmt-employee-role-select-container">
                                <select
                                    value={employee.role}
                                    onChange={(e) => handleUpdateEmployeeRole(employee.id, e.target.value)}
                                    className="rolemgmt-employee-role-select"
                                >
                                    {Object.keys(rolePermissions).map((role) => (
                                        <option key={role} value={role}>{role}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="rolemgmt-container">
            <div className="rolemgmt-header">
                <div className="rolemgmt-title-container">
                    <Shield className="rolemgmt-title-icon" />
                    <h1 className="rolemgmt-title-text">Role Permissions</h1>
                </div>
                {selectedRole === 'Director' && (
                    <button
                        onClick={() => setShowAssignRole(true)}
                        className="rolemgmt-assign-roles-btn"
                    >
                        <UserCog className="rolemgmt-btn-icon" />
                        Assign Roles
                    </button>
                )}
            </div>

            {/* Role Selector */}
            <div className="rolemgmt-role-selector-card">
                <div className="rolemgmt-card-header">
                    <h2 className="rolemgmt-section-title">Select Role</h2>
                    {selectedRole === 'Director' && !editingPermissions && (
                        <button
                            onClick={handleEditPermissions}
                            className="rolemgmt-edit-permissions-btn"
                        >
                            Edit Permissions
                        </button>
                    )}
                    {editingPermissions && (
                        <button
                            onClick={handleSavePermissions}
                            className="rolemgmt-save-permissions-btn"
                        >
                            <Save className="rolemgmt-btn-icon" />
                            Save Changes
                        </button>
                    )}
                </div>
                <div className="rolemgmt-role-buttons-container">
                    {Object.keys(rolePermissions).map((role) => (
                        <button
                            key={role}
                            onClick={() => {
                                if (editingPermissions) {
                                    if (window.confirm('Discard changes?')) {
                                        setEditingPermissions(false);
                                        setSelectedRole(role);
                                    }
                                } else {
                                    setSelectedRole(role);
                                }
                            }}
                            className={`rolemgmt-role-button ${selectedRole === role
                                ? 'rolemgmt-role-button-active'
                                : 'rolemgmt-role-button-inactive'
                                }`}
                        >
                            {role}
                        </button>
                    ))}
                </div>
            </div>

            {/* Permissions Grid */}
            <div className="rolemgmt-permissions-card">
                <h2 className="rolemgmt-section-title">Permissions</h2>
                <div className="rolemgmt-permissions-grid">
                    {modules.map((module) => (
                        <div
                            key={module.id}
                            className="rolemgmt-module-card"
                        >
                            <div className="rolemgmt-module-header">
                                <module.icon className="rolemgmt-module-icon" />
                                <h3 className="rolemgmt-module-title">{module.name}</h3>
                            </div>
                            <div className="rolemgmt-permissions-list">
                                {getModulePermissions(module.id).map((permission) => (
                                    <div
                                        key={permission.id}
                                        className={`rolemgmt-permission-item ${editingPermissions ? 'rolemgmt-permission-editable' : ''
                                            }`}
                                        onClick={() => editingPermissions && togglePermission(permission.id)}
                                        onMouseEnter={() => setShowPermissionInfo(permission.id)}
                                        onMouseLeave={() => setShowPermissionInfo(null)}
                                    >
                                        <div className="rolemgmt-permission-name-container">
                                            <span className="rolemgmt-permission-name">{permission.name}</span>
                                            <button
                                                className="rolemgmt-permission-info-btn"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setShowPermissionInfo(
                                                        showPermissionInfo === permission.id ? null : permission.id
                                                    );
                                                }}
                                            >
                                                <Info className="rolemgmt-info-icon" />
                                            </button>
                                        </div>
                                        {hasPermission(permission.id) ? (
                                            <Check className="rolemgmt-check-icon" />
                                        ) : (
                                            <X className="rolemgmt-x-icon" />
                                        )}
                                        {showPermissionInfo === permission.id && (
                                            <div className="rolemgmt-permission-tooltip">
                                                <PermissionInfo permission={permission} />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showAssignRole && <AssignRoleModal />}
        </div>
    );
};

export default RolePermissions;