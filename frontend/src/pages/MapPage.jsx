import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import iconePin from '../assets/pin.png';
import cliente from '../api/client';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/LoginForm';
import PointForm from '../components/PointForm';

const marcadorPin = new L.Icon({
  iconUrl: iconePin,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});

const CENTRO_SANTA_MARIA = [-29.6868, -53.8149];

export default function MapPage() {
  const { estaAutenticado, sair } = useAuth();
  const [pontos, setPontos] = useState([]);
  const [erro, setErro] = useState(null);
  const [alvoDoFormulario, setAlvoDoFormulario] = useState(null); // null | 'novo' | ponto sendo editado
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [idConfirmando, setIdConfirmando] = useState(null);

  function carregarPontos() {
    cliente
      .get('/collection-points')
      .then((resposta) => setPontos(resposta.data))
      .catch(() => setErro('Não foi possível carregar os pontos de coleta.'));
  }

  useEffect(carregarPontos, []);

  function aoSalvar(ponto) {
    setPontos((anterior) =>
      anterior.some((p) => p.id === ponto.id)
        ? anterior.map((p) => (p.id === ponto.id ? ponto : p))
        : [ponto, ...anterior]
    );
    setAlvoDoFormulario(null);
  }

  async function excluirPonto(ponto) {
    try {
      await cliente.delete(`/collection-points/${ponto.id}`);
      setPontos((anterior) => anterior.filter((p) => p.id !== ponto.id));
    } catch {
      setErro('Não foi possível remover o ponto.');
    } finally {
      setIdConfirmando(null);
    }
  }

  return (
    <div className="map-page">
      <header className="page-header">
        <h1>Pontos de Coleta</h1>
        {estaAutenticado ? (
          <div className="row">
            <button onClick={() => setAlvoDoFormulario((v) => (v ? null : 'novo'))}>
              {alvoDoFormulario ? 'Fechar' : '+ Adicionar ponto'}
            </button>
            <button onClick={sair}>Sair</button>
          </div>
        ) : (
          <button onClick={() => setMostrarLogin((v) => !v)}>
            {mostrarLogin ? 'Fechar' : 'Login'}
          </button>
        )}
      </header>

      {mostrarLogin && !estaAutenticado && <LoginForm />}

      {erro && <p className="error">{erro}</p>}

      {alvoDoFormulario && (
        <PointForm
          key={typeof alvoDoFormulario === 'object' ? alvoDoFormulario.id : 'novo'}
          ponto={typeof alvoDoFormulario === 'object' ? alvoDoFormulario : null}
          aoSalvar={aoSalvar}
          aoCancelar={() => setAlvoDoFormulario(null)}
        />
      )}

      <MapContainer center={CENTRO_SANTA_MARIA} zoom={13} className="map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pontos.map((ponto) => (
          <Marker key={ponto.id} position={[ponto.latitude, ponto.longitude]} icon={marcadorPin}>
            <Popup>
              <strong>{ponto.name}</strong>
              <br />
              {ponto.address}
              <br />
              {ponto.opening_hours}
              <br />
              {ponto.materiais.map((material) => material.name).join(', ')}
              {estaAutenticado && (
                <>
                  <br />
                  <button onClick={() => setAlvoDoFormulario(ponto)}>Editar</button>{' '}
                  <button onClick={() => excluirPonto(ponto)}>Remover</button>
                </>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <ul className="point-list">
        {pontos.map((ponto) => (
          <li key={ponto.id}>
            <div>
              <strong>{ponto.name}</strong> — {ponto.address}
              <br />
              <small>{ponto.materiais.map((material) => material.name).join(', ')}</small>
            </div>
            {estaAutenticado &&
              (idConfirmando === ponto.id ? (
                <span className="row">
                  <span>Remover?</span>
                  <button onClick={() => excluirPonto(ponto)}>Sim</button>
                  <button onClick={() => setIdConfirmando(null)}>Não</button>
                </span>
              ) : (
                <span className="row">
                  <button onClick={() => setAlvoDoFormulario(ponto)}>Editar</button>
                  <button onClick={() => setIdConfirmando(ponto.id)}>Remover</button>
                </span>
              ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
