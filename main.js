const html = document.querySelector('html');

const btnFoco = document.querySelector('.app__card-button--foco')
const btnCurto = document.querySelector('.app__card-button--curto')
const btnLongo = document.querySelector('.app__card-button--longo')

const imagemBanner = document.querySelector('.app__image');
const tituloBanner = document.querySelector('.app__title');


btnFoco.addEventListener('click', () => {
    alterarContexto('foco');
})

btnCurto.addEventListener('click', () => {
    alterarContexto('descanso-curto');
})

btnLongo.addEventListener('click', () => {
    alterarContexto('descanso-longo');
})

function alterarContexto (contexto) {
    html.setAttribute('data-contexto', contexto);
    imagemBanner.setAttribute('src', `./imagens/${contexto}.png`);

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