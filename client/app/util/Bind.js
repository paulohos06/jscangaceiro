class Bind {

    constructor(target, view, ...props) {
        const proxy = ProxyFactory.create(target, props, model => view.update(model));
        view.update(target);
        return proxy;
    }
}