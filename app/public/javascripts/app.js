var myApp = angular.module('myApp', [
	'ngRoute',
	'ngAnimate',
	'myController',
	'myDirective',
	'lumx'
]);

angular.module('myApp')
	.config(['$routeProvider',
		function($routeProvider) {
			$routeProvider
				.when('/company', {
					templateUrl: '../partials/company',
					controller: 'companyCtrl'
				})
				.when('/callflows', {
					templateUrl: '../partials/callflows',
					controller: 'callflowsCtrl'
				})
				.when('/groups', {
					templateUrl: '../partials/groups',
					controller: 'groupsCtrl'
				})
				.when('/users', {
					templateUrl: '../partials/users',
					controller: 'usersCtrl'
				})
				.when('/devices', {
					templateUrl: '../partials/devices',
					controller: 'devicesCtrl'
				});
		}
	]);