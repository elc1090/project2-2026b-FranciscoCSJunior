# Projeto: Aplicação com persistência de dados em backend

![Demonstração do Mapa de Pontos de Coleta](./PontosColeta.gif "GIF animado do projeto")



## Acesso

https://project2-2026b-francisco-cs-junior.vercel.app

## Desenvolvedor(a)
Nome: Francisco das Chagas Sousa Júnior

Curso: Ciência da Computação


## Proposta
Modalidade A
Aplicação web para mapear pontos de coleta de resíduos recicláveis, permitindo cadastrar, consultar, atualizar e excluir locais, com informações como endereço, coordenadas, tipos de materiais recebidos e horários de funcionamento. Os pontos devem ser visualizados em um mapa interativo (por exemplo, usando Leaflet + OpenStreetMap). Aqui há possibilidade de extensão em colaboração internacional com universidade Chilena.

## Parceria/cliente/usuário
Lucas Medeiros Figueiredo dos Santos
## Feedback/comentário da parceria/cliente/usuário


## Desenvolvimento

### Processo


Em um primeiro momento, eu tive que decidir quais frameworks/linguagens usar. Eu vi algumas das opções que a professora passou e gostaria de fazer com alguma tecnologia nova, para conhecer novas tecnologias e ter mais experiências. Defini que usaria React para o frontend, principalmente, e Laravel para o backend. Defini que usaria o Vercel para deploy do Frontend e o Render para deploy do backend. Eu queria utilizar o MySQL, mas conversando com a IA,  vi que seria bem mais difícil, pois o Render tem um compatibildade mais fácil com o PostgreSQL, então acabei migrando para lá.
Em seguida, foi o momento de instalar os frameworks, instalar o PostgreSQL e tentar entender junto com a IA como os projetos dessas aplicações funcionavam, visto que tem muitos arquivos. Além disso, essa linguagens/frameworks eram novas pra mim, então fui me direcionando muito com ajuda da IA. Fiz a conexão do projeto Laravel com o banco e setei os dados: um ponto de coleta tem os atributos nome, endereço, coordenadas, horário de funcionamento e uma lista de materiais que ele aceita. Depois criei as rotas da API, consultar é permitido para todos os usuários, mas criar, editar ou remover é apenas para um usuário que tem login.
Depois, fiz o frontend que mostrava apenas os pontos da API desenhava eles no mapa que é fornecido pelo Leaflet. Depois adicionei o login, pois assumi que não é qualquer usuário que acessasse o site que poderia criar/editar/remover pontos de coleta, em seguida fiz o formulário com os campos pra criar um novo ponto, o botão pra editar um ponto e o botão pra remover um ponto.
Depois subi o código no GitHub para poder fazer o deploy também. Em seguida, me conectei no Render, fiz a criação do banco do PostgreSQL lá e o deploy do backend. Depois, me conectei ao Vercel e fiz a mesma coisa com o Frontend, setando as variáveis do ambiente para eles se conectarem

### Trechos de código

**1. Relação N:N entre pontos e materiais** ([CollectionPointController.php](backend/app/Http/Controllers/Api/CollectionPointController.php))

```php
$ponto->materiais()->sync($requisicao->input('materiais', []));
```

Um ponto de coleta pode aceitar vários materiais, e um material pode estar em vários pontos. Essa linha salva a lista inteira de materiais escolhidos de uma vez, sem precisar de um loop.

**2. Pinos do mapa gerados a partir da API** ([MapPage.jsx](frontend/src/pages/MapPage.jsx))

```jsx
{pontos.map((ponto) => (
  <Marker key={ponto.id} position={[ponto.latitude, ponto.longitude]} icon={marcadorPin}>
    <Popup>{ponto.name}</Popup>
  </Marker>
))}
```

Cada ponto que vem da API vira um marcador no mapa (Leaflet). Se a API retornar mais pontos, mais pinos aparecem — sem tocar em código.

**3. Um formulário só, pra criar e editar** ([PointForm.jsx](frontend/src/components/PointForm.jsx))

```jsx
const { data } = ponto
  ? await cliente.put(`/collection-points/${ponto.id}`, form)
  : await cliente.post('/collection-points', form);
```

Se o formulário recebeu um `ponto` existente, ele edita (`PUT`); senão, cria um novo (`POST`). Evita ter dois formulários quase iguais.


## Tecnologias

### Linguagens e afins

Frontend:
- React
- JavaScript
- HTML
- CSS
Backend:
- PHP
- Laravel
Banco de dados:
- PostgreSQL

### Ambiente de desenvolvimento

- VS Code
- PostgreSQL
- Claude Code

## Referências e créditos

- Claude Code

---
Projeto entregue para a disciplina de [Desenvolvimento de Software para a Web](http://github.com/andreainfufsm/elc1090-2026b) em 2026b
