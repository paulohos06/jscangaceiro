const controller = new NegociacaoController();

document.querySelector('.form').addEventListener('submit', event => controller.adiciona(event));
document.querySelector('#botao-apaga').addEventListener('click', event => controller.apaga());