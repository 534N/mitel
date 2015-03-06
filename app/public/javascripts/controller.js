var myController = angular.module('myController', []);

myController
	.controller('profileCtrl', ['$scope', 
		function($scope) {
			var user = {
				name: 'Sean Yang',
				avatar: '/img/me.JPG'
			}

			$scope.user = user;
		}
	])
	.controller('leftNavCtrl', ['$scope', '$location', '$routeParams', 
		function($scope, $location, $routeParams) {
			var options = [
				{
					name: 'COMPANY',
					icon: 'city',
					link: 'company'
				},
				{
					name: 'CALL FLOWS',
					icon: 'routes',
					link: 'callflows'
				},
				{
					name: 'GROUPS',
					icon: 'account-multiple',
					link: 'groups'
				},
				{
					name: 'USERS',
					icon: 'account',
					link: 'users'
				},
				{
					name: 'DEVICES',
					icon: 'keyboard',
					link: 'devices'
				}
			];


			var isActive = function(route) {
				var isActive = false;
				return (route == $location.path());
			}
			
			// 
			// setting scope properties
			// 
			$scope.options = options;
			$scope.isActive = isActive;
		}

	])
	.controller('companyCtrl', ['$scope', 
		function($scope) {

		}
	])
	.controller('callflowsCtrl', ['$scope', 
		function($scope) {

		}
	])
	.controller('groupsCtrl', ['$scope', 
		function($scope) {
			var list = [
				'Nunavut', 
				'Quebec', 
				'Northwest Territories', 
				'Ontario',
				'British Columbia', 
				'Alberta', 
				'Saskatchewan', 
				'Manitoba',
				'Yukon', 
				'Newfoundland and Labrador', 
				'New Brunswick',
				'Nova Scotia', 
				'Prince Edward Island'
			];


			// 
			// scope setup
			// 
			$scope.list = list;
		}
	])
	.controller('usersCtrl', ['$scope', 
		function($scope) {
			var options = [
				{
					name: 'Basic User information',
					template: 'basicUserInfo'
				},
				{
					name: 'Select Plan',
					template: 'selectPlan'
				},
				{
					name: 'Configure Plan',
					template: 'configurePlan'
				},
				{
					name: 'Device Setup',
					template: 'deviceSetup'
				}
			];


			// 
			// scope setup
			// 
			$scope.options = options;
		}
	])
	.controller('devicesCtrl', ['$scope', 
		function($scope) {

		}
	]);