import bcrypt from 'bcryptjs';
import { GetApplicationByEmail, CreateApplication, ApproveApplication, RejectApplication, GetAllApplication } from '../models/Application.model.js';
import { register } from './Auth.service.js';


export const submitApplication = async (applicationData) => {
    const existingApplication = await GetApplicationByEmail(applicationData.Email);
    if (existingApplication) {
        throw new Error('Application with this email already exists');
    }

    applicationData.Password = await bcrypt.hash(applicationData.Password, 10);
    const newApplication = await CreateApplication(applicationData);
    return newApplication;
}

export const reviewApplication = async (applicationEmail, approve) => {
    const application = await GetApplicationByEmail(applicationEmail);
    if (!application) {
        throw new Error('Application not found');
    }
    if (approve) {
        await register({
            Email: application.Email,
            Password: application.Password,
            Role: "driver"
        });
        return await ApproveApplication(applicationEmail);
    } else {
        return await RejectApplication(applicationEmail);
    }
}

export const listAllApplications = async () => {
    return await GetAllApplication();
}

export default { submitApplication, reviewApplication, listAllApplications };