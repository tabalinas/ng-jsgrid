(function() {
   "use strict";

    angular.module("angular.jsgrid", [])
        .directive("ngJsgrid", function() {
            return {
                restrict: "A",
                replace: false,
                transclude: false,
                scope: {
                    config: "=ngJsgrid"
                },
                link: function(scope, $element, attrs) {

                    $.each(scope.config, function(key) {
                        scope.$watch("config." + key, function(value) {
                            $element.jsGrid("option", key, value);
                        });
                    });

                    $element.jsGrid(scope.config);
                }
            };
        });
})();