'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'angularResizable'
]).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({ redirectTo: '/view1' });
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

    $scope.switchToFlowChart = function () {
        $scope.selectedTab = $scope.tabs.FlowChart;
        $scope.expand();
    }

    $scope.switchToTokenSearch = function () {
        $scope.selectedTab = $scope.tabs.TokenSearch;
        $scope.expand();
    }

    $scope.directions = ['right'];
})
.directive('drawLayer', [function () {

    function link(scope, element, attrs) {
    }

    return {
        link: link,
        restrict: 'E',
        replace: false,
        controller: 'drawLayerCtrl',
        templateUrl: 'draw-layer.html',
        scope: {

        }
    };
}])

.controller('drawLayerCtrl', ['$scope', function ($scope) {


    var box = d3.select('svg')
        .on("click", function () {

            var coordinates = [0, 0];
            coordinates = d3.mouse(this);
            var x = coordinates[0];
            var y = coordinates[1];

            controls.push({
                x: x,
                y: y,
                r: 60
            });
            update();
        });

   var controls = [{ x: ('700' / 2), y: ('700' / 2), r: 25 }, { x: ('700' / 3), y: ('700' / 3), r: 50 }, { x: ('700' / 4), y: ('700' / 4), r: 75 }];
    var selected = null;

    var drag = d3.behavior.drag()
                .on('dragstart', function(d, i) {
                    d3.select(this).style('stroke', 'blue');
                    console.log('', d3.event);
        })
                .on('drag', function (d, i) {
                    d3.select(this).attr('x', d.x = d3.event.x)
                          .attr('y', d.y = d3.event.y);
                })
                .on('dragend', function (d, i) {
                });

    update();

    function update() {
        var rects = box.selectAll('.draggableCircle')
            .data(controls);

        // When we enter, we just want to create the rect,
        rects.exit().remove();
        rects.enter().append('svg:rect');

        // We configure the rects here so the values
        // apply to it applies to both new and existing
        // rects
        rects
            .attr('class', 'draggableCircle')
            .attr('x', function (d) { return d.x; })
            .attr('y', function (d) { return d.y; })
            .attr('width', function (d) { return d.r *2; })
            .attr('height', function (d) { return d.r; })
            .style('stroke', 'black')
            .style('stroke-width', '5')
            .style('fill-opacity', '0')
            .style('stroke-opacity', '0.9')
            .on("mousedown", function () { d3.event.stopPropagation(); })
            .on("click", function (d, i) {


                if (selected && selected.dataPoint === d) {
                    selected = undefined;
                } else {
                    selected = {
                        dataPoint: d,
                        index: i
                    };
                }

                update();

                d3.event.stopPropagation();
            })
            .style('stroke', function (d) {
                return (selected && d === selected.dataPoint) ? 'red' : 'black';
            })
            .call(drag);

        d3.select("body")
            .on("keydown", function () {
            if (d3.event.keyCode === 46) {
                if (selected) {
                    controls = _.without(controls, selected.dataPoint);
                    selected = undefined;
                    update();
                }
            }

        });
    }


}])