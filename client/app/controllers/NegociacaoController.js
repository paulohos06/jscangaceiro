class NegociacaoController {

    adiciona(event) {
        event.preventDefault();

        // toda funcao em JS possui o metodo bind(). Realizando o bind, o $ mantém document como seu contexto this
        let $ = document.querySelector.bind(document);
        
        let inputData = $('#data');
        let inputQuantidade = $('#quantidade');
        let inputValor = $('#valor');
       
    }
}