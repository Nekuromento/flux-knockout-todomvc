define([
    'knockout',
    'actions/TodoActions',
    'components/TodoItem'
], function(ko, TodoActions, TodoItem) {
    'use strict';

    var MainSection = function MainSection(allTodos, allAreComplete) {
        this.todos = ko.pureComputed(function() {
            var all = allTodos();
            var todos = [];
            for (var key in all) {
                todos.push(new TodoItem(key, all[key]));
            }

            return todos;
        });

        this.allAreComplete = ko.pureComputed({
            read: function () {
                return allAreComplete();
            },
            write: function() {
                TodoActions.toggleCompleteAll();
            }
        });
    };

    return MainSection;
});
