import api from "./api"
 
export const login = async (body) => {
    try {
      const { data } = await api.post('/login', body);
      return data;
    } catch (error) {
      console.log(error);
      throw error; // Certifique-se de lançar o erro para que a mutação possa capturá-lo
    }
  };
  export const getLivros = async () => {
    const { data } = await api.get('/livros/meuslivros')
    return data;
}
export const getGeneros = async () => {
  const { data } = await api.get('/generos')
  return data;
}
export const getLidos = async () => {
  const { data } = await api.get('/leiturasLidos')
  return data;
}
export const getCapitulos = async () => {
  const { data } = await api.get('/capitulos')
  return data;
}
export const getCapitulosLivros = async (livros_id) => {
  try {
    const { data } = await api.get(`/capitulos/${livros_id}`);
    return data;
  } catch (error) {
    console.error("Erro na requisição:", error.response ? error.response : error.message);
  }
};
export const getlivrosid = async (id) => {
  try {
    const { data } = await api.get(`/livros/${id}`);
    return data || {}; // Retorna um objeto vazio se data for undefined
  } catch (error) {
    console.error("Erro na requisição:", error.response?.data || error.message);
    throw new Error("Falha ao buscar livro");
  }
};
// No componente React


export const createlivros = async (formData) => {
  try {
    const { data } = await api.post('/livros', formData);
    return data;
  } catch (error) {
    console.log(error);
    throw error; // Certifique-se de lançar o erro para que a mutação possa capturá-lo
  }
};
export const cadastrar = async (formData) => {
  try {
    const { data } = await api.post('/usuarios', formData);
    return data;
  } catch (error) {
    console.log(error);
    throw error; // Certifique-se de lançar o erro para que a mutação possa capturá-lo
  }
};
