class Negociacao {

    constructor(_data, _quantidade, _valor) {
        // o método assign() copia as propriedades dos outros objetos para o primeiro objeto parametrizado.
        Object.assign(this, {_quantidade, _valor});
        this._data = new Date(_data.getTime());

        // congela o objeto para novas atribuições!
        Object.freeze(this);
    }

    get data() {
        return new Date(this._data.getTime());
    }

    get quantidade() {
        return this._quantidade;
    }

    get valor() {
        return this._valor;
    }

    get volume() {
        return this._quantidade * this._valor;
    }

    equals(negociacao) {
        return this.data.getDate() == negociacao.data.getDate()
        && this.data.getMonth() == negociacao.data.getMonth()
        && this.data.getFullYear() == negociacao.data.getFullYear()
        && this.quantidade == negociacao.quantidade
        && this.valor == negociacao.valor;
    }
}