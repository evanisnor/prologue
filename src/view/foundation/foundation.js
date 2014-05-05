define(
    ['ractive',
     'text!view/foundation/foundation.html',
     'css!view/foundation/foundation.css'
    ],

    function (Ractive, FoundationTemplate) {

        var view = function (element) {
            this.element = element;

            this.render();
        };

        view.prototype.onLoaded = function () {
            console.log('Loaded: Foundation');
        };
        
        view.prototype.onSwitchedTo = function () {
            console.log('Switched to: Foundation');
        };

        view.prototype.onLeaving = function () {
            console.log('Leaving: Foundation');
        };

        view.prototype.render = function () {
            console.log('> Rendering: Foundation');
            var ractive = new Ractive({
                el: this.element,
                template: FoundationTemplate
            });

        };

        return view;
    }
);