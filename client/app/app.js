const controller = new NegociacaoController();
const $ = document.querySelector.bind(document);

$('.form').addEventListener('submit', event => controller.adiciona(event));
$('#botao-apaga').addEventListener('click', event => controller.apaga());
$('#botao-importa').addEventListener('click', event => controller.importa());