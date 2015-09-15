(function () {
    'use strict';

    describe('vitae.timeline', function () {
        describe('vitaeTimelineChart directive', function () {

            var element, $scope, $q, $window, testData,
                d3FlushTransitions = function () {
                    var now = Date.now;
                    Date.now = function () {
                        return Infinity;
                    };
                    d3.timer.flush();
                    Date.now = now;
                },
                d3Click = function (obj) {
                    obj.each(function (i, e) {
                        var evt = document.createEvent("MouseEvents");
                        evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

                        e.dispatchEvent(evt);
                    });
                };

            beforeEach(module('vitae.timeline'));
            beforeEach(module(function ($provide) {
                $provide.provider('d3Service', function () {
                    this.$get = function () {
                        var d = $q.defer();
                        d.resolve($window.d3);
                        return {
                            d3: function () {
                                return d.promise;
                            }
                        };
                    };
                });

                $provide.provider('d3UtilsService', function () {
                    this.$get = function () {
                        return {
                            wrapSVGText: function (textNode, options) {
                                var caption = options.caption ? options.caption : "";
                                textNode.text(caption);
                            }
                        };
                    };
                });
            }));

            beforeEach(inject(function (_$compile_, _$rootScope_, _$q_, _$window_) {

                testData = [

                    {
                        "type": "test",
                        "startdate": "2015-08-01",
                        "enddate": "",
                        "company": "test-company",
                        "position": "test-position",
                        "skills": [
                            "test-skill 1",
                            "test-skill 2"
                        ]
                      },
                    {
                        "type": "work",
                        "company": "Current Company",
                        "position": "Worker",
                        "startdate": "2013-01-01",
                        "enddate": "",
                        "skills": [
                            "Skill 1",
                            "Skill 2",
                            "Skill 3",
                            "Skill 4"
                        ]
                    },
                    {
                        "type": "work",
                        "company": "Previous Company",
                        "position": "Worker",
                        "startdate": "2011-05-01",
                        "enddate": "2013-01-01",
                        "skills": [
                            "Skill A",
                            "Skill B",
                            "Skill C"
                        ]
                    },
                    {
                        "type": "voluntary",
                        "startdate": "2003-08-01",
                        "enddate": "2004-01-01",
                        "company": "Voluntary Work",
                        "position": "Voluntary Worker",
                        "skills": [
                            "Skill X",
                            "Skill Y",
                            "Skill Z"
                         ]
                      },
                    {
                        "type": "education",
                        "company": "Secondary School",
                        "position": "",
                        "startdate": "1996-09-01",
                        "enddate": "2003-06-01",
                        "skills": [
                            "A2 Grades",
                            "AS Grades",
                            "GCSE Grades"
                        ]
                    }
                ];

                $q = _$q_;
                $window = _$window_;

                element = angular.element('<vitae-timeline-chart data="testData"></vitae-timeline-chart>');
                $scope = _$rootScope_.$new();
                $scope.testData = testData;

                _$compile_(element)($scope);
                $scope.$digest();
            }));


            it('should create an svg element', function () {
                var chartSvg = element.find('svg');
                expect(chartSvg.length).toBe(1);
            });

            it('should draw the axis', function () {
                var chartAxis = element.find('svg .axis');
                expect(chartAxis.length).toBe(1);
            });

            it('should draw a g element for each key category', function () {
                var keyItems = element.find('svg g.key-item');
                expect(keyItems.length).toBe(4);
            });

            it('should draw a rect in the g element for each key category', function () {
                var keyItems = element.find('svg g.key-item'),
                    i = 0;

                keyItems.each(function () {
                    var rect = $(this).find('rect');
                    expect(rect.length).toBe(1);
                    i += 1;
                });

            });

            it('should draw a text in the g element for each key category', function () {
                var keyItems = element.find('svg g.key-item'),
                    i = 0,
                    expectedCategories = ['test', 'work', 'voluntary', 'education'];

                keyItems.each(function () {
                    var text = $(this).find('text');
                    expect(text.length).toBe(1);
                    expect(text.text()).toBe(expectedCategories[i]);
                    i += 1;
                });
            });

            it('should set the key opacity when a key item is clicked', function () {
                var keyItem = element.find('svg g.key-item.test');
                d3Click(keyItem);
                d3FlushTransitions();
                expect(keyItem[0].style.opacity).toBe('0.5');
                d3Click(keyItem);
                d3FlushTransitions();
                expect(keyItem[0].style.opacity).toBe('1');
            });

            it('should hide items of a matching category when a key item is clicked', function () {
                d3Click(element.find('svg g.key-item.work'))
                d3FlushTransitions();

                var timelineItems = element.find('svg g.timelineItem'),
                    i = 0,
                    expectedOpacities = ['', '0', '0', '', ''];

                for (i = 0; i < timelineItems.length; i++) {
                    expect(timelineItems[i].style.opacity).toBe(expectedOpacities[i]);
                }
            });

            it('should show items of a matching category when a key item is clicked', function () {
                d3Click(element.find('svg g.key-item.work'));
                d3Click(element.find('svg g.key-item.education'));
                d3Click(element.find('svg g.key-item.work'));
                d3FlushTransitions();

                var timelineItems = element.find('svg g.timelineItem'),
                    i = 0,
                    expectedOpacities = ['', '1', '1', '', '0'];

                for (i = 0; i < timelineItems.length; i++) {
                    expect(timelineItems[i].style.opacity).toBe(expectedOpacities[i]);
                }
            });
            it('should draw a g element for each data item', function () {
                var timelineItems = element.find('svg g.timelineItem');
                expect(timelineItems.length).toBe(5);
            });

            it('should draw a timeline point for each data item', function () {
                var timelineItems = element.find('svg g.timelineItem');

                timelineItems.each(function () {
                    expect($(this).find('line.item-title-join').length).toBe(1);
                    expect($(this).find('circle.item-title-point').length).toBe(1);
                });
            });

            it('should draw a title box for each data item', function () {
                var timelineItems = element.find('svg g.timelineItem');

                timelineItems.each(function () {
                    expect($(this).find('rect.item-title').length).toBe(1);
                    expect($(this).find('path.item-title-shadow').length).toBe(1);
                });
            });

            it('should draw a duration for each data item', function () {
                var timelineItems = element.find('svg g.timelineItem'),
                    i = 0;

                timelineItems.each(function () {
                    var expectedDurations = [
                            '2015 - Present',
                            'Jan 2013 - Present',
                            'May 2011 - Jan 2013',
                            '2003 - 2004',
                            '1996 - 2003'
                        ],
                        duration = $(this).find('text.duration');
                    expect(duration.length).toBe(1);
                    expect(duration.text()).toBe(expectedDurations[i]);
                    i += 1;
                });
            });

            it('should draw a company for each data item', function () {
                var timelineItems = element.find('svg g.timelineItem'),
                    i = 0;

                timelineItems.each(function () {
                    var company = $(this).find('text.company');
                    expect(company.length).toBe(1);
                    expect(company.text()).toBe(testData[i].company);
                    i += 1;
                });
            });

            it('should draw a position for each data item', function () {
                var timelineItems = element.find('svg g.timelineItem'),
                    i = 0;

                timelineItems.each(function () {
                    var position = $(this).find('text.position');
                    expect(position.length).toBe(1);
                    expect(position.text()).toBe(testData[i].position);
                    i += 1;
                });
            });

            it('should draw a skills g element for each data item', function () {
                var timelineItems = element.find('svg g.timelineItem');

                timelineItems.each(function () {
                    expect($(this).find('g.skills').length).toBe(1);
                });
            });

            it('should draw a g element for each skill', function () {
                var timelineItems = element.find('svg g.timelineItem'),
                    i = 0;

                timelineItems.each(function () {
                    var skills = $(this).find('g.skills g.skill');
                    expect(skills.length).toBe(testData[i].skills.length);
                    i += 1;
                });
            });

            it('should draw a bullet point for each skill', function () {
                var timelineItems = element.find('svg g.timelineItem');

                timelineItems.each(function () {
                    var skills = $(this).find('g.skills g.skill');

                    skills.each(function () {
                        expect($(this).find('circle.bullet').length).toBe(1);
                    });
                });
            });

            it('should draw text for each skill', function () {
                var timelineItems = element.find('svg g.timelineItem'),
                    i = 0;

                timelineItems.each(function () {
                    var skills = $(this).find('g.skills g.skill'),
                        j = 0;

                    skills.each(function () {
                        var skillText = $(this).find('text.skill');
                        expect(skillText.length).toBe(1);
                        expect(skillText.text()).toBe(testData[i].skills[j]);
                        j += 1;
                    });
                    i += 1;
                });
            });


        });

        // No Data Tests
        describe('vitaeTimelineChart directive', function () {
            var element, $scope, $q, $window;
            beforeEach(module('vitae.timeline'));
            beforeEach(module(function ($provide) {
                $provide.provider('d3Service', function () {
                    this.$get = function () {
                        var d = $q.defer();
                        d.resolve($window.d3);
                        return {
                            d3: function () {
                                return d.promise;
                            }
                        };
                    };
                });

                $provide.provider('d3UtilsService', function () {
                    this.$get = function () {
                        return {
                            wrapSVGText: function (textNode, options) {
                                var caption = options.caption ? options.caption : "";
                                textNode.text(caption);
                            }
                        };
                    };
                });
            }));


            beforeEach(inject(function (_$compile_, _$rootScope_, _$q_, _$window_) {
                $q = _$q_;
                $window = _$window_;

                element = angular.element('<vitae-timeline-chart></vitae-timeline-chart>');
                $scope = _$rootScope_.$new();

                _$compile_(element)($scope);
                $scope.$digest();
            }));


            it('should create an empty svg element when no data is provided', function () {
                var chartSvg = element.find('svg');
                expect(chartSvg.length).toBe(1);
                expect(chartSvg[0].childElementCount).toBe(0);
            });
        });
    });
}());