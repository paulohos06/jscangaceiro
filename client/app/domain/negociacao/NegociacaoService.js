class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }

    obtemNegociacoesDaSemana() {
        return this._http.get('negociacoes/semana').then(
            negociacoes => {
                return negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor));
            },
            err => {
                throw new Error('Não foi possível obter as negociações da semana.');
            }
        );
    }

    obtemNegociacoesDaSemanaAnterior() {
        return this._http.get('negociacoes/anterior').then(
            negociacoes => {
                return negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor));
            },
            err => {
                throw new Error('Não foi possível obter as negociações da semana anterior.');
            }
        );
    }

    obtemNegociacoesDaSemanaRetrasada() {
        return this._http.get('negociacoes/retrasada').then(
            negociacoes => {
                return negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor));
            },
            err => {
                throw new Error('Não foi possível obter as negociações da semana retrasada.');
            }
        );
    }
}