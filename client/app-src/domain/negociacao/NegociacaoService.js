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

    async obtemNegociacoesNoPeriodo() {
        try {
            let periodo = await Promise.all([
                this.obtemNegociacoesDaSemana(),
                this.obtemNegociacoesDaSemanaAnterior(),
                this.obtemNegociacoesDaSemanaRetrasada()
            ]);
            return periodo
                .reduce((novoArray, item) => novoArray.concat(item), [])
                .sort((a, b) => b.data.getTime() - a.data.getTime());
        } catch(err) {
            console.log(err);
            throw new Error('Não foi possível obter as negociações do período.');
        };
    }
}