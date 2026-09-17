import { createContext, useContext, useState } from 'react';
import cliente from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  async function entrar(email, senha) {
    const { data } = await cliente.post('/login', { email, password: senha });
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUsuario(data.usuario);
  }

  async function sair() {
    try {
      await cliente.post('/logout');
    } catch {
      // token já inválido; limpa o estado local mesmo assim
    }
    localStorage.removeItem('token');
    setToken(null);
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, token, entrar, sair, estaAutenticado: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
