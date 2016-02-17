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

angular.module('myApp').controller('leftSideBarCtrl', function ($scope) {

    $scope.tabs = {
        FlowChart: 0,
        TokenSearch: 1
    };

    $scope.selectedTab = $scope.tabs.TokenSearch;

    $scope.collapsed = true;
    $scope.collapse = function () {
        $scope.collapsed = true;
        $scope.directions = [];
    }

    $scope.expand = function () {
        $scope.collapsed = false;
        $scope.directions = ['right'];
    }

    $scope.switchToFlowChart = function() {
        $scope.selectedTab = $scope.tabs.FlowChart;
        $scope.expand();
    }

    $scope.switchToTokenSearch = function () {
        $scope.selectedTab = $scope.tabs.TokenSearch;
        $scope.expand();
    }

    $scope.directions = ['right'];
})