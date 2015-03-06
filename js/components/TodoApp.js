define([
    'knockout',
    'stores/TodoStore',
    'components/MainSection',
    'components/Footer',
    'components/Header',
], function(ko, TodoStore, MainSection, Footer, Header) {
    'use strict';

    function mapFromJS(object) {
        var mapped = {};

        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                mapped[key] = Array.isArray(object[key]) ? ko.observableArray(object[key]) : ko.observable(object[key]);
            }
        }
        return mapped;
    }

    function getTodoState() {
        return {
            allTodos: TodoStore.getAll(),
            allAreComplete: TodoStore.areAllComplete()
        };
    }

    var TodoApp = function TodoApp() {
        this.state = mapFromJS(getTodoState());

        //sub-views
        this.header = new Header();
        this.mainSection = new MainSection(this.state.allTodos, this.state.allAreComplete);
        this.footer = new Footer(this.state.allTodos);

        TodoStore.addChangeListener(this._onChange.bind(this));
    };

    TodoApp.prototype._onChange = function _onChange() {
        var newState = getTodoState();

        this.state.allTodos(newState.allTodos);
        this.state.allAreComplete(newState.allAreComplete);
    };

    return TodoApp;
});
