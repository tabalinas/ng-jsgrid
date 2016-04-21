(function() {
   'use strict';

    angular.module('ngjsgrid', [])
        .directive('ngJsgrid', ["$timeout", function($timeout) {
            return {
                restrict: 'A',
                replace: false,
                transclude: false,
                scope: {
                    config: '=ngJsgrid'
                },
                link: function(scope, $element, attrs) {
                    var linking = true;

                    $element.jsGrid(scope.config);

                    $.each(scope.config, function(key) {
                        scope.$watch('config.' + key, function(value) {
                            if(linking)
                                return;

                            $element.jsGrid('option', key, value);
                        });
                    });

                    // NOTE: postpone turning off linking to avoid $watch calls right after initialization
                    $timeout(function() {
                        linking = false;
                    });
                }
            };
        }]);
})();