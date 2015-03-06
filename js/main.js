require.config({
    paths: {
        knockout: '../node_modules/knockout/build/output/knockout-latest.debug',
    },
    packages: [
        {
            name: 'events',
            location: 'events',
            main: 'events'
        },
        {
            name: 'flux',
            location: 'flux',
            main: 'index'
        }
    ]
});

require([
    'knockout',
    'components/TodoApp',
    'extends/handlers'
], function (ko, TodoApp) {
    'use strict';

    // bind a new instance of our view model to the page
    ko.applyBindings(new TodoApp());
});
