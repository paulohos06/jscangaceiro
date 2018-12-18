class Negociacoes {

    constructor() {
        this._negociacoes = [];
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }

   get negociacoes() {
       // passa uma nova lista baseada no array de negociacoes. Assim não é possível modificar a lista original
       //return this._negociacoes.map(item => item);
       return [].concat(this._negociacoes);
   }
}