System.register([], function (_export, _context) {
    "use strict";

    function debounce(fn, milliseconds) {
        return () => setTimeout(() => fn(), milliseconds);
    }

    _export("debounce", debounce);

    return {
        setters: [],
        execute: function () {}
    };
});
//# sourceMappingURL=Debounce.js.map