import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Le prenom doit contenir au moins 2 caractères').required('Prenom requis'),
    email: Yup.string().email('Email invalide').required('Email requis'),
    password: Yup.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères').required('Mot de passe requis'),
});