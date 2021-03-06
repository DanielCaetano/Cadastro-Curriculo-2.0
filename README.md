# Cadastro-Curriculo-2.0

**O Desafio**

Desenvolver uma aplicação (front e back) para cadastro de currículos, a aplicação deverá
ter duas áreas distintas uma para cadastro de candidato, e uma área administrativa para
visualização dos candidatos cadastrados.

**Área do Candidato**
O candidato deverá ser capaz de cadastrar seu currículo com as seguintes informações
através de um formulário.

- Nome

- *CPF*

  ○ O campo deverá aceitar apenas valores **válidos**

- Data de Nascimento

- Telefone

- Escolaridade, deverá ser uma lista com as seguintes opções
  ○ Analfabeto, Fundamental Completo, Médio Incompleto, Médio Completo,
  Superior Incompleto, Superior Completo, Mestrado, Doutorado, Ignorado
  
- Função

- Lista de Competências;
  ○ Cada competência deverá ter uma descrição e o nível de proficiência do
  candidato.

Após a inscrição, o candidato deverá ser capaz de visualizar seu cadastro, assim o status
da sua solicitação, conforme a avaliação que será feita na área administrativa (Não é
necessário cadastro de senha, utilize alguns dos campos do cadastro para realizar essa
ação)

**Área Administrativa**
O administrador deverá ser capaz de visualizar uma lista de todos os candidatos
cadastrados, visualizar cada candidato com detalhes e aprovar ou reprovar os cadastros
realizados.
**Opcional/obrigatorio:** O administrador também deverá ter acesso à uma dashboard com os gráficos
abaixo:

- Gráfico de barras representando a distribuição de escolaridade dos candidatos;
- Gráfico de pizza representando a distribuição da situação dos candidatos
  (Aguardando, Aprovado, Reprovado).
  Obs: A área administrativa deverá ser protegida por login, no entanto não é necessário
  implementar a autenticação real.

**Requisitos técnicos**

- Front: Angular ou React, fique a vontade para escolher a lib de componentes visuais
  de sua preferência;
- Back: Node ou Java + Spring;
- Persistência: fique a vontade para escolher, entre bancos relacionais e NoSql;
- O layout é livre, uma interface organizada e responsiva será um diferencial;
- A aplicação deverá ser disponibilizada no github, faça commits organizados e
  simples, é recomendado a utilização de branches para implementar as features do
  sistema;
- Instruções de como rodar a aplicação.

**O que será avaliado**

- Conhecimento da stack escolhida;
- Funcionamento correto da aplicação;
- Composição/reutilização de componentes;
- Boas práticas de programação.