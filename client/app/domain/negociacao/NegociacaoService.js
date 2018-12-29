class NegociacaoService {

    obterNegociacoesDaSemana(cb) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'negociacoes/semana');
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {
                if(xhr.status == 200) {
                    const negociacoes = JSON.parse(xhr.responseText)
                    .map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor));

                    cb(null, negociacoes);
                } else {
                    console.log(xhr.responseText);
                    cb(xhr.responseText, null);
                }
            }
        };
        xhr.send();
    }
}