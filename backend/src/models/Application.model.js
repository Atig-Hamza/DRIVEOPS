import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    Full_name: {
        type: String,
        required: true,
        trim: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    Phone_number: {
        type: String,
        required: true,
        trim: true,
    },
    CV: {
        type: String,
        required: true,
        trim: true,
    },
    Password: {
        type: String,
        required: true,
        minlength: 6,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
}, { timestamps: true });

const Application = mongoose.model('Application', applicationSchema);

export const GetAllApplication = async () => {
    return await Application.find();
};

export const CreateApplication = async (applicationData) => {
    const application = new Application(applicationData);
    return await application.save();
};


export default Application;