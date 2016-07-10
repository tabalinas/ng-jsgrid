(function() {
   'use strict';

    angular.module('ngjsgrid', [])
        .factory('jsGrid', ['$window', function($window) {
            return $window.jsGrid;
        }])
        .directive('ngJsgrid', ["$timeout", "$compile", "jsGrid", function($timeout, $compile, jsGrid) {
            return {
                restrict: 'A',
                replace: false,
                transclude: false,
                scope: {
                    config: '=ngJsgrid'
                },
                link: function(scope, $element, attrs) {
                    var linking = true;

                    $element.jsGrid($.extend(scope.config, {
                        renderTemplate: function(source, context, args) {
                            var template = jsGrid.Grid.prototype.renderTemplate.apply(this, arguments);
                            if(typeof template !== "string")
                                return template;

                            var templateScope = scope.$parent.$new();
                            angular.extend(templateScope, args);
                            return $compile("<div>" + template + "</div>")(templateScope).contents();
                        }
                    }));

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