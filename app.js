
let numerosSorteados = [];
let limite = 10;

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

function gerarNumeroAleatorio(){
    let numeroEscolhido =  parseInt(Math.random() * limite + 1);
    let quantidadeNumerosLista = numerosSorteados.length;
    
    if (quantidadeNumerosLista == limite){
        numerosSorteados = [];
    }


    if (numerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        numerosSorteados.push(numeroEscolhido)
        console.log(numerosSorteados)
        return numeroEscolhido;
    }
}

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
exibirMensagemInicial();


function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto){
        let palavtaTentativa = tentativas > 1? ' tentativas' : 'tentativa';
        exibirTextoNaTela('h1', 'Acertou!');
        exibirTextoNaTela('p', `Você descobriu o número secreto com ${tentativas} ${palavtaTentativa}!! `);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto){
            tentativas++
            exibirTextoNaTela('p', 'O número secreto é menor do que o chute');
        }else{
            tentativas++;
            exibirTextoNaTela('p', 'O número secreto é maior que o chute');
                }
        limparCampo();
    }
}

function limparCampo (){
    chute = document.querySelector('input');
    chute.value = ''; 
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}