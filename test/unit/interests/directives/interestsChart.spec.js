(function () {
    'use strict';

    describe('vitae.interests', function () {
        describe('vitaeInterestsChart directive', function () {

            var element, $scope, $q, $window, testData;
            beforeEach(module('vitae.interests'));
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
            }));


            beforeEach(inject(function (_$compile_, _$rootScope_, _$q_, _$window_) {

                testData = [
                    {
                        title: 'test-interest-1',
                        img: 'image-1.png'
                    }, {
                        title: 'test-interest-2',
                        img: 'image-2.png'
                    }, {
                        title: 'test-interest-3',
                        img: 'image-3.png'
                    }];

                $q = _$q_;
                $window = _$window_;

                element = angular.element('<vitae-interests-chart data="testData"></vitae-interests-chart>');
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

            it('should draw a g element for each data item', function () {
                var chartInterests = element.find('svg g.interest');
                expect(chartInterests.length).toBe(3);
            });

            it('should draw a rect in the g for each data item', function () {
                var chartInterests = element.find('svg g.interest'),
                    i = 0,
                    expectedColors = ["#FFA347", "#B4DA45", "#AAC6FF"];

                chartInterests.each(function () {
                    var rect = $(this).find('rect');
                    expect(rect.length).toBe(1);
                    expect(rect.attr('fill')).toEqual(expectedColors[i % 3]);
                    i += 1;
                });
            });

            it('should draw a title in the g for each data item', function () {
                var chartInterests = element.find('svg g.interest'),
                    i = 0;

                chartInterests.each(function () {
                    var text = $(this).find('text');
                    expect(text.length).toBe(1);
                    expect(text.text()).toEqual(testData[i].title);
                    i += 1;
                });
            });

            it('should draw an image in the g for each data item', function () {
                var chartInterests = element.find('svg g.interest'),
                    i = 0;

                chartInterests.each(function () {
                    var image = $(this).find('image');
                    expect(image.length).toBe(1);
                    expect(image.attr('href')).toEqual('images/' + testData[i].img);
                    i += 1;
                });
            });
        });

        // No Data Tests
        describe('vitaeInterestsChart directive', function () {
            var element, $scope, $q, $window;
            beforeEach(module('vitae.interests'));
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
            }));


            beforeEach(inject(function (_$compile_, _$rootScope_, _$q_, _$window_) {
                $q = _$q_;
                $window = _$window_;

                element = angular.element('<vitae-interests-chart></vitae-interests-chart>');
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