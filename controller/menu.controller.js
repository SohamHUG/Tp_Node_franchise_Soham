import { addMenuToDB, fetchMenubyCompanyId } from '../repository/menu.repository.js';
import { fetchCompanyById } from '../repository/company.repository.js';
import { fetchAllMenus } from '../repository/menu.repository.js';

export const addMenu = async (req, res) => {
    try {
        const { name, plat } = req.body;
        const companyId = req.params.id
        const adminCompanyId = req.user.company_id;

        const adminCompany = await fetchCompanyById(adminCompanyId);
        if (!adminCompany) {
            return res.status(404).json({ message: 'not found' });
        }

        if (adminCompany.type === 'franchise' || adminCompanyId === companyId) {
            const menuItem = await addMenuToDB({ name, plat, companyId });
            return res.status(201).json({ message: 'Menu item added', menuItem });
        } else {
            return res.status(403).json({ message: "Not authorized" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getMenu = async (req, res) => {
    try {
        const companyId = req.params.id;
        const adminCompanyId = req.user.company_id;

        const adminCompany = await fetchCompanyById(adminCompanyId);
        if (!adminCompany) {
            return res.status(404).json({ message: 'Company not found' });
        }

        if (adminCompany.type === 'franchise') {
            const menu = await fetchAllMenus();
            return res.status(200).json({ message: 'Menus found successfully', menu });
        } else {
            const { restaurantMenus, franchiseMenus } = await fetchMenubyCompanyId({ companyId: companyId });

            return res.status(200).json({
                message: 'Menu found',
                restaurantMenus,
                franchiseMenus,
            });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
