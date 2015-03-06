define([
    'actions/TodoActions',
    'components/TodoTextInput'
], function(TodoActions, TodoTextInput) {
    'use strict';

    var Header = function Header() {
        this.input = new TodoTextInput(this._onSave.bind(this));
    };

    Header.prototype._onSave = function _onSave(text) {
        if (text.trim()) {
            TodoActions.create(text);
        }
    };

    return Header;
});
