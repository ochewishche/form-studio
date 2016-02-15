'use strict';

angular.module('myApp', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [function() {

}])
.controller('rightSideBarCtrl', function ($scope) {    
    $scope.collapsed = true;
    $scope.collapse = function () {
        $scope.collapsed = true;
    }

    $scope.expand = function () {
        $scope.collapsed = false;
    }
});

;