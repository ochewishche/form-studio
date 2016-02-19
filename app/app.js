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
        //element.

        //var box = d3.select('svg');

        //var drag = d3.behavior.drag()
        //             .on('dragstart', function (d, i) {  d3.select(this).style('fill', 'red'); })
        //             .on('drag', function (d, i) {
        //                 d3.select(this).attr('cx', d.x = d3.event.x)
        //                       .attr('cy', d.y = d3.event.y);
        //             })
        //             .on('dragend', function () { d3.select(this).style('fill', 'black'); });

        //var circle = box.selectAll('.draggableCircle')
        //                .data([{ x: ('700' / 2), y: ('700' / 2), r: 25 }, { x: ('700' / 3), y: ('700' / 3), r: 25 }])
        //                .enter()
        //                .append('svg:circle')
        //                .attr('class', 'draggableCircle')
        //                .attr('cx', function (d) { return d.x; })
        //                .attr('cy', function (d) { return d.y; })
        //                .attr('r', function (d) { return d.r; })
        //                .call(drag)
        //                .style('fill', 'black');
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
                r: 25
            });
            update();
        });

   

    //var circle = box.selectAll('.draggableCircle')
    //                .data([{ x: ('700' / 2), y: ('700' / 2), r: 25 }, { x: ('700' / 3), y: ('700' / 3), r: 25 }])
    //                .enter()
    //                .append('svg:circle')
    //                .attr('class', 'draggableCircle')
    //                .attr('cx', function (d) { return d.x; })
    //                .attr('cy', function (d) { return d.y; })
    //                .attr('r', function (d) { return d.r; })
    //                .call(drag)
    //                .style('fill', 'black');

    var controls = [{ x: ('700' / 2), y: ('700' / 2), r: 25 }, { x: ('700' / 3), y: ('700' / 3), r: 50 }, { x: ('700' / 4), y: ('700' / 4), r: 75 }];
    var selected = null;

    var drag = d3.behavior.drag()
                .on('dragstart', function (d, i) { d3.select(this).style('fill', 'red'); })
                .on('drag', function (d, i) {
                    d3.select(this).attr('cx', d.x = d3.event.x)
                          .attr('cy', d.y = d3.event.y);
                })
                .on('dragend', function (d, i) {
                    //selected = {
                    //    dataPoint: d,
                    //    index: i
                    //};
                    //update();
                    // d3.select(this).style('fill', 'blue');
                });

    update();

    function update() {
        var rects = box.selectAll('.draggableCircle')
            .data(controls);

        // When we enter, we just want to create the rect,
        rects.exit().remove();
        rects.enter().append('svg:circle');

        // We configure the rects here so the values
        // apply to it applies to both new and existing
        // rects
        rects
            .attr('class', 'draggableCircle')
            .attr('cx', function (d) { return d.x; })
            .attr('cy', function (d) { return d.y; })
            .attr('r', function (d) { return d.r; })
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
                //d3.select(this).style('fill', 'blue');
                d3.event.stopPropagation();
            })
            .style('fill', function (d) {
                return (selected && d === selected.dataPoint) ? 'blue' : 'black';
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