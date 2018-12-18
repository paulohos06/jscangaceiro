class NegociacaoController {

    constructor() {
        // toda funcao em JS possui o metodo bind(). Realizando o bind, o $ mantém document como seu contexto this
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
    }

    adiciona(event) {
        event.preventDefault();
        
        let negociacao = new Negociacao(
            DateConverter.textoParaData(this._inputData.value), 
            parseInt(this._inputQuantidade.value), 
            parseFloat(this._inputValor.value)
        );

        console.log(negociacao);
        console.log(DateConverter.dataParaTexto(negociacao.data));
    }
}