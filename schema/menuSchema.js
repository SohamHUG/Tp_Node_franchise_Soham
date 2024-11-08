import * as Yup from 'yup';

export const menuSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Le nom du menu doit contenir au moins 2 caractères').required('nom requis'),
    companyId: Yup.number().required('id de la companie requis'),
    plat: Yup.string().min(6, 'le menu doit contenir au moins un plat').required('plat requis'),
});