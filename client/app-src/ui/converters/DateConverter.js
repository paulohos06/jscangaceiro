import { DataInvalidaException } from './DataInvalidaException.js';

export class DateConverter {

    constructor() {
        throw new Error('DateConverter não deve ser instanciada');
    }

    static dataParaTexto(data) {
        // ex: 18/12/2018
        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    }

    static textoParaData(texto) {
        // ex: new Date(2018, (12 - 1), 18)
        if(!/^\d{2}\/\d{2}\/\d{4}$/.test(texto)) throw new DataInvalidaException();

        return new Date(...texto
            .split('/')
            .reverse()
            .map((item, indice) => item - parseInt(indice) % 2)
        );
    }
}