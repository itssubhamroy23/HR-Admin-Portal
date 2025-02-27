import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Attendance from './Pages/Attendance/Attendance';
import DailyAttendance from './Pages/Attendance/DailyAttendance/DailyAttendance';
import AttendanceDashboard from './Pages/Attendance/AttendanceDashboard/AttendanceDashboard';
import TrainingAndLearning from './Pages/TrainingAndLearning/TrainingAndLearning';
import Certification from './Pages/Certification/Certification';
import Dashboard from './Pages/Dashboard/Dashboard';
import EmployeeDatabase from './Pages/Employee/EmployeeDatabase/EmployeeDatabase';
import EmployeeDetails from './Pages/Employee/EmployeeDetails/EmployeeDetails';
import LeaveManagement from './Pages/LeaveManagement/LeaveManagement';
import LeaveRequests from './Pages/LeaveManagement/PendingLeaveRequest/PendingLeaveRequest';
import LeaveHistory from './Pages/LeaveManagement/LeaveHistory/LeaveHistory';
import LeavePolicy from './Pages/LeaveManagement/LeavePolicy/LeavePolicy';
import RolePermissions from './Pages/RoleManagement/RoleManagement';
import TrainingDetails from './Pages/TrainingAndLearning/TrainingDetails/TrainingDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="role-permissions" element={<RolePermissions />} />

          <Route path="/attendance" element={<Attendance />}>
            <Route path="daily" element={<DailyAttendance />} />
            <Route path="dashboard" element={<AttendanceDashboard />} />
          </Route>
          <Route path="leave-management" element={<LeaveManagement />} />
          <Route path="leave-management/leave-requests" element={<LeaveRequests />} />
          <Route path="leave-management/leave-history" element={<LeaveHistory />} />
          <Route path="leave-management/leave-policy" element={<LeavePolicy />} />
          <Route path="employee" element={<EmployeeDatabase />} />
          <Route path="employees/:id" element={<EmployeeDetails />} />
          <Route path="training" element={<TrainingAndLearning />} />


          <Route path="/training/:id" element={<TrainingDetails />} />

          <Route path="certification" element={<Certification />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
