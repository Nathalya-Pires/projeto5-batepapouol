let mensagens = [];
let nome;

login();
pegarMensagens();
setInterval(pegarMensagens, 3000);

function pegarMensagens() {
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessa.then(dadosRecebidos);
}

function dadosRecebidos(respServ) {
    mensagens = respServ.data;
    renderizarMensagens();
}

function renderizarMensagens() {
    const listaMensagens = document.querySelector('.chat');

    listaMensagens.innerHTML = '';

    for (let i = 0; i < mensagens.length; i++) {

        if (mensagens[i].type == "message") {

            listaMensagens.innerHTML = listaMensagens.innerHTML + `
            <li class="normal msg">
                <span class="hora">(${mensagens[i].time})</span>
                <span class="nome">${mensagens[i].from}</span>
                <span class="para">para</span>
                <span class="nome">${mensagens[i].to}:</span>
                <span class="mensagem">${mensagens[i].text}</span>
            </li>
        `
        }

        if (mensagens[i].type == "status") {

            listaMensagens.innerHTML = listaMensagens.innerHTML + `
            <li class="login-logoff msg">
                <span class="hora">(${mensagens[i].time})</span>
                <span class="nome">${mensagens[i].from}</span>
                <span class="mensagem">${mensagens[i].text}</span>
            </li>
        `
        }

        if (mensagens[i].type == "private_message") {
            if(mensagens[i].to === nome || mensagens[i].from === nome || mensagens[i].to === "Todos"){

            listaMensagens.innerHTML = listaMensagens.innerHTML + `
                <li class="privado msg">
                    <span class="hora">(${mensagens[i].time})</span>
                    <span class="nome">${mensagens[i].from}</span>
                    <span class="reservado">reservadamente</span>
                    <span class="para">para</span>
                    <span class="nome">${mensagens[i].to}:</span>
                    <span class="mensagem">${mensagens[i].text}</span>
                </li>
                `
            }
        }

        const scrollar = document.querySelector('.chat');
        scrollar.scrollIntoView(false);

        
    }

}

function login() {
    nome = prompt("Digite seu nome para entrar no chat");
    enviarNome();

}

function enviarNome() {
    const promess = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', {name:nome});
    promess.then();
    promess.catch()
}