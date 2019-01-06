System.register(['./ProxyFactory.js'], function (_export, _context) {
    "use strict";

    var ProxyFactory;
    return {
        setters: [function (_ProxyFactoryJs) {
            ProxyFactory = _ProxyFactoryJs.ProxyFactory;
        }],
        execute: function () {
            class Bind {

                constructor(target, view, ...props) {
                    const proxy = ProxyFactory.create(target, props, model => view.update(model));
                    view.update(target);
                    return proxy;
                }
            }

            _export('Bind', Bind);
        }
    };
});
//# sourceMappingURL=Bind.js.map