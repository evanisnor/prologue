define(
    ['ractive',
     'text!view/secondary/secondary.html',
     'css!view/secondary/secondary.css'
    ],

    function (Ractive, SecondaryTemplate) {

        var view = function (element) {
            this.element = element;

            this.render();
        };

        view.prototype.onLoaded = function () {
            console.log('Loaded: Secondary');
        };
        
        view.prototype.onSwitchedTo = function () {
            console.log('Switched to: Secondary');
        }

        view.prototype.onLeaving = function () {
            console.log('Leaving: Secondary');
        };

        view.prototype.render = function () {
            var ractive = new Ractive({
                el: this.element,
                template: SecondaryTemplate
            });

        };

        return view;
    }
);