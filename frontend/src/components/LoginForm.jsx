import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginForm() {
  const { entrar } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(null);

  async function aoEnviar(e) {
    e.preventDefault();
    setErro(null);
    try {
      await entrar(email, senha);
    } catch {
      setErro('Email ou senha inválidos.');
    }
  }

  return (
    <form className="login-form" onSubmit={aoEnviar}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
      />
      <button type="submit">Entrar</button>
      {erro && <span className="error">{erro}</span>}
    </form>
  );
}
