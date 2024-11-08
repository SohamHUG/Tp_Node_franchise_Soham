import db from '../config/db.js';

export const addMenuToDB = async ({ name, plat, companyId }) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO menu (name, plat, company_id) VALUES (?, ?, ?)';
        db.query(sql, [name, plat, companyId], (err, result) => {
            if (err) return reject(err);

            resolve(result);
        });
    });
};

export const fetchMenubyCompanyId = async ({ companyId }) => {
    return new Promise((resolve, reject) => {

        const query = `
            SELECT * FROM menu 
            WHERE company_id = ? AND deleted_at IS NULL
            UNION
            SELECT * FROM menu 
            WHERE company_id IN (SELECT id FROM company WHERE type = 'franchise') AND deleted_at IS NULL
        `;

        db.query(query, [companyId], (err, results) => {
            if (err) return reject(err);

            const restaurantMenus = results.filter(menu => menu.company_id === companyId);
            const franchiseMenus = results.filter(menu => menu.company_id !== companyId);

            resolve({
                restaurantMenus,
                franchiseMenus
            });

        });
    });
};

export const fetchAllMenus = async () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM menu WHERE deleted_at IS NULL';
        db.query(query, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};
