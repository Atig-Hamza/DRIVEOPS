import ApplicationService from "../services/Application.service.js";

export const SubmitApplication = async (req, res) => {
    try {
        const applicationData = req.body;
        if (req.file) {
            applicationData.CV = req.file.path;
        }
        const newApplication = await ApplicationService.submitApplication(applicationData);
        res.status(201).json(newApplication);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const ReviewApplication = async (req, res) => {
    try {
        const { email, approve } = req.body;
        const updatedApplication = await ApplicationService.reviewApplication(email, approve);
        res.status(200).json(updatedApplication);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const ListAllApplications = async (req, res) => {
    try {
        const applications = await ApplicationService.listAllApplications();
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default { SubmitApplication, ReviewApplication, ListAllApplications };