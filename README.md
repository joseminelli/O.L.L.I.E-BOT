# **O.L.L.I.E** - Bot de Música para Discord

O.L.L.I.E é um bot para o Discord que permite tocar música usando a API do YouTube. Este bot é desenvolvido em JavaScript e Node.js.

## Funcionalidades

O bot Ollie_bot oferece as seguintes funcionalidades:

- Tocar música do YouTube em um canal de voz do Discord.
- Pausar, retomar, pular faixas e ajustar o volume da música.
- Pesquisar músicas no YouTube e reproduzi-las diretamente.
- Exibir informações sobre a faixa atualmente em execução.

## Instalação e Configuração

Siga estas etapas para instalar e configurar o Ollie_bot:

1. Clone o repositório ou faça o download dos arquivos.

2. Coloque a KEY do seu bot no arquivo: `index.js` 

3. Instale as dependências do projeto:

  ```bash
    npm install
    npm start
   ```
## Comandos:

| Comando       | Descrição                                             |
|---------------|------------------------------------------------------|
| /help         | Lista todos os comandos.                             |
| /loop         | Coloca em modo loop.                                 |
| /mover        | Move a posição da música na fila.                   |
| /tocandoagora | Mostra a música que está tocando no momento.         |
| /pausa        | Pausa a música atual.                                 |
| /play         | Toca uma música.                                      |
| /playtop      | Toca uma música da fila à sua frente.                |
| /fila         | Mostra a fila de músicas.                            |
| /remover      | Remove a música da fila.                             |
| /despausar    | Despausa a música atual.                             |
| /embaralhar   | Embaralha a fila de músicas.                         |
| /pular        | Pula uma música.                                     |
| /parar        | Para todas as músicas e limpa a fila.               |
| /swap         | Troca a posição de duas músicas na fila.            |
| /userinfo     | Pega informações de um usuário.                      |
| /volume       | Muda o volume da música.                            |



## Contribuição

Contribuições são bem-vindas. Se você deseja contribuir para este projeto, siga estas etapas:

- Faça um fork do repositório.

- Crie uma branch para sua contribuição: git checkout -b minha-contribuicao

- Faça as alterações necessárias e adicione documentação, se aplicável.

- Envie um pull request com uma descrição clara das alterações propostas.

## Licença
Este projeto é distribuído sob a Licença MIT. Você é livre para utilizar, modificar e distribuir o bot conforme a licença permite.
