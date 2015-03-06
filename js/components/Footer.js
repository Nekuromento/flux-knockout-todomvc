define([
    'knockout',
    'actions/TodoActions'
], function(ko, TodoActions) {
    'use strict';

    var Footer = function Footer(allTodos) {
        this.completedCount = ko.pureComputed(function() {
            var all = allTodos();

            var completed = 0;
            for (var key in all) {
                if (all[key].complete) {
                    ++completed;
                }
            }

            return completed;
        });

        this.remainingCount = ko.pureComputed(function() {
            var total = Object.keys(allTodos()).length;
            return total - this.completedCount();
        }, this);

        this.itemsLeftLabel = ko.pureComputed(function() {
            return this.remainingCount() === 1 ? ' item ' : ' items ';
        }, this);

        this.onClearCompletedClick = this.onClearCompletedClick.bind(this);
    };

    Footer.prototype.onClearCompletedClick = function onClearCompletedClick() {
        TodoActions.destroyCompleted();
    };

    return Footer;
});
