define(
    ['util/router'],

    function (Router) {
        var router = new Router();

        router.addRoute('main', 'view/main/main', { isDefault: true });
        router.addRoute('secondary', 'view/secondary/secondary', { onLoadedCallback: function() { console.log('SECONDARY LOADED') } });

        router.done();
    }
);