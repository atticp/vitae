angular.module('vitae.nameHeader')
    .directive('vitaeNameHeader', ['$window', 'd3Service', 'd3UtilsService',
                                     function ($window, d3Service, d3UtilsService) {
            return {
                restrict: 'E',
                scope: {
                    data: "="
                },
                link: function (scope, ele) {
                    d3Service.d3().then(function (d3) {
                        var svg = d3.select(ele[0])
                            .append('svg')
                            .style('width', '100%');

                        // Browser onresize event
                        $window.onresize = function () {
                            scope.$apply();
                        };

                        // Watch for resize event
                        scope.$watch(function () {
                            return angular.element($window)[0].innerWidth;
                        }, function () {
                            scope.render(scope.data);
                        });

                        // watch for data changes and re-render
                        scope.$watch('data', function (newVals) {
                            return scope.render(newVals);
                        }, true);

                        scope.render = function (data) {
                            svg.selectAll('*').remove();

                            if (!data) {
                                return;
                            }

                            var width = d3.select(ele[0]).node().offsetWidth,
                                height = 200;

                            svg.attr('height', height);


                            var addLine = function (x1, x2, y, color) {
                                svg
                                    .append('line')
                                    .attr('x1', x1)
                                    .attr('x2', x2)
                                    .attr('y1', y)
                                    .attr('y2', y)
                                    .attr('fill', 'none')
                                    .attr('stroke', color)
                                    .attr('stroke-width', 5);

                                svg
                                    .append('circle')
                                    .attr('r', 15)
                                    .attr('cx', x1)
                                    .attr('cy', y)
                                    .attr('fill', '#ddd')
                                    .attr('stroke', color)
                                    .attr('stroke-width', 5);
                            };

                            addLine(40, width - 100, 85, '#FFA347');
                            addLine(width - 40, 120, height - 18, '#B4DA45');
                            //                            addLine(80, width - 80, height - 18, '#AAC6FF');

                            svg
                                .append('text')
                                .attr('class', 'vitae-header-name')
                                .attr('y', 55)
                                .attr('x', width / 2)
                                .text(data.name);

                            svg
                                .append('text')
                                .attr('class', 'vitae-header-description')
                                .each(function () {
                                    d3UtilsService.wrapSVGText(d3.select(this), {
                                        caption: data.description,
                                        x: width / 2,
                                        y: 115,
                                        maxChars: 90,
                                        lineHeight: 24
                                    });
                                });

                        };
                    });
                }
            };
    }]);