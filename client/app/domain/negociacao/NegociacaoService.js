System.register(['../../util/HttpService.js', './Negociacao.js'], function (_export, _context) {
    "use strict";

    var HttpService, Negociacao;
    return {
        setters: [function (_utilHttpServiceJs) {
            HttpService = _utilHttpServiceJs.HttpService;
        }, function (_NegociacaoJs) {
            Negociacao = _NegociacaoJs.Negociacao;
        }],
        execute: function () {
            class NegociacaoService {

                constructor() {
                    this._http = new HttpService();
                }

                obtemNegociacoesDaSemana() {
                    return this._http.get('negociacoes/semana').then(negociacoes => negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)), err => {
                        throw new Error('Não foi possível obter as negociações da semana.');
                    });
                }

                obtemNegociacoesDaSemanaAnterior() {
                    return this._http.get('negociacoes/anterior').then(negociacoes => negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)), err => {
                        throw new Error('Não foi possível obter as negociações da semana anterior.');
                    });
                }

                obtemNegociacoesDaSemanaRetrasada() {
                    return this._http.get('negociacoes/retrasada').then(negociacoes => negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)), err => {
                        throw new Error('Não foi possível obter as negociações da semana retrasada.');
                    });
                }

                obtemNegociacoesNoPeriodo() {
                    return Promise.all([this.obtemNegociacoesDaSemana(), this.obtemNegociacoesDaSemanaAnterior(), this.obtemNegociacoesDaSemanaRetrasada()]).then(periodo => periodo.reduce((novoArray, item) => novoArray.concat(item), []).sort((atual, proximo) => proximo.data.getTime() - atual.data.getTime())).catch(err => {
                        throw new Error('Não foi possível obter as negociações do período.');
                    });
                }
            }

            _export('NegociacaoService', NegociacaoService);
        }
    };
});
//# sourceMappingURL=NegociacaoService.js.map