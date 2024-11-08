import { saveCompany, } from "../repository/company.repository.js";
import jwt from "jsonwebtoken";


export const createCompany = async (req, res) => {
    try {
        const { name, type } = req.body
        const data = await saveCompany(name, type)

        return res.send({ company: data });
    } catch (e) {
        return res.status(500).send({ message: e.message })
    }
}
