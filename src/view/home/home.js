define(
    ['ractive',
     'text!view/home/home.html',
     'css!view/home/home.css'
    ],

    function (Ractive, HomeTemplate) {

        var view = function (element) {
            this.element = element;

            this.render();
        };

        view.prototype.onLoaded = function () {
            console.log('Loaded: Home');
        };
        
        view.prototype.onSwitchedTo = function () {
            console.log('Switched to: Home');
        };

        view.prototype.onLeaving = function () {
            console.log('Leaving: Home');
        };

        view.prototype.render = function () {
            console.log('> Rendering: Home');
            var ractive = new Ractive({
                el: this.element,
                template: HomeTemplate
            });

        };

        return view;
    }
);