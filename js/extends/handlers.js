/*global define */

define([
    'knockout',
], function (ko) {
    'use strict';

    var ENTER_KEY_CODE = 13;

    ko.utils.registerEventHandler = function registerEventHandler(element, eventType, handler) {
        var mustUseAttachEvent = ko.utils.ieVersion && ko.utils.eventsThatMustBeRegisteredUsingAttachEvent[eventType];
        var attachEventHandler = function (event) { handler.call(element, event); };
        var jQueryInstance = window.jQuery;

        if (!mustUseAttachEvent && jQueryInstance) {
            jQueryInstance(element).bind(eventType, handler);
        } else if (!mustUseAttachEvent && typeof element.addEventListener == "function") {
            element.addEventListener(eventType, attachEventHandler, false);

            ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                element.removeEventListener(eventType, attachEventHandler, false);
            });
        } else if (typeof element.attachEvent != "undefined") {
            var attachEventName = "on" + eventType;
            element.attachEvent(attachEventName, attachEventHandler);

            // IE does not dispose attachEvent handlers automatically (unlike with addEventListener)
            // so to avoid leaks, we have to remove them manually. See bug #856
            ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                element.detachEvent(attachEventName, attachEventHandler);
            });
        } else
            throw new Error("Browser doesn't support addEventListener or attachEvent");
    };

    // a custom binding to handle the enter key (could go in a separate library)
    ko.bindingHandlers.enterKey = {
        init: function (element, valueAccessor, allBindingsAccessor, data, bindingContext) {
            var wrappedHandler;
            var newValueAccessor;

            // wrap the handler with a check for the enter key
            wrappedHandler = function (data, event) {
                if (event.keyCode === ENTER_KEY_CODE) {
                    valueAccessor().call(this, data, event);
                }
            };

            // create a valueAccessor with the options that we would want to pass to the event binding
            newValueAccessor = function () {
                return {
                    keyup: wrappedHandler
                };
            };

            // call the real event binding's init function
            ko.bindingHandlers.event.init(element, newValueAccessor, allBindingsAccessor, data, bindingContext);
        }
    };

    // wrapper to hasfocus that also selects text and applies focus async
    ko.bindingHandlers.selectAndFocus = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            ko.bindingHandlers.hasfocus.init(element, valueAccessor, allBindingsAccessor);
            ko.utils.registerEventHandler(element, 'focus', function () {
                element.focus();
            });
        },
        update: function (element, valueAccessor) {
            ko.utils.unwrapObservable(valueAccessor()); // for dependency
            // ensure that element is visible before trying to focus
            setTimeout(function () {
                ko.bindingHandlers.hasfocus.update(element, valueAccessor);
            }, 0);
        }
    };
});
