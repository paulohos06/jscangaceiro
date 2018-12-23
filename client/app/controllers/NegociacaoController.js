class NegociacaoController {

    constructor() {
        // toda funcao em JS possui o metodo bind(). Realizando o bind, o $ mantém document como seu contexto this
        const $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._negociacoes = new Bind(
            new Negociacoes(),
            new NegociacoesView('#negociacoes'),
            'adiciona', 'esvazia'
        );
        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView('#mensagem'),
            'texto'
        );
    }

    adiciona(event) {
        event.preventDefault();
        this._negociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = 'Negociação adicionada com sucesso!';
        this._limpaFormulario();
    }

    apaga() {
        this._negociacoes.esvazia();
        this._mensagem.texto = 'Negociação apagada com sucesso!';
    }

    _limpaFormulario() {
        this._inputValor.value = 0.0;
        this._inputQuantidade.value = 1;
        this._inputData.value = '';
        this._inputData.focus();
    }

    _criaNegociacao() {
        return new Negociacao(
            DateConverter.textoParaData(this._inputData.value), 
            parseInt(this._inputQuantidade.value), 
            parseFloat(this._inputValor.value)
        );
    }
    
}