define(
    ['lodash',
     'crossroads',
     'hasher'],
    function (_, crossroads, hasher) {

        /*
         * Prologue Router
         *
         * Encapsulates Crossroads.js and renders Ractive views based on defined routes.
         * Asynchronously loads views as they're accessed by their hash ID, not as the routes
         * are defined.
         *
         * View objects are not destroyed when a user navigates away from them, but are stored in
         * the 'loadedViews' object.
         *
         * View objects can implement the following methods that will be called
         * when appropriate:
         *      onLoaded()
         *      onSwitchedTo()
         *      onLeaving()
         */
        var Router = function () {
            this.loadedViews = {};
            
            crossroads.bypassed.add(function(id) {
                console.error('Unknown Hash ID: ' + id);
            });
        };

        /*
         * Add a listener for when the Hash URL changes.
         */
        Router.prototype.addHashChangeListener = function (callback) {
            hasher.changed.add(callback);
        };

        /*
         * Define a new route by specifying a hash ID and a relative path to the view model.
         * Third parameter is an optional Options object that has two supported values:
         *      isDefault (boolean) - Marks this Route as being the default route in addition to the supplied hash ID
         *      onLoadedCallback (function) - Called when the route view is first loaded
         *      preFetchView (boolean) - Pre-fetches the view as opposed to loading it asynchronously when its route is called
         */
        Router.prototype.addRoute = function (hashId, viewPath, options) {
            var self = this;
            var route = crossroads.addRoute(hashId);

            if (hashId !== '' && options && options.isDefault) {
                // If the route being defined should also be the default route, call addRoute with an empty
                // string for the hash ID.
                self.addRoute('', viewPath, options);
            }

            if (options && options.preFetchView) {
                self.fetchView(hashId, viewPath, options);
            }

            route.matched.add(function () {
                // Set the class of the app-view container to 'loading' for CSS transitions.
                document.getElementById('app-view').className = 'loading';

                if (self.loadedViews[hashId]) {
                    // If the view is already loaded for that hash ID, render it and call the onSwitchedTo method
                    setTimeout(function () {
                        self.renderExistingView(hashId);

                        // Set the class of the app-view container to 'loaded' so the view will appear
                        // and complete the CSS transition.
                        document.getElementById('app-view').className = 'loaded';
                    }, 1);
                }
                else {
                    // If the route has been called by the user and the view hasn't been loaded, load it.
                    self.fetchView(hashId, viewPath, options, function() {
                        // Set the class of the app-view container to 'loaded' so the view will appear
                        // and complete the CSS transition.
                        document.getElementById('app-view').className = 'loaded';
                    });
                }

            });

        };

        Router.prototype.renderExistingView = function (hashId) {
            var self = this;
            var loadedView = self.loadedViews[hashId];
            loadedView.instance.render(); // Render the view
            if (loadedView.instance.onSwitchedTo) {
                // Call the view's onSwitchedTo() callback
                (function() { loadedView.instance.onSwitchedTo(); })();
            }
        };

        Router.prototype.fetchView = function (hashId, viewPath, options, onFetched) {
            var self = this;

            require([viewPath], function (view) {
                // Check to see if the view is already loaded and is meant to be the default view
                var loadedView = _.find(self.loadedViews, function (view) {
                    return view.path === viewPath && (options && options.isDefault);
                });

                // Create a new view instance if the view doesn't already exist
                if (!loadedView) {
                    loadedView = {
                        instance: new view('#app-view'),
                        path: viewPath,
                        options: options
                    };
                }

                self.loadedViews[hashId] = loadedView; // Save the view object
                
                if (options && options.onLoadedCallback) {
                    (function() { options.onLoadedCallback(); })();
                }

                if (loadedView.instance.onLoaded) {
                    (function() { loadedView.instance.onLoaded(); })();
                }

                if (loadedView.instance.onSwitchedTo) {
                    (function() { loadedView.instance.onSwitchedTo(); })();
                }

                if (onFetched) {
                    onFetched();
                }
            });
        };

        /*
         * Hasher callback for detecting hash URL changes and updating the view
         * with Crossroads.
         */
        Router.prototype.onHashChange = function(newHash, oldHash) {
            crossroads.parse(newHash);
            if (!oldHash) {
                oldHash = '';
            }

            var oldView = this.loadedViews[oldHash];
            if (oldView && oldView.instance.onLeaving) {
                oldView.instance.onLeaving();
            }
        };

        /*
         * To be called when you have finished defining routes by calling 'addRoute'.
         * Initializes Hasher to detect URL changes.
         */
        Router.prototype.done = function() {
            var self = this;
            hasher.initialized.add(function (newHash, oldHash) {
                self.onHashChange(newHash, oldHash);
            }); //parse initial hash
            
            hasher.changed.add(function (newHash, oldHash) {
                self.onHashChange(newHash, oldHash);
            }); //parse hash changes
            hasher.init(); //start listening for history change
        };

        return Router;
    }
);