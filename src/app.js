requirejs.config({
    baseUrl: '.',
    paths: {
        lodash : 'bower_components/lodash/dist/lodash.min',
        ractive: 'bower_components/ractive/build/Ractive.min',
        crossroads: 'bower_components/crossroads/dist/crossroads.min',
        hasher: 'bower_components/hasher/dist/js/hasher.min',
        signals: 'bower_components/js-signals/dist/signals.min',
        abrest: 'bower_components/abrest/abrest.min'
    },
    packages: [
        {
            name: 'domReady',
            location: 'bower_components/requirejs-domready',
            main: 'domReady'
        },
        {
            name: 'text',
            location: 'bower_components/requirejs-text',
            main: 'text'
        },
        {
            name: 'css',
            location: 'bower_components/require-css',
            main: 'css'
        }
    ],
    map: {
        '*': {
            'css': 'bower_components/require-css/css'
        }
    }
});

requirejs(
    ['routes',
     'css!index.css',
     'domReady!'
    ],

    function () {

    }
);