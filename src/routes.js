define(
    ['util/router'],

    function (Router) {
        var router = new Router();

        router.addRoute('main', 'view/main/main',
            {
                isDefault: true
            }
        );
        
        router.addRoute('secondary', 'view/secondary/secondary',
            {
                preFetchView: true,
                onLoadedCallback: function() {
                    console.log('SECONDARY LOADED')
                }
            }
        );

        router.done();
    }
);