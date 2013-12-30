define(
    ['ractive',
     'text!view/main/main.html',
     'css!view/main/main.css'
    ],

    function (Ractive, MainTemplate) {

        var view = function (element) {
            this.element = element;

            this.render();
        };

        view.prototype.onLoaded = function () {
            console.log('Loaded: Main');
        };
        
        view.prototype.onSwitchedTo = function () {
            console.log('Switched to: Main');
        };

        view.prototype.onLeaving = function () {
            console.log('Leaving: Main');
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