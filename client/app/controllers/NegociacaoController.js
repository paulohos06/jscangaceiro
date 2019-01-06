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
        this._service = new NegociacaoService();
        
        // inicializa a tabela com todas as negociacoes que estao no banco
        DaoFactory.getNegociacaoDao()
            .then(dao => dao.listaTodos())
            .then(negociacoes => negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao)))
            .catch(err => this._mensagem.texto = err);
    }

    adiciona(event) {
        try {
            event.preventDefault();
            const negociacao = this._criaNegociacao();
            DaoFactory.getNegociacaoDao()
            .then(dao => dao.adiciona(negociacao))
            .then(() => {
                // apenas inclui na tabela se conseguiu incluir no banco
                this._negociacoes.adiciona(this._criaNegociacao());
                this._mensagem.texto = 'Negociação adicionada com sucesso!';
                this._limpaFormulario();
            })
            .catch(err => this._mensagem.texto = err);
        } catch(err) {
            console.log(err);
            console.log(err.stack);

            if(err instanceof DataInvalidaException) this._mensagem.texto = err.message;
            else this._mensagem.texto = 'Um erro não esperado aconteceu. Entre em contato com o suporte.';
        }
    }

    apaga() {
        this._negociacoes.esvazia();
        this._mensagem.texto = 'Negociação apagada com sucesso!';
    }

    importa() {
        this._service.obtemNegociacoesNoPeriodo()
        .then(negociacoes => {
            negociacoes.filter(novaNegociacao => { 
                return !this._negociacoes.negociacoes.some(negociacaoExistente => novaNegociacao.equals(negociacaoExistente))
            })
            .forEach(negociacao => this._negociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações do período importadas com sucesso';
        })
        .catch(err => this._mensagem.texto = err);
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