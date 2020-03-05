import { NegociacaoController } from './controllers/NegociacaoController.js';
import { debounce } from './util/index.js';

const controller = new NegociacaoController();
const $ = document.querySelector.bind(document);

$('.form').addEventListener('submit', event => controller.adiciona(event));
$('#botao-apaga').addEventListener('click', event => controller.apaga());
$('#botao-importa').addEventListener('click', debounce(() => {
    console.log('EXECUTOU A OPERAÇÃO DEBOUNCE');
    controller.importa();
}, 1000));