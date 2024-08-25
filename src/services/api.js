import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:10000/v1/rep',
});


api.interceptors.request.use(async config => {
    // Obtenha o token do local onde ele está armazenado
    const token = localStorage.getItem('token');
  
    // Se o token existir, adicione-o ao cabeçalho da solicitação
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  
    return config;
});

// Adicione um interceptador de resposta
api.interceptors.response.use(response => {
    return response;
  }, async error => {
    if (error.response.status === 401) {
      // O token expirou, obtenha um novo token e repita a solicitação
  
      // Obtenha um novo token
      const newToken = await refreshToken();
  
      // Atualize o token no localStorage
      localStorage.setItem('token', newToken);
  
      // Repita a solicitação com o novo token
      const config = error.config;
      config.headers.Authorization = `Bearer ${newToken}`;
  
      return new Promise((resolve, reject) => {
        api.request(config).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      });
    }
  
    return Promise.reject(error);
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

export const login = async (usuario, senha) => {
    const response = await api.post('/authenticate',
    {
        username: usuario,
        password: senha
    }
    ).then(response => {
        localStorage.setItem('token', response.data.token);
        return response;
    }).catch((error) => {       
        //alert('Falha de login');
        // do nothing
    });

    return response;
}

export const refreshToken = async () => {
    const response = await api.post('/authenticate',
    {
        username: localStorage.getItem('usuario'),
        password: localStorage.getItem('senha')
    }
    ).then(response => {
        return response;
    }).catch((error) => {       
        alert('Falha ao atualizar token');
    });

    return response;
}

