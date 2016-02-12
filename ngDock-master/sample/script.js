// Sample script to obtain dynamic dock 
var dockapp = angular.module('testdock',['ngDock']);
dockapp.controller('sampleController', function($scope) {
  $scope.div2 = {};
  $scope.div2.dock = 'left';
  $scope.toggleLeftRight = function() {
    if ($scope.div2.dock == 'left')
      $scope.div2.dock = 'right';
    else 
      $scope.div2.dock = 'left';
  };
});
