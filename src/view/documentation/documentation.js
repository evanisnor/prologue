define(
    ['ractive',
     'text!view/documentation/documentation.html',
     'css!view/documentation/documentation.css'
    ],

    function (Ractive, DocumentationTemplate) {

        var view = function (element) {
            this.element = element;

            this.render();
        };

        view.prototype.onLoaded = function () {
            console.log('Loaded: Documentation');
        };
        
        view.prototype.onSwitchedTo = function () {
            console.log('Switched to: Documentation');
        };

        view.prototype.onLeaving = function () {
            console.log('Leaving: Documentation');
        };

        view.prototype.render = function () {
            console.log('> Rendering: Documentation');
            var ractive = new Ractive({
                el: this.element,
                template: DocumentationTemplate
            });

        };

        return view;
    }
);