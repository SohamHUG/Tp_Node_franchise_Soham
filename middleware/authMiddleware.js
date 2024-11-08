import jwt from "jsonwebtoken";
import {fetchUserById} from "../repository/user.repository.js";

export const isAuth = (req, res, next) => {

    if (!req.headers['authorization']) {
        return res.status(401).send({message: 'Token obligatoire'})
    }

    const token = req.headers['authorization'].split(' ')[1];

    jwt.verify(token, 'key_secret', async (err, payload) => {
        if (err) {
            return res.status(401).send({message: 'Token invalide'})
        }

        const user = await fetchUserById(payload.id)
        if (!user) {
            return res.status(401).send({message: 'Token invalide'})
        }
        req.user = user
        next()
    })
}

export const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(401).send({message: 'Vous n\'êtes pas autorisé'})
    }
    next()
}