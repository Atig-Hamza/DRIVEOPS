import React from 'react';
import Sidebar from '../../components/SideBare';
import TruckDash from '../../components/TruckDash';

const Trucks = () => {
    return (
        <div className="min-h-screen bg-[#FAFAFA] flex">
            <Sidebar />
            <div className="flex-1 ml-[280px]">
                <TruckDash />
            </div>
        </div>
    );
};

export default Trucks;
