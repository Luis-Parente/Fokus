const html = document.querySelector('html');

const btnFoco = document.querySelector('.app__card-button--foco')
const btnCurto = document.querySelector('.app__card-button--curto')
const btnLongo = document.querySelector('.app__card-button--longo')

const imagemBanner = document.querySelector('.app__image');
const tituloBanner = document.querySelector('.app__title');

const botoes = document.querySelectorAll('.app__card-button');

const toggleMusica = document.querySelector('#alternar-musica');

const musicaDeFundo = new Audio('./sons/luna-rise-part-one.mp3');
musicaDeFundo.loop = true;

const btnStartPause = document.querySelector('#start-pause')

let intervaloId = null;

let tempoDecorridoEmSegundos = 1500;

const musicaIniciar = new Audio('./sons/play.wav');
const musicaPausar = new Audio('./sons/pause.mp3');
const musicaContagemFinalizada = new Audio('./sons/beep.mp3');

const tempoNaTela = document.querySelector('#timer');

btnFoco.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    finalizarContagem();
    alterarContexto('foco');
    btnFoco.classList.add('active');
})

btnCurto.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    finalizarContagem();
    alterarContexto('descanso-curto');
    btnCurto.classList.add('active');
})

btnLongo.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    finalizarContagem();
    alterarContexto('descanso-longo');
    btnLongo.classList.add('active');
})

toggleMusica.addEventListener('change', () => {
    if (musicaDeFundo.paused) {
        musicaDeFundo.play();
    } else {
        musicaDeFundo.pause();
    }
})

function alterarContexto (contexto) {
    mostrarTempoNaTela();
    html.setAttribute('data-contexto', contexto);
    imagemBanner.setAttribute('src', `./imagens/${contexto}.png`);

    botoes.forEach(function (botao) {
        botao.classList.remove('active');
    });

    switch (contexto){
        case "foco":
            tituloBanner.innerHTML = `Otimize sua produtividade,<br> <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            tituloBanner.innerHTML = `Que tal dar uma respirada?<br> <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;

        case "descanso-longo":
            tituloBanner.innerHTML = `Hora de voltar à superfície.<br> <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
        default:
            break;
    }
}

function iniciarOuPausarContagem() {
    if(intervaloId) {
        musicaPausar.play() 
        finalizarContagem();
        return
    }
    btnStartPause.innerHTML = `<img class="app__card-primary-butto-icon" src="/imagens/pause.png" alt="">
                                <span>Pausar</span>`;
    musicaIniciar.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
}

function finalizarContagem() {
    btnStartPause.innerHTML = `<img class="app__card-primary-butto-icon" src="/imagens/play_arrow.png" alt="">
                                <span>Começar</span>`;
    clearInterval(intervaloId);
    intervaloId = null;
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        musicaContagemFinalizada.play();
        finalizarContagem();
        return
    }

    tempoDecorridoEmSegundos -= 1;
    mostrarTempoNaTela();
}

btnStartPause.addEventListener('click', iniciarOuPausarContagem);

function mostrarTempoNaTela(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;    
}

mostrarTempoNaTela();