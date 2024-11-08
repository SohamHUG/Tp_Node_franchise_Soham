import db from '../config/db.js';

export const saveCompany = async (name, type) => {

    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO company (name, type) VALUES (?, ?)';
        db.query(sql, [name, type], async (err, result) => {
            if (err) return reject(err)

            resolve(result)
        })
    })
};

export const fetchCompanyById = async (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM company WHERE id = ?';
        db.query(sql, [id], (err, result) => {
            if (err) return reject(err);

            if (!result[0]) {
                return resolve(null);
            }
            return resolve(result[0]);
        });
    });
};