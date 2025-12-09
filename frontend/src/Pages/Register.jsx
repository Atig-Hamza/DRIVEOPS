import React, { useState, useRef } from 'react';
import { ArrowRight, UploadCloud, FileText, X, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    });
    const [cvFile, setCvFile] = useState(null);
    const fileInputRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setCvFile(file);
    };

    const handleRemoveFile = (e) => {
        e.stopPropagation();
        setCvFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('Full_name', formData.name);
            formDataToSend.append('Email', formData.email);
            formDataToSend.append('Phone_number', formData.phone);
            formDataToSend.append('Password', formData.password);
            if (cvFile) {
                formDataToSend.append('CV', cvFile);
            }

            const response = await axios.post('http://localhost:4000/api/applications', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Response:', response.data);
            setSuccess(true);
        } catch (error) {
            console.error('Error submitting application:', error);
            setError(error.response?.data?.message || 'Error submitting application');
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center py-12 px-6 font-sans text-neutral-900">
                <div className="w-full max-w-lg text-center mb-12">
                    <a href="/" className="inline-flex items-center gap-2 mb-8">
                        <div className="text-2xl font-serif font-bold tracking-tighter text-neutral-900 flex items-center gap-1">
                            DriveOps
                            <div className="w-2 h-2 rounded-full bg-neutral-900 mt-2"></div>
                        </div>
                    </a>
                    <div className="bg-neutral-50 border border-neutral-200 p-8 text-center">
                        <div className="w-16 h-16 bg-neutral-900 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                            <Truck size={32} />
                        </div>
                        <h2 className="text-2xl font-serif font-bold mb-4">Application Submitted</h2>
                        <p className="text-neutral-600 mb-6">
                            Thank you for applying to join our driver network. We have received your application and will review it shortly.
                        </p>
                        <Link to="/" className="inline-block bg-neutral-900 text-white px-8 py-3 font-medium hover:bg-neutral-800 transition-colors">
                            Return Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center py-12 px-6 font-sans text-neutral-900">
            <div className="w-full max-w-lg text-center mb-12">
                <a href="/" className="inline-flex items-center gap-2 mb-8">
                    <div className="text-2xl font-serif font-bold tracking-tighter text-neutral-900 flex items-center gap-1">
                        DriveOps
                        <div className="w-2 h-2 rounded-full bg-neutral-900 mt-2"></div>
                    </div>
                </a>
                <h1 className="text-4xl md:text-5xl font-serif tracking-tight mb-4">Application Form</h1>
                <p className="text-neutral-500 text-lg font-light">
                    Please fill out the details below to join our driver network.
                </p>
            </div>
            <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-8">
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                <div className="flex flex-col">
                    <label className="text-sm font-bold uppercase tracking-widest text-neutral-900 mb-2">Full Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Hamza Atig"
                        className="w-full bg-neutral-50 border-b-2 border-neutral-200 px-4 py-4 outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-400 text-lg"
                        required
                    />
                    <span className="text-xs text-neutral-400 italic mt-2">
                        * Please use your legal name as it appears on your ID.
                    </span>
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-bold uppercase tracking-widest text-neutral-900 mb-2">Email Address</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com"
                        className="w-full bg-neutral-50 border-b-2 border-neutral-200 px-4 py-4 outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-400 text-lg"
                        required
                    />
                    <span className="text-xs text-neutral-400 italic mt-2">
                        * We will send the confirmation link to this address.
                    </span>
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-bold uppercase tracking-widest text-neutral-900 mb-2">Mobile Number</label>
                    <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-neutral-50 border-b-2 border-neutral-200 px-4 py-4 outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-400 text-lg"
                        required
                    />
                    <span className="text-xs text-neutral-400 italic mt-2">
                        * Used for two-factor authentication and urgent dispatch alerts.
                    </span>
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-bold uppercase tracking-widest text-neutral-900 mb-2">Resume / CV</label>
                    <div
                        className={`relative border border-dashed rounded-none p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${cvFile ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-300 hover:bg-neutral-50'}`}
                        onClick={() => fileInputRef.current.click()}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                        />

                        {cvFile ? (
                            <div className="flex items-center gap-4 w-full justify-center">
                                <div className="w-10 h-10 bg-neutral-100 flex items-center justify-center text-neutral-900">
                                    <FileText size={20} />
                                </div>
                                <div className="text-left">
                                    <div className="text-sm font-bold text-neutral-900">{cvFile.name}</div>
                                    <div className="text-xs text-neutral-500">{(cvFile.size / 1024 / 1024).toFixed(2)} MB</div>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleRemoveFile}
                                    className="ml-2 p-2 hover:bg-neutral-200 transition-colors text-neutral-500"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        ) : (
                            <>
                                <UploadCloud size={24} className="text-neutral-400 mb-3" />
                                <div className="text-sm font-medium text-neutral-900">Click to upload document</div>
                            </>
                        )}
                    </div>
                    <span className="text-xs text-neutral-400 italic mt-2">
                        * PDF or Word documents only. Maximum file size 5MB.
                    </span>
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-bold uppercase tracking-widest text-neutral-900 mb-2">Password</label>
                    <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Create a secure password"
                        className="w-full bg-neutral-50 border-b-2 border-neutral-200 px-4 py-4 outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-400 text-lg"
                        required
                    />
                    <span className="text-xs text-neutral-400 italic mt-2">
                        * Must contain at least 8 characters, one uppercase letter, and one number.
                    </span>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-bold uppercase tracking-widest text-neutral-900 mb-2">Experience Requirement</label>
                    <div className="bg-neutral-50 border border-neutral-200 p-4 text-sm text-neutral-700">
                        <p>We are hiring drivers with at least 3 years of driving experience. By checking the box below you confirm you meet the minimum experience and basic requirements:</p>
                        <ul className="list-disc list-inside mt-2 text-neutral-600">
                            <li>Minimum 3 years professional driving experience</li>
                            <li>Valid driver's license and clean driving record</li>
                            <li>Willing to pass a background check</li>
                            <li>Own a smartphone for dispatching</li>
                        </ul>
                        <label className="mt-3 inline-flex items-center gap-2">
                            <input
                                type="checkbox"
                                required
                                checked={!!formData.agreedExperience}
                                onChange={(e) => setFormData({ ...formData, agreedExperience: e.target.checked })}
                                className="w-4 h-4"
                            />
                            <span className="text-sm text-neutral-900">I confirm I have at least 3 years of relevant driving experience and meet the requirements.</span>
                        </label>
                    </div>
                </div>
                <div className="pt-6">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-neutral-900 text-white py-5 font-medium text-lg hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 group"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>
                                Submit Application <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                    <p className="text-center mt-6 text-sm text-neutral-500">
                        Already have an account? <Link to="/login" className="text-neutral-900 font-bold hover:underline">Sign in</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Register;