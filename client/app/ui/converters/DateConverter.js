class DateConverter {

    dataParaTexto(data) {
        // ex: 18/12/2018
        return data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
    }

    textoParaData(texto) {
        // ex: new Date(2018, (12 - 1), 18)
        return new Date(...texto.split('-').map((item, indice) => item - parseInt(indice) % 2));
    }
}