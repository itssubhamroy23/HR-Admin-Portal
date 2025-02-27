import React, { useState } from 'react';
import './EmployeeForm.css';

const EmployeeForm = () => {
    const [activeTab, setActiveTab] = useState('employment'); // Default tab to employment details
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        position: '',
        department: '',
        joiningDate: '',
        salary: '',
        manager: '',
        bankName: '',
        accountNumber: '',
        ifscCode: '',
        branch: '',
        accountType: 'savings',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
        console.log('Form submitted:', formData);
    };

    const handleTabSwitch = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="popup">
            <div className="popup-header">
                <h2>Add Employee</h2>
                <button className="close-btn">X</button>
            </div>

            {/* Tab Navigation */}
            <div className="tabs">
                <button
                    className={`tab ${activeTab === 'employment' ? 'active' : ''}`}
                    onClick={() => handleTabSwitch('employment')}
                >
                    Employment Details
                </button>
                <button
                    className={`tab ${activeTab === 'bank' ? 'active' : ''}`}
                    onClick={() => handleTabSwitch('bank')}
                >
                    Bank Details
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Tab Content */}
                <div className="tab-content">
                    {activeTab === 'employment' && (
                        <div className="form-section">
                            <h3>Employment Details</h3>
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter Name"
                            />
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter Email"
                            />
                            <label>Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter Phone Number"
                            />
                            <label>Position</label>
                            <input
                                type="text"
                                name="position"
                                value={formData.position}
                                onChange={handleChange}
                                placeholder="Enter Position"
                            />
                            <label>Department</label>
                            <input
                                type="text"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                placeholder="Enter Department"
                            />
                            <label>Joining Date</label>
                            <input
                                type="date"
                                name="joiningDate"
                                value={formData.joiningDate}
                                onChange={handleChange}
                            />
                            <label>Salary</label>
                            <input
                                type="text"
                                name="salary"
                                value={formData.salary}
                                onChange={handleChange}
                                placeholder="Enter Salary"
                            />
                            <label>Manager</label>
                            <input
                                type="text"
                                name="manager"
                                value={formData.manager}
                                onChange={handleChange}
                                placeholder="Enter Manager Name"
                            />
                        </div>
                    )}

                    {activeTab === 'bank' && (
                        <div className="form-section">
                            <h3>Bank Details</h3>
                            <label>Bank Name</label>
                            <input
                                type="text"
                                name="bankName"
                                value={formData.bankName}
                                onChange={handleChange}
                                placeholder="Enter Bank Name"
                            />
                            <label>Account Number</label>
                            <input
                                type="text"
                                name="accountNumber"
                                value={formData.accountNumber}
                                onChange={handleChange}
                                placeholder="Enter Account Number"
                            />
                            <label>IFSC Code</label>
                            <input
                                type="text"
                                name="ifscCode"
                                value={formData.ifscCode}
                                onChange={handleChange}
                                placeholder="Enter IFSC Code"
                            />
                            <label>Branch</label>
                            <input
                                type="text"
                                name="branch"
                                value={formData.branch}
                                onChange={handleChange}
                                placeholder="Enter Branch Name"
                            />
                            <label>Account Type</label>
                            <select
                                name="accountType"
                                value={formData.accountType}
                                onChange={handleChange}
                            >
                                <option value="savings">Savings</option>
                                <option value="current">Current</option>
                            </select>
                        </div>
                    )}
                </div>

                {/* Footer Buttons */}
                <div className="footer">
                    <button className="cancel-btn" type="button">
                        Cancel
                    </button>
                    <button className="save-btn" type="submit">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EmployeeForm;
