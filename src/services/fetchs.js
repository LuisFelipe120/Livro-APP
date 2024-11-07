import api from "./api";

export const getTodos = async () => {
    const { data } = await api.get('/todos')
    return data;
}
