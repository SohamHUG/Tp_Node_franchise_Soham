import db from '../config/db.js';
import bcrypt from 'bcrypt';

export const saveUser = async (companyId, name, email, password) => {

    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO user (company_id, name, email, password) VALUES (?, ?, ?, ?)';
        const hash = bcrypt.hashSync(password, 10);
        db.query(sql, [companyId, name, email, hash], async (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return reject('duplicate')
                } else if (err.code === 'ER_DATA_TOO_LONG') {
                    return reject('toolong')
                }
                reject(err)
            }
            const user = await fetchUserById(result.insertId)
            console.log(user)
            resolve(user)
        })
    })
}

export const fetchUserLogin = async (email, password) => {

    return new Promise((resolve, reject) => {
        const sql = 'SELECT email, id, password FROM user WHERE email = ?';
        db.query(sql, [email], (err, result) => {
            if (err) {
                reject(err)
            }
            if (result[0]) {
                if (bcrypt.compareSync(password, result[0].password)) {
                    resolve(result[0])
                } else {
                    reject('credentials not match')
                }
                resolve(result[0])
            } else {
                reject('credentials not match')
            }
        })

    })
}

export const fetchUserById = async (id) => {

    return new Promise((resolve, reject) => {
        const sql = 'SELECT id, company_id, name, email, role FROM user WHERE id = ? and deleted_at IS NULL';
        db.query(sql, [id], (err, result) => {
            if (err) {
                return reject(err)
            }
            if (!result[0]) {
                return resolve(null)
            }
            return resolve(result[0])
        })

    })

}