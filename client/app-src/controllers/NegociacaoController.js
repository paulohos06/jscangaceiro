import { Negociacoes, NegociacaoService, Negociacao } from '../domain/index.js';
import { NegociacoesView, MensagemView, Mensagem, DataInvalidaException, DateConverter } from '../ui/index.js';
import { getNegociacaoDao, Bind, getExceptionMessage } from '../util/index.js';

export class NegociacaoController {

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
        this._init();
    }

    async _init() {
        // inicializa a tabela com todas as negociacoes que estao no banco
        try {
            const dao = await getNegociacaoDao();
            const negociacoes = await dao.listaTodos();
            negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao));
        } catch(err) {
            this._mensagem.texto = getExceptionMessage(err);
        }
    }

    async adiciona(event) {
        try {
            event.preventDefault();
            const negociacao = this._criaNegociacao();
            const dao = await getNegociacaoDao();
            await dao.adiciona(negociacao);
            this._negociacoes.adiciona(negociacao);
            this._mensagem.texto = 'Negociação adicionada com sucesso.';
            this._limpaFormulario();
        } catch(err) {
            if(err instanceof DataInvalidaException) this._mensagem.texto = err.message;
            this._mensagem.texto = getExceptionMessage(err);
        }
    }

    async apaga() {
        try {
            const dao = await getNegociacaoDao();
            await dao.apagaTodos();
            this._negociacoes.esvazia();
            this._mensagem.texto = 'Negociações apagadas com sucesso.';
        } catch(err) {
            this._mensagem.texto = getExceptionMessage(err);
        }
    }

    async importa() {
        try {
            const negociacoes = await this._service.obtemNegociacoesNoPeriodo();

            negociacoes.filter(novaNegociacao => {
                return !this._negociacoes.negociacoes.some(negociacaoExistente => novaNegociacao.equals(negociacaoExistente))
            })
            .forEach(negociacao => this._negociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações do período importadas com sucesso.';
        } catch(err) {
            this._mensagem.texto = getExceptionMessage(err);
        }
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