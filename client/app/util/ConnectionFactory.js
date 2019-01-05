const ConnectionFactory = (() => {
    const stores = ['negociacoes'];
    let connection = null;

    return class ConnectionFactory {

        constructor() {
            throw new Error('Essa classe não pode ser instanciada.');
        }

        static getConnection() {
            return new Promise((resolve, reject) => {
                const openRequest = indexedDB.open('jscangaceiro', 2);

                if(connection) return resolve(connection);
                openRequest.onupgradeneeded = e => {
                    // Passa a conexao para o metodo
                    ConnectionFactory._createStores(e.target.result);
                };
                
                openRequest.onsuccess = e => {
                    connection = e.target.result;
                    close = connection.close.bind(connection);

                    connection.close = () => {
                        throw new Error('Você não pode fechar diretamente a conexão.');
                    }
                    resolve(connection);
                };
                
                openRequest.onerror = e => {
                    console.log(e.target.error);
                    reject(e.target.error.name);
                };
            });
        }

        static _createStores(conn) {
            stores.forEach(store => {
                if(conn.objectStoreNames.contains(store)) {
                    conn.deleteObjectStore(store);
                }
                conn.createObjectStore(store, {autoIncrement: true});
            });
        }

        static closeConnection() {
            if(connection) close();
        }
    }
})();
