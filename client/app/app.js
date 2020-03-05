System.register(['./controllers/NegociacaoController.js', './util/index.js'], function (_export, _context) {
    "use strict";

    var NegociacaoController, debounce;
    return {
        setters: [function (_controllersNegociacaoControllerJs) {
            NegociacaoController = _controllersNegociacaoControllerJs.NegociacaoController;
        }, function (_utilIndexJs) {
            debounce = _utilIndexJs.debounce;
        }],
        execute: function () {

            const controller = new NegociacaoController();
            const $ = document.querySelector.bind(document);

            $('.form').addEventListener('submit', event => controller.adiciona(event));
            $('#botao-apaga').addEventListener('click', event => controller.apaga());
            $('#botao-importa').addEventListener('click', debounce(() => {
                console.log('EXECUTOU A OPERAÇÃO DEBOUNCE');
                controller.importa();
            }, 1000));
        }
    };
});
//# sourceMappingURL=app.js.map