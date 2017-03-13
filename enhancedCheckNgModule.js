
(function () {
    'use strict';

    var enchancedCheckModule = angular.module('ui.enhancedCheck', []);

    enchancedCheckModule.directive('enhancedCheckToggle', function() {
        return {
            restrict: 'C',
            require: ['ngModel'],
            scope: {
                bindModel: '=ngModel',
                bindDisabled: '=ngDisabled',
            },
            link: function(scope, element, attributes, controllers) {
                var ngModelController = controllers[0];

                scope.$watch("bindModel", function() {
                    var disabled = scope.bindDisabled;
                    if(disabled) {
                        element.bootstrapToggle('enable');
                    }
                    element.trigger('change.toggle');
                    if(disabled) {
                        element.bootstrapToggle('disable');
                    }
                });


                element.on('change.toggle', function(event) {
                    var checked = element.prop('checked');
                    ngModelController.$setViewValue(checked);
                });


            }

        }
    });

})();
