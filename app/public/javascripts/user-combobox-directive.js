// var myDirective = angular.module('myDirective', []);

myDirective
    .directive('userCombobox', function(){
        return {
            restrict: 'EA',
            scope: {
                data: '='
            },
            templateUrl: '../partials/userCombobox',
            link: function(scope, ele, attrs){
                scope.showContent = false;
                // 
                // scope function
                // 
                scope.$watch('filterText', function(value) {
                    if (typeof(value) != 'undefined') {
                        if (value.length > 0) {
                            scope.showContent = true;
                        } else {
                            scope.showContent = false;
                        }
                    } 
                });

                scope.toggle = function() {
                    scope.showContent = !scope.showContent;
                };

                scope.arrowClass = function() {
                    return scope.showContent ? "mdi-chevron-up" : "mdi-chevron-down";
                }
            }
        }
    })