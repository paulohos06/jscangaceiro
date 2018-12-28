class DataInvalidaException extends ApplicationException {

    constructor() {
        super('A data deve estar no formado dd/mm/aaaa');
    }
}