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
    const { data } = await api.get('/livros', {generos_id, nome, sinopse, tags})
    return data;
}
// export const livros = async (body) => {
//   try {
//     const { data } = await api.post('/livros', body);
//     return data;
//   } catch (error) {
//     console.log(error);
//     throw error; // Certifique-se de lançar o erro para que a mutação possa capturá-lo
//   }
// };
export const livros = async () => {
  const formData = new FormData()
  try {
    const response = await api.post('/livros', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar os dados:', error);
    if (error.response) {
      console.error('Erro de resposta:', error.response);
    }
    throw error;
  
  }}
