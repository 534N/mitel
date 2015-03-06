var myDirective = angular.module('myDirective', []);

myDirective
    .controller('userAccordionCtrl', ['$scope',
        function($scope) {

            this.panes = [];

            this.addPane = function(scope) {
                this.panes.push(scope);
            };

            this.closeOthers = function(scope) {
                angular.forEach(this.panes, function(paneScope) {
                    if (paneScope != scope) {
                        paneScope.isOpen = false;
                    }
                })
            }
        }
    ])
    .directive('userAccordionGroup', function(){
        return {
            restrict: 'EA',
            scope: {},
            transclude: true,
            templateUrl: '../partials/userAccordionGroup',
            controller: 'userAccordionCtrl',
            link: function(scope, ele, attrs){
                scope.isEnabled = true;
            }
        }
    })
    .directive('userAccordionPane', function(){
        return {
            restrict: 'EA',
            require:'^userAccordionGroup',
            scope: {
                title: '@'
            },
            transclude: true,
            templateUrl: '../partials/userAccordionPane',
            controller: function() {

            },
            link: function(scope, ele, attrs, userAccordionCtrl) {
                userAccordionCtrl.addPane(scope);
                if (typeof(scope.isOpen) == 'undefined') scope.isOpen = false;

                scope.activeClass = function() {
                   return scope.isOpen ? "active" : '';
                }
                // 
                // scope functions
                // 
                scope.toggle = function() {
                    scope.isOpen = !scope.isOpen;
                    userAccordionCtrl.closeOthers(scope);
                }
            }
        }
    })
    .directive('userAccordionBody', ["$http", "$templateCache", "$compile", 
        function($http, $templateCache, $compile) {
            return {
                restrict: 'EA',
                require:'^userAccordionPane',
                scope: {
                    template: '@'
                },
                link: function(scope, ele, attrs, userAccordionCtrl) {
                    var template = scope.template;
                    // scope.$watch('isOpen', function(value) {
                    //     console.log(value)
                    //     if (value) {
                    //         userAccordionCtrl.closeOthers(scope);
                    //     }
                    // });
                    

                    // 
                    // Magic: compiles the scope for the template
                    // 
                    $http.get('../partials/'+template, {cache: $templateCache})
                    .then(function(response) {
                        templateScope = scope.$new();
                        ele.html(response.data);
                        $compile(ele.contents())(templateScope);
                    }); 
                }
            };
        }
    ])
    
    
    