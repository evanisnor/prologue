define(
    ['ractive',
     'text!main.html',
     'css!main.css'
    ],

    function (Ractive, MainTemplate) {

        var view = function (element) {
            this.element = element;

            this.render();
        };

        view.prototype.onLoaded = function () {
            console.log('Loaded: Main');
        };

        view.prototype.render = function () {
            console.log('> Rendering: Main');
            var ractive = new Ractive({
                el: this.element,
                template: MainTemplate
            });

        };

        return view;
    }
);