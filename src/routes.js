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
                preFetchView: false,
                onFetchCallback: function() {
                    console.log('SECONDARY FETCHED');
                }
            }
        );

        router.done();
    }
);