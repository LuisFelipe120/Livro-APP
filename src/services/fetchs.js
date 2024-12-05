import api from './api';

// Função para buscar um livro específico
export const getLivro = async (id) => {
  const { data } = await api.get(`/livro/${id}`);
  return data;
};

// Função para buscar episódios de um livro
export const getEpisodios = async (livroId) => {
  const { data } = await api.get(`/livro/${livroId}/episodios`);
  return data;
};
