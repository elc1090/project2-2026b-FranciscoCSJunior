import axios from 'axios';

const cliente = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

cliente.interceptors.request.use((configuracao) => {
  const token = localStorage.getItem('token');
  if (token) {
    configuracao.headers.Authorization = `Bearer ${token}`;
  }
  return configuracao;
});

export default cliente;
