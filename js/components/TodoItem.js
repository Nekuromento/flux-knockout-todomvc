define([
    'knockout',
    'actions/TodoActions',
    'components/TodoTextInput'
], function(ko, TodoActions, TodoTextInput) {
    'use strict';

    var TodoItem = function TodoItem(key, todo) {
        this.input = new TodoTextInput(this.onSave.bind(this), todo.text);

        this.todo = todo;

        this.editing = ko.observable(false);
        this.completed = ko.pureComputed({
            read: function() {
                return todo.complete;
            },
            write: function() {
                TodoActions.toggleComplete(todo);
            }
        });

        this.onDoubleClick = this.onDoubleClick.bind(this);
        this.onDestroyClick = this.onDestroyClick.bind(this);
    };

    TodoItem.prototype.onDoubleClick = function onDoubleClick() {
        this.editing(true);
    };

    TodoItem.prototype.onSave = function onSave(text) {
        TodoActions.updateText(this.todo.id, text);
        this.editing(false);
    };

    TodoItem.prototype.onDestroyClick = function() {
        TodoActions.destroy(this.todo.id);
    };

    return TodoItem;
});
