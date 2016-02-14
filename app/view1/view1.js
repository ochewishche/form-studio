'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [function() {

}])
.controller('sampleController', function ($scope) {
    $scope.div2 = {};
    $scope.div2.dock = 'left';
    $scope.toggleLeftRight = function () {
        if ($scope.div2.dock == 'left')
            $scope.div2.dock = 'right';
        else
            $scope.div2.dock = 'left';
    };
});

;