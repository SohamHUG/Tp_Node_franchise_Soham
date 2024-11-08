import * as Yup from 'yup';

export const companySchema = Yup.object().shape({
    name: Yup.string().required('nom requis'),
});