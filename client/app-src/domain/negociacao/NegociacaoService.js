import { HttpService } from '../../util/HttpService.js';
import { Negociacao } from './Negociacao.js';

export class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }

    obtemNegociacoesDaSemana() {
        return this._http.get('negociacoes/semana').then(
            negociacoes => negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)),
            err => {
                throw new Error('Não foi possível obter as negociações da semana.');
            }
        );
    }

    obtemNegociacoesDaSemanaAnterior() {
        return this._http.get('negociacoes/anterior').then(
            negociacoes => negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)),
            err => {
                throw new Error('Não foi possível obter as negociações da semana anterior.');
            }
        );
    }

    obtemNegociacoesDaSemanaRetrasada() {
        return this._http.get('negociacoes/retrasada').then(
            negociacoes => negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)),
            err => {
                throw new Error('Não foi possível obter as negociações da semana retrasada.');
            }
        );
    }

    obtemNegociacoesNoPeriodo() {
        return Promise.all([
            this.obtemNegociacoesDaSemana(),
            this.obtemNegociacoesDaSemanaAnterior(),
            this.obtemNegociacoesDaSemanaRetrasada()
        ])
        .then(periodo => periodo
            .reduce((novoArray, item) => novoArray.concat(item), [])
            .sort((atual, proximo) => proximo.data.getTime() - atual.data.getTime())
        )
        .catch(err => {
            throw new Error('Não foi possível obter as negociações do período.');
        });
    }
}