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