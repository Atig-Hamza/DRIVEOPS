import React from 'react';
import Sidebar from '../../components/SideBare';
import ApplicationDash from '../../components/ApplicationDash';

const Applications = () => {
    return (
        <div className="min-h-screen bg-[#FAFAFA] flex">
            <Sidebar />
            <div className="flex-1 ml-[280px]">
                <ApplicationDash />
            </div>
        </div>
    );
};

export default Applications;