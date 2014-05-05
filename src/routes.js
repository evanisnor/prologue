define(
    ['util/router'],

    function (Router) {
        var router = new Router();

        router.addRoute('home', 'view/home/home',
            {
                isDefault: true
            }
        );

        router.addRoute('documentation', 'view/documentation/documentation',
            {
                preFetchView: false,
                onFetchCallback: function() {
                    console.log('Documentation fetched');
                }
            }
        );

        router.addRoute('foundation', 'view/foundation/foundation');

        router.done();
    }
);