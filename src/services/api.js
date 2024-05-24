import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:10000/v1/rep',
});

export const createFuncionario = async (empregado) => {
    const response = await api.post('/empregado/salvar', empregado);
    return response.data;
};

export const getFuncionarios = async (id_empresa) => {
    const response = await api.get('/empregado/buscar/' + id_empresa);
    return response.data;
};


export const getEspelhoPonto = async (id_funcionario, mes_selecionado) => {
    const response = 
    await api.get(`/registroPonto?id_funcionario=${id_funcionario}&mes_selecionado=${mes_selecionado}`);
    return response.data;
}