import { useEffect, useState } from 'react';
import cliente from '../api/client';

const formularioVazio = {
  name: '',
  address: '',
  latitude: '',
  longitude: '',
  opening_hours: '',
  materiais: [],
};

export default function PointForm({ ponto, aoSalvar, aoCancelar }) {
  const [materiais, setMateriais] = useState([]);
  const [form, setForm] = useState(() =>
    ponto
      ? {
          name: ponto.name,
          address: ponto.address,
          latitude: ponto.latitude,
          longitude: ponto.longitude,
          opening_hours: ponto.opening_hours ?? '',
          materiais: ponto.materiais.map((material) => material.id),
        }
      : formularioVazio
  );
  const [erro, setErro] = useState(null);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    cliente.get('/materials').then((resposta) => setMateriais(resposta.data));
  }, []);

  function alternarMaterial(id) {
    setForm((anterior) => ({
      ...anterior,
      materiais: anterior.materiais.includes(id)
        ? anterior.materiais.filter((m) => m !== id)
        : [...anterior.materiais, id],
    }));
  }

  async function aoEnviar(e) {
    e.preventDefault();
    setErro(null);
    setSalvando(true);
    try {
      const { data } = ponto
        ? await cliente.put(`/collection-points/${ponto.id}`, form)
        : await cliente.post('/collection-points', form);
      aoSalvar(data);
      if (!ponto) setForm(formularioVazio);
    } catch {
      setErro('Não foi possível salvar o ponto. Confira os campos.');
    } finally {
      setSalvando(false);
    }
  }

  return (
    <form className="point-form" onSubmit={aoEnviar}>
      <h2>{ponto ? 'Editar ponto de coleta' : 'Novo ponto de coleta'}</h2>

      <input
        placeholder="Nome"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        placeholder="Endereço"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
        required
      />
      <div className="row">
        <input
          type="number"
          step="any"
          placeholder="Latitude"
          value={form.latitude}
          onChange={(e) => setForm({ ...form, latitude: e.target.value })}
          required
        />
        <input
          type="number"
          step="any"
          placeholder="Longitude"
          value={form.longitude}
          onChange={(e) => setForm({ ...form, longitude: e.target.value })}
          required
        />
      </div>
      <input
        placeholder="Horário de funcionamento (ex: Seg-Sex 8h-18h)"
        value={form.opening_hours}
        onChange={(e) => setForm({ ...form, opening_hours: e.target.value })}
      />

      <fieldset>
        <legend>Materiais aceitos</legend>
        {materiais.map((material) => (
          <label key={material.id}>
            <input
              type="checkbox"
              checked={form.materiais.includes(material.id)}
              onChange={() => alternarMaterial(material.id)}
            />
            {material.name}
          </label>
        ))}
      </fieldset>

      {erro && <p className="error">{erro}</p>}

      <div className="row">
        <button type="submit" disabled={salvando}>
          {salvando ? 'Salvando...' : 'Salvar'}
        </button>
        <button type="button" onClick={aoCancelar}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
