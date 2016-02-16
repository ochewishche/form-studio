'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'angularResizable'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);

angular.module('myApp').controller('rightSideBarCtrl', function ($scope) {

    $scope.tabs = {
        FlowChart: 0,
        TokenSearch: 1
    };

    $scope.selectedTab = $scope.tabs.TokenSearch;

    $scope.collapsed = false;
    $scope.collapse = function () {
        $scope.collapsed = true;
    }

    $scope.expand = function () {
        $scope.collapsed = false;
    }

    $scope.switchToFlowChart = function() {
        $scope.selectedTab = $scope.tabs.FlowChart;
    }

    $scope.switchToTokenSearch = function () {
        $scope.selectedTab = $scope.tabs.TokenSearch;
    }
})