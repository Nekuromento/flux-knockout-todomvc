define([
    'knockout'
], function(ko) {
    'use strict';

    var TodoTextInput = function TodoTextInput(onSave, value) {
        this.value = ko.observable(value || '');
        this._onSave = onSave;

        this.save = this.save.bind(this);
    };

    TodoTextInput.prototype.save = function save() {
        this._onSave(this.value());
        this.value('');
    };

    return TodoTextInput;
});
