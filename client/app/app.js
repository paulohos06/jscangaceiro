System.register(['./controllers/NegociacaoController.js'], function (_export, _context) {
  "use strict";

  var NegociacaoController;
  return {
    setters: [function (_controllersNegociacaoControllerJs) {
      NegociacaoController = _controllersNegociacaoControllerJs.NegociacaoController;
    }],
    execute: function () {

      const controller = new NegociacaoController();
      const $ = document.querySelector.bind(document);

      $('.form').addEventListener('submit', event => controller.adiciona(event));
      $('#botao-apaga').addEventListener('click', event => controller.apaga());
      $('#botao-importa').addEventListener('click', event => controller.importa());
    }
  };
});
//# sourceMappingURL=app.js.map