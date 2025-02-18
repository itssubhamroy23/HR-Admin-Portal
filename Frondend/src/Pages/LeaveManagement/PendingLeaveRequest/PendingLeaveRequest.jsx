import React, { useState } from 'react';
import { Search, Download, Eye, CheckCircle, XCircle, User, PauseCircle } from 'lucide-react';
import './PendingLeaveRequest.css';

export default function PendingleaveRequests() {
    const [leaveRequests, setLeaveRequests] = useState([
        {
            id: 'GAL0001',
            employeeName: 'Subham Roy',
            employeeId: 'GAL0001',
            department: 'Engineering',
            leaveType: 'Annual Leave',
            startDate: '2024-03-20',
            endDate: '2024-03-22',
            duration: 3,
            reason: 'Family vacation',
            status: 'pending',
            appliedOn: '2024-03-15',
            documents: ['vacation_plan.pdf']
        },
        {
            id: 'GAL0002',
            employeeName: 'Bhaskar R',
            employeeId: 'GAL0002',
            department: 'Marketing',
            leaveType: 'Sick Leave',
            startDate: '2024-03-18',
            endDate: '2024-03-19',
            duration: 2,
            reason: 'Medical appointment',
            status: 'approved',
            appliedOn: '2024-03-14',
            documents: ['medical_certificate.pdf']
        },
        {
            id: 'GAL0003',
            employeeName: 'Sneha Das',
            employeeId: 'GAL0003',
            department: 'Sales',
            leaveType: 'Personal Leave',
            startDate: '2024-03-25',
            endDate: '2024-03-25',
            duration: 1,
            reason: 'Personal commitment',
            status: 'rejected',
            appliedOn: '2024-03-16'
        }
    ]);

    const [selectedRequest, setSelectedRequest] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const handleApprove = (id) => {
        setLeaveRequests(leaveRequests.filter(request => request.id !== id));
        setIsDetailsModalOpen(false);
    };

    const handleHold = (id) => {
        setLeaveRequests(
            leaveRequests.map(request =>
                request.id === id ? { ...request, status: 'onHold' } : request
            )
        );
        setIsDetailsModalOpen(false);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return 'leave-status-approved';
            case 'rejected': return 'leave-status-rejected';
            case 'pending': return 'leave-status-pending';
            case 'onHold': return 'leave-status-onHold';
            default: return 'leave-status-default';
        }
    };

    const filteredRequests = leaveRequests
        .filter(request => filterStatus === 'all' || request.status === filterStatus)
        .filter(request =>
            request.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            request.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
        );

    return (
        <div className="leave-container">
            <div className="leave-header">
                <div>
                    <h1 className="leave-title">Pending Leave Requests</h1>
                    <p className="leave-subtitle">Manage and process employee leave requests</p>
                </div>
                <button className="apply-leave-button">Apply For Leave</button>
            </div>

            <div className="leave-filters">
                <input
                    type="text"
                    placeholder="Search by Employee Name or ID"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="leave-search-input"
                />

                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="leave-select-filter"
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="onHold">On Hold</option>
                </select>
            </div>

            <div className="leave-table-container">
                <table className="leave-table">
                    <thead className="leave-table-head">
                        <tr>
                            <th className="leave-table-header">Employee</th>
                            <th className="leave-table-header">Leave Type</th>
                            <th className="leave-table-header">Duration</th>
                            <th className="leave-table-header">Status</th>
                            <th className="leave-table-header">Applied On</th>
                            <th className="leave-table-header leave-text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="leave-table-body">
                        {filteredRequests.map((request) => (
                            <tr key={request.id} className="leave-table-row">
                                <td className="leave-table-cell">
                                    <div className="leave-employee-info">
                                        <div className="leave-employee-avatar">
                                            <User className="leave-avatar-icon" />
                                        </div>
                                        <div className="leave-employee-details">
                                            <div className="leave-employee-name">{request.employeeName}</div>
                                            <div className="leave-employee-id">{request.employeeId}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="leave-table-cell">{request.leaveType}</td>
                                <td className="leave-table-cell">{request.duration} days</td>
                                <td className="leave-table-cell">
                                    <span className={`leave-status-badge ${getStatusColor(request.status)}`}>
                                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                    </span>
                                </td>
                                <td className="leave-table-cell">{new Date(request.appliedOn).toLocaleDateString()}</td>
                                <td className="leave-table-cell leave-text-right">
                                    <button
                                        onClick={() => {
                                            setSelectedRequest(request);
                                            setIsDetailsModalOpen(true);
                                        }}
                                        className="leave-details-button"
                                    >
                                        <Eye className="leave-icon" /> View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isDetailsModalOpen && selectedRequest && (
                <div className="leave-modal-overlay">
                    <div className="leave-modal">
                        <div className="leave-modal-header">
                            <h2 className="leave-modal-title">Leave Request Details</h2>
                            <p className="leave-modal-subtitle">Request ID: {selectedRequest.id}</p>
                            <button onClick={() => setIsDetailsModalOpen(false)} className="leave-close-button">
                                <XCircle className="leave-close-icon" />
                            </button>
                        </div>
                        <div className="leave-modal-body">
                            <p><strong>Employee Name:</strong> {selectedRequest.employeeName}</p>
                            <p><strong>Leave Type:</strong> {selectedRequest.leaveType}</p>
                            <p><strong>Reason:</strong> {selectedRequest.reason}</p>
                            <p><strong>Leave Dates:</strong> {new Date(selectedRequest.startDate).toLocaleDateString()} - {new Date(selectedRequest.endDate).toLocaleDateString()}</p>
                            <p><strong>Duration:</strong> {selectedRequest.duration} days</p>
                            <p><strong>Status:</strong> {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}</p>
                        </div>
                        <div className="leave-modal-footer">
                            <button className="leave-approve-button" onClick={() => handleApprove(selectedRequest.id)}>
                                <CheckCircle className="leave-icon" /> Approve
                            </button>
                            <button className="leave-hold-button" onClick={() => handleHold(selectedRequest.id)}>
                                <PauseCircle className="leave-icon" /> On Hold
                            </button>
                            <button className="leave-reject-button">
                                <XCircle className="leave-icon" /> Reject
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
