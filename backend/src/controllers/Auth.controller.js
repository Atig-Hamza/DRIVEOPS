import AuthService from '../services/Auth.service.js';

export const Register = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const newUser = await AuthService.register(email, password, role);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await AuthService.login(email, password);
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

export const ValidateToken = async (req, res) => {
    try {
        const { token } = req.body;
        const isValid = await AuthService.verifyTokenAndRole(token);
        res.status(200).json({ isValid });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default { Register, Login, ValidateToken };
