System.register(['../../util/HttpService.js', './Negociacao.js', '../../util/ApplicationException.js'], function (_export, _context) {
    "use strict";

    var HttpService, Negociacao, ApplicationException;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    return {
        setters: [function (_utilHttpServiceJs) {
            HttpService = _utilHttpServiceJs.HttpService;
        }, function (_NegociacaoJs) {
            Negociacao = _NegociacaoJs.Negociacao;
        }, function (_utilApplicationExceptionJs) {
            ApplicationException = _utilApplicationExceptionJs.ApplicationException;
        }],
        execute: function () {
            class NegociacaoService {

                constructor() {
                    this._http = new HttpService();
                }

                obtemNegociacoesDaSemana() {
                    return this._http.get('negociacoes/semana').then(negociacoes => negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)), err => {
                        throw new ApplicationException('Não foi possível obter as negociações da semana.');
                    });
                }

                obtemNegociacoesDaSemanaAnterior() {
                    return this._http.get('negociacoes/anterior').then(negociacoes => negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)), err => {
                        throw new ApplicationException('Não foi possível obter as negociações da semana anterior.');
                    });
                }

                obtemNegociacoesDaSemanaRetrasada() {
                    return this._http.get('negociacoes/retrasada').then(negociacoes => negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)), err => {
                        throw new ApplicationException('Não foi possível obter as negociações da semana retrasada.');
                    });
                }

                obtemNegociacoesNoPeriodo() {
                    var _this = this;

                    return _asyncToGenerator(function* () {
                        try {
                            let periodo = yield Promise.all([_this.obtemNegociacoesDaSemana(), _this.obtemNegociacoesDaSemanaAnterior(), _this.obtemNegociacoesDaSemanaRetrasada()]);
                            return periodo.reduce(function (novoArray, item) {
                                return novoArray.concat(item);
                            }, []).sort(function (a, b) {
                                return b.data.getTime() - a.data.getTime();
                            });
                        } catch (err) {
                            console.log(err);
                            throw new ApplicationException('Não foi possível obter as negociações do período.');
                        };
                    })();
                }
            }

            _export('NegociacaoService', NegociacaoService);
        }
    };
});
//# sourceMappingURL=NegociacaoService.js.map