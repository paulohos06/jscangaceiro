System.register([], function (_export, _context) {
    "use strict";

    var campos, tbody;
    return {
        setters: [],
        execute: function () {
            campos = [document.querySelector('#data'), document.querySelector('#quantidade'), document.querySelector('#valor')];
            tbody = document.querySelector('table tbody');


            document.querySelector('.form').addEventListener('submit', event => {
                event.preventDefault();

                var tr = document.createElement('tr');

                campos.forEach(campo => {
                    var td = document.createElement('td');
                    td.textContent = campo.value;
                    tr.appendChild(td);
                });

                var tdVolume = document.createElement('td');
                tdVolume.textContent = campos[1].value * campos[2].value;
                tr.appendChild(tdVolume);

                tbody.appendChild(tr);

                campos.forEach(campo => campo.value = '');
            });
        }
    };
});
//# sourceMappingURL=index.js.map