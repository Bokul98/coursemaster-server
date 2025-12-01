import * as AuthService from "../service/auth.service.js";

const AuthController = {
    signup: async (req, res) => {
        try {
            const result = await AuthService.signup(req.body);
            res.status(201).json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    signin: async (req, res) => {
        try {
            const { email, password } = req.body;
            const data = await AuthService.signin(email, password);
            res.json(data);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
};

export default AuthController;
