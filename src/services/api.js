import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:10000/v1/rep',
});


export const createFuncionario = async (empregado) => {
    const response = await api.post('/empregado/salvar', empregado);
    return response.data;
};