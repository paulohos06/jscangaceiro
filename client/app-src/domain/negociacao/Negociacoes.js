export class Negociacoes {

    constructor() {
        this._negociacoes = [];
        Object.freeze(this);
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }
    
    esvazia() {
        this._negociacoes.length = 0;
    }

   get negociacoes() {
       return [].concat(this._negociacoes);
   }

   get volumeTotal() {
       let total = 0;
       for (const negociacao of this._negociacoes) {
           total += negociacao.volume;
       }
       return total;
    }

    get volumeTotal2() {
        return this._negociacoes.reduce((total, negociacao) => total + negociacao.volume, 0);
    }
}