import jwt from "jsonwebtoken";
import { fetchUserLogin, saveUser } from "../repository/user.repository.js";

export const createUser = async (req, res) => {
    try {
        const { companyId, name, email, password } = req.body;
        const data = await saveUser(companyId, name, email, password)
        const token = jwt.sign({ id: data.id }, 'key_secret', { expiresIn: '7d' });

        return res.status(201).json({ message: "User created", token });
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: err });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await fetchUserLogin(email, password)
        const token = jwt.sign({ id: data.id }, 'key_secret', { expiresIn: '7d' });

        return res.status(201).json({ message: "User connected", token });
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: err });
    }
}