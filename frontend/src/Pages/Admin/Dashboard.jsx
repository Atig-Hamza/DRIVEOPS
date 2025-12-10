import React from 'react';
import Sidebar from '../../components/SideBare';
import AdminDash from '../../components/AdminDash';

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-[#FAFAFA] flex">
            <Sidebar />
            <div className="flex-1 ml-[280px]">
                <AdminDash />
            </div>
        </div>
    );
};

export default Dashboard;