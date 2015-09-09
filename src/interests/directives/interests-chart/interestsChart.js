angular.module('vitae.interests')
    .directive('vitaeInterestsChart', ['$window', '$timeout', 'd3Service',
                                     function ($window, $timeout, d3Service) {
            return {
                restrict: 'E',
                scope: {
                    data: "="
                },
                link: function (scope, ele, attrs) {
                    d3Service.d3().then(function (d3) {
                        var svg = d3.select(ele[0])
                            .append('svg')
                            .style('width', '100%'),

                            margin = parseInt(attrs.margin, 10) || 20,
                            barHeight = parseInt(attrs.barHeight, 10) || 20,
                            barPadding = parseInt(attrs.barPadding, 10) || 5;

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
                            // remove all previous items before render
                            svg.selectAll('*').remove();

                            // If we don't pass any data, return out of the element
                            if (!data) {
                                return;
                            }

                            // setup variables
                            var height = scope.data.length * (barHeight + barPadding),
                                axisXPos = Math.round(margin / 2) + 15,
                                color = d3.scale.ordinal().range(["#FFA347", "#B4DA45", "#AAC6FF"]),
                                defs = svg.append('defs');

                            svg.attr('height', height);

                            svg.append('line')
                                .attr('class', 'axis')
                                .attr('x1', axisXPos)
                                .attr('x2', axisXPos)
                                .attr('y1', 0)
                                .attr('y2', height);

                            var items = svg.selectAll('g.interest')
                                .data(data);

                            items.enter()
                                .append('g')
                                .attr('class', 'interest');

                            //create the rectangles for the bar chart
                            items
                                .append('rect')
                                .attr('height', barHeight)
                                .attr('x', axisXPos + barPadding + 1)
                                .attr('y', 0)
                                .attr('fill', function (d, i) {
                                    return color(i);
                                });

                            items
                                .append('text')
                                .attr('fill', '#333')
                                .attr('alignment-baseline', 'middle')
                                .attr('y', barHeight / 2 + 2)
                                .attr('x', axisXPos + 40)
                                .text(function (d) {
                                    return d.title;
                                })
                                .each(function () {
                                    var textBBox = this.getBBox();
                                    var width = textBBox.x + textBBox.width + barHeight + 18;
                                    d3.select(this.previousSibling)
                                        .attr('width', width);
                                });

                            var filter = defs.append("filter")
                                .attr("id", "grey")

                            filter.append('feColorMatrix')
                                .attr('in', 'SourceGraphic')
                                .attr('type', 'matrix')
                                .attr('values', '0 0 0 .05 0 0 0 0 .05 0 0 0 0 .05 0 0 0 0 1 0 ');

                            items
                                .append('image')
                                .attr('xlink:href', function (d) {
                                    return 'images/' + d.img;
                                })
                                .attr('height', barHeight - 4)
                                .attr('width', barHeight - 4)
                                .attr('x', function () {
                                    var textBBox = this.previousSibling.getBBox();
                                    return textBBox.x + textBBox.width + 15;
                                })
                                .attr('y', 2)
                                .style("filter", "url(#grey)");

                            items.each(function (d, i) {
                                var y = i * (barHeight + barPadding) + 2;
                                d3.select(this).attr('transform', function () {
                                    return 'translate(0,' + y + ')';
                                });
                            });
                        };
                    });
                }
            };
                }]);