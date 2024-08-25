# Forest Equipment Dashboard

## Objetivo

O **Forest Equipment Dashboard** é uma aplicação web que exibe a localização de equipamentos florestais em um mapa interativo. A aplicação utiliza o React com a biblioteca `react-leaflet` para renderizar o mapa e exibir informações sobre os equipamentos em pop-ups. É possível visualizar o estado dos equipamentos e filtrar por nome.

## Tecnologias Utilizadas

- **React**: Biblioteca para construção da interface de usuário.
- **Leaflet**: Biblioteca para mapas interativos.
- **react-leaflet**: Integração do Leaflet com React.
- **Tailwind CSS**: Framework de CSS para estilização.
- **TypeScript**: Linguagem que adiciona tipagem ao JavaScript.
- **Jest**: Framework de testes.
- **ts-jest**: Transforma arquivos TypeScript para Jest.

## Estrutura do Projeto

- **`src/components/Map.tsx`**: Componente principal que renderiza o mapa com os marcadores dos equipamentos.
- **`src/components/testesUnitarios/map.test.tsx`**: Testes unitários para o componente de mapa.
- **`src/styles.css`**: Estilos personalizados para a aplicação.
- **`data`**: Pasta contendo arquivos JSON com dados de equipamentos, modelos e estados.

## Passos para Executar o Projeto Localmente

### Clone o Repositório

Clone o repositório para o seu ambiente local:

# Clone o repositório fork

```bash
git clone https://github.com/Renatonapoli/teste-frontend-v4.git
```

# Navegue para o diretório do repositório

```bash
cd teste-frontend-v4
```

# Verifique as branches remotas disponíveis

```bash
git fetch
git branch -r
```

# Faça o checkout da branch específica

```bash
git checkout teste/Renato-Napoli-Guimaraes
```

# Se a branch não estiver disponível localmente

```bash
git checkout -b teste/Renato-Napoli-Guimaraes origin/teste/Renato-Napoli-Guimaraes
```
# Atualize o repositório local

```bash
git pull
```

### Instale as dependências

Instale as dependências do projeto:

```bash
npm install
```

### Instale Dependências Adicionais para Testes

Se ainda não o fez, instale ts-jest e @types/jest (garantindo que a versão do Jest seja compatível):
```bash
npm install --save-dev ts-jest @types/jest
```
Se houver conflitos de versões, considere forçar a resolução ou ajustar a configuração do package.json.

###4. Execute o Projeto

Para rodar a aplicação localmente, utilize:
```bash
npm start
```
Isso iniciará o servidor de desenvolvimento e você poderá acessar a aplicação em http://localhost:3000.

###.5 Rodar Testes

Para executar os testes unitários, use o comando:
```bash
npm test
```
### Construir o Projeto

Para criar uma versão otimizada para produção, utilize:
```bash
npm run build
```
Isso gerará os arquivos estáticos na pasta build, que você pode servir com um servidor estático.

### Configuração do Ambiente

Certifique-se de que você tem as seguintes ferramentas instaladas:

Node.js (v14.x ou superior)
npm (v6.x ou superior)

### Contribuições

Contribuições são bem-vindas! Se você encontrar um bug ou tiver uma sugestão de melhoria, por favor, abra um issue ou envie um pull request.