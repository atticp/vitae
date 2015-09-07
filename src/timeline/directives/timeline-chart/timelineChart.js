angular.module('vitae.timeline')
    .directive('vitaeTimelineChart', ['$window', '$filter', 'd3Service', 'd3UtilsService',
                                     function ($window, $filter, d3Service, d3UtilsService) {
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
                            padding = parseInt(attrs.padding, 10) || 10;

                        // Browser onresize event
                        window.onresize = function () {
                            scope.$apply();
                        };

                        // Watch for resize event
                        scope.$watch(function () {
                            return angular.element(window)[0].innerWidth;
                        }, function () {
                            scope.render(scope.data);
                        });

                        // watch for data changes and re-render
                        scope.$watch('data', function (newVals, oldVals) {
                            return scope.render(newVals);
                        }, true);

                        var addKey = function (categories, width, xPos) {
                            // setup variables
                            var rowHeight = 30,
                                rows = 1 + Math.floor((categories.length - 1) / 3),
                                itemWidth = (width - xPos) / 3;

                            var keyItems = svg.selectAll('g.key-item')
                                .data(categories);

                            keyItems.enter()
                                .append('g')
                                .attr('class', 'key-item');

                            keyItems
                                .append('rect')
                                .attr('class', function (d) {
                                    return 'key-item-' + d;
                                })
                                .attr('x', function (d, i) {
                                    return xPos + itemWidth * (i % 3);
                                })
                                .attr('y', function (d, i) {
                                    return rowHeight * Math.floor(i / 3);
                                })
                                .attr('width', itemWidth - Math.round(margin / 2))
                                .attr('height', rowHeight);

                            keyItems
                                .append('text')
                                .attr('class', 'key-text')
                                .attr('x', function (d, i) {
                                    return xPos + itemWidth * (i % 3) + itemWidth / 2;
                                })
                                .attr('y', function (d, i) {
                                    return rowHeight * Math.floor(i / 3) + 2 * rowHeight / 3 + 2;
                                })
                                .text(function (d) {
                                    return d;
                                });

                            return rows * rowHeight;
                        }

                        scope.render = function (data) {
                            //TODO: Refactor into smaller functions

                            // remove all previous items before render
                            svg.selectAll('*').remove();

                            // If we don't pass any data, return out of the element
                            if (!data) {
                                return;
                            }

                            data = $filter('orderBy')(data, "-startdate");

                            // setup variables
                            var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
                                width = d3.select(ele[0]).node().offsetWidth - margin,
                                axisXPos = Math.round(margin / 2) + 15,
                                itemXPos = axisXPos + 35,
                                categories = [],
                                defs = svg.append('defs');

                            data.forEach(function (d) {
                                if (categories.indexOf(d.type) === -1) {
                                    categories.push(d.type);
                                }
                            });

                            var keyHeight = addKey(categories, width, itemXPos),
                                chartY = keyHeight + margin;

                            svg.append('line')
                                .attr('class', 'axis')
                                .attr('x1', axisXPos)
                                .attr('x2', axisXPos)
                                .attr('y1', chartY);

                            var items = svg.selectAll('g.timelineItem')
                                .data(data);

                            items.enter()
                                .append('g')
                                .attr('class', function (d) {
                                    return 'timelineItem ' + d.type;
                                });

                            /* Timeline Point */
                            items
                                .append('line')
                                .attr('x1', axisXPos + 15)
                                .attr('x2', itemXPos)
                                .attr('y1', 0)
                                .attr('y2', 0);

                            items
                                .append('circle')
                                .attr('r', 15)
                                .attr('cx', axisXPos)
                                .attr('cy', 0);

                            /* Item Title */

                            var filter = defs.append("filter")
                                .attr("id", "drop-shadow")
                                .attr("height", "150%");

                            filter.append("feGaussianBlur")
                                .attr("in", "SourceGraphic")
                                .attr("stdDeviation", 3)
                                .attr('result', 'blur');

                            filter.append('feColorMatrix')
                                .attr('in', 'blur')
                                .attr('type', 'matrix')
                                .attr('values', '0 0 0 .6 0 0 0 0 .6 0 0 0 0 .6 0 0 0 0 1 0 ')
                                .attr('result', 'greyBlur');

                            items
                                .append('path')
                                .attr('class', 'item-title-shadow')
                                .attr('d', function () {
                                    var y0 = 20,
                                        x1 = itemXPos + 4,
                                        y1 = 25,
                                        x2 = width - margin,
                                        y2 = 34,
                                        path = 'M' + x1 + ',' + y0 +
                                        ' L' + x1 + ',' + y1 +
                                        ' C' + x1 + ',' + y1 + ' ' + (x1 + x2 / 1.5) + ',' + y1 + ' ' + x2 + ',' + y2 +
                                        ' L' + x2 + ',' + y0 + ' Z';

                                    return path;
                                })
                                .style("filter", "url(#drop-shadow)");

                            items
                                .append('rect')
                                .attr('class', 'item-title')
                                .attr('x', itemXPos)
                                .attr('y', -25)
                                .attr('width', width - itemXPos - Math.round(margin / 2))
                                .attr('height', 50);



                            /* Duration */
                            items
                                .append('text')
                                .attr('class', 'duration')
                                .attr('fill', '#333')
                                .attr('y', 10)
                                .attr('x', itemXPos + 5)
                                .text(function (d) {
                                    var startDate = new Date(d.startdate),
                                        endDate = new Date(d.enddate),
                                        endDateText = "Present",
                                        result = '';

                                    if (d.type === 'work') {
                                        if (d.enddate) {
                                            endDateText = monthNames[endDate.getMonth()] + " " + endDate.getFullYear();
                                        }

                                        result = monthNames[startDate.getMonth()] + " " + startDate.getFullYear() +
                                            " - " + endDateText;
                                    } else {
                                        if (d.enddate) {
                                            endDateText = endDate.getFullYear();
                                        }
                                        result = startDate.getFullYear() + " - " + endDateText;
                                    }

                                    return result;
                                });

                            /* Company */
                            items
                                .append('text')
                                .attr('class', 'company')
                                .attr('fill', '#333')
                                .attr('y', -2)
                                .attr('x', width - Math.round(margin / 2) - 5)
                                .text(function (d) {
                                    return d.company;
                                });

                            /* Position */
                            items
                                .append('text')
                                .attr('class', 'position')
                                .attr('fill', '#333')
                                .attr('y', 18)
                                .attr('x', width - Math.round(margin / 2) - 5)
                                .text(function (d) {
                                    return d.position;
                                });

                            /* Skills */
                            var skillsGroup = items.append('g')
                                .attr('class', 'skills');

                            var skills = skillsGroup.selectAll('text.skill')
                                .data(function (d) {
                                    return d.skills;
                                });

                            var getSkillsY = function () {

                            }

                            skills.enter()
                                .append('g')
                                .attr('class', 'skill')

                            skills
                                .append('text')
                                .each(function (d, i) {
                                    d3UtilsService.wrapSVGText(d3.select(this), d, 10, 5, 85, 20);
                                });

                            skills.append('circle')
                                .attr('r', 3)
                                .attr('cx', 0)
                                .attr('cy', 0)
                                .attr('fill', '#333');

                            skills.each(function (d, i) {
                                d3.select(this).attr('transform', function () {
                                    var skillX = Math.round(margin / 2) + 80,
                                        skillY = 50,
                                        prevSkillHeight = 0;

                                    if (i > 0) {
                                        skillY = d3.transform(d3.select(this.previousSibling).attr("transform")).translate[1] + 2;
                                        prevSkillHeight = this.previousSibling.getBBox().height;
                                    }

                                    skillY = skillY + prevSkillHeight;

                                    return 'translate(' + skillX + ',' + skillY + ')';
                                });
                            });

                            /* Layout Items */
                            var getItemYPos = function (i) {
                                var prevItemY = chartY + 40,
                                    prevItemHeight = 0;
                                if (i > 0) {
                                    prevItemY = d3.transform(d3.select(items[0][i - 1]).attr("transform")).translate[1] + margin;
                                    prevItemHeight = items[0][i - 1].getBBox().height;
                                }


                                return prevItemY + prevItemHeight;
                            };

                            items.each(function (d, i) {
                                d3.select(this).attr('transform', function (d) {
                                    return 'translate(0,' + getItemYPos(i) + ')';
                                });
                            });

                            /* Set height of svg and axis */
                            var height = getItemYPos(items[0].length) - padding;

                            svg.select('line.axis')
                                .attr('y2', height - Math.round(margin / 2));

                            svg.attr('height', height);
                        };
                    });
                }
            };
                }]);