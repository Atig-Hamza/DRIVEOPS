import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
    Users,
    FileText,
    CheckCircle,
    XCircle,
    Clock,
    Search,
    Filter,
    MoreHorizontal,
    Download,
    Calendar,
    ArrowUpRight,
    ArrowDownRight,
    Mail,
    Phone
} from 'lucide-react';

const ApplicationRow = ({ id, name, email, phone, status, date, type, cv, onReview }) => {
    const getStatusStyle = (status) => {
        const normalizedStatus = status ? status.toLowerCase() : '';
        switch (normalizedStatus) {
            case 'pending': return 'bg-orange-50 text-orange-700 border-orange-100';
            case 'approved': return 'bg-green-50 text-green-700 border-green-100';
            case 'rejected': return 'bg-red-50 text-red-700 border-red-100';
            default: return 'bg-gray-50 text-gray-700 border-gray-100';
        }
    };

    const displayStatus = status ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase() : 'Unknown';
    const cvUrl = cv ? `http://localhost:4000/${cv.replace(/\\/g, '/')}` : null;

    return (
        <div className="group flex items-center px-4 py-3 hover:bg-neutral-50 rounded-xl transition-all duration-200 border border-transparent hover:border-neutral-100">
            <div className="flex items-center gap-4 w-[25%]">
                <div className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center text-neutral-600 font-serif font-bold text-lg group-hover:bg-white group-hover:shadow-sm transition-all">
                    {name.charAt(0)}
                </div>
                <div className="overflow-hidden">
                    <h4 className="text-sm font-bold text-neutral-900 font-serif truncate">{name}</h4>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-500 mt-1 truncate">
                        <Mail size={12} className="shrink-0" />
                        <span className="truncate">{email}</span>
                    </div>
                </div>
            </div>
            
            <div className="hidden md:block w-[20%]">
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <Phone size={14} className="text-neutral-400" />
                    {phone}
                </div>
            </div>

            <div className="hidden md:block w-[15%]">
                <div className="text-sm font-medium text-neutral-900">Driver</div>
            </div>

            <div className="hidden md:block w-[15%]">
                <div className="flex items-center gap-1.5 text-sm text-neutral-600">
                    <Calendar size={14} className="text-neutral-400" />
                    {new Date(date).toLocaleDateString()}
                </div>
            </div>

            <div className="w-[5%] flex justify-center">
                {cvUrl ? (
                    <a 
                        href={cvUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition-all text-neutral-400 hover:text-neutral-900"
                        title="View CV"
                    >
                        <FileText size={18} />
                    </a>
                ) : (
                    <span className="text-neutral-300">-</span>
                )}
            </div>

            <div className="w-[10%] flex justify-center">
                <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusStyle(status)}`}>
                    {displayStatus}
                </div>
            </div>

            <div className="w-[10%] flex justify-end gap-2">
                {status === 'pending' && (
                    <>
                        <button 
                            onClick={() => onReview(email, 'approved')}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-green-50 text-neutral-400 hover:text-green-600 transition-all"
                            title="Approve"
                        >
                            <CheckCircle size={18} />
                        </button>
                        <button 
                            onClick={() => onReview(email, 'rejected')}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-all"
                            title="Reject"
                        >
                            <XCircle size={18} />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

const ApplicationDash = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:4000/api/applications', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setApplications(response.data);
                setLoading(false);
                console.log('Fetched applications:', response.data);
            } catch (err) {
                console.error('Error fetching applications:', err);
                setError('Failed to load applications');
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    const handleReview = async (email, status) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:4000/api/applications/review', 
                { email, approve: status === 'approved' },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            // Update local state
            setApplications(apps => apps.map(app => 
                app.Email === email ? { ...app, status } : app
            ));
        } catch (err) {
            console.error('Error updating status:', err);
            alert('Failed to update application status');
        }
    };

    if (loading) return <div className="p-8">Loading...</div>;
    if (error) return <div className="p-8 text-red-500">{error}</div>;

    return (
        <div className="p-8 w-full max-w-[1600px] mx-auto font-sans">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-neutral-900 tracking-tight">Applications</h1>
                    <div className="flex items-center gap-2 mt-2 text-neutral-500 text-sm">
                        <Users size={14} />
                        <span>Manage driver applications and recruitment</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative hidden md:block group">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-neutral-900 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search applicants..."
                            className="pl-10 pr-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent w-72 transition-all shadow-sm"
                        />
                    </div>
                    <button className="p-3 bg-white border border-neutral-200 rounded-xl text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-all relative shadow-sm flex items-center gap-2">
                        <Filter size={18} />
                        <span className="text-sm font-medium hidden md:block">Filter</span>
                    </button>
                    <button className="px-5 py-3 bg-neutral-900 text-white rounded-xl text-sm font-bold hover:bg-neutral-800 transition-all shadow-lg shadow-neutral-900/20 flex items-center gap-2">
                        <Download size={18} />
                        <span>Export List</span>
                    </button>
                </div>
            </div>


            <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden flex flex-col">
                <div className="p-8 border-b border-neutral-100 flex justify-between items-center bg-white">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-serif font-bold text-neutral-900">Recent Applications</h2>
                        <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 text-xs font-bold">{applications.length} New</span>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg transition-colors">
                            All
                        </button>
                    </div>
                </div>

                <div className="p-4">
                    <div className="hidden md:flex items-center px-4 py-3 text-xs font-semibold text-neutral-400 uppercase tracking-wider border-b border-neutral-50 mb-2">
                        <div className="w-[25%]">Applicant</div>
                        <div className="w-[20%]">Contact</div>
                        <div className="w-[15%]">Position</div>
                        <div className="w-[15%]">Applied Date</div>
                        <div className="w-[5%] text-center">CV</div>
                        <div className="w-[10%] text-center">Status</div>
                        <div className="w-[10%] text-right">Actions</div>
                    </div>

                    <div className="space-y-1">
                        {applications.map((app) => (
                            <ApplicationRow
                                key={app._id}
                                id={app._id}
                                name={`${app.Full_name}`}
                                email={app.Email}
                                phone={app.Phone_number}
                                status={app.status}
                                date={app.createdAt}
                                cv={app.CV}
                                onReview={handleReview}
                            />
                        ))}
                        {applications.length === 0 && (
                            <div className="text-center py-8 text-neutral-500">
                                No applications found.
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-4 border-t border-neutral-100 bg-neutral-50/50 flex justify-center">
                    <button className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors">
                        Load More Applications
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApplicationDash;
